'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api, getToken } from '@/lib/api';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import { Wallet, Send, Clock, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentsPage() {
  const { user, loading: aL } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('deposit');
  const [coins, setCoins] = useState<any[]>([]);
  const [df, setDf] = useState({ coin: 'BTC', amountUSD: '' });
  const [wf, setWf] = useState({ coin: 'BTC', amount: '', wallet: '' });
  const [active, setActive] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!aL && !user) { router.push('/auth/login'); return; }
    api.get('/payments/coins').then((d: any) => setCoins(d.data.coins)).catch(() => {});
  }, [user, aL]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] md:ml-64 p-6">
      <h1 className="text-3xl font-bold mb-8">
        <span className="gradient-text">Crypto</span> Payments
      </h1>
      <div className="flex gap-2 mb-6">
        {['deposit', 'withdraw', 'history'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm ${tab === t ? 'bg-purple-600' : 'bg-zinc-700'}`}>{t}</button>
        ))}
      </div>
      {tab === 'deposit' && !active && (
        <div className="card max-w-md">
          <form onSubmit={async e => {
            e.preventDefault(); setLoading(true);
            try {
              const res = await api.post('/payments/deposit', { coin: df.coin, amountUSD: Number(df.amountUSD) }, getToken()!);
              setActive(res.data);
              toast.success('Created!');
            } catch (error: any) {
              toast.error(error.message);
            } finally { setLoading(false); }
          }} className="space-y-4">
            <select className="input" value={df.coin} onChange={e => setDf({ ...df, coin: e.target.value })}>
              {coins.map(c => <option key={c.coin} value={c.coin}>{c.name}</option>)}
            </select>
            <input type="number" className="input" placeholder="Amount (USD)" value={df.amountUSD} onChange={e => setDf({ ...df, amountUSD: e.target.value })} />
            <button disabled={loading} className="btn btn-primary w-full">Generate Payment</button>
          </form>
        </div>
      )}
      {tab === 'deposit' && active && (
        <div className="card max-w-md">
          <h2>{active.coin}</h2>
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG value={active.walletAddress} size={180} />
            </div>
            <p className="text-xs">{{active.walletAddress}}</p>
          </div>
        </div>
      )}
      {tab === 'withdraw' && (
        <div className="card max-w-md">
          <h2>Withdraw $user.balance</h2>
          <form onSubmit={async e => {
            e.preventDefault(); setLoading(true);
            try {
              await api.post('/payments/withdraw', { coin: wf.coin, amount: Number(wf.amount), walletAddress: wf.wallet }, getToken()!);
              toast.success('Requested!');
            } catch (err: any) {
              toast.error(err.message);
            } finally { setLoading(false); }
          }} className="space-y-4">
            <input type="number" className="input" placeholder="Amount" value={wf.amount} onChange={e => setWf({ ...wf, amount: e.target.value })} />
            <input className="input" placeholder="Wallet Address" value={wf.wallet} onChange={e => setWf({ ...wf, wallet: e.target.value })} />
            <button disabled={loading} className="btn btn-primary w-full">Request Withdrawal</button>
          </form>
        </div>
      )}
      {tab === 'history' && (
        <div className="card max-w-md">
          <h2>History</h2>
          <p className="text-sm text-zinc-400">No transactions yet.</p>
        </div>
      )}
    </div>
  );
}