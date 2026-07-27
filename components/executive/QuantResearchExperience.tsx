import Link from 'next/link';
import { VoiceDock } from './VoiceDock';

const research = [
  ['Market regime', 'Selective risk-on', 'Cross-asset breadth improving; volatility remains event-sensitive.'],
  ['Model status', 'Validated / mock', 'Deterministic presentation data for the MVP research surface.'],
  ['Latest run', '26 Jul · 07:30', 'Global macro, liquidity and systematic signals completed.'],
  ['Confidence', '74%', 'Moderate conviction; wait for confirmation across rates and dollar factors.'],
];

export function QuantResearchExperience() {
  return (
    <main className="quant-world">
      <header className="module-header">
        <Link href="/executive"><b>AF</b><span>EXECUTIVE OS</span></Link>
        <div><strong>MOCK RESEARCH DATA</strong><span>QUANT RESEARCH / 01</span></div>
      </header>
      <section className="quant-hero">
        <span>ARIMA QUANTITATIVE INTELLIGENCE</span>
        <h1>Research beneath<br />the visible market.</h1>
        <p>Regime detection, model evidence and risk context—prepared for executive review.</p>
      </section>
      <section className="quant-signal-grid">
        {research.map(([label, value, detail]) => <article key={label}><span>{label}</span><strong>{value}</strong><p>{detail}</p><i /></article>)}
      </section>
      <section className="quant-detail-grid">
        <article><span>FEATURE GROUPS</span><div className="feature-cloud">{['Macro', 'Liquidity', 'Momentum', 'Volatility', 'Breadth', 'Flows'].map((item) => <i key={item}>{item}</i>)}</div></article>
        <article><span>RESEARCH ARCHIVE</span><ol><li>Digital asset liquidity regime</li><li>Gold / real-yield dislocation</li><li>Equity breadth transition</li></ol></article>
        <article className="quant-warning"><span>RISK WARNINGS</span><p>Mock output is not investment advice. Model confidence is illustrative and must not be used for live capital decisions.</p></article>
      </section>
      <nav className="module-dock"><Link href="/executive">Executive</Link><Link href="/portfolio-lab">Portfolio</Link><Link className="active" href="/quant-research">Quant Research</Link><Link href="/growth-studio">Growth</Link></nav>
      <VoiceDock context="quant" />
    </main>
  );
}
