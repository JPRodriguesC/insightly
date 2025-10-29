import Link from 'next/link';

export default function NaoEncontradoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="bg-white dark:bg-zinc-900 rounded shadow-sm border border-zinc-200 dark:border-zinc-700 p-8 text-center max-w-md w-full mx-4" style={{ borderRadius: '4px' }}>
          <div className="mb-6">
            <svg
              className="mx-auto h-16 w-16 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-4">
            Usuário não encontrado
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 mb-6">
            O perfil que você está procurando não existe ou foi removido.
          </p>
          <Link
            href="/"
            className="inline-block bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-black py-3 px-6 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
    </div>
  );
}
