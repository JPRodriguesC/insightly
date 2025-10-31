'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-50 dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="bg-white dark:bg-white text-black px-3 py-2 rounded font-semibold text-md">
          Insightly
        </div>

        <div className="flex items-center gap-4">
          {!isLoading && user && (
            <>
              <Link
                href="/auth/logout"
                prefetch={false}
                className="bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-black px-4 py-2 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors text-sm font-medium"
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}