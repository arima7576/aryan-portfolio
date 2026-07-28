export type IntelligencePresentation = 'daily' | 'weekly';

export type IntelligencePresentationPolicy = (localTime: Date) => IntelligencePresentation;

export const defaultIntelligencePresentationPolicy: IntelligencePresentationPolicy = (
  localTime,
) => (
  localTime.getDay() === 5 && localTime.getHours() >= 13
    ? 'weekly'
    : 'daily'
);
