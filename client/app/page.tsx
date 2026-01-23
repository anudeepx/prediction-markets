import { Header } from '@/components/Header';
import { MarketsIndex } from '@/components/MarketsIndex';

export const metadata = {
  title: 'Markets | Prediction Protocol',
  description: 'Where collective intelligence discovers truth through belief markets on Solana.',
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <MarketsIndex />
        </div>
      </main>
    </>
  );
}
