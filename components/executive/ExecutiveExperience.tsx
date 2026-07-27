'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { ExecutiveBriefingPanel } from './ExecutiveBriefingPanel';
import { useVoiceController } from '@/hooks/useVoiceController';
import { useAuth } from '@/providers';
import type { VoicePanelAction } from '@/types/voice';

const statusCopy = {
  idle: 'Ready when you are',
  requesting_microphone: 'Requesting microphone',
  listening: 'Listening',
  speech_detected: 'I can hear you',
  processing: 'Processing',
  thinking: 'Thinking',
  tool_execution: 'Executing securely',
  awaiting_approval: 'Awaiting your approval',
  speaking: 'Speaking',
  interrupted: 'Interrupted',
  completed: 'Complete',
  error: 'Voice needs attention',
  cancelled: 'Session cancelled',
};

export function ExecutiveExperience() {
  const { user } = useAuth();
  const [clock, setClock] = useState('');
  const [panel, setPanel] = useState<VoicePanelAction | null>(null);
  const [keyboardValue, setKeyboardValue] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const voice = useVoiceController({ onPanel: setPanel });

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date()));
    update();
    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void voice.submitTranscript(keyboardValue);
    setKeyboardValue('');
  };

  return (
    <main className={`executive-world state-${voice.state}${highContrast ? ' high-contrast' : ''}`}>
      <div className="executive-atmosphere" aria-hidden="true"><i /><i /><i /></div>
      <header className="executive-header">
        <Link href="/" className="executive-brand"><b>AF</b><span>ARIMA<br />EXECUTIVE OS</span></Link>
        <div className="executive-mode">
          {voice.mode === 'demo' && <strong>DEMO MODE</strong>}
          <span>{clock}</span>
          <span>EXECUTIVE</span>
        </div>
        <div className="executive-user"><i />PRIVATE / {user?.name ?? 'AUTHORISED USER'}</div>
      </header>

      <section className="executive-stage" aria-label="Arima voice interface">
        <div className="executive-orbits" aria-hidden="true"><i /><i /><i /><i /></div>
        <button
          type="button"
          className="arima-core"
          onClick={() => (
            voice.state === 'speaking'
              ? void voice.interrupt()
              : void voice.startListening()
          )}
          aria-label={voice.state === 'speaking' ? 'Interrupt Arima' : 'Start speaking to Arima'}
        >
          <span className="core-halo" />
          <span className="core-grid" />
          <span className="core-signal">{Array.from({ length: 24 }, (_, index) => <i style={{ '--bar': index } as React.CSSProperties} key={index} />)}</span>
          <strong>AF</strong>
        </button>
        <div className="executive-status" role="status" aria-live="polite">
          <span>{statusCopy[voice.state]}</span>
          {voice.partialTranscript && <p>{voice.partialTranscript}</p>}
          {voice.captions && voice.response && <p>{voice.response}</p>}
          {voice.error && <em>{voice.error}</em>}
          {!voice.speechSupported && <em>Speech recognition unavailable · keyboard ready</em>}
        </div>
      </section>

      <nav className="executive-dock" aria-label="Executive modules">
        <Link className="active" href="/executive">Executive</Link>
        <Link href="/portfolio-lab">Portfolio</Link>
        <Link href="/quant-research">Quant Research</Link>
        <Link href="/growth-studio">Growth Studio</Link>
        <Link href="/projects">Projects</Link>
      </nav>

      <div className="executive-controls">
        <button type="button" onClick={() => voice.setKeyboardOpen(!voice.keyboardOpen)} aria-expanded={voice.keyboardOpen}>Keyboard</button>
        <button type="button" onClick={() => voice.setMuted(!voice.muted)} aria-pressed={voice.muted}>{voice.muted ? 'Unmute' : 'Mute voice'}</button>
        <button type="button" onClick={() => voice.setCaptions(!voice.captions)} aria-pressed={voice.captions}>Captions</button>
        <button type="button" onClick={() => setHighContrast((value) => !value)} aria-pressed={highContrast}>Contrast</button>
        <button type="button" onClick={voice.repeat} disabled={!voice.response}>Repeat</button>
        <button type="button" onClick={() => void voice.cancel()}>Cancel</button>
      </div>

      {voice.keyboardOpen && (
        <form className="executive-keyboard" onSubmit={submit}>
          <label htmlFor="voice-fallback">Keyboard fallback</label>
          <input
            id="voice-fallback"
            value={keyboardValue}
            onChange={(event) => setKeyboardValue(event.target.value)}
            placeholder="Ask Arima…"
            autoFocus
          />
          <button type="submit">Send</button>
        </form>
      )}

      <button
        type="button"
        className={`approval-indicator${voice.state === 'awaiting_approval' ? ' is-active' : ''}`}
        onClick={() => setPanel({ panel: 'executive_briefing', focus: 'approvals' })}
      >
        <i /> 2 approvals
      </button>
      <p className="executive-disclosure">
        {voice.mode === 'demo'
          ? 'Local deterministic demonstration · no live operational data'
          : 'Connected to Arima Executive OS'}
      </p>
      <ExecutiveBriefingPanel action={panel} onClose={() => setPanel(null)} />
    </main>
  );
}
