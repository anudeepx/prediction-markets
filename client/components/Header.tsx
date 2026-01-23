'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      className="border-b border-border-subtle sticky top-0 z-50 bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition">
          <div className="w-6 h-6 rounded-sm bg-accent-green flex items-center justify-center">
            <span className="text-xs font-bold text-background">π</span>
          </div>
          <span className="font-bold text-sm">Markets</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#" className="text-text-muted hover:text-foreground transition">
            Markets
          </a>
          <a href="#" className="text-text-muted hover:text-foreground transition">
            Create
          </a>
          <a href="#" className="text-text-muted hover:text-foreground transition">
            Portfolio
          </a>
        </nav>

        {/* CTA */}
        <button className="hidden sm:block bg-accent-green text-background px-4 py-1.5 rounded-sm font-medium text-sm hover:opacity-90 transition">
          Connect
        </button>
      </div>
    </motion.header>
  );
}
