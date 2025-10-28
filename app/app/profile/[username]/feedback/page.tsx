'use client';

import React, { useMemo } from 'react';

interface FeedbackPageProps {
  params: {
    username: string;
  };
}

export default function FeedbackPage({ params }: FeedbackPageProps) {
  const mockFeedbacks = useMemo(() => [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.",
    "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."
  ], []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-start py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 text-center mb-8">
          Feedbacks
        </h1>
        
        <div className="w-full max-w-2xl space-y-[5px]">
          {mockFeedbacks.map((feedback, index) => (
            <div
              key={index}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded p-6 mb-4"
              style={{ borderRadius: '4px' }}
            >
              <h3 className="text-lg font-medium text-black dark:text-zinc-50 mb-3">
                Anonimo#{index + 1}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feedback}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
