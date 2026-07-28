'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Coins, Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const h = async (e: any) => {
    e.preventDefault(); setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-10"><Coins size={24} className="text-purple-400"/><span className="text-xl font-bold gradient-text">RewardHub</span></Link>
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-zinc-400 mb-8">Sign in to your account.</p>
        <div className="card">
          <form onSubmit={h} className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Email</label>
              <div className="relative"><Mail size={18} className="absolute left-3 top-3.5 text-zinc-500"/><input type="email" className="input pl-10" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required/></div>
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Password</label>
              <div className="relative"><Lock size={18} className="absolute left-3 top-3.5 text-zinc-500"/><input type="password" className="input pl-10" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} required/></div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-full">{loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={16}/></button>
          </form>
          <p className="text-center text-sm text-zinc-500 mt-4">No account? <Link href="/auth/register" className="text-purple-400">Register</Link></p>
        </div>
      </div>
    </div>
  );
}