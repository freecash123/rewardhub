'use client';
import Link from 'next/link';
import { Coins, ArrowRight, CheckCircle2, Menu, X, Wallet, BadgeCheck, Users, Shield, Zap, Gift } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [menuOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 inset-x-0 z-50 bg-[#111116]/80 backdrop-blur-md border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center"><Coins size={18} className="text-white"/></div><span className="text-lg font-bold">Reward<span className="gradient-text">Hub</span></span></Link>
        </div>
      </header>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight">Earn <span className="gradient-text">Real Crypto</span> Rewards</h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">Complete offers, surveys, and invite friends. Get paid instantly in BTC, ETH, LTC, DOGE, or USDT.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn btn-primary text-base px-8 py-3.5">Start Earning Now <ArrowRight size={18}/></Link>
            <Link href="#how" className="btn btn-secondary text-base px-8 py-3.5">How It Works</Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Why Choose <span className="gradient-text">RewardHub?</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{icon:Zap,t:'Instant Crypto Payouts',d:'PAid in BTC, ETH, LTC, DOGE, USDT.'},{icon:Shield,t:'Secure Platform',d:'2FA, encryption, automated verification.'},{icon:Users,t:'Referral Bonuses',d:'Earn up to 20% commission on referrals.'},{icon:Wallet,t:'5 Cryptocurrencies',d:'Bitcoin, Ethereum, Litecoin, Dogecoin, USDT.'},{icon:Gift,t:'Daily Bonuses',d:'Login streaks and achievement rewards.'},{icon:BadgeCheck,t:'Membership Tiers',d:'Free to Diamond. Up to 30% earnings boost.'}].map(({icon:I,t,d},i)=>(div key={i} className="card card-hover"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4"><I size={22}/></div><h3 className="text-lg font-semibold mb-2">{t}</h3><p className="text-sm text-zinc-400">{d}</p>(/div>)}</div>
</section>
<section className="py-20 px-4 text-center"><div className="card border-purple-500/20 max-w-3xl mx-auto"><h2 className="text-3xl font-bold mb-4">Start Earning <span className="gradient-text">Crypto Today</span></h2><Link href="/auth/register" className="btn btn-primary text-base px-8 py-3.5">Get Started Free <ArrowRight size={18}/></Link></div></section>
<footer className="border-t border-[#27272a] py-8 px-4 text-center text-sm text-zinc-600">© 2026 RewardHub</footer></div>);
}
