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
      if (error.code === 'PGRST116') { // No rows returned
        return NextResponse.json(
          { message: 'Colaborador não encontrado' },
          { status: 404 }
        );
      }

      console.error('Error fetching collaborator:', error);
      return NextResponse.json(
        { message: 'Erro ao buscar colaborador' },
        { status: 500 }
      );
    }

    return NextResponse.json(collaborator);

  } catch (error) {
    console.error('Error in GET /api/collaborators/[id]:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
});

export const PUT = withAuth(async (req: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const body = await req.json();
    const supabase = getSupabase();

    // Check if user has permission to update this collaborator
    if (user.role === 'coordinator') {
      // Coordinators can only edit collaborators they created
      const { data: existingCollaborator, error: fetchError } = await supabase
        .from('collaborators')
        .select('created_by')
        .eq('id', id)
        .single();

      if (fetchError || !existingCollaborator) {
        return NextResponse.json(
          { message: 'Colaborador não encontrado' },
          { status: 404 }
        );
      }

      if (existingCollaborator.created_by !== user.id) {
        return NextResponse.json(
          { message: 'Sem permissão para editar este colaborador' },
          { status: 403 }
        );
      }
    } else if (user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Sem permissão para editar colaboradores' },
        { status: 403 }
      );
    }

    // Update the collaborator
    const { data: collaborator, error } = await supabase
      .from('collaborators')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating collaborator:', error);
      
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { message: 'CPF já cadastrado' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: 'Erro ao atualizar colaborador' },
        { status: 500 }
      );
    }

    return NextResponse.json(collaborator);

  } catch (error) {
    console.error('Error in PUT /api/collaborators/[id]:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
});

export const DELETE = withAuth(async (req: NextRequest, user, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const supabase = getSupabase();

    // Check if user has permission to delete this collaborator
    if (user.role === 'coordinator') {
      // Coordinators can only delete collaborators they created
      const { data: existingCollaborator, error: fetchError } = await supabase
        .from('collaborators')
        .select('created_by')
        .eq('id', id)
        .single();

      if (fetchError || !existingCollaborator) {
        return NextResponse.json(
          { message: 'Colaborador não encontrado' },
          { status: 404 }
        );
      }

      if (existingCollaborator.created_by !== user.id) {
        return NextResponse.json(
          { message: 'Sem permissão para excluir este colaborador' },
          { status: 403 }
        );
      }
    } else if (user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Sem permissão para excluir colaboradores' },
        { status: 403 }
      );
    }

    // Check if collaborator has any related data (future implementation)
    // For now, we'll implement soft delete by setting status to 'inactive'
    
    const { data: collaborator, error } = await supabase
      .from('collaborators')
      .update({ status: 'inactive' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting collaborator:', error);
      return NextResponse.json(
        { message: 'Erro ao excluir colaborador' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Colaborador excluído com sucesso',
      collaborator
    });

  } catch (error) {
    console.error('Error in DELETE /api/collaborators/[id]:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
});
