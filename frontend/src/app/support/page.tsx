'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { api, getToken } from '@/lib/api';
import toast from 'react-hot-toast';

export default function SupportPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [f, setF] = useState({ subject: '', category: 'general', message: '' });
  const [s, setS] = useState(false);
  if (!loading && !user) { router.push('/auth/login'); return null; }
  if (!user) return null;

  const h = async (e: any) => {
    e.preventDefault(); setS(true);
    try {
      await api.post('/support', f, getToken()!);
      toast.success('Ticket created!');
      setF({ subject: '', category: 'general', message: '' });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setS(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-4">
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Support <span className="gradient-text">Center</span></h1>
        <div className="card">
          <form onSubmit={h} className="space-y-4">
            <input className="input" placeholder="Subject" value={f.subject} onChange={e => setF({...f, subject: e.target.value})} required />
            <select className="input" value={f.category} onChange={e => setF({...f, category: e.target.value})}>
              {['general', 'payment', 'withdrawal', 'account', 'technical'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <textarea className="input h-32" placeholder="Describe your issue..." value={f.message} onChange={e => setF({...f, message: e.target.value})} required />
            <button type="submit" disabled={s} className="btn btn-primary w-full">{s ? 'Submitting...' : 'Submit Ticket'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}