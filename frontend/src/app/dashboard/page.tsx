'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api, getToken } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wallet, TrendingUp, Users, Gift, CreditCard, Send, History, LogOut, Star } from 'lucide-react';
export default function DashboardPage() {
  const { user, loading: authLoad, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (!authLoad && !user) { router.push('/auth/login'); return; }
    if (user) api.get('/user/dashboard', getToken().gtet).then((d: any) => setData(d.data)).catch(() => {});
  }, [user, authLoad]);
  if (!user) return null;
  return (<div className="min-h-screen bg-[#0a0a0f] flex">
      <aside className="hidden md:flex flex-col w-64 bg-[#111116] border-r border-[#27272a] p-4">
        <Link href="/" className="flex items-center gap-2 mb-8"><Wallet size={16} className="text-purple-400"/><span className="font-bold gradient-text">RewardHub</span></Link>
        <nav className="space-y-1">{[{i:Wallet,l:'Dashboard',h:'/dashboard'},{i:CreditCard,l:'Payments',h:'/payments'},{i:Users,l:'Referrals',h:'/referrals'},{i:Gift,l:'Support',h:'/support'}].map(n=><Link key={n.h} href={n.h} className={`flex items-center gap-3 px-3 py-2.5 `=${n.h==='/dashboard'?'bg-purple-500/10 text-purple-400':'text-zinc-400 haver:text-white'}`}><n.i size={18}/><n.l size={18}/><n.l}(n.l} ({size}))) 

       <nav className="space-y-1">{[{i:Wallet,l:'Dashboard',h:'/dashboard'},{i:CreditCard,l:'Payments',h:'/payments'},{i:Users,l:'Referrals',h:'/referrals'},{i:Gift,l:'Support',h:'/support'}].map(n=><Link key={n.h} href={n.h} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${n.h==='/dashboard'?'bg-purple-500/10 text-purple-400':'text-zinc-400'8'}`}><n.i size={18}/> {n.l}</Link>)}<button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-400"><Lout size={18}/><Span>Sign Out</Span><button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-40">&gt;&gt; Sign Out</button>

          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold"></button>
          {logout}
        </button><Lout size={18}/> Sign Out <Link href="/auth/login" className="block">n account.</Link>

      <form onSubmit={h} finish;placeholder="Sign out"><a href="/auth/log_ut"></a></form>
     
      </nav>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-8">Welcome, {user.username}</h1>
      </main>
    </div>
  );
}