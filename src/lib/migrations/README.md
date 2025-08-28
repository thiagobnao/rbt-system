# Migrações do Banco de Dados

Este diretório contém as migrações SQL para configurar o banco de dados do RBT System.

## Estrutura dos Arquivos

- `001_create_users_table.sql` - Cria a tabela de usuários
- `001_create_users_table_rollback.sql` - Remove a tabela de usuários
- `002_create_collaborators_table.sql` - Cria a tabela de colaboradores
- `002_create_collaborators_table_rollback.sql` - Remove a tabela de colaboradores

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

## Migrações Disponíveis

### 001 - Users Table
- **Arquivo:** `001_create_users_table.sql`
- **Descrição:** Cria a tabela de usuários com autenticação
- **Dependências:** Nenhuma

### 002 - Collaborators Table
- **Arquivo:** `002_create_collaborators_table.sql`
- **Descrição:** Cria a tabela de colaboradores com RLS
- **Dependências:** 001 (users table)

## Verificação

### Após executar a migração 001 (users), verifique se:
- A tabela `users` foi criada
- Os índices foram criados
- O trigger `update_users_updated_at` foi criado
- A função `update_updated_at_column()` foi criada

### Após executar a migração 002 (collaborators), verifique se:
- A tabela `collaborators` foi criada
- Os índices foram criados
- Os triggers foram criados
- As políticas RLS foram aplicadas
- As funções auxiliares foram criadas
