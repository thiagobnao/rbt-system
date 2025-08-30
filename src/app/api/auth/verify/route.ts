import { NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const result = getAuthUserFromRequest(req);
    
    if (!result.ok) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }

    // Token é válido, retornar dados do usuário
    return NextResponse.json(
      { 
        message: 'Token válido',
        user: result.user 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
