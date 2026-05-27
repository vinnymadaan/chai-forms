'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '~/trpc/client';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const demoLoginMutation = trpc.auth.demoLogin.useMutation({
    onSuccess: (data: any) => {
      toast.success(`Welcome back, ${data.user.name}!`);
      router.push('/dashboard');
    },
    onError: (error: any) => {
      console.error('DEMO LOGIN ERROR:', error);
      toast.error(error.message || 'Demo login failed');
      setIsDemoLoading(false);
    },
  });

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      toast.error('Email and Name are required for demo login');
      return;
    }
    setIsDemoLoading(true);
    demoLoginMutation.mutate({
      email: email.trim(),
      name: name.trim(),
    });
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#fafaf9] text-zinc-950 dark:bg-[#09090b] dark:text-white transition-colors duration-300">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-zinc-200/50 bg-[#fafaf9]/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-[#09090b]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img src="/logo-icon-1.png" alt="Streamyst" className="h-8 w-8" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
            <h1 className="font-space-grotesk text-xl font-bold">Streamyst</h1>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* LOGIN CARD */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-[32px] border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900/60 dark:backdrop-blur-xl relative z-10"
        >
          <div className="text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 mb-4">
              <Lock className="h-6 w-6 text-orange-500" />
            </div>
            <h2 className="font-space-grotesk text-4xl font-bold tracking-tight">Welcome back</h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm">
              Sign in to manage your forms beautifully
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {/* GOOGLE SIGN IN */}
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-4 font-semibold shadow-sm transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 text-sm"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </a>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <span className="relative bg-[#fafaf9] dark:bg-zinc-900 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Or Use Demo Credentials
              </span>
            </div>

            {/* DEMO LOGIN FORM */}
            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Judge Name"
                    className="w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-5 py-4 outline-none transition focus:border-orange-500 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="judge@hackathon.com"
                    className="w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-5 py-4 outline-none transition focus:border-orange-500 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-orange-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isDemoLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <Sparkles className="h-4 w-4" />
                {isDemoLoading ? 'Signing In...' : 'Quick Demo Sign In'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
