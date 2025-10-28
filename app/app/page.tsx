

export default function Home() {
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
        
        <button
          type="button"
          className="mt-8 flex items-center gap-3 bg-zinc-600 dark:bg-zinc-600 text-zinc-50 dark:text-zinc-50 py-3 px-6 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-colors font-medium"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          Login
        </button>
      </main>
    </div>
  );
}
