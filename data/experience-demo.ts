import type {
  ActiveChamber,
  NeuralDataObject,
} from '@/types/experience';

const demo = <T extends Omit<NeuralDataObject, 'source'>>(object: T): NeuralDataObject => ({
  ...object,
  source: 'demo',
});

export const chamberLabels: Record<ActiveChamber, string> = {
  executive: 'Executive Intelligence',
  portfolio: 'Portfolio Intelligence',
  quant: 'Quant Research',
  growth: 'Growth Studio',
  projects: 'Projects',
  publications: 'Intelligence Publications',
  approvals: 'Approvals',
  health: 'System Health',
};

export const chamberDescriptions: Record<ActiveChamber, string> = {
  executive: 'Priorities, decisions and the connected operating picture.',
  portfolio: 'Capital, risk, allocation and performance in one intelligence field.',
  quant: 'Regimes, models, feature groups and research evidence.',
  growth: 'Ideas, campaigns, drafts and protected approval paths.',
  projects: 'Dependencies, execution loops and work ready for review.',
  publications: 'Research, archives and intelligence streams.',
  approvals: 'Human decisions at protected operational boundaries.',
  health: 'The calm pulse of Arima’s connected platform systems.',
};

export const dailyIntelligenceObjects: NeuralDataObject[] = [
  demo({
    id: 'daily-priorities',
    kind: 'insight',
    chamber: 'executive',
    eyebrow: 'TODAY / PRIORITIES',
    title: 'Three decisions are ready',
    summary: 'Allocation drift, an investor narrative and a project risk review need attention.',
    details: [
      { label: 'Allocation drift', value: 'Review' },
      { label: 'Investor narrative', value: 'Approval' },
      { label: 'Project risk', value: 'Today' },
    ],
    position: { x: 18, y: 28 },
  }),
  demo({
    id: 'daily-research',
    kind: 'research',
    chamber: 'executive',
    eyebrow: 'SCHEDULED RESEARCH',
    title: 'Cross-asset regime refresh',
    value: '07:30',
    summary: 'Macro, liquidity and systematic feature sets are queued for the next deterministic demonstration run.',
    position: { x: 76, y: 24 },
  }),
  demo({
    id: 'daily-growth',
    kind: 'metric',
    chamber: 'executive',
    eyebrow: 'GROWTH READY',
    title: 'Private output prepared',
    value: '7',
    summary: 'Three LinkedIn drafts, two campaigns and two investor notes remain private and unpublished.',
    position: { x: 79, y: 67 },
  }),
  demo({
    id: 'daily-health',
    kind: 'system',
    chamber: 'executive',
    eyebrow: 'SYSTEM HEALTH',
    title: 'Core systems stable',
    value: '99.8%',
    summary: 'Voice gateway, orchestration contracts and mock providers are available in demonstration mode.',
    position: { x: 16, y: 70 },
  }),
];

export const watchlistObjects: NeuralDataObject[] = [
  ['NVDA', '84%', 'Strong', 'Medium', 'AI demand / earnings', 'Below 170.00'],
  ['XAUUSD', '78%', 'Constructive', 'Medium', 'Real-yield sensitivity', 'Below 2,290'],
  ['MSFT', '76%', 'Steady', 'Low', 'Cloud and AI spend', 'Below 390.00'],
  ['ASML', '72%', 'Recovering', 'Medium', 'Semiconductor orders', 'Below 760.00'],
  ['GBPUSD', '68%', 'Neutral', 'Medium', 'Rates divergence', 'Above 1.3100'],
].map(([ticker, confidence, momentum, risk, catalyst, invalidation], index) => demo({
  id: 'watchlist-' + ticker,
  kind: 'watchlist',
  chamber: 'portfolio',
  eyebrow: 'DEMO WATCHLIST',
  title: ticker,
  value: confidence,
  summary: momentum + ' momentum · ' + risk + ' risk',
  details: [
    { label: 'Momentum', value: momentum },
    { label: 'Risk', value: risk },
    { label: 'Catalyst', value: catalyst },
    { label: 'Invalidation', value: invalidation },
  ],
  position: {
    x: [15, 32, 50, 68, 84][index],
    y: [34, 70, 22, 67, 39][index],
  },
}));

export const weeklyPerformanceObject = demo({
  id: 'weekly-performance',
  kind: 'performance',
  chamber: 'portfolio' as const,
  eyebrow: 'WEEKLY PERFORMANCE COMPLETE / DEMO',
  title: 'Net profit',
  value: '£8,420',
  summary: 'A simulated weekly portfolio presentation. It is not a live market result.',
  details: [
    { label: 'Weekly return', value: '+1.2%' },
    { label: 'Win rate', value: '63%' },
    { label: 'Best trade', value: 'XAUUSD +4.2R' },
    { label: 'Drawdown', value: '-2.1%' },
  ],
  position: { x: 50, y: 48 },
});

export const portfolioObjects: NeuralDataObject[] = [
  demo({
    id: 'portfolio-value',
    kind: 'metric',
    chamber: 'portfolio',
    eyebrow: 'TOTAL PORTFOLIO VALUE / DEMO',
    title: 'Arima Global Portfolio',
    value: '£125,000',
    summary: 'Simulated valuation from the existing Portfolio Lab demonstration snapshot.',
    details: [
      { label: 'Monthly return', value: '+3.1%' },
      { label: 'Cash exposure', value: '12.0%' },
    ],
    position: { x: 18, y: 26 },
  }),
  demo({
    id: 'portfolio-risk',
    kind: 'insight',
    chamber: 'portfolio',
    eyebrow: 'RISK FIELD / DEMO',
    title: 'Balanced growth posture',
    value: '68 / 100',
    summary: 'Technology concentration is elevated while liquidity coverage remains strong.',
    details: [
      { label: 'Drawdown', value: '-9.2%' },
      { label: 'Risk level', value: 'Moderate' },
      { label: 'Allocation', value: '63.4% equity' },
    ],
    position: { x: 80, y: 24 },
  }),
  demo({
    id: 'portfolio-holdings',
    kind: 'insight',
    chamber: 'portfolio',
    eyebrow: 'ACTIVE HOLDINGS / DEMO',
    title: 'NVDA leads, ASML lags',
    summary: 'Seven simulated holdings and nine recorded demonstration trades are connected to the portfolio pathway.',
    details: [
      { label: 'Best performer', value: 'NVDA +46.2%' },
      { label: 'Weakest today', value: 'ASML -0.3%' },
      { label: 'Trade activity', value: '9 simulated items' },
    ],
    position: { x: 19, y: 78 },
  }),
];

export const quantObjects: NeuralDataObject[] = [
  demo({
    id: 'quant-regime',
    kind: 'research',
    chamber: 'quant',
    eyebrow: 'CURRENT MARKET REGIME / DEMO',
    title: 'Selective risk-on',
    value: '74%',
    summary: 'Breadth is constructive while volatility remains event-sensitive.',
    details: [
      { label: 'Confidence', value: '74%' },
      { label: 'Model status', value: 'Validated mock' },
      { label: 'Drift', value: 'Within boundary' },
    ],
    position: { x: 50, y: 38 },
  }),
  demo({
    id: 'quant-features',
    kind: 'insight',
    chamber: 'quant',
    eyebrow: 'ACTIVE FEATURE GROUPS',
    title: 'Six connected inputs',
    summary: 'Macro, liquidity, momentum, volatility, breadth and flows.',
    position: { x: 18, y: 68 },
  }),
  demo({
    id: 'quant-validation',
    kind: 'metric',
    chamber: 'quant',
    eyebrow: 'MODEL VALIDATION / DEMO',
    title: 'Latest research run',
    value: '07:30',
    summary: 'Validation is complete, no model drift threshold has been crossed and the next run is scheduled.',
    details: [
      { label: 'Validation', value: 'Pass' },
      { label: 'Model drift', value: 'Contained' },
      { label: 'Next run', value: 'Tomorrow 07:30' },
    ],
    position: { x: 81, y: 25 },
  }),
  demo({
    id: 'quant-publication',
    kind: 'research',
    chamber: 'quant',
    eyebrow: 'LATEST PUBLICATION / DEMO',
    title: 'Liquidity regime note',
    summary: 'The research archive stream remains available for executive drill-down.',
    position: { x: 48, y: 76 },
  }),
  demo({
    id: 'quant-warning',
    kind: 'warning',
    chamber: 'quant',
    eyebrow: 'RESEARCH WARNING',
    title: 'Event risk remains elevated',
    summary: 'Demonstration confidence is illustrative and must not guide live capital decisions.',
    status: 'warning',
    position: { x: 80, y: 67 },
  }),
];

export const growthObjects: NeuralDataObject[] = [
  demo({
    id: 'growth-complete',
    kind: 'task',
    chamber: 'growth',
    eyebrow: 'GROWTH TASK COMPLETE / DEMO',
    title: 'Private output assembled',
    value: '6',
    summary: 'No content has been published, sent or shared externally.',
    details: [
      { label: 'LinkedIn drafts', value: '3' },
      { label: 'Investor emails', value: '2' },
      { label: 'Campaign concepts', value: '1' },
    ],
    position: { x: 50, y: 40 },
  }),
  demo({
    id: 'growth-approval',
    kind: 'approval',
    chamber: 'growth',
    eyebrow: 'REVIEW REQUIRED',
    title: 'Investor narrative draft',
    summary: 'Approval is needed before this private draft can enter any future execution path.',
    status: 'pending',
    requiresAttention: true,
    actionLabel: 'Review draft',
    position: { x: 24, y: 68 },
  }),
  demo({
    id: 'growth-stream',
    kind: 'stream',
    chamber: 'growth',
    eyebrow: 'CONTENT STREAM',
    title: 'Campaign ideas are forming',
    summary: 'Identity, investor education and research evidence form the active concept cluster.',
    position: { x: 78, y: 66 },
  }),
  demo({
    id: 'growth-campaign-cluster',
    kind: 'insight',
    chamber: 'growth',
    eyebrow: 'PRIVATE OUTPUT CLUSTER / DEMO',
    title: 'Drafts remain in review',
    summary: 'Nothing is published, emailed or posted from this environment.',
    details: [
      { label: 'LinkedIn', value: '3 drafts' },
      { label: 'X / newsletter', value: '2 drafts' },
      { label: 'Investor outreach', value: '2 drafts' },
      { label: 'Website recommendations', value: '1 concept' },
    ],
    position: { x: 50, y: 78 },
  }),
];

export const projectObjects: NeuralDataObject[] = [
  demo({
    id: 'project-completion',
    kind: 'task',
    chamber: 'projects',
    eyebrow: 'TASK COMPLETED / DEMO',
    title: 'Portfolio Risk Report',
    value: 'Ready',
    summary: 'A completed signal returned through the project dependency network.',
    details: [
      { label: 'Owner', value: 'Arima Quant Agent' },
      { label: 'Duration', value: '42 seconds' },
      { label: 'Status', value: 'Ready for review' },
    ],
    position: { x: 50, y: 42 },
  }),
  demo({
    id: 'project-blocked',
    kind: 'warning',
    chamber: 'projects',
    eyebrow: 'DEPENDENCY CHECK',
    title: 'Research review junction',
    summary: 'One downstream workstream remains pending a protected decision.',
    status: 'warning',
    position: { x: 20, y: 70 },
  }),
];

export const publicationObjects: NeuralDataObject[] = [
  demo({
    id: 'publication-latest',
    kind: 'research',
    chamber: 'publications',
    eyebrow: 'LATEST RESEARCH PUBLICATION',
    title: 'Liquidity regime note',
    value: 'New',
    summary: 'A deterministic archive preview for the intelligence publication stream.',
    position: { x: 50, y: 42 },
  }),
];

export const approvalObjects: NeuralDataObject[] = [
  demo({
    id: 'approval-investor',
    kind: 'approval',
    chamber: 'approvals',
    eyebrow: 'PENDING APPROVAL / DEMO',
    title: 'Investor update draft',
    summary: 'Human approval is required before any future external delivery.',
    status: 'pending',
    requiresAttention: true,
    actionLabel: 'Review approval',
    position: { x: 34, y: 42 },
  }),
  demo({
    id: 'approval-rebalance',
    kind: 'approval',
    chamber: 'approvals',
    eyebrow: 'PENDING APPROVAL / DEMO',
    title: 'Portfolio rebalance note',
    summary: 'This is a simulated approval object; it cannot execute a trade.',
    status: 'pending',
    requiresAttention: true,
    actionLabel: 'Review approval',
    position: { x: 68, y: 62 },
  }),
];

export const healthObjects: NeuralDataObject[] = [
  demo({
    id: 'health-platform',
    kind: 'system',
    chamber: 'health',
    eyebrow: 'PLATFORM HEALTH / DEMO',
    title: 'All critical systems available',
    value: '99.8%',
    summary: 'No live operations are being performed in this demonstration environment.',
    position: { x: 50, y: 42 },
  }),
  demo({
    id: 'health-background',
    kind: 'notification',
    chamber: 'health',
    eyebrow: 'BACKGROUND INTELLIGENCE',
    title: 'Research refresh completed',
    summary: 'A simulated background completion pulse arrived from Quant Research.',
    status: 'complete',
    position: { x: 23, y: 70 },
  }),
];

export const objectsForChamber = (chamber: ActiveChamber): NeuralDataObject[] => {
  switch (chamber) {
    case 'portfolio':
      return [weeklyPerformanceObject, ...portfolioObjects, ...watchlistObjects];
    case 'quant':
      return quantObjects;
    case 'growth':
      return growthObjects;
    case 'projects':
      return projectObjects;
    case 'publications':
      return publicationObjects;
    case 'approvals':
      return approvalObjects;
    case 'health':
      return healthObjects;
    default:
      return dailyIntelligenceObjects;
  }
};
