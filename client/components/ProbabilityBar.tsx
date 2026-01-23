'use client';

import { motion } from 'framer-motion';

interface ProbabilityBarProps {
  yesPercent: number;
  noPercent: number;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProbabilityBar({
  yesPercent,
  noPercent,
  animated = true,
  size = 'md',
}: ProbabilityBarProps) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
  };

  const barVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: (custom: number) => ({
      scaleX: custom / 100,
      opacity: 1,
      transition: { duration: 0.6, delay: custom === yesPercent ? 0 : 0.2, ease: 'easeOut' },
    }),
  };

  return (
    <motion.div
      className="w-full"
      initial={animated ? 'initial' : 'animate'}
      animate="animate"
      variants={containerVariants}
    >
      <div className={`flex gap-0 overflow-hidden rounded-sm ${sizeClasses[size]} bg-surface-secondary`}>
        <motion.div
          className="bg-accent-green"
          custom={yesPercent}
          variants={barVariants}
          initial={animated ? 'initial' : 'animate'}
          animate="animate"
          style={{ originX: 0 }}
        />
        <motion.div
          className="flex-1 bg-accent-red"
          custom={noPercent}
          variants={barVariants}
          initial={animated ? 'initial' : 'animate'}
          animate="animate"
          style={{ originX: 1 }}
        />
      </div>

      <div className="flex justify-between text-xs mt-1.5">
        <span className="text-accent-green font-medium">{yesPercent}% Yes</span>
        <span className="text-accent-red font-medium">{noPercent}% No</span>
      </div>
    </motion.div>
  );
}
