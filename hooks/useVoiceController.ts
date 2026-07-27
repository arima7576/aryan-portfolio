'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type {
  VoiceGatewayResponse,
  VoiceMode,
  VoicePanelAction,
  VoiceState,
} from '@/types/voice';
import { VoiceApiClient } from '@/utils/voice-api';

type RecognitionResult = {
  isFinal: boolean;
  0: { transcript: string };
};

type RecognitionEvent = {
  resultIndex: number;
  results: ArrayLike<RecognitionResult>;
};

type RecognitionErrorEvent = { error: string };

type BrowserRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type RecognitionConstructor = new () => BrowserRecognition;

declare global {
  interface Window {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  }
}

type VoiceControllerOptions = {
  onPanel?: (panel: VoicePanelAction | null) => void;
};

export function useVoiceController(options: VoiceControllerOptions = {}) {
  const router = useRouter();
  const api = useRef(new VoiceApiClient());
  const recognition = useRef<BrowserRecognition | null>(null);
  const lastResponse = useRef('');
  const [state, setState] = useState<VoiceState>('idle');
  const [mode, setMode] = useState<VoiceMode>(api.current.mode);
  const [partialTranscript, setPartialTranscript] = useState('');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState<
    'unknown' | 'granted' | 'denied'
  >('unknown');
  const [speechSupported, setSpeechSupported] = useState(true);

  const navigate = useCallback((result: VoiceGatewayResponse) => {
    options.onPanel?.(result.panel_action ?? null);
    const action = result.navigation_action;
    if (!action) return;
    if (action.path === 'back') {
      router.back();
      return;
    }
    const destination = action.focus
      ? `${action.path}#${encodeURIComponent(action.focus)}`
      : action.path;
    window.setTimeout(() => router.push(destination), 300);
  }, [options, router]);

  const speak = useCallback((text: string) => {
    if (muted || !('speechSynthesis' in window)) {
      setState('idle');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = navigator.language || 'en-GB';
    utterance.rate = 0.96;
    utterance.pitch = 0.92;
    utterance.onstart = () => setState('speaking');
    utterance.onend = () => setState('idle');
    utterance.onerror = () => {
      setError('Browser speech playback was interrupted.');
      setState('error');
    };
    window.speechSynthesis.speak(utterance);
  }, [muted]);

  const submitTranscript = useCallback(async (value: string) => {
    const finalTranscript = value.trim();
    if (!finalTranscript) return;
    setTranscript(finalTranscript);
    setPartialTranscript('');
    setError(null);
    setState('thinking');
    try {
      const result = await api.current.submitTranscript(finalTranscript);
      setMode(api.current.mode);
      setResponse(result.visual_response_text);
      lastResponse.current = result.response_text;
      if (result.approval_request) setState('awaiting_approval');
      navigate(result);
      if (!result.approval_request) speak(result.response_text);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Voice request failed.');
      setState('error');
    }
  }, [navigate, speak]);

  const startListening = useCallback(async () => {
    if (!api.current.enabled) {
      setError('Voice is disabled by configuration. Keyboard fallback remains available.');
      setKeyboardOpen(true);
      return;
    }
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setSpeechSupported(false);
      setError('Speech recognition is unavailable in this browser. Use the keyboard fallback.');
      setKeyboardOpen(true);
      return;
    }
    setState('requesting_microphone');
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicrophonePermission('granted');
    } catch {
      setMicrophonePermission('denied');
      setError('Microphone permission was denied. You can continue with the keyboard fallback.');
      setKeyboardOpen(true);
      setState('error');
      return;
    }
    const recognizer = new Recognition();
    recognizer.continuous = false;
    recognizer.interimResults = true;
    recognizer.lang = navigator.language || 'en-GB';
    recognizer.onresult = (event) => {
      let partial = '';
      let final = '';
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const item = event.results[index];
        if (item.isFinal) final += item[0].transcript;
        else partial += item[0].transcript;
      }
      if (partial) {
        setState('speech_detected');
        setPartialTranscript(partial);
      }
      if (final) void submitTranscript(final);
    };
    recognizer.onerror = (event) => {
      if (event.error === 'not-allowed') setMicrophonePermission('denied');
      setError(`Speech recognition error: ${event.error.replaceAll('-', ' ')}.`);
      setState('error');
    };
    recognizer.onend = () => {
      recognition.current = null;
      setState((current) => (
        current === 'listening' || current === 'speech_detected' ? 'idle' : current
      ));
    };
    recognition.current = recognizer;
    recognizer.start();
    setState('listening');
  }, [submitTranscript]);

  const stopListening = useCallback(() => {
    recognition.current?.stop();
    recognition.current = null;
    setState('idle');
  }, []);

  const interrupt = useCallback(async () => {
    recognition.current?.abort();
    recognition.current = null;
    window.speechSynthesis?.cancel();
    setState('interrupted');
    try {
      await api.current.interrupt();
    } catch {
      setError('Arima stopped locally; the live gateway could not be notified.');
    }
  }, []);

  const cancel = useCallback(async () => {
    recognition.current?.abort();
    window.speechSynthesis?.cancel();
    setState('cancelled');
    try {
      await api.current.cancel();
    } catch {
      setError('The local session was cancelled; the live gateway could not be notified.');
    }
  }, []);

  const repeat = useCallback(() => {
    if (lastResponse.current) speak(lastResponse.current);
  }, [speak]);

  useEffect(() => {
    let active = true;
    void api.current.createSession().then(() => {
      if (active) setMode(api.current.mode);
    });
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    setSpeechSupported(Boolean(Recognition));
    return () => {
      active = false;
      recognition.current?.abort();
    };
  }, []);

  return {
    state,
    mode,
    partialTranscript,
    transcript,
    response,
    error,
    muted,
    captions,
    keyboardOpen,
    microphonePermission,
    speechSupported,
    setMuted,
    setCaptions,
    setKeyboardOpen,
    startListening,
    stopListening,
    submitTranscript,
    interrupt,
    cancel,
    repeat,
  };
}
