'use client';

export default function PortfolioLabError({ reset }: { error: Error; reset: () => void }) {
  return <main className="portfolio-lab lab-error-page"><section><p className="lab-eyebrow">Portfolio workspace unavailable</p><h1>We could not prepare this portfolio snapshot.</h1><p>The data provider did not return a usable response. No portfolio activity has been changed.</p><button onClick={reset}>Retry workspace</button></section></main>;
}
