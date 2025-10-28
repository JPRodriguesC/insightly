import React, { useMemo } from 'react';

export default function UserPage() {
  const nome = "João Silva";
  const biografia = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.";

  // Social links memo array
  const socialLinks = useMemo(() => [
    { plataforma: "Instagram", link: "@joaosilva" },
    { plataforma: "Twitter", link: "@joao_silva" },
    { plataforma: "LinkedIn", link: "linkedin.com/in/joaosilva" }
  ], []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-4">
            {nome}
        </h1>

        {/* Biografia */}
        <div className="bg-white dark:bg-zinc-900 rounded shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 mb-6 w-full max-w-2xl text-center" style={{ borderRadius: '4px' }}>
          <div className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {biografia}
          </div>

          {/* Links */}
          <div className="w-full max-w-2xl mt-8 mb-6">
            <h2 className="text-xl font-medium text-black dark:text-zinc-50 mb-4 text-center">
                Links sociais
            </h2>
                
            <table className="w-full">
                <tbody>
                    {socialLinks.map((social, index) => (
                        <tr 
                            key={social.plataforma}
                            className={`border-t ${index === socialLinks.length - 1 ? 'border-b' : ''} border-zinc-200 dark:border-zinc-700`}
                        >
                            <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{social.plataforma}</td>
                            <td className="py-3 px-4 text-zinc-900 dark:text-zinc-50">{social.link}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white dark:bg-zinc-900 rounded shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 w-full max-w-2xl" style={{ borderRadius: '4px' }}>
          <h3 className="text-xl font-medium text-black dark:text-zinc-50 mb-4 text-center">
            Dê o seu feedback
          </h3>
          
          <textarea
            placeholder="Escreva seu feedback aqui..."
            rows={6}
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent resize-none bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500"
          />
          
          <button
            type="button"
            className="mt-4 w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-black py-2 px-4 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-colors"
          >
            Enviar Feedback
          </button>
        </div>
      </main>
    </div>
  );
}
