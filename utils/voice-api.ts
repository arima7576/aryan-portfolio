import type {
  VoiceGatewayResponse,
  VoiceHealth,
  VoiceMode,
  VoiceNavigationAction,
  VoicePanelAction,
  VoiceSession,
} from '@/types/voice';

const API_URL = process.env.NEXT_PUBLIC_ARIMA_API_URL?.replace(/\/$/, '');
const FORCE_DEMO = process.env.NEXT_PUBLIC_ARIMA_DEMO_MODE === 'true';
const VOICE_ENABLED = process.env.NEXT_PUBLIC_ARIMA_VOICE_ENABLED !== 'false';
const REQUEST_TIMEOUT_MS = 8_000;

const command = (transcript: string): {
  text: string;
  navigation?: VoiceNavigationAction;
  panel?: VoicePanelAction;
} => {
  const value = transcript.toLowerCase().replace(/[?.!,]/g, '');
  if (value.includes('portfolio')) return {
    text: 'Opening Portfolio Lab.',
    navigation: { path: '/portfolio-lab', label: 'Portfolio' },
  };
  if (value.includes('quant research')) return {
    text: 'Opening Quant Research.',
    navigation: { path: '/quant-research', label: 'Quant Research' },
  };
  if (value.includes('growth') && value.includes('today')) return {
    text: 'Opening the work Growth Studio created today.',
    navigation: { path: '/growth-studio', label: 'Growth Studio', focus: 'today' },
    panel: { panel: 'growth_output', focus: 'today' },
  };
  if (value.includes('growth studio')) return {
    text: 'Opening Growth Studio.',
    navigation: { path: '/growth-studio', label: 'Growth Studio' },
  };
  if (value.includes('project')) return {
    text: 'Opening Projects.',
    navigation: { path: '/projects', label: 'Projects' },
  };
  if (value.includes('go back')) return {
    text: 'Going back.',
    navigation: { path: 'back', label: 'Previous view' },
  };
  if (value.includes('approval')) return {
    text: 'You have two items awaiting review.',
    panel: { panel: 'executive_briefing', focus: 'approvals' },
  };
  if (value.includes('brief') || value.includes("what's up") || value.includes('whats up')) return {
    text: 'Good morning. Your portfolio is steady, three priorities need attention, and two approvals are pending.',
    panel: { panel: 'executive_briefing', focus: 'today' },
  };
  return {
    text: 'I am in demo mode. Your executive workspace is ready, with portfolio, research, projects and growth intelligence available.',
    panel: { panel: 'executive_briefing', focus: 'today' },
  };
};

const id = () => globalThis.crypto?.randomUUID?.() ?? `demo-${Date.now()}`;

const now = () => new Date().toISOString();

const accessToken = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('arima_access_token');
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!API_URL) throw new Error('Arima API URL is not configured');
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const token = accessToken();
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-ID': id(),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`Voice API returned ${response.status}`);
    }
    return await response.json() as T;
  } finally {
    window.clearTimeout(timeout);
  }
}

function demoSession(): VoiceSession {
  const timestamp = now();
  return {
    session_id: id(),
    user_id: 'demo-user',
    correlation_id: id(),
    state: 'idle',
    language: 'en',
    locale: 'en-GB',
    timezone: 'Europe/London',
    created_at: timestamp,
    updated_at: timestamp,
  };
}

function demoResponse(sessionId: string, transcript: string): VoiceGatewayResponse {
  const resolved = command(transcript);
  const timestamp = now();
  return {
    session_id: sessionId,
    correlation_id: id(),
    state: 'completed',
    transcript,
    response_text: resolved.text,
    visual_response_text: resolved.text,
    navigation_action: resolved.navigation,
    panel_action: resolved.panel,
    approval_request: null,
    demo: true,
    events: [
      { event: 'transcript_final', sequence: 0, timestamp, data: { transcript } },
      { event: 'thinking_started', sequence: 1, timestamp, data: {} },
      ...(resolved.navigation ? [{
        event: 'navigation_requested' as const,
        sequence: 2,
        timestamp,
        data: resolved.navigation,
      }] : []),
      ...(resolved.panel ? [{
        event: 'panel_requested' as const,
        sequence: 3,
        timestamp,
        data: resolved.panel,
      }] : []),
      { event: 'speaking_started', sequence: 4, timestamp, data: { text: resolved.text } },
      { event: 'session_completed', sequence: 5, timestamp, data: {} },
    ],
  };
}

export class VoiceApiClient {
  private session: VoiceSession | null = null;
  private currentMode: VoiceMode = FORCE_DEMO || !API_URL ? 'demo' : 'live';

  get mode(): VoiceMode {
    return this.currentMode;
  }

  get enabled(): boolean {
    return VOICE_ENABLED;
  }

  async createSession(): Promise<VoiceSession> {
    if (this.currentMode === 'demo') {
      this.session = demoSession();
      return this.session;
    }
    try {
      this.session = await request<VoiceSession>('/api/v1/voice/sessions', {
        method: 'POST',
        body: JSON.stringify({
          language: 'en',
          locale: navigator.language || 'en-GB',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        }),
      });
      return this.session;
    } catch {
      this.currentMode = 'demo';
      this.session = demoSession();
      return this.session;
    }
  }

  async submitTranscript(transcript: string): Promise<VoiceGatewayResponse> {
    const session = this.session ?? await this.createSession();
    if (this.currentMode === 'demo') return demoResponse(session.session_id, transcript);
    try {
      return await request<VoiceGatewayResponse>(
        `/api/v1/voice/sessions/${session.session_id}/transcript`,
        { method: 'POST', body: JSON.stringify({ transcript }) },
      );
    } catch {
      this.currentMode = 'demo';
      return demoResponse(session.session_id, transcript);
    }
  }

  async interrupt(): Promise<void> {
    if (!this.session || this.currentMode === 'demo') return;
    await request(`/api/v1/voice/sessions/${this.session.session_id}/interrupt`, { method: 'POST' });
  }

  async cancel(): Promise<void> {
    if (!this.session || this.currentMode === 'demo') return;
    await request(`/api/v1/voice/sessions/${this.session.session_id}/cancel`, { method: 'POST' });
  }

  async health(): Promise<VoiceHealth> {
    if (this.currentMode === 'demo') {
      return {
        status: 'demo',
        enabled: VOICE_ENABLED,
        provider_neutral: true,
        session_store: 'browser_demo',
        orchestration_available: false,
        checked_at: now(),
      };
    }
    return request<VoiceHealth>('/api/v1/voice/health');
  }
}
