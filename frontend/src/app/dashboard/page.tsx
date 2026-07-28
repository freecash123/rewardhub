'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api, getToken } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wallet, TrendingUp, Users, Gift, ArrowUpRight, ArrowDownLeft, CreditCard, Send, History, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading: aL, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!aL && !user) { router.push('/auth/login'); return; }
    if (user) api.get('/user/dashboard', getToken()).then((d: any) => setData(d.data)).catch(() => {});
  }, [user, aL]);

  if (!user) return null;

  const navItems = [
    { icon: Wallet, label: 'Dashboard', href: '/dashboard' },
    { icon: CreditCard, label: 'Payments', href: '/payments' },
    { icon: Users, label: 'Referrals', href: '/referrals' },
    { icon: Gift, label: 'Support', href: '/support' },
  ];

  const stats = [
    { label: 'Balance', value: `$${user.balance?.toFixed(2) || '0.00'}`, icon: Wallet, color: 'text-purple-400' },
    { label: 'Lifetime', value: `$${data?.user?.lifetimeEarnings?.toFixed(2) || '0.00'}`, icon: TrendingUp, color: 'text-green-400' },
    { label: 'Referrals', value: data?.referralCount || 0, icon: Users, color: 'text-blue-400' },
    { label: 'Ref Earnings', value: `$${data?.user?.referralEarnings?.toFixed(2) || '0.00'}`, icon: Gift, color: 'text-pink-400' },
  ];

  const actions = [
    { icon: CreditCard, label: 'Deposit', desc: 'Add funds', href: '/payments' },
    { icon: Send, label: 'Withdraw', desc: 'Cash out', href: '/payments' },
    { icon: Users, label: 'Invite', desc: 'Referrals', href: '/referrals' },
    { icon: History, label: 'History', desc: 'Transactions', href: '/payments' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <aside className="hidden md:flex flex-col w-64 bg-[#111116] border-r border-[#27272a] p-4">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Wallet size={16} className="text-white" />
          </div>
          <span className="font-bold gradient-text">RewardHub</span>
        </Link>
        <nav className="space-y-1 flex-1">
          {navItems.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${n.href === '/dashboard' ? 'bg-purple-500/10 text-purple-400' : 'text-zinc-400 hover:text-white'}`}
            >
              <n.icon size={18} /> {n.label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-white/5 rounded-lg mt-auto">
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-8">Welcome, {user.username}</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="card">
              <s.icon size={20} className={s.color} />
              <div className="text-xs text-zinc-500 mt-2">{s.label}</div>
              <div className="text-xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {actions.map((a, i) => (
            <Link key={i} href={a.href} className="card card-hover flex items-center gap-3 py-4">
              <a.icon size={18} className="text-purple-400" />
              <div>
                <div className="text-sm font-semibold">{a.label}</div>
                <div className="text-xs text-zinc-500">{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Recent Transactions</h3>
          {data?.recentTransactions?.length > 0 ? data.recentTransactions.slice(0, 5).map((tx: any) => (
            <div key={tx._id} className="flex justify-between py-3 border-b border-[#27272a] last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  {tx.type === 'deposit' ? <ArrowDownLeft size={16} className="text-green-400" /> : <ArrowUpRight size={16} className="text-red-400" />}
                </div>
                <div>
                  <p className="text-sm font-medium capitalize">{tx.type?.replace('_', ' ')}</p>
                  <p className="text-xs text-zinc-500">{tx.description || ''}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.type === 'deposit' ? '+' : '-'}${tx.amount?.toFixed(2)}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          )) : <p className="text-sm text-zinc-400 py-4">No transactions yet. Start earning!</p>}
        </div>
      </main>
    </div>
  );
}