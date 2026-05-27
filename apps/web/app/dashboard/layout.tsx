'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { trpc } from '~/trpc/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: user, isLoading, error } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && (!user || error)) {
      router.push('/login');
    }
  }, [user, isLoading, error, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fafaf9] dark:bg-[#09090b]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-zinc-300 border-t-black dark:border-zinc-700 dark:border-t-white" />
          <p className="mt-4 text-sm text-zinc-500">Checking authentication...</p>
        </div>
      </main>
    );
  }

  if (!user || error) {
    return null; // Prevents flashing dashboard content while redirecting
  }

  return <>{children}</>;
}
