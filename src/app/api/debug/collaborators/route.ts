import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 DEBUG: Checking collaborators table...');
    
    const supabase = getSupabase();
    
    // Check if table exists and has data
    const { data: collaborators, error, count } = await supabase
      .from('collaborators')
      .select('*', { count: 'exact' })
      .limit(5);

    console.log('🔍 DEBUG: Supabase response:', { 
      collaborators: collaborators?.length, 
      error: error?.message, 
      count 
    });

    if (error) {
      console.error('❌ DEBUG: Error fetching collaborators:', error);
      return NextResponse.json(
        { 
          message: 'Erro ao buscar colaboradores', 
          error: error.message,
          code: error.code 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Debug info',
      totalCount: count || 0,
      sampleData: collaborators || [],
      hasData: (collaborators && collaborators.length > 0)
    });

  } catch (error) {
    console.error('❌ DEBUG: Error in debug route:', error);
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
