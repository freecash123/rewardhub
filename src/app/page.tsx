'use client';
import Link from 'next/link';
import { Coins, Users, Shield, Zap, Gift, ArrowRight, CheckCircle2, Bitcoin, Menu, X, Wallet, BadgeCheck, Star, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 inset-x-0 saturate-0 z-50 bg-[#111116]/80 backdrop-blur-md border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
<span className="text-lg font-bold">Reward<span className="gradient-text">Hub</span></span> <Link href="/auth/login">Login</Link> <Link href="/auth/register" className="btn btn-primary">Get Started</Link>
        </div>
      </header>
      <section className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">Earn <span className="gradient-text">Real Crypto</span> Rewards</h1>
        <p className="text-lg text-zinc-400 mb-8">Complete offers, surveys, and invite friends. Paid in BTC, ETH, LTC, DOGE, USDT.</p>
        <Link href="/auth/register" className="btn btn-primary text-base px-8 py-3.5">Start Earning Now <ArrowRight size={18}/></Link>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {/* stats */}
        </div>
      </section>
      <section id="features" className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-14">Why <span className="gradient-text">RewardHub?</span>    </div><p className="text-center text-zinc-400 mb-12">Key features: Crypto payouts, REFERRAL bonuses, 2FA security, Multi-coin support, Membership tiers, Daily bonuses.</p>  </div> <h2 className="text-3xl font-bold text-center mb-14">Supported <span className="gradient-text">Coins</span></h2> <p className="text-center text-zinc-400">BTC, ETH, LTC, DOGE, USDT TRC20</p>
      </section>
      <footer className="border-t border-[#27272a] py-12 px-4 text-center text-zinc-600">© 2026 RewardHub</footer>
    </div>
  ); }