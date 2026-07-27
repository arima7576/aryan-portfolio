'use client';

import { motion } from 'framer-motion';

const disciplines = ['Research', 'Publications', 'Financial Models', 'Arima Finance Engine', 'Technology Projects', 'Experimental Systems', 'Open Source Projects', 'Future Research'];

export default function ResearchProjectsPage() {
  return <main className="research-world"><div className="research-grid" aria-hidden="true" /><div className="research-beam" aria-hidden="true" />
    <section className="research-stage"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}><p className="world-index">GATEWAY 03 / PUBLIC INSTITUTE</p><h1>Research &<br />Open Projects</h1><p className="world-copy">A living institute for financial intelligence, applied technology and open inquiry.</p></motion.div>
      <div className="research-axis">{disciplines.map((discipline, index) => <motion.div key={discipline} initial={{ opacity: 0, x: index % 2 ? 28 : -28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .32 + index * .08, duration: .7 }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{discipline}</strong><i /></motion.div>)}</div>
      <p className="research-note">The institute is being opened in deliberate stages. Published material appears when it is ready to stand on its own.</p>
    </section>
  </main>;
}
