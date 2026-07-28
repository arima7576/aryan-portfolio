'use client';

import type { CSSProperties } from 'react';
import type { NeuralDataObject as NeuralObject } from '@/types/experience';
import styles from '@/components/neural/NeuralExperience.module.css';

type ObjectProps = {
  object: NeuralObject;
};

function DetailRows({ object }: ObjectProps) {
  if (!object.details?.length) return null;
  return (
    <dl className={styles.objectDetails}>
      {object.details.slice(0, 4).map((detail) => (
        <div key={detail.label}>
          <dt>{detail.label}</dt>
          <dd>{detail.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ObjectSource({ source }: Pick<NeuralObject, 'source'>) {
  return <em className={styles.objectSource}>{source === 'live' ? 'LIVE' : source === 'mixed' ? 'MIXED' : 'DEMO'}</em>;
}

export function FloatingMetric({ object }: ObjectProps) {
  return (
    <div className={styles.floatingMetric}>
      <span>{object.eyebrow ?? 'INTELLIGENCE METRIC'}</span>
      <strong>{object.value ?? object.title}</strong>
      <p>{object.summary}</p>
      <ObjectSource source={object.source} />
    </div>
  );
}

export function InsightCluster({ object }: ObjectProps) {
  return (
    <div className={styles.insightCluster}>
      <span>{object.eyebrow ?? 'INSIGHT CLUSTER'}</span>
      <strong>{object.title}</strong>
      <p>{object.summary}</p>
      <DetailRows object={object} />
      <ObjectSource source={object.source} />
    </div>
  );
}

export function WatchlistObject({ object }: ObjectProps) {
  return (
    <div className={styles.watchlistObject}>
      <span>{object.eyebrow ?? 'WATCHLIST'}</span>
      <strong>{object.title}</strong>
      <b>{object.value}</b>
      <p>{object.summary}</p>
      <ObjectSource source={object.source} />
    </div>
  );
}

export function PerformanceObject({ object }: ObjectProps) {
  return (
    <div className={styles.performanceObject}>
      <span>{object.eyebrow ?? 'PERFORMANCE'}</span>
      <strong>{object.title}</strong>
      <b>{object.value}</b>
      <p>{object.summary}</p>
      <DetailRows object={object} />
      <ObjectSource source={object.source} />
    </div>
  );
}

export function TaskCompletionObject({ object }: ObjectProps) {
  return (
    <div className={styles.taskObject}>
      <span>{object.eyebrow ?? 'TASK COMPLETION'}</span>
      <strong>{object.title}</strong>
      <b>{object.value}</b>
      <p>{object.summary}</p>
      <DetailRows object={object} />
      <ObjectSource source={object.source} />
    </div>
  );
}

export function ApprovalObject({ object }: ObjectProps) {
  return (
    <div className={styles.approvalObject}>
      <span>{object.eyebrow ?? 'APPROVAL'}</span>
      <strong>{object.title}</strong>
      <p>{object.summary}</p>
      <b>{object.status === 'complete' ? 'Resolved locally' : 'Human decision required'}</b>
      <ObjectSource source={object.source} />
    </div>
  );
}

export function WarningObject({ object }: ObjectProps) {
  return (
    <div className={styles.warningObject}>
      <span>{object.eyebrow ?? 'ATTENTION'}</span>
      <strong>{object.title}</strong>
      <p>{object.summary}</p>
      <ObjectSource source={object.source} />
    </div>
  );
}

export function ResearchObject({ object }: ObjectProps) {
  return (
    <div className={styles.researchObject}>
      <span>{object.eyebrow ?? 'RESEARCH'}</span>
      <strong>{object.title}</strong>
      <b>{object.value}</b>
      <p>{object.summary}</p>
      <DetailRows object={object} />
      <ObjectSource source={object.source} />
    </div>
  );
}

export function NotificationPulse({ object }: ObjectProps) {
  return (
    <div className={styles.notificationPulse}>
      <i aria-hidden="true" />
      <div>
        <span>{object.eyebrow ?? 'SYSTEM PULSE'}</span>
        <strong>{object.title}</strong>
        <p>{object.summary}</p>
      </div>
      <ObjectSource source={object.source} />
    </div>
  );
}

export function IntelligenceStream({ object }: ObjectProps) {
  return (
    <div className={styles.intelligenceStream}>
      <span>{object.eyebrow ?? 'ARIMA RESPONSE'}</span>
      <strong>{object.title}</strong>
      <p>{object.summary}</p>
      <ObjectSource source={object.source} />
    </div>
  );
}

export function NeuralTooltip({ object }: ObjectProps) {
  return <span className={styles.neuralTooltip}>Press Enter for detail · {object.source} data</span>;
}

export function NeuralDataObject({
  object,
  index,
  onFocus,
  onDismiss,
}: {
  object: NeuralObject;
  index: number;
  onFocus: (object: NeuralObject) => void;
  onDismiss: (id: string) => void;
}) {
  const position = object.position ?? {
    x: 20 + (index % 3) * 30,
    y: 24 + (Math.floor(index / 3) % 3) * 25,
  };
  const style = {
    '--object-x': position.x + '%',
    '--object-y': position.y + '%',
    '--object-delay': Math.min(index * 80, 640) + 'ms',
  } as CSSProperties;
  const component = object.kind === 'watchlist' ? <WatchlistObject object={object} />
    : object.kind === 'performance' ? <PerformanceObject object={object} />
      : object.kind === 'task' ? <TaskCompletionObject object={object} />
        : object.kind === 'approval' ? <ApprovalObject object={object} />
          : object.kind === 'warning' ? <WarningObject object={object} />
            : object.kind === 'research' ? <ResearchObject object={object} />
              : object.kind === 'notification' || object.kind === 'system' ? <NotificationPulse object={object} />
                : object.kind === 'stream' ? <IntelligenceStream object={object} />
                  : object.kind === 'metric' ? <FloatingMetric object={object} />
                    : <InsightCluster object={object} />;
  return (
    <article
      className={styles.neuralObject + ' ' + styles['object' + object.kind] + ' ' + styles['object' + (object.status ?? 'active')] + (object.returning ? ' ' + styles.objectReturning : '')}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={object.title + '. Open details.'}
      onClick={() => !object.returning && onFocus(object)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onFocus(object);
        }
      }}
    >
      <span className={styles.objectEnergyField} aria-hidden="true"><i /><i /><i /></span>
      {component}
      <NeuralTooltip object={object} />
      {object.dismissible !== false && (
        <button
          type="button"
          className={styles.dismissObject}
          onClick={(event) => {
            event.stopPropagation();
            onDismiss(object.id);
          }}
          aria-label={'Dismiss ' + object.title}
        >
          ×
        </button>
      )}
    </article>
  );
}
