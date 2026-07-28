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
  const [tx, setTx] = useState('');
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
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm ${tab === t ? 'bg-purple-600' : 'bg-zinc-700'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'deposit' && !active && (
        <div className="card max-w-md">
          <form
            onSubmit={async e => {
              e.preventDefault();
              setLoading(true);
              try {
                const res = await api.post('/payments/deposit', {
                  coin: df.coin,
                  amountUSD: Number(df.amountUSD)
                }, getToken()!);
                setActive(res.data);
                toast.success('Created!');
              } catch (error: any) {
                toast.error(error.message);
              } finally {
                setLoading(false);
              }
            }}
            className="space-y-4"
          >
            <select
              className="input"
              value={df.coin}
              onChange={e => setDf({ ...df, 




















































































