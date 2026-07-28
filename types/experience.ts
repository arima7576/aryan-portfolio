export type ExperienceMode =
  | 'avatar'
  | 'entering'
  | 'neural_core'
  | 'chamber'
  | 'exiting'
  | 'error';

export type ActiveChamber =
  | 'executive'
  | 'portfolio'
  | 'quant'
  | 'growth'
  | 'projects'
  | 'publications'
  | 'approvals'
  | 'health';

export type AvatarVisualState =
  | 'dormant'
  | 'idle'
  | 'awakening'
  | 'listening'
  | 'speech_detected'
  | 'processing'
  | 'thinking'
  | 'executing'
  | 'awaiting_approval'
  | 'presenting'
  | 'speaking'
  | 'interrupted'
  | 'warning'
  | 'error'
  | 'completed';

export type ExperienceEventType =
  | 'avatar_state_changed'
  | 'neural_activity_started'
  | 'neural_activity_completed'
  | 'chamber_transition_requested'
  | 'data_object_created'
  | 'data_object_updated'
  | 'data_object_dismissed'
  | 'task_visualisation_requested'
  | 'watchlist_visualisation_requested'
  | 'performance_visualisation_requested'
  | 'approval_visualisation_requested'
  | 'warning_visualisation_requested'
  | 'system_pulse'
  | 'background_job_completed';

export type ExperienceEventPriority = 'low' | 'normal' | 'high' | 'critical';

export type NeuralObjectKind =
  | 'metric'
  | 'insight'
  | 'watchlist'
  | 'performance'
  | 'task'
  | 'approval'
  | 'warning'
  | 'research'
  | 'notification'
  | 'stream'
  | 'system';

export type NeuralObjectStatus =
  | 'active'
  | 'complete'
  | 'pending'
  | 'warning'
  | 'error';

export type ExperienceEvent = {
  event_id: string;
  session_id: string;
  correlation_id: string;
  timestamp: string;
  type: ExperienceEventType;
  priority: ExperienceEventPriority;
  source: string;
  target_chamber?: ActiveChamber | null;
  payload: Record<string, unknown>;
  duration_hint?: number | null;
  dismissible: boolean;
  requires_attention: boolean;
};

export type NeuralDataObject = {
  id: string;
  kind: NeuralObjectKind;
  chamber: ActiveChamber;
  title: string;
  eyebrow?: string;
  value?: string;
  summary?: string;
  details?: Array<{ label: string; value: string }>;
  status?: NeuralObjectStatus;
  source: 'demo' | 'live' | 'mixed';
  priority?: ExperienceEventPriority;
  position?: { x: number; y: number };
  dismissible?: boolean;
  requiresAttention?: boolean;
  actionLabel?: string;
  createdAt?: string;
  returning?: boolean;
};

export type ExperienceTransitionPhase =
  | 'idle'
  | 'focus'
  | 'zoom'
  | 'dissolve'
  | 'tunnel'
  | 'neural_expansion'
  | 'reveal'
  | 'returning';

export type ChamberTransition = {
  phase: ExperienceTransitionPhase;
  from: ActiveChamber | 'avatar';
  to: ActiveChamber | 'avatar';
};

export type AnimationQuality = 'reduced' | 'low' | 'mobile' | 'standard' | 'high';

export type AnimationPolicy = {
  quality: AnimationQuality;
  reducedMotion: boolean;
  lowPower: boolean;
  mobile: boolean;
  hidden: boolean;
  paused: boolean;
  particleCount: number;
  depthLayers: number;
};

export type ExperienceAnnouncement = {
  id: string;
  message: string;
  politeness?: 'polite' | 'assertive';
};
