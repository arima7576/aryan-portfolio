// ─── Arima Universe — Footer Component ───

import Link from 'next/link';
import { FOOTER_LINKS } from '@/config';

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold tracking-tight text-white">
              ARIMA<span className="text-amber-400">◈</span>
            </span>
            <p className="mt-2 text-sm text-white/40 max-w-xs">
              Quantitative intelligence, algorithmic engineering, and portfolio science.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">Explore</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Arima Finance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}