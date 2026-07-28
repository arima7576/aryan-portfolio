'use client';

import type { ChamberTransition as Transition } from '@/types/experience';
import { chamberLabels } from '@/data/experience-demo';
import styles from '@/components/neural/NeuralExperience.module.css';

type Props = {
  transition: Transition;
};

const labels = {
  focus: 'Focusing intelligence',
  zoom: 'Approaching neural core',
  dissolve: 'Dissolving outer layer',
  tunnel: 'Following active signal',
  neural_expansion: 'Expanding chamber',
  reveal: 'Revealing intelligence',
  returning: 'Returning to Arima',
  idle: '',
};

export function ChamberTransition({ transition }: Props) {
  if (transition.phase === 'idle') return null;
  const destination = transition.to === 'avatar'
    ? 'Arima avatar'
    : chamberLabels[transition.to];
  return (
    <div
      className={styles.chamberTransition}
      data-phase={transition.phase}
      data-destination={transition.to}
      role="status"
      aria-live="polite"
    >
      <div className={styles.transitionTunnel} aria-hidden="true"><i /><i /><i /><i /></div>
      <div className={styles.transitionFluid} aria-hidden="true"><i /><i /><i /></div>
      <div className={styles.transitionParticles} aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <span>{labels[transition.phase]}</span>
      <strong>{destination}</strong>
    </div>
  );
}
