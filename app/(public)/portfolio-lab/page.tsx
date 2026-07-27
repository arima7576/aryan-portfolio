import { PortfolioLabView } from '@/components/portfolio-lab/PortfolioLabView';
import { mockPortfolioDataProvider } from '@/data/portfolio-lab';

export default async function PortfolioLabPage() {
  return <PortfolioLabView snapshot={await mockPortfolioDataProvider.getSnapshot()} />;
}
