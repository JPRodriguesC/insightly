import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Usuário não encontrado
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            O usuário que você está procurando não existe ou não foi encontrado.
          </p>
          <Link
            href="/"
            className="inline-block bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-black px-6 py-3 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors font-medium"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
    </div>
  );
}