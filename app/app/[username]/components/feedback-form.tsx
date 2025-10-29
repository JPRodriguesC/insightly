'use client';

import React, { useState } from 'react';

interface FeedbackFormProps {
  username: string;
  onFeedbackAdded?: () => void;
}

export default function FeedbackForm({ username, onFeedbackAdded }: FeedbackFormProps) {
  const [feedbackText, setFeedbackText] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim() || submittingFeedback || !username) return;

    setSubmittingFeedback(true);
    try {
      const response = await fetch(`/api/users/${username}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descricao: feedbackText.trim(),
        }),
      });

      console.log('Resposta do feedback:', response);

      if (response.ok) {
        setFeedbackText('');
        alert('Feedback enviado com sucesso!');
        
        // Refresh the page to show new feedback
        if (onFeedbackAdded) {
          onFeedbackAdded();
        } else {
          window.location.reload();
        }
      } else {
        throw new Error('Erro ao enviar feedback');
      }
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      alert('Erro ao enviar feedback. Tente novamente.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 w-full max-w-2xl" style={{ borderRadius: '4px' }}>
      <h3 className="text-xl font-medium text-black dark:text-zinc-50 mb-4 text-center">
        Dê o seu feedback
      </h3>
      
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="Escreva seu feedback aqui..."
        rows={6}
        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent resize-none bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500"
      />
      
      <button
        type="button"
        onClick={handleFeedbackSubmit}
        disabled={!feedbackText.trim() || submittingFeedback}
        className="mt-4 w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-black py-2 px-4 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submittingFeedback ? 'Enviando...' : 'Enviar Feedback'}
      </button>
    </div>
  );
}