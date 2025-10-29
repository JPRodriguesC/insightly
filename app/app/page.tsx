'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useUser();
  const [creatingUser, setCreatingUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      window.location.href = '/auth/login';
      return;
    }

    console.log('Usuário autenticado:', user);
    
    (async () => {
      setCreatingUser(true);
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: user.name,
            userName: user.nickname,
            email: user.email,
            biografia: '',
            links: [],
          }),
        });

        if (!response.ok) {
          throw new Error(`Erro na criação: ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log('Usuário criado/atualizado:', data);
        router.push(`/profile/${user.nickname}`);
      } catch (error) {
        console.error('Erro durante a criação do usuário:', error);
        router.push(`/profile/${user.nickname}`);
      } finally {
        setCreatingUser(false);
      }
    })();
  }, [user, isLoading, router]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="bg-white dark:bg-white border border-zinc-600 dark:border-zinc-800 rounded-md px-16 py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 800 350">
              <defs>
                <pattern id="zigzag" patternUnits="userSpaceOnUse" width="20" height="20">
                  <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="none" stroke="#52525b" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#zigzag)"/>
            </svg>
          </div>
          <h1 className="text-6xl font-normal text-zinc-50 dark:text-black relative z-10 font-mono tracking-wide">
            Insightly
          </h1>
        </div>
        
        {(isLoading || creatingUser) && (
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-zinc-50 mx-auto mb-2"></div>
            <p className="text-zinc-600 dark:text-zinc-400">
              {isLoading ? 'Verificando autenticação...' : 'Configurando perfil...'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

