import jwt from 'jsonwebtoken'

export type AuthRole = 'admin' | 'coordinator' | 'common'

export interface AuthUser {
  id: string
  role: AuthRole
  email?: string
}

export function getAuthUserFromRequest(req: Request): { ok: true; user: AuthUser } | { ok: false; status: number; message: string } {
  const auth = req.headers.get('authorization') || ''
  const [scheme, token] = auth.split(' ')
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return { ok: false, status: 401, message: 'Token ausente' }
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    return { ok: false, status: 500, message: 'JWT não configurado' }
  }

  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload
    const user: AuthUser = {
      id: String(payload.sub),
      role: (payload as any).role as AuthRole,
      email: (payload as any).email as string | undefined
    }
    return { ok: true, user }
  } catch {
    return { ok: false, status: 401, message: 'Token inválido ou expirado' }
  }
}

export function withAuth<T extends (req: Request, user: AuthUser) => Promise<Response> | Response>(
  handler: T
): (req: Request) => Promise<Response> {
  return async (req: Request) => {
    const result = getAuthUserFromRequest(req)
    if (!result.ok) {
      return new Response(JSON.stringify({ message: result.message }), {
        status: result.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return handler(req, result.user)
  }
}


