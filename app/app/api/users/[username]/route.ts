import { NextRequest, NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { username } = await params;
    
    const response = await fetch(`${process.env.API_BASE_URL}/usuario/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Resposta:', response);
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        );
      }
      throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { username } = await params;
    const userData = await request.json();

    const response = await fetch(`${process.env.API_BASE_URL}/usuario/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        );
      }
      throw new Error(`Erro na atualização: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro durante a atualização do usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}