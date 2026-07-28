# Arima Living Neural Intelligence Experience

The Executive route is a client-side, static-export-safe environment that
turns the existing voice gateway and orchestration response into a cinematic
presentation layer. It does not replace routing, authorization, orchestration
or the existing detailed product surfaces.

## Architecture

The Executive experience is composed from small client-side layers:

- ConsciousnessOcean owns the single policy-aware Canvas loop for the
  continuous energy ocean: deterministic particle depth, plasma ribbons,
  organic streams, speaking ripples and ambient light.
- ArimaAvatar renders a translucent neural mask that materialises out of the
  ocean and maps voice state into visible intelligence reactions.
- NeuralCore supplies the interactive core and keyboard-accessible intelligence
  nodes inside that same continuous field.
- ChamberRenderer supplies the Executive, Portfolio, Quant, Growth, Projects,
  Publications, Approvals and Health spatial compositions.
- IntelligenceObjectLayer renders reusable holographic objects for metrics,
  watchlists, performance, completion, approvals, warnings, research,
  notifications and response streams.
- DetailPortal is the optional conventional detail surface; it traps focus and
  links to existing detailed routes where they exist.
- useNeuralExperience owns mode, chamber, object, accessibility and
  presentation state. Voice transport remains in useVoiceController and
  VoiceApiClient.

The current experience modes are avatar, entering, neural_core, chamber,
exiting and error. Avatar visual states include dormant, idle, awakening,
listening, speech_detected, processing, thinking, executing,
awaiting_approval, presenting, speaking, interrupted, warning, error and
completed.

## Consciousness treatment

Milestone 7 deliberately extends the existing interaction model rather than
adding a second route or state machine. On arrival, the background moves from
a bright energy seed through a rotating spiral and growing neural ocean before
the avatar becomes fully visible. The ocean is layered rather than a flat
particle backdrop: filled plasma sheets, volumetric cloud banks, refraction
rings, caustics, moving light shafts, turbulence and deterministic bursts keep
the whole viewport active. Entering a core or chamber uses the existing
transition controller, now shown as a flowing energy tunnel rather than a page
replacement.

The camera layer uses small, CSS-composited float, depth and dive transforms,
plus a pointer-driven parallax offset on suitable desktop devices. It is
decorative: navigation, focus management, keyboard support and data objects
still use the same DOM and event flow. The Canvas uses curved Bézier streams
rather than straight connection lines, while the interactive SVG map remains
available as the accessible chamber selector.

Speaking produces expanding rings and circular energy ripples instead of an
equalizer. Thinking and execution intensify the plasma field, avatar currents,
incoming light streams and core orbit speed. The avatar uses particle assembly,
travelling body currents and moving liquid-light waves so it reads as part of
the field rather than a surface placed on top of it. Intelligence objects use a
particle-field treatment as they materialise and dissolve, but keep their
semantic controls and detail portal intact.

## Chamber navigation

Avatar activation enters a staged focus, zoom, dissolve, tunnel, neural
expansion and reveal sequence. Chamber links and supported voice commands use
the same local transition before the Executive query route updates.

Direct entries are supported:

- /executive?chamber=portfolio
- /executive?chamber=quant
- /executive?chamber=growth
- /executive?chamber=projects
- /executive?chamber=approvals

Escape returns from a detail object first, then exits to the avatar view.
Existing Portfolio Lab, Quant Research, Growth Studio and project routes remain
the detailed drill-down surfaces.

## Voice and event behaviour

The browser controller consumes the existing VoiceGatewayResponse and its
structured experience_events field. If a backend does not yet provide that
field, it maps the existing voice lifecycle events as a compatibility fallback.

Speech recognition is browser-dependent. On network, permission or unsupported
browser failures, the environment remains alive, reports a short status, opens
keyboard mode and offers retry. Browser speech uses a deliberately approximate
visual amplitude pulse; it is not phoneme or lip synchronization. Raw audio is
never sent or stored by this frontend.

## Demo and live data

Demo mode is always labelled. Its daily intelligence, watchlist, weekly
performance, research, task, approval and health objects are deterministic
simulations. No financial value is represented as live market data.

Live mode keeps the same presentation components but consumes authenticated
voice/orchestration responses and experience events. When a subsystem is
unavailable, the voice client falls back visibly to demo mode. Mixed sources
are labelled at object and detail level.

## Daily and weekly policy

The default policy selects a weekly presentation at or after 13:00 local
browser time on Friday. At all other local times, daily intelligence is primary.
The policy is a replaceable pure function in utils/intelligence-policy.ts.

## Animation and performance policy

No rendering dependency is added. The environment uses one Canvas loop,
CSS-composited atmosphere/pathways and DOM data objects. The Canvas is mounted
at the Executive shell level, so it is not restarted when the user moves
between avatar, core and chamber states. Voice amplitude and presentation state
are read by that shared loop without rebuilding it.

- High quality uses 420 deterministic particles and seven depth layers.
- Standard uses 260 particles and five depth layers.
- Mobile uses 96 particles and three depth layers.
- Low power uses 40 particles and two depth layers.
- Reduced motion uses static geometry and no moving Canvas particles.

The policy observes reduced-motion preference, mobile width, visibility and
connection save-data or slow-network hints. The Canvas caps device pixel ratio
at 1.75, observes resize changes, stops its requestAnimationFrame loop while
hidden or reduced, and cleans observers, animation frames, timers, speech and
recognition resources on unmount. CSS animation is also paused while hidden.
Exact frame rate requires runtime profiling on the target device and is not
claimed here.

If Canvas is unavailable, the SVG network, avatar, labels, controls and detail
objects remain functional.

## Accessibility

The avatar and neural pathways are keyboard controls, data objects support
Enter and Space, focus states are visible, details use a focus trap, Escape is
supported, status changes use live regions, captions and mute controls are
available, and simplified/high-contrast controls are exposed. Mobile converts
the floating-object field into a focused horizontal sheet sequence.

## Local run

Run npm run typecheck, npm run lint and npm run build from the frontend
repository. The static build should contain Executive, Portfolio Lab, Quant
Research, Growth Studio and existing project route output.

## Known limitations and future work

This milestone has no WebSocket event stream, production audio analysis,
production voice SDK, real market feed, external publication action, approval
mutation API or live provider integration. Those should be added behind the
existing voice, orchestration, approval and integration platforms rather than
through a parallel frontend workflow.
