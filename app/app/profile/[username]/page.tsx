'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import { InputText } from '@/components/form/input-text';
import { TextArea } from '@/components/form/input-text-area';
import { useUser } from '@auth0/nextjs-auth0';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user } = useUser();

  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const [username, setUsername] = useState<string>('');
  const [nome, setNome] = useState('');
  const [biografia, setBiografia] = useState('');
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [socialLinks, setSocialLinks] = useState<Array<{id: number, titulo: string, url: string}>>([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setUsername(resolvedParams.username);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!username) return;

    console.log('Carregando:', username);
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Resposta:', response);
      const data = await response.json();

      console.log('Data', data);
      if (response.ok) {
        setNome(data.Nome || '');
        setBiografia(data.Biografia || '');

        const links = (data.Links || []).map((link: {Id:string, Titulo: string, Url: string}) => ({
          id: +link.Id,
          titulo: link.Titulo,
          url: link.Url
        }));
        setSocialLinks(links);
        setNextId(links.length + 1);
      } else {
        console.error('Error fetching user data:', data);
        setErro(true);
        setMensagemErro(data.error || 'Erro ao carregar dados do usuário');
      }
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    if (!salvo) return;
    
    const timer = setTimeout(() => {
      setSalvo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [salvo]);

  const addSocialLink = () => {
    if (titulo.trim() && url.trim()) {
      setSocialLinks([...socialLinks, { id: nextId, titulo: titulo.trim(), url: url.trim() }]);
      setTitulo('');
      setUrl('');
      setNextId(nextId + 1);
    }
  };

  const deleteSocialLink = (id: number) => {
    setSocialLinks(socialLinks.filter(item => item.id !== id));
  };

  const handleSubmit = useCallback(async () => {
    const usuario = {
      nome: nome,
      biografia: biografia,
      links: socialLinks.map(link => ({ titulo: link.titulo, url: link.url })),
      email: user?.email,
      userName: user?.nickname
    };

    setSalvando(true);
    setErro(false);
    const response = await fetch(`/api/users/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    if (response.ok) {
      setSalvo(true);
      setErro(false);
    } else {
      setErro(true);
      const data = await response.json();
      setMensagemErro(data.error || data.message || 'Erro ao salvar perfil');
    }
    setSalvando(false);
  }, [nome, biografia, socialLinks, user, username]);

  const handleViewProfile = useCallback(() => {
    if (!username) return;

    window.open(`/${username}`, '_blank');
  }, [username]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 text-center mb-6">
          Profile
        </h1>
        
        <div className="space-y-6 w-full max-w-md">
          <div>
            <InputText
              id="nome"
              name="nome"
              label="Nome"
              value={nome}
              placeholder="Digite seu nome..."
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-white dark:bg-zinc-900 text-black dark:text-zinc-50"
            />
          </div>

          <div>
            <TextArea
              id="biografia"
              name="biografia"
              label="Biografia"
              value={biografia}
              placeholder="Conte um pouco sobre você..."
              rows={6}
              onChange={(value) => setBiografia(value)}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent resize-none bg-white dark:bg-zinc-900 text-black dark:text-zinc-50"
            />
          </div>

          {/* Links*/}
          <div>
            <h3 className="text-lg font-medium text-black dark:text-zinc-50 mb-3">Links Sociais</h3>
            
            <div className="flex gap-2 mb-3">
              <div className="flex-1">
                <InputText
                  id="titulo"
                  name="titulo"
                  label="Título"
                  value={titulo}
                  placeholder="Ex: Instagram"
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-white dark:bg-zinc-900 text-black dark:text-zinc-50"
                />
              </div>
              
              <div className="flex-1">
                <InputText
                  id="url"
                  name="url"
                  label="URL"
                  value={url}
                  placeholder="Ex: https://instagram.com/usuario"
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent bg-white dark:bg-zinc-900 text-black dark:text-zinc-50"
                />
              </div>
              
              <button
                type="button"
                onClick={addSocialLink}
                className="mt-6 bg-zinc-600 text-zinc-50 p-2 rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Links */}
            {socialLinks.length > 0 && (
              <div className="border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {socialLinks.map((social, index) => (
                      <tr 
                        key={social.id}
                        className={`${index !== socialLinks.length - 1 ? 'border-b border-zinc-200 dark:border-zinc-700' : ''}`}
                      >
                        <td className="py-2 px-3">
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm hover:underline"
                          >
                            {social.titulo}
                          </a>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => deleteSocialLink(social.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {salvo && (
            <div className="mt-4 text-green-600 dark:text-green-400">
              Perfil salvo com sucesso!
            </div>
          )}
          {erro && (
            <div className="mt-4 text-red-600 dark:text-red-400">
              {mensagemErro}
            </div>
          )}
          <button
            type="button"
            className="w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-black py-2 px-4 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-colors"
            onClick={handleSubmit}
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : 'Salvar Perfil'}
          </button>
          <button
            type="button"
            className="w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-black py-2 px-4 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-colors"
            onClick={handleViewProfile}
          >
            Visualizar Perfil
          </button>
        </div>
      </main>
    </div>
  );
}
