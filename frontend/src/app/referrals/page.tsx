'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Users, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ReferralsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  if (!loading && !user) { router.push('/auth/login'); return null; }
  if (!user) return null;
  return (
    <div className="min-h-screen bg-[0#0a0a0f] md:ml-64 p-6">
      <h1 className="text-3xl font-bold mb-8"><Users className="inline w-7 h-7 mr-2"/>Referral <span className="gradient-text">Program</span></h1>
      <div className="card text-center max-w-md mx-auto">
        <p className="text-zinc-400 mb-2">Your Code:</p>
        <p className="text-3xl font-bold gradient-text mb-4">{user.referralCode}</p>
        <button onClick={() => { navigator.clipboard.writeText(user.referralCode); toast.success('Copied!'); }} className="btn btn-secondary"><Copy size={14}/> Copy</button>
        <p className="text-xs text-zinc-500 mt-4">Earn 5-20% commission on all referral earnings!</p>
      </div>
    </div>
  );
}