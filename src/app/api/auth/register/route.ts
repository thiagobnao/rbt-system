import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { getSupabase } from '@/lib/supabase'

const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(128, 'A senha é muito longa')
})

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    const parse = registerSchema.safeParse(body)
    if (!parse.success) {
      return NextResponse.json(
        { message: 'Payload inválido', errors: parse.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = parse.data

    // Verifica se já existe usuário com o email
    const supabase = getSupabase()
    const { data: existing, error: existingError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existingError) {
      return NextResponse.json(
        { message: 'Erro ao verificar usuário existente' },
        { status: 500 }
      )
    }

    if (existing) {
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const { data: inserted, error: insertError } = await supabase
      .from('users')
      .insert({ email, password_hash: passwordHash, role: 'common' })
      .select('id, email, role, created_at')
      .maybeSingle()

    if (insertError || !inserted) {
      return NextResponse.json(
        { message: 'Erro ao criar usuário' },
        { status: 500 }
      )
    }

    return NextResponse.json(inserted, { status: 201 })
  } catch (err) {
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 })
  }
}


