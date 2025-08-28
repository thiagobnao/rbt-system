import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getSupabase } from '@/lib/supabase'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
})

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Payload inválido', errors: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data
    const supabase = getSupabase()

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, password_hash, role')
      .eq('email', email)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ message: 'Erro ao buscar usuário' }, { status: 500 })
    }

    if (!user) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 })
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      return NextResponse.json({ message: 'JWT não configurado' }, { status: 500 })
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role },
      secret,
      { expiresIn: '1h' }
    )

    return NextResponse.json(
      {
        token,
        user: { id: user.id, email: user.email, role: user.role }
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 })
  }
}


