import React from 'react';
import { notFound } from 'next/navigation';
import FeedbackForm from './components/feedback-form';

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

interface UserData {
  Id: number;
  Nome: string | null;
  Biografia: string | null;
  UserName: string;
  Email: string;
  DataCriacao: string;
  Links: Array<{
    Id: number;
    Titulo: string;
    URL: string;
  }>;
  Feedbacks: Array<{
    Id: number;
    Descricao: string;
    DataCriacao: string;
  }>;
}

async function fetchUserData(username: string): Promise<UserData | null> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/usuario/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Erro ao carregar usuário');
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Erro ao carregar usuário:', error);
    return null;
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const userData = await fetchUserData(username);

  if (!userData) {
    notFound();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-4">
            {userData?.Nome || userData?.UserName}
        </h1>

        {/* Biografia */}
        <div className="bg-white dark:bg-zinc-900 rounded shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 mb-6 w-full max-w-2xl text-center" style={{ borderRadius: '4px' }}>
          <div className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {userData?.Biografia || 'Nenhuma biografia disponível.'}
          </div>

          {/* Links */}
          {userData?.Links && userData.Links.length > 0 && (
            <div className="w-full max-w-2xl mt-8 mb-6">
              <h2 className="text-xl font-medium text-black dark:text-zinc-50 mb-4 text-center">
                  Links sociais
              </h2>
                  
              <table className="w-full">
                  <tbody>
                      {userData.Links.map((link, index) => (
                          <tr 
                              key={link.Id}
                              className={`border-t ${index === userData.Links.length - 1 ? 'border-b' : ''} border-zinc-200 dark:border-zinc-700`}
                          >
                              <td className="py-3 px-4 text-center">
                                <a
                                  href={link.URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                                >
                                  {link.Titulo}
                                </a>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Feedbacks existentes */}
        {userData?.Feedbacks && userData.Feedbacks.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 mb-6 w-full max-w-2xl" style={{ borderRadius: '4px' }}>
            <h3 className="text-xl font-medium text-black dark:text-zinc-50 mb-4 text-center">
              Feedbacks recebidos
            </h3>
            <div className="space-y-4">
              {userData.Feedbacks.map((feedback) => (
                <div key={feedback.Id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-zinc-700 dark:text-zinc-300">{feedback.Descricao}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {new Date(feedback.DataCriacao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <FeedbackForm username={username} />
      </main>
    </div>
  );
}
