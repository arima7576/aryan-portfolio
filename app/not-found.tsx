import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-black px-6 text-center text-white"><div><p className="eyebrow">404 / Arima Finance</p><h1 className="mt-5 text-5xl font-semibold">Signal not found.</h1><Link className="mt-8 inline-flex rounded-full border border-white/20 px-5 py-3" href="/">Return to the experience</Link></div></main>;
}
