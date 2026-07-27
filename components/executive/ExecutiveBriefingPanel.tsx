'use client';

import type { VoicePanelAction } from '@/types/voice';

const briefing = {
  priorities: ['Review allocation drift', 'Approve investor narrative', 'Close project risk review'],
  portfolio: ['£2.41m research portfolio', '+0.42% today', 'Risk posture: balanced'],
  projects: ['Agent Platform / active', 'Quant research / scheduled', 'Growth Studio / 7 drafts'],
  approvals: ['Investor update draft', 'Portfolio rebalance note'],
  notifications: ['2 approvals pending', '1 research run completed'],
  growth: ['3 LinkedIn drafts', '2 campaign concepts', '1 newsletter outline'],
  health: ['Core platform operational', 'Voice gateway ready', 'Mock providers active'],
};

type Props = {
  action: VoicePanelAction | null;
  onClose: () => void;
};

export function ExecutiveBriefingPanel({ action, onClose }: Props) {
  if (!action) return null;
  return (
    <aside className="executive-panel" aria-label="Executive briefing" aria-live="polite">
      <header>
        <div>
          <span>EXECUTIVE BRIEFING</span>
          <strong>{action.focus === 'approvals' ? 'Pending approvals' : 'Today at a glance'}</strong>
        </div>
        <button type="button" onClick={onClose} aria-label="Close briefing panel">Close</button>
      </header>
      <div className="executive-panel-grid">
        {Object.entries(briefing).map(([section, items]) => (
          <section id={`briefing-${section}`} className={action.focus === section ? 'is-focused' : ''} key={section}>
            <span>{section}</span>
            {items.map((item) => <p key={item}>{item}</p>)}
          </section>
        ))}
      </div>
      <footer>DEMO DATA · Connect the live API for private operational data.</footer>
    </aside>
  );
}
