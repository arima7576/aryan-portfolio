'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type Phase = 'threshold' | 'authentication';

export default function ClientPortfolioPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('threshold');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const authenticate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password) return setError(true);
    setError(false); router.push('/login');
  };
  return <main className="private-world">
    <div className="private-tunnel" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
    <div className="private-data" aria-hidden="true">{['MARKET INTELLIGENCE', 'SECURE TRANSMISSION', 'RISK ARCHITECTURE', 'CLIENT VAULT', 'AF / PRIVATE'].map((value) => <span key={value}>{value}</span>)}</div>
    <AnimatePresence mode="wait">
      {phase === 'threshold' && <motion.section key="threshold" className="private-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: 1.35, opacity: 0 }} transition={{ duration: 1.1 }}>
        <p className="world-index">GATEWAY 02 / PRIVATE ACCESS</p><h1>Client Portfolio<br />World</h1><p className="world-copy">A controlled environment for private financial intelligence.</p>
        <button className="world-command" onClick={() => setPhase('authentication')}><span>Proceed through the secure tunnel</span><i>↗</i></button>
      </motion.section>}
      {phase === 'authentication' && <motion.section key="authentication" className="private-stage" initial={{ opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: .92 }} transition={{ duration: .8 }}>
        <form className="security-gate" onSubmit={authenticate}><p className="world-index">ARIMA PRIVATE / AUTHENTICATION</p><div className="security-seal">AF</div><h2>Secure identity gate.</h2><p>Access is reserved for authorised client workspaces.</p><label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>{error && <small className="security-error">Credentials are required to continue.</small>}<button className="world-command" type="submit"><span>Authenticate</span><i>↗</i></button></form>
      </motion.section>}
    </AnimatePresence>
  </main>;
}
