'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProbabilityBar } from './ProbabilityBar';

interface MarketCardProps {
  id: string;
  title: string;
  question: string;
  yesPercent: number;
  noPercent: number;
  volume: number;
  daysLeft: number;
  index: number;
}

export function MarketCard({
  id,
  title,
  question,
  yesPercent,
  noPercent,
  volume,
  daysLeft,
  index,
}: MarketCardProps) {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.4 } },
    hover: { y: -2 },
  };

  const formatVolume = (vol: number) => {
    if (vol >= 1_000_000) return `$${(vol / 1_000_000).toFixed(1)}M`;
    if (vol >= 1_000) return `$${(vol / 1_000).toFixed(1)}K`;
    return `$${vol}`;
  };

  return (
    <Link href={`/market/${id}`}>
      <motion.article
        className="group border border-border-subtle rounded-sm p-5 hover:border-border transition-colors bg-surface-secondary hover:bg-surface-tertiary cursor-pointer"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {/* Category tag */}
        <div className="mb-3">
          <span className="text-xs font-medium text-text-dimmed uppercase tracking-wider">
            {title}
          </span>
        </div>

        {/* Question (headline) */}
        <h3 className="text-xl font-bold text-foreground mb-4 leading-tight group-hover:text-accent-green transition-colors">
          {question}
        </h3>

        {/* Probability bar */}
        <div className="mb-4">
          <ProbabilityBar yesPercent={yesPercent} noPercent={noPercent} animated={false} size="md" />
        </div>

        {/* Metadata footer */}
        <div className="flex items-center justify-between text-xs text-text-muted pt-3 border-t border-border-subtle">
          <div className="flex gap-4">
            <span>Volume: {formatVolume(volume)}</span>
            <span>{daysLeft}d left</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
