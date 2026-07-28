'use client';

import type {
  AnimationPolicy,
  AvatarVisualState,
  ExperienceMode,
  ExperienceTransitionPhase,
} from '@/types/experience';
import { NeuralPulseField } from './NeuralPulseField';
import styles from './NeuralExperience.module.css';

type Props = {
  policy: AnimationPolicy;
  mode: ExperienceMode;
  avatarState: AvatarVisualState;
  amplitude: number;
  transitionPhase: ExperienceTransitionPhase;
  arrival: 'seed' | 'spiral' | 'ocean' | 'ready';
};

export function ConsciousnessOcean({
  policy,
  mode,
  avatarState,
  amplitude,
  transitionPhase,
  arrival,
}: Props) {
  return (
    <div
      className={styles.consciousnessOcean}
      data-mode={mode}
      data-arrival={arrival}
      data-avatar-state={avatarState}
      aria-hidden="true"
    >
      <NeuralPulseField
        policy={policy}
        mode={mode}
        avatarState={avatarState}
        amplitude={amplitude}
        transitionPhase={transitionPhase}
        arrival={arrival}
      />
      <span className={styles.oceanRibbons} aria-hidden="true"><i /><i /><i /><i /><i /></span>
      <span className={styles.oceanTurbulence} aria-hidden="true"><i /><i /><i /></span>
      <span className={styles.oceanFog} />
      <span className={styles.oceanBloom} />
      <span className={styles.oceanShafts}><i /><i /><i /></span>
      <span className={styles.oceanCaustics} />
      <span className={styles.oceanSurface} />
    </div>
  );
}
