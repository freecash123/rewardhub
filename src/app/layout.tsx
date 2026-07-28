import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RewardHub — Earn Real Crypto Rewards',
  description: 'Earn real cryptocurrency for completing offers, surveys, and inviting friends. BTC, ETH, LTC, DOGE, USDT payouts.',
  keywords: 'crypto rewards, earn bitcoin, ethereum, crypto faucet, rewards platform',
  robots: 'index, follow',
  openGraph: { title: 'RewardHub — Premium Crypto Rewards', description: 'Earn real cryptocurrency for completing offers and surveys.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-hscreen bg-[#0a0a0f] text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
