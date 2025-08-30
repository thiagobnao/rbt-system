import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    console.log('🌱 DEBUG: Seeding collaborators table...');
    
    const supabase = getSupabase();
    
    // First, let's check if there are already collaborators
    const { data: existingCollaborators, error: checkError } = await supabase
      .from('collaborators')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('❌ DEBUG: Error checking existing collaborators:', checkError);
      return NextResponse.json(
        { 
          message: 'Erro ao verificar colaboradores existentes', 
          error: checkError.message,
          code: checkError.code 
        },
        { status: 500 }
      );
    }

    if (existingCollaborators && existingCollaborators.length > 0) {
      console.log('ℹ️ DEBUG: Collaborators already exist, skipping seed');
      return NextResponse.json({
        message: 'Colaboradores já existem na tabela',
        existingCount: existingCollaborators.length
      });
    }

    // Sample collaborators data from seed.sql
    const sampleCollaborators = [
      {
        name: 'João Silva Santos',
        cpf: '123.456.789-01',
        birth_date: '1985-03-15',
        rg: '12.345.678-9',
        rg_issuer: 'SSP/SP',
        email: 'joao.silva@email.com',
        phone: '(11) 3333-4444',
        mobile_phone: '(11) 99999-8888',
        address_street: 'Rua das Flores',
        address_number: '123',
        address_complement: 'Apto 45',
        address_neighborhood: 'Centro',
        address_city: 'São Paulo',
        address_state: 'SP',
        address_zip_code: '01234-567',
        bank_name: 'Banco do Brasil',
        bank_agency: '0001',
        bank_account: '12345-6',
        bank_account_type: 'corrente',
        pix_key: 'joao.silva@email.com',
        pix_key_type: 'email',
        status: 'active'
      }
    ];

    console.log('🌱 DEBUG: Attempting to insert', sampleCollaborators.length, 'collaborators...');

    // Insert sample data one by one to better handle errors
    const insertedCollaborators = [];
    for (const collaborator of sampleCollaborators) {
      const { data: insertedCollaborator, error } = await supabase
        .from('collaborators')
        .insert(collaborator)
        .select()
        .single();

      if (error) {
        console.error('❌ DEBUG: Error inserting collaborator:', collaborator.name, error);
        return NextResponse.json(
          { 
            message: `Erro ao inserir colaborador ${collaborator.name}`, 
            error: error.message,
            code: error.code 
          },
          { status: 500 }
        );
      }

      insertedCollaborators.push(insertedCollaborator);
      console.log('✅ DEBUG: Successfully inserted', collaborator.name);
    }

    console.log('✅ DEBUG: Successfully seeded', insertedCollaborators.length, 'collaborators');

    return NextResponse.json({
      message: 'Dados de exemplo inseridos com sucesso',
      insertedCount: insertedCollaborators.length,
      collaborators: insertedCollaborators
    });

  } catch (error) {
    console.error('❌ DEBUG: Error in seed route:', error);
    return NextResponse.json(
      { 
        message: 'Erro interno do servidor', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
