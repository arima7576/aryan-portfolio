export function EmptyPortfolioState({ title, detail }: { title: string; detail: string }) {
  return <section className="lab-data-state"><span>Awaiting data</span><h2>{title}</h2><p>{detail}</p></section>;
}

export function UnavailablePortfolioState({ title, detail }: { title: string; detail: string }) {
  return <section className="lab-data-state lab-data-unavailable"><span>Unavailable</span><h2>{title}</h2><p>{detail}</p></section>;
}
