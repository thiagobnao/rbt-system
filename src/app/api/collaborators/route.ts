import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { withAuth } from '@/lib/auth';
import { collaboratorFiltersSchema, paginationSchema } from '@/lib/validations/collaborator';

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    console.log('🔍 GET /api/collaborators - User:', user);
    
    const { searchParams } = new URL(req.url);
    
    // Parse and validate query parameters
    const filters = collaboratorFiltersSchema.parse({
      search: searchParams.get('search') || undefined,
      status: searchParams.get('status') || undefined,
      city: searchParams.get('city') || undefined,
      state: searchParams.get('state') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
    });

    console.log('🔍 Filters:', filters);

    const pagination = paginationSchema.parse({
      page: filters.page || 1,
      limit: filters.limit || 20,
    });

    console.log('🔍 Pagination:', pagination);

    const supabase = getSupabase();

    // Build the query
    let query = supabase
      .from('collaborators')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search;
      query = query.or(`name.ilike.%${searchTerm}%,cpf.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
    }

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.city) {
      query = query.eq('address_city', filters.city);
    }

    if (filters.state) {
      query = query.eq('address_state', filters.state);
    }

    // Apply pagination
    const offset = (pagination.page - 1) * pagination.limit;
    query = query
      .range(offset, offset + pagination.limit - 1)
      .order('created_at', { ascending: false });

    // Execute the query
    const { data: collaborators, error, count } = await query;

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { message: 'Erro ao buscar colaboradores', error: error.message },
        { status: 500 }
      );
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pagination.limit);

    console.log('✅ Success - Total:', total, 'TotalPages:', totalPages, 'Returned:', collaborators?.length || 0);

    return NextResponse.json({
      collaborators: collaborators || [],
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages,
    });

  } catch (error) {
    console.error('❌ Error in GET /api/collaborators:', error);
    
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { message: 'Parâmetros de busca inválidos', error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Erro interno do servidor', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
});

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    // Check if user has permission to create collaborators
    if (user.role !== 'admin' && user.role !== 'coordinator') {
      return NextResponse.json(
        { message: 'Sem permissão para criar colaboradores' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const supabase = getSupabase();

    // Insert the new collaborator
    const { data: collaborator, error } = await supabase
      .from('collaborators')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Error creating collaborator:', error);
      
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { message: 'CPF já cadastrado' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: 'Erro ao criar colaborador' },
        { status: 500 }
      );
    }

    return NextResponse.json(collaborator, { status: 201 });

  } catch (error) {
    console.error('Error in POST /api/collaborators:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
});
