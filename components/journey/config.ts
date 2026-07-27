export const JOURNEY_TIMING = { partDuration: 100, desktopDistance: 32000, mobileDistance: 22000 } as const;
export const JOURNEY_EASE = { enter: 'power3.out', exit: 'power2.inOut', drift: 'sine.inOut' } as const;
export const INSTITUTIONS = ['HSBC', 'Barclays', 'JPMorgan', 'Goldman Sachs', 'BlackRock', 'Bloomberg'] as const;
export const DIVISIONS = [
  { index: '01', title: 'Investment Banking & Financial Intelligence', lead: 'Research, valuation and decision intelligence', items: ['Valuation', 'Investment research', 'Scenario analysis'] },
  { index: '02', title: 'Projects & Technology', lead: 'Arima Finance Engine', items: ['Market systems', 'Risk architecture', 'Financial technology'] },
  { index: '03', title: 'AF Portfolio Lab', lead: 'Founder-funded research environment', items: ['Allocation', 'Performance', 'Risk intelligence'] },
] as const;
