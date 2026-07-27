'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type LabNavigationSection = readonly [string, string];

export function PortfolioLabNavigation({ sections }: { sections: readonly LabNavigationSection[] }) {
  const pathname = usePathname();
  return <nav>{sections.map(([id, label], index) => {
    const href = id === 'overview' ? '/portfolio-lab' : `/portfolio-lab/${id}`;
    const active = pathname === href;
    return <Link className={active ? 'active' : ''} href={href} key={id}><i>{String(index + 1).padStart(2, '0')}</i>{label}</Link>;
  })}</nav>;
}
