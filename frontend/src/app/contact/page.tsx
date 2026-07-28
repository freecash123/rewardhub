import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-4">
      <div className="max-w-3xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Contact <span className="gradient-text">Us</span></h1>
        <p className="text-zinc-400 mb-8">We're here to help.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card text-center">
            <div className="text-purple-400 mb-3"><Mail size={24}/></div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-sm text-zinc-400">support@rewardhub.com</p>
          </div>
          <div className="card text-center">
            <div className="text-purple-400 mb-3"><MessageCircle size={24}/></div>
            <h3 className="font-semibold mb-1">Support</h3>
            <Link href="/support" className="text-sm text-purple-400">Open a ticket</Link>
          </div>
        </div>
      </div>
    </div>
  );
}