'use client';

import { useRouter } from 'next/navigation';
import { trpc } from '~/trpc/client';
import { toast } from 'sonner';
import { LogOut, LayoutDashboard, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export function UserMenu() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data: user } = trpc.auth.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      toast.success('Logged out successfully!');
      // Wipes react-query cache and redirects to login
      utils.auth.me.setData(undefined, null);
      window.location.href = '/login';
    },
    onError: (error) => {
      console.error('LOGOUT ERROR:', error);
      toast.error(error.message || 'Logout failed');
    },
  });

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none cursor-pointer select-none">
        <Avatar className="h-10 w-10 border border-zinc-200 dark:border-zinc-800 hover:opacity-90 transition">
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback className="bg-orange-500/10 text-orange-500 font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 select-none z-50">
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold leading-none text-zinc-950 dark:text-white">
              {user.name}
            </p>
            <p className="text-xs leading-none text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800 my-1.5" />
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem
            onClick={() => router.push('/dashboard')}
            className="rounded-xl px-3 py-2.5 text-sm cursor-pointer flex items-center gap-2.5 transition hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:bg-zinc-50 dark:focus:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:text-zinc-950 dark:focus:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800 my-1.5" />
        <DropdownMenuItem
          onClick={() => logoutMutation.mutate()}
          className="rounded-xl px-3 py-2.5 text-sm cursor-pointer flex items-center gap-2.5 transition text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 focus:bg-red-50 dark:focus:bg-red-500/10 focus:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
