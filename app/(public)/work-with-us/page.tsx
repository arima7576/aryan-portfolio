'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const paths = [
  { id: 'volunteer', title: 'Volunteer', detail: 'Contribute specialised time to a growing intelligence institution.', status: 'Open conversation' },
  { id: 'internship', title: 'Internship', detail: 'A future-facing path for exceptional students and emerging practitioners.', status: 'Applications prepare here' },
  { id: 'jobs', title: 'Job Opportunities', detail: 'Permanent roles will appear as the institution expands.', status: 'Opening soon' },
] as const;

export default function WorkWithUsPage() {
  const [active, setActive] = useState<(typeof paths)[number]['id'] | null>(null);
  const selection = paths.find((path) => path.id === active);
  return <main className="people-world"><div className="people-light" aria-hidden="true" /><div className="people-columns" aria-hidden="true"><i /><i /><i /><i /></div>
    <section className="people-stage"><p className="world-index">GATEWAY 01 / HUMAN POTENTIAL</p><h1>Work with<br />Arima.</h1><p className="world-copy">Build patient, intelligent financial systems with a team that values craft.</p>
      <div className="pathway-field">{paths.map((path, index) => <button key={path.id} onClick={() => setActive(path.id)} className={`pathway ${active === path.id ? 'is-active' : ''}`}><span>0{index + 1}</span><strong>{path.title}</strong><i>{path.status}</i></button>)}</div>
      <AnimatePresence>{selection && <motion.div className="people-detail" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}><span>{selection.status}</span><p>{selection.detail}</p>{selection.id === 'internship' && <small>CV and portfolio submission capability will open with applications.</small>}{selection.id === 'jobs' && <small>Opening soon.</small>}</motion.div>}</AnimatePresence>
    </section>
  </main>;
}
