'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '-/hooks/useAuth';
import { Coins, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const h = async (e: any) => {
    e.preventDefault(); setLoading(true);
    try { await register(form); toast.success('Account created!'); router.push('/dashboard'); }
    catch (err: any) { toast.error(err.message); }
    finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-10"><Coins size={24} className="text-purple-400"/><span className="text-xl font-bold gradient-text">RewardHub</span></Link>
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-zinc-400 mb-8">Start earning crypto today.</p>
        <div className="card">
          <form onSubmit={h} className="space-y-4">
            <input className="input" placeholder="Username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required/>
            <input type="email" className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
            <input type="password" className="input" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
            <button type="submit" disabled={loading} className="btn btn-primary w-full">{loading?'Creating...':'Create Account'}</button>
          </form>
          <p className="text-center text-sm text-zinc-500 mt-4">Have account? <Link href="/auth/login" className="text-purple-400">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}