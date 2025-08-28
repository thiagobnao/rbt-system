import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { withAuth } from '@/lib/auth';

export const GET = withAuth(async (req: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const supabase = getSupabase();
    
    const { data: collaborator, error } = await supabase
      .from('collaborators')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ message: 'Colaborador não encontrado' }, { status: 404 });
    }

    return NextResponse.json(collaborator);
  } catch (error) {
    console.error('Error fetching collaborator:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
});

export const PUT = withAuth(async (req: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const body = await req.json();
    const supabase = getSupabase();

    // Verificar se o colaborador existe
    const { data: existingCollaborator, error: fetchError } = await supabase
      .from('collaborators')
      .select('id')
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json({ message: 'Colaborador não encontrado' }, { status: 404 });
    }

    // Atualizar colaborador
    const { data: collaborator, error } = await supabase
      .from('collaborators')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
        updated_by: user.id
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating collaborator:', error);
      return NextResponse.json({ message: 'Erro ao atualizar colaborador' }, { status: 500 });
    }

    return NextResponse.json(collaborator);
  } catch (error) {
    console.error('Error updating collaborator:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
});

export const DELETE = withAuth(async (req: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const supabase = getSupabase();

    // Verificar se o colaborador existe
    const { data: existingCollaborator, error: fetchError } = await supabase
      .from('collaborators')
      .select('id, name')
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json({ message: 'Colaborador não encontrado' }, { status: 404 });
    }

    // Soft delete - marcar como inativo
    const { error } = await supabase
      .from('collaborators')
      .update({
        status: 'inactive',
        updated_at: new Date().toISOString(),
        updated_by: user.id
      })
      .eq('id', id);

    if (error) {
      console.error('Error deleting collaborator:', error);
      return NextResponse.json({ message: 'Erro ao excluir colaborador' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Colaborador excluído com sucesso' });
  } catch (error) {
    console.error('Error deleting collaborator:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
});
