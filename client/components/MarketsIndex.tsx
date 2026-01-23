'use client';

import { motion } from 'framer-motion';
import { MarketCard } from './MarketCard';

interface Market {
  id: string;
  title: string;
  question: string;
  yesPercent: number;
  noPercent: number;
  volume: number;
  daysLeft: number;
}

// Mock market data
const MOCK_MARKETS: Market[] = [
  {
    id: 'btc-60k',
    title: 'Crypto',
    question: 'Will BTC exceed $60,000 by March 2025?',
    yesPercent: 72,
    noPercent: 28,
    volume: 2_450_000,
    daysLeft: 47,
  },
  {
    id: 'us-gdp',
    title: 'Economics',
    question: 'Will US GDP growth exceed 2.5% in Q1 2025?',
    yesPercent: 58,
    noPercent: 42,
    volume: 1_200_000,
    daysLeft: 89,
  },
  {
    id: 'ai-agi',
    title: 'Technology',
    question: 'Will AGI be achieved by 2030?',
    yesPercent: 34,
    noPercent: 66,
    volume: 3_890_000,
    daysLeft: 1825,
  },
  {
    id: 'sol-tps',
    title: 'Solana',
    question: 'Will Solana network reach 10k TPS sustained?',
    yesPercent: 81,
    noPercent: 19,
    volume: 567_000,
    daysLeft: 365,
  },
  {
    id: 'inflation',
    title: 'Economics',
    question: 'Will US inflation fall below 2% by Q3 2025?',
    yesPercent: 45,
    noPercent: 55,
    volume: 1_890_000,
    daysLeft: 175,
  },
  {
    id: 'election',
    title: 'Politics',
    question: 'Will Trump win re-election in 2024?',
    yesPercent: 62,
    noPercent: 38,
    volume: 5_670_000,
    daysLeft: 0,
  },
];

export function MarketsIndex() {
  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative z-10">
      {/* Header */}
      <motion.header
        className="mb-12 border-b border-border-subtle pb-8"
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-6xl font-bold mb-3">Markets</h1>
        <p className="text-text-muted max-w-2xl">
          Where collective intelligence discovers truth. Real belief, real capital, real settlement.
        </p>
      </motion.header>

      {/* Markets Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max"
        initial="initial"
        animate="animate"
      >
        {MOCK_MARKETS.map((market, index) => (
          <MarketCard key={market.id} {...market} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
