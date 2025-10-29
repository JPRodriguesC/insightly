import Link from 'next/link';

export default function NaoExiste() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="bg-white dark:bg-zinc-900 rounded shadow-sm border border-zinc-200 dark:border-zinc-700 p-8 w-full max-w-md text-center" style={{ borderRadius: '4px' }}>
          <div className="mb-6">
            <svg 
              className="w-16 h-16 mx-auto text-zinc-500 dark:text-zinc-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.09m-.709-8.18A7.962 7.962 0 0112 9c2.034 0 3.9-.785 5.291-2.09M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Página Não Encontrada
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            A página que você está procurando não existe ou foi removida. Verifique o endereço ou retorne à página inicial.
          </p>
          <div>
            <Link
              href="/"
              className="block w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-black py-3 px-4 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
