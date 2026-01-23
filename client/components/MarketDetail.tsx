'use client';

import { motion } from 'framer-motion';
import { ProbabilityBar } from './ProbabilityBar';
import { useState } from 'react';

interface PriceHistoryPoint {
  timestamp: number;
  yes: number;
  no: number;
}

interface MarketDetailProps {
  id: string;
  title: string;
  question: string;
  yesPercent: number;
  noPercent: number;
  volume: number;
  daysLeft: number;
  description: string;
  oracle: string;
  rules: string;
}

// Mock price history
const MOCK_HISTORY: PriceHistoryPoint[] = Array.from({ length: 30 }, (_, i) => {
  const baseYes = 65;
  const variance = Math.sin(i / 5) * 15;
  const noise = (Math.random() - 0.5) * 8;
  return {
    timestamp: i,
    yes: Math.max(20, Math.min(85, baseYes + variance + noise)),
    no: 0,
  };
});

export function MarketDetail(props: MarketDetailProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'buy'>('chart');
  const [amount, setAmount] = useState('100');
  const [side, setSide] = useState<'yes' | 'no'>('yes');

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Find min/max for chart scaling
  const minY = Math.min(...MOCK_HISTORY.map((p) => p.yes), 20);
  const maxY = Math.max(...MOCK_HISTORY.map((p) => p.yes), 80);
  const range = maxY - minY || 1;

  // Create SVG path
  const width = 100;
  const height = 120;
  const padding = 10;
  const pointSpacing = (width - padding * 2) / (MOCK_HISTORY.length - 1);

  const pathPoints = MOCK_HISTORY.map((point, i) => {
    const x = padding + i * pointSpacing;
    const normalizedY = (point.yes - minY) / range;
    const y = height - padding - normalizedY * (height - padding * 2);
    return `${x},${y}`;
  }).join(' L ');

  return (
    <motion.div
      className="relative z-10"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <motion.div className="mb-10 border-b border-border-subtle pb-8" variants={contentVariants}>
        <div className="mb-4">
          <span className="text-xs font-medium text-text-dimmed uppercase tracking-wider">
            {props.title}
          </span>
        </div>
        <h1 className="text-5xl font-bold mb-6 leading-tight text-foreground">
          {props.question}
        </h1>

        {/* Key metrics */}
        <div className="flex gap-8">
          <div>
            <p className="text-text-muted text-sm mb-2">Current Probability</p>
            <p className="text-3xl font-bold text-accent-green">{props.yesPercent}%</p>
          </div>
          <div>
            <p className="text-text-muted text-sm mb-2">24h Volume</p>
            <p className="text-lg font-semibold">${(props.volume / 1_000_000).toFixed(2)}M</p>
          </div>
          <div>
            <p className="text-text-muted text-sm mb-2">Resolves in</p>
            <p className="text-lg font-semibold">{props.daysLeft} days</p>
          </div>
        </div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Chart & Info */}
        <motion.div className="lg:col-span-2 space-y-8" variants={contentVariants}>
          {/* Probability Bar */}
          <div className="bg-surface-secondary rounded-sm p-5">
            <p className="text-sm text-text-muted mb-4">Market Probability</p>
            <ProbabilityBar yesPercent={props.yesPercent} noPercent={props.noPercent} size="lg" />
          </div>

          {/* Chart Placeholder */}
          <div className="bg-surface-secondary rounded-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-text-muted">Probability History (30d)</p>
              <div className="flex gap-2 text-xs">
                <button className="text-text-muted hover:text-foreground transition">1D</button>
                <button className="text-text-muted hover:text-foreground transition">1W</button>
                <button className="text-accent-green font-medium">1M</button>
              </div>
            </div>

            <svg className="w-full h-32" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--border-subtle)" strokeWidth="0.5" />
              <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="var(--border-subtle)" strokeWidth="0.5" />

              {/* Price line */}
              <polyline
                points={pathPoints}
                fill="none"
                stroke="var(--accent-green)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />

              {/* Area under curve */}
              <polygon
                points={`${padding},${height - padding} L ${pathPoints} L ${width - padding},${height - padding}`}
                fill="var(--accent-green)"
                opacity="0.08"
              />
            </svg>

            <div className="flex justify-between text-xs text-text-muted mt-2">
              <span>30d ago</span>
              <span>Today</span>
            </div>
          </div>

          {/* Context */}
          <div className="space-y-4 text-sm">
            <div className="bg-surface-secondary rounded-sm p-5">
              <h4 className="font-bold mb-3">Oracle</h4>
              <p className="text-text-muted">{props.oracle}</p>
            </div>

            <div className="bg-surface-secondary rounded-sm p-5">
              <h4 className="font-bold mb-3">Resolution Rules</h4>
              <p className="text-text-muted leading-relaxed">{props.rules}</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Buy Panel */}
        <motion.div variants={contentVariants}>
          <div className="sticky top-6 bg-surface-secondary rounded-sm p-6 border border-border-subtle">
            <h3 className="font-bold mb-6 text-lg">Place Order</h3>

            {/* Side selector */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSide('yes')}
                className={`flex-1 py-2 rounded-sm font-medium transition text-sm ${
                  side === 'yes'
                    ? 'bg-accent-green text-background'
                    : 'bg-surface-tertiary text-foreground hover:bg-border-subtle'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setSide('no')}
                className={`flex-1 py-2 rounded-sm font-medium transition text-sm ${
                  side === 'no'
                    ? 'bg-accent-red text-background'
                    : 'bg-surface-tertiary text-foreground hover:bg-border-subtle'
                }`}
              >
                No
              </button>
            </div>

            {/* Amount input */}
            <div className="mb-6">
              <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">
                Amount (USDC)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-surface-tertiary border border-border-subtle rounded-sm px-3 py-2 text-foreground placeholder-text-muted text-sm focus:outline-none focus:border-accent-green transition"
                placeholder="0"
              />
            </div>

            {/* Price */}
            <div className="mb-6 space-y-2 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>Price per share</span>
                <span className="font-medium text-foreground">
                  ${(side === 'yes' ? props.yesPercent : props.noPercent) / 100}
                </span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Shares</span>
                <span className="font-medium text-foreground">
                  {Math.floor(parseInt(amount || '0') * 100 / (side === 'yes' ? props.yesPercent : props.noPercent))}
                </span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-border-subtle">
                <span>Total</span>
                <span>${amount}</span>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full bg-accent-green text-background py-2.5 rounded-sm font-bold text-sm hover:opacity-90 transition">
              {side === 'yes' ? 'Buy Yes' : 'Buy No'}
            </button>

            <p className="text-xs text-text-dimmed text-center mt-4">
              Connect wallet to trade. Orders settle on-chain.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
