// ─── Arima Universe — Navigation Configuration ───

import type { NavLink, PageMeta } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Mind Map', href: '/mind-map' },
  { label: 'Watch Intro', href: '/watch-intro' },
  { label: 'Enter', href: '/choose-door' },
  { label: 'Executive OS', href: '/executive' },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Work With Us', href: '/work-with-us' },
  { label: 'Client Portfolio', href: '/client-portfolio' },
  { label: 'Research & Projects', href: '/research-projects' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export const PAGE_METAS: PageMeta[] = [
  { title: 'Arima Universe', description: 'Welcome to the Arima Universe', path: '/' },
  { title: 'Cinematic Introduction', description: 'Experience the Arima story', path: '/intro' },
  { title: 'Mind Map', description: 'Explore the Arima universe', path: '/mind-map' },
  { title: 'Watch Introduction', description: 'Full cinematic experience', path: '/watch-intro' },
  { title: 'Choose Your Door', description: 'Select your path', path: '/choose-door' },
  { title: 'Work With Us', description: 'Join the Arima mission', path: '/work-with-us' },
  { title: 'Client Portfolio', description: 'Secure portfolio access', path: '/client-portfolio', isProtected: true },
  { title: 'Research & Projects', description: 'Intelligence & technology', path: '/research-projects' },
  { title: 'Login', description: 'Sign in to your account', path: '/login' },
  { title: 'Register', description: 'Create your account', path: '/register' },
  { title: 'Forgot Password', description: 'Reset your password', path: '/forgot-password' },
  { title: 'Verify Email', description: 'Verify your email address', path: '/verify-email' },
  { title: 'Dashboard', description: 'Your Arima OS dashboard', path: '/dashboard', isProtected: true },
];
