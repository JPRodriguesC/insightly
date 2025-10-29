import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{
    username: string;
  }>;
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const { username } = await params;
    const { descricao } = await request.json();

    const response = await fetch(`${process.env.API_BASE_URL}/usuario/${username}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descricao }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        );
      }
      throw new Error(`Erro ao adicionar feedback: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao adicionar feedback:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}