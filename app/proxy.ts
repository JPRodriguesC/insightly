import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

// proxy.ts
export async function proxy(request: NextRequest) {
  // Skip Auth0 for static assets (CSS, JS, images, etc.)
  const isStaticAsset = request.nextUrl.pathname.startsWith('/_next/') || 
      request.nextUrl.pathname.startsWith('/favicon') ||
      request.nextUrl.pathname.endsWith('.css') ||
      request.nextUrl.pathname.endsWith('.js') ||
      request.nextUrl.pathname.endsWith('.map') ||
      request.nextUrl.pathname.endsWith('.ico');

  // Checa se o caminho é um nome de usuário público (ex: /username)
  const isUsernameRoute = /^\/[^\/]+\/?$/.test(request.nextUrl.pathname) && 
                         !request.nextUrl.pathname.startsWith('/api') &&
                         !request.nextUrl.pathname.startsWith('/auth') &&
                         !request.nextUrl.pathname.startsWith('/profile') &&
                         request.nextUrl.pathname !== '/';
  
  // Checa se o caminho é a página "não encontrado" (ex: /username/nao-encontrado)
  const isNaoEncontradoRoute = /^\/[^\/]+\/nao-encontrado\/?$/.test(request.nextUrl.pathname);
  
  // Checa se é uma API pública (feedback, get user)
  const isPublicApiRoute = request.nextUrl.pathname.startsWith('/api/users/') &&
                          (request.nextUrl.pathname.includes('/feedback') || 
                           request.method === 'GET');
  
  if (isUsernameRoute || isStaticAsset || isNaoEncontradoRoute || isPublicApiRoute) {
      // Faz bypass da autenticação para rotas públicas e ativos estáticos
      return NextResponse.next();
  }

  const authRes = await auth0.middleware(request);

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  const session = await auth0.getSession();  // <----  Do not pass the request and let the package handle getting the cookies

  if (!session) {
    // user is not authenticated, redirect to login page
    return NextResponse.redirect(
      new URL("/auth/login", request.nextUrl.origin)
    );
  }

  // the headers from the auth middleware should always be returned
  return authRes;
}