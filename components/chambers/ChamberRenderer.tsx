'use client';

import Link from 'next/link';
import type { ActiveChamber, AnimationPolicy } from '@/types/experience';
import { chamberDescriptions, chamberLabels } from '@/data/experience-demo';
import styles from '@/components/neural/NeuralExperience.module.css';

type Props = {
  chamber: ActiveChamber;
  policy: AnimationPolicy;
  onReturnToCore: () => void;
};

const chamberTags: Record<ActiveChamber, string[]> = {
  executive: ['priorities', 'memory', 'decisions'],
  portfolio: ['allocation', 'risk', 'watchlist'],
  quant: ['regimes', 'models', 'evidence'],
  growth: ['ideas', 'drafts', 'approvals'],
  projects: ['dependencies', 'owners', 'deadlines'],
  publications: ['archive', 'research', 'streams'],
  approvals: ['review', 'human-in-loop', 'protected'],
  health: ['telemetry', 'background', 'availability'],
};

const drillDown: Partial<Record<ActiveChamber, { href: string; label: string }>> = {
  portfolio: { href: '/portfolio-lab', label: 'Portfolio Lab' },
  quant: { href: '/quant-research', label: 'Quant Research detail' },
  growth: { href: '/growth-studio', label: 'Growth Studio detail' },
  projects: { href: '/research-projects', label: 'Research projects' },
};

export function ChamberRenderer({ chamber, policy, onReturnToCore }: Props) {
  const detail = drillDown[chamber];
  return (
    <section
      className={styles.chamber}
      data-chamber={chamber}
      data-quality={policy.quality}
      aria-labelledby="chamber-title"
    >
      <div className={styles.chamberAmbient} aria-hidden="true"><i /><i /><i /></div>
      <header className={styles.chamberHeader}>
        <div>
          <span>ARIMA / {chamber.toUpperCase()} CHAMBER</span>
          <h1 id="chamber-title">{chamberLabels[chamber]}</h1>
          <p>{chamberDescriptions[chamber]}</p>
        </div>
        <div className={styles.chamberActions}>
          <button type="button" onClick={onReturnToCore}>Core map</button>
          {detail && <Link href={detail.href}>Open {detail.label}</Link>}
        </div>
      </header>
      <div className={styles.chamberField} aria-hidden="true">
        {chamberTags[chamber].map((tag, index) => (
          <span key={tag} style={{ '--tag-index': index } as React.CSSProperties}>{tag}</span>
        ))}
      </div>
    </section>
  );
}
