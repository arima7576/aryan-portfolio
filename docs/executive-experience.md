# Arima Executive Experience

The Executive Experience is a cinematic, voice-first browser interface. It is
not a traditional chat page: the central Arima core is the primary control,
spoken output is the primary response, and concise captions and panels provide
visual context.

## Routes

- `/executive` — protected primary voice experience
- `/portfolio-lab` — existing Portfolio Lab with the reusable Arima Voice Dock
- `/quant-research` — mock-labelled research dashboard with Voice Dock
- `/growth-studio` — protected, private mock review workflow

## Browser speech

The client uses `SpeechRecognition` or `webkitSpeechRecognition` for final and
interim transcripts, `getUserMedia` for explicit microphone permission, and
`speechSynthesis` for spoken responses. Raw audio never leaves the browser.
Users can interrupt speech, cancel a session, repeat the last response, mute
voice, toggle captions, enable high contrast, or use the keyboard fallback.

Chromium-based desktop browsers currently provide the broadest recognition
support. Safari support varies by OS release. Firefox does not generally expose
the Web Speech recognition API, so the keyboard fallback is shown. Speech
recognition may depend on a browser vendor's own service even though Arima does
not upload audio to its backend.

## Demo and live modes

Demo mode is enabled when:

- `NEXT_PUBLIC_ARIMA_DEMO_MODE=true`;
- `NEXT_PUBLIC_ARIMA_API_URL` is absent; or
- the configured backend is unavailable or times out.

The UI always displays **DEMO MODE** and returns deterministic local responses.
It never silently describes demo data as live data.

Live mode sends final transcript text to the Voice Gateway. The typed client
supports session creation, transcript submission, interrupt, cancel, health,
request timeouts, network fallback, and correlation IDs. Authentication is
provided by the shared production auth provider: access tokens stay in memory,
refresh sessions use secure backend cookies, and the provider sends CSRF tokens
for cookie-backed mutations. The Voice Gateway reads that in-memory token; it
does not read browser storage.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_ARIMA_API_URL` | Backend origin, without `/api/v1` |
| `NEXT_PUBLIC_ARIMA_DEMO_MODE` | Force deterministic demo behavior |
| `NEXT_PUBLIC_ARIMA_VOICE_ENABLED` | Disable microphone UI when `false` |

Safe static-export defaults require no variables.

## Local use

Run `npm run dev`, configure `NEXT_PUBLIC_ARIMA_API_URL`, register and verify
an account through the backend, then sign in before opening `/executive`.
Without a configured Voice Gateway, the client clearly falls back to Demo Mode.

## Security and deployment limitations

The protected route is a navigation guard, not an authorization boundary; the
backend remains responsible for validating every bearer token, session, CSRF
token, permission and workspace boundary. Growth actions change local mock
state only; they never publish, email, post, or call an external service.
Static export and Cloudflare compatibility are preserved because browser calls
the configured backend origin directly; that origin must allow the deployed
frontend origin with credentialed CORS.
