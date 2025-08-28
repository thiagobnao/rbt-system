# Migrações do Banco de Dados

Este diretório contém as migrações SQL para configurar o banco de dados do RBT System.

## Estrutura dos Arquivos

- `001_create_users_table.sql` - Cria a tabela de usuários
- `001_create_users_table_rollback.sql` - Remove a tabela de usuários

## Como Executar

### 1. Via Supabase Dashboard
1. Acesse o projeto no Supabase Dashboard
2. Vá para SQL Editor
3. Execute o conteúdo de cada arquivo de migração em ordem

### 2. Via Supabase CLI
```bash
# Instalar Supabase CLI
npm install -g supabase

# Executar migração
supabase db push

# Fazer rollback
supabase db reset
```

### 3. Via psql (PostgreSQL direto)
```bash
psql -h your_host -U your_user -d your_database -f 001_create_users_table.sql
```

## Ordem de Execução

1. Execute as migrações em ordem numérica
2. Para rollback, execute os arquivos de rollback em ordem reversa

## Verificação

Após executar a migração, verifique se:
- A tabela `users` foi criada
- Os índices foram criados
- O trigger `update_users_updated_at` foi criado
- A função `update_updated_at_column()` foi criada
