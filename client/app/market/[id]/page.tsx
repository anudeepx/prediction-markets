'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { MarketDetail } from '@/components/MarketDetail';

// Mock market database
const MARKETS: Record<
  string,
  {
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
> = {
  'btc-60k': {
    id: 'btc-60k',
    title: 'Crypto',
    question: 'Will BTC exceed $60,000 by March 2025?',
    yesPercent: 72,
    noPercent: 28,
    volume: 2_450_000,
    daysLeft: 47,
    description: 'Bitcoin price prediction market. Settles based on spot price from major exchanges.',
    oracle: 'Chainlink Price Feed aggregating major exchange data',
    rules:
      'Resolves YES if BTC closes above $60,000 USD on any major exchange on or before March 31, 2025. NO otherwise.',
  },
  'us-gdp': {
    id: 'us-gdp',
    title: 'Economics',
    question: 'Will US GDP growth exceed 2.5% in Q1 2025?',
    yesPercent: 58,
    noPercent: 42,
    volume: 1_200_000,
    daysLeft: 89,
    description: 'US economic growth prediction. Settles based on preliminary GDP figures.',
    oracle: 'US Bureau of Economic Analysis official data',
    rules: 'Resolves YES if preliminary Q1 2025 GDP growth exceeds 2.5% annualized. NO otherwise.',
  },
  'ai-agi': {
    id: 'ai-agi',
    title: 'Technology',
    question: 'Will AGI be achieved by 2030?',
    yesPercent: 34,
    noPercent: 66,
    volume: 3_890_000,
    daysLeft: 1825,
    description: 'Artificial General Intelligence milestone prediction. Long-term belief market.',
    oracle: 'Community consensus with independent expert panel',
    rules:
      'Resolves YES if credible evidence of Artificial General Intelligence achieving human-level reasoning on all intellectual tasks by Dec 31, 2030.',
  },
  'sol-tps': {
    id: 'sol-tps',
    title: 'Solana',
    question: 'Will Solana network reach 10k TPS sustained?',
    yesPercent: 81,
    noPercent: 19,
    volume: 567_000,
    daysLeft: 365,
    description: 'Solana network performance milestone.',
    oracle: 'On-chain transaction metrics from Solana validators',
    rules: 'Resolves YES if Solana network sustains 10,000+ transactions per second for 1 full week.',
  },
  'inflation': {
    id: 'inflation',
    title: 'Economics',
    question: 'Will US inflation fall below 2% by Q3 2025?',
    yesPercent: 45,
    noPercent: 55,
    volume: 1_890_000,
    daysLeft: 175,
    description: 'US inflation rate prediction based on CPI data.',
    oracle: 'US Bureau of Labor Statistics CPI Release',
    rules: 'Resolves YES if PCE Core Inflation rate falls below 2.0% in Q3 2025 reading. NO otherwise.',
  },
  'election': {
    id: 'election',
    title: 'Politics',
    question: 'Will Trump win re-election in 2024?',
    yesPercent: 62,
    noPercent: 38,
    volume: 5_670_000,
    daysLeft: 0,
    description: 'Presidential election outcome prediction.',
    oracle: 'Official election results from US Election Administration',
    rules: 'Resolves YES if candidate wins Electoral College. NO if loses.',
  },
};

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const market = MARKETS[id];

  if (!market) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-2">Market not found</h1>
            <p className="text-text-muted mb-6">The market you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/')}
              className="inline-block bg-accent-green text-background px-4 py-2 rounded-sm font-bold hover:opacity-90 transition"
            >
              Back to Markets
            </button>
          </div>
        </div>
      </main>
    </>
  );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          {/* Back button */}
          <motion.button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-text-muted hover:text-foreground transition mb-8"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>←</span>
            <span className="text-sm font-medium">Back to Markets</span>
          </motion.button>

          <MarketDetail {...market} />
        </div>
      </main>
    </>
  );
}
