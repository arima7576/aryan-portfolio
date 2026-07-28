'use client';

import type { ActiveChamber, NeuralDataObject } from '@/types/experience';
import { NeuralDataObject as NeuralObject } from './NeuralDataObjects';
import styles from '@/components/neural/NeuralExperience.module.css';

type Props = {
  activeChamber: ActiveChamber;
  objects: NeuralDataObject[];
  onFocus: (object: NeuralDataObject) => void;
  onDismiss: (id: string) => void;
};

export function IntelligenceObjectLayer({
  activeChamber,
  objects,
  onFocus,
  onDismiss,
}: Props) {
  const visible = objects.filter((object) => (
    object.chamber === activeChamber
      || activeChamber === 'executive'
        && (object.chamber === 'executive' || object.kind === 'watchlist' || object.kind === 'performance')
  ));

  return (
    <section className={styles.objectLayer} aria-label={activeChamber + ' intelligence objects'}>
      {visible.map((object, index) => (
        <NeuralObject
          key={object.id}
          object={object}
          index={index}
          onFocus={onFocus}
          onDismiss={onDismiss}
        />
      ))}
    </section>
  );
}
