'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, BookOpen, Compass, ExternalLink, HelpCircle, Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check initial dark mode from localStorage or system preference
    const savedTheme = localStorage.getItem('vicpoints-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vicpoints-theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vicpoints-theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { href: '/calculator', label: 'Calculator', icon: Calculator },
    { href: '/how-it-works', label: 'How It Works', icon: BookOpen },
    { href: '/occupation-guide', label: 'Occupations', icon: Compass },
    { href: '/resources', label: 'Official Resources', icon: ExternalLink },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-navy-950/90 backdrop-blur-md border-b border-navy-100 dark:border-navy-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-navy-900 dark:text-white font-bold text-xl tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-lg p-1"
            >
              <span className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm shadow-brand-500/20">
                V
              </span>
              <span>
                Vic<span className="text-brand-600 dark:text-brand-400">Points</span>
              </span>
            </Link>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              VPT 2024–25
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-navy-100 dark:bg-navy-800 text-brand-700 dark:text-brand-300 font-semibold'
                      : 'text-navy-700 dark:text-navy-300 hover:text-navy-950 dark:hover:text-white hover:bg-navy-50 dark:hover:bg-navy-900'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle & Primary Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-navy-700" />}
            </button>

            <Link
              href="/calculator"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white shadow-sm hover:shadow transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-600"
            >
              Calculate Score
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-navy-700 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-950 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-semibold'
                    : 'text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-base font-medium bg-brand-600 text-white shadow-sm"
            >
              Calculate My Score
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
