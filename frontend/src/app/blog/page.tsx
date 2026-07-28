import Link from 'next/link';
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">RewardHub <span className="gradient-text">Blog</span></h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card card-hover">
            <div className="text-xs text-purple-400 uppercase mb-2">Guide</div>
            <h2 className="text-lg font-semibold mb-2">Getting Started with RewardHub</h2>
            <p className="text-sm text-zinc-400 mb-3">Learn how to earn BTC, ETH and more.</p>
            <p className="text-xs text-zinc-500">July 28, 2026</p>
          </div>
          <div className="card card-hover">
            <div className="text-xs text-purple-400 uppercase mb-2">Crypto</div>
            <h2 className="text-lg font-semibold mb-2">Understanding Bitcoin Confirmations</h2>
            <p className="text-sm text-zinc-400 mb-3">Why confirmations matter for your payouts.</p>
            <p className="text-xs text-zinc-500">July 27, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}