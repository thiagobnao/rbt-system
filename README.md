# Documentação Técnica do Projeto

Este documento detalha a arquitetura técnica, tecnologias e estrutura do projeto, servindo como um guia para a equipe de desenvolvimento.

## Stack de Tecnologias

- **Linguagem Principal:** TypeScript 5.9.2
- **Framework:** Next.js 15.5.2 (com App Router)
- **Backend e Banco de Dados:** Supabase 2.56.1 (PostgreSQL)
- **UI Framework:** React 19.1.1
- **Estilização:** Tailwind CSS 3.4.17
- **Componentes UI:** shadcn/ui (Radix UI)
- **Gerenciamento de Formulários:** React Hook Form 7.62.0
- **Validação de Esquemas:** Zod 4.1.5
- **Autenticação:** Supabase Auth Helpers 0.9.0, com JWT e bcryptjs para manipulação de senhas
- **Notificações:** Sonner 2.0.7
- **Ícones:** Lucide React 0.542.0

## Sistema de Design (Design System)

O projeto adota uma abordagem de sistema de design para garantir consistência visual e acelerar o desenvolvimento da interface.

- **Componentes Fundamentais:** A base do UI é construída com **shadcn/ui**, que fornece componentes acessíveis e não estilizados, permitindo total customização através do Tailwind CSS.
- **Componentes Avançados:** Para interações mais complexas e visualmente ricas, o **Aceternity UI** é utilizado.
- **Layout e Estrutura:** O layout principal da aplicação é composto por um `PageLayout` que inclui uma barra lateral (`Sidebar`) fixa e um cabeçalho (`Header`) superior, garantindo uma navegação consistente.
- **Responsividade:** O design é totalmente responsivo, com breakpoints definidos para otimizar a experiência em desktops, tablets e dispositivos móveis.

## Estrutura do Projeto

A organização dos diretórios segue as convenções do Next.js e melhores práticas para separação de responsabilidades.

- **`src/app/`**: Contém as páginas e rotas da aplicação, utilizando o App Router do Next.js.
  - **`api/`**: Endpoints de backend da aplicação, como login, registro e operações CRUD para os módulos.
  - **`[page]/`**: Diretórios que representam as rotas da interface do usuário.

- **`src/components/`**: Componentes React reutilizáveis.
  - **`ui/`**: Componentes de UI genéricos gerados pelo `shadcn/ui`.
  - **`[feature]/`**: Componentes específicos de uma funcionalidade, como `CollaboratorForm`.

- **`src/lib/`**: Lógica central e código de suporte da aplicação.
  - **`supabase.ts`**: Configuração e inicialização do cliente Supabase.
  - **`auth.ts`**: Lógica relacionada à autenticação e gerenciamento de sessão.
  - **`services/`**: Camada de serviço para interagir com o backend e o banco de dados (ex: `collaboratorService.ts`).
  - **`validations/`**: Esquemas de validação (Zod) para os dados da aplicação.
  - **`types/`**: Definições de tipos TypeScript para as entidades do projeto.

- **`supabase/`**: Configuração e migrações do banco de dados gerenciadas pelo Supabase.
  - **`migrations/`**: Arquivos SQL que definem o schema do banco de dados.

## Especificidades e Pontos Críticos

- **Variáveis de Ambiente:** O projeto depende de um arquivo `.env.local` para configurar as credenciais de acesso ao Supabase. As variáveis necessárias estão listadas no arquivo `.env.example`. As chaves principais são:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- **Banco de Dados:** A integração com o Supabase é o núcleo do backend. As migrações de banco de dados são gerenciadas pela CLI do Supabase e devem ser mantidas no diretório `supabase/migrations` para garantir a consistência do schema entre os ambientes.

- **Autenticação:** O fluxo de autenticação é implementado utilizando as rotas em `src/app/api/auth/` e o `@supabase/auth-helpers-nextjs`. A verificação de sessão e proteção de rotas são pontos críticos a serem observados.

- **Módulo Principal (Colaboradores):** A funcionalidade de gerenciamento de "Colaboradores" é o principal exemplo da arquitetura do sistema, abrangendo desde a definição do schema no banco de dados, passando pelos serviços de backend, até os componentes de UI no frontend.
