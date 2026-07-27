import { notFound } from 'next/navigation';
import { PortfolioLabView } from '@/components/portfolio-lab/PortfolioLabView';
import { mockPortfolioDataProvider } from '@/data/portfolio-lab';

export function generateStaticParams() { return ['performance','holdings','transactions','risk','allocation','cash-flow','ai-analyst','reports','settings'].map((section) => ({ section })); }
export default async function PortfolioLabSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const validSections = ['overview','performance','holdings','transactions','risk','allocation','cash-flow','ai-analyst','reports','settings'] as const;
  if (!validSections.includes(section as (typeof validSections)[number])) notFound();
  return <PortfolioLabView section={section as (typeof validSections)[number]} snapshot={await mockPortfolioDataProvider.getSnapshot()} />;
}
