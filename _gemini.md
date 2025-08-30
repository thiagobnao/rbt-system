# Guia Consolidado de Regras e Convenções do Projeto

Este documento consolida todas as regras, convenções e diretrizes do projeto em um guia unificado para assistentes de IA.

## 📋 Sumário

- [Regras Globais](#regras-globais)
- [TypeScript e Padrões de Programação](#typescript-e-padrões-de-programação)
- [Next.js e App Router](#nextjs-e-app-router)
- [Integrações e Bibliotecas](#integrações-e-bibliotecas)
- [Convenções de Projeto](#convenções-de-projeto)
- [Gestão de Estado e Performance](#gestão-de-estado-e-performance)
- [Estrutura de Arquivos e Nomenclatura](#estrutura-de-arquivos-e-nomenclatura)
- [Fluxo de Trabalho com Taskmaster](#fluxo-de-trabalho-com-taskmaster)
- [Manutenção e Melhoria de Regras](#manutenção-e-melhoria-de-regras)

---

## Regras Globais

- **Comunicação:**
  - Sempre responder em português brasileiro (pt-br)
  - Sempre comentar o código em pt-br como um professor comenta o código para um aprendiz
  - Fornecer explicações breves, objetivas e concisas
  - Nunca assumir informações que não foram explicitamente fornecidas

- **Princípios Fundamentais:**
  - Seguir o princípio DRY (Don't Repeat Yourself)
  - Preferir padrões funcionais e declarativos
  - Evitar classes; usar componentes funcionais
  - Focar em modularização e reutilização de código

---

## TypeScript e Padrões de Programação

- **Uso do TypeScript:**
  - Usar TypeScript para todo o código
  - Preferir interfaces sobre types
  - Evitar enums; usar objetos const ou asserções as const
  - Usar componentes funcionais com interfaces TypeScript
  - Usar arrow functions para componentes e handlers

- **Padrões de Programação:**
  - Escrever código TypeScript conciso e técnico com exemplos precisos
  - Usar padrões funcionais e declarativos
  - Preferir iteração e modularização sobre duplicação de código
  - Evitar chaves desnecessárias em condicionais; usar sintaxe concisa para declarações simples
  - Usar JSX declarativo

- **Estrutura de Código:**
  - Usar nomes de variáveis descritivos com verbos auxiliares (ex: isLoading, hasError)
  - Estruturar arquivos: componente exportado, subcomponentes, helpers, conteúdo estático, tipos
  - Favorizar exports nomeados para componentes

---

## Next.js e App Router

- **Convenções do App Router:**
  - Usar convenções do Next.js App Router para data fetching e rotas de API
  - Implementar estratégias eficientes de cache e revalidação usando recursos nativos do Next.js
  - Usar route handlers (route.ts) para rotas de API no App Router
  - Implementar error boundaries e arquivos error.tsx para tratamento de erros
  - Usar arquivos loading.tsx para gerenciar estados de carregamento
  - Usar a API de metadata do Next.js 14 para otimização de SEO
  - Seguir a documentação do Next.js para Data Fetching, Rendering e Routing

- **Otimização de Performance:**
  - Minimizar 'use client', 'useEffect' e 'useState'; favorecer React Server Components (RSC)
  - Envolver componentes client em Suspense com fallback
  - Usar carregamento dinâmico para componentes não críticos
  - Otimizar imagens: usar componente Image do Next.js, incluir dados de tamanho, implementar lazy loading
  - Otimizar Web Vitals (LCP, CLS, FID)

- **Componentes Client:**
  - Limitar 'use client':
    - Favorecer server components e SSR do Next.js
    - Usar apenas para acesso a Web APIs em componentes pequenos
    - Evitar para data fetching ou gestão de estado

---

## Integrações e Bibliotecas

- **Banco de Dados (Supabase):**
  - Usar Supabase SDK para data fetching e consultas
  - Para criação de modelo de dados, usar o schema builder do Supabase

- **UI e Estilização (Shadcn UI, Radix, Tailwind):**
  - Usar Shadcn UI, Radix e Tailwind para componentes e estilização
  - Implementar design responsivo com Tailwind CSS; usar abordagem mobile-first

- **IA (Vercel AI SDK):**
  - Usar Vercel AI SDK para construir recursos com IA
  - Implementar AI SDK Core para gerar texto, objetos estruturados e tool calls com LLMs
  - Utilizar hooks UI do AI SDK para construir interfaces de chat
  - Aproveitar AI SDK RSC para interfaces generativas com streaming usando React Server Components

---

## Convenções de Projeto

- **Gestão de Estado de URL:**
  - Usar 'nuqs' para gestão de estado de parâmetros de busca na URL

- **Estrutura de Arquivos:**
  - Usar minúsculas com hífens para diretórios (ex: components/auth-wizard)
  - Organizar arquivos: componente exportado, subcomponentes, helpers, conteúdo estático, tipos

---

## Gestão de Estado e Performance

- **Componentes Server vs Client:**
  - Favorecer React Server Components (RSC) sobre componentes client
  - Usar 'use client' apenas quando necessário para Web APIs
  - Implementar Suspense com fallback para componentes client
  - Otimizar carregamento de imagens com Next.js Image

- **Otimização:**
  - Implementar lazy loading para componentes não críticos
  - Otimizar Web Vitals (LCP, CLS, FID)
  - Usar estratégias eficientes de cache e revalidação

---

## Estrutura de Arquivos e Nomenclatura

- **Nomenclatura:**
  - Usar minúsculas com hífens para diretórios (ex: components/auth-wizard)
  - Usar nomes descritivos com verbos auxiliares para variáveis (ex: isLoading, hasError)
  - Favorizar exports nomeados para componentes

- **Organização:**
  - Estruturar arquivos: componente exportado, subcomponentes, helpers, conteúdo estático, tipos
  - Manter componentes funcionais com interfaces TypeScript

---

## Fluxo de Trabalho com Taskmaster

### Ciclo Básico de Desenvolvimento

1. **`list`**: Mostrar o que precisa ser feito
2. **`next`**: Ajudar a decidir o que trabalhar
3. **`show <id>`**: Fornecer detalhes para uma tarefa específica
4. **`expand <id>`**: Quebrar uma tarefa complexa em subtarefas menores
5. **Implementar**: O usuário escreve o código e testa
6. **`update-subtask`**: Registrar progresso e descobertas
7. **`set-status`**: Marcar tarefas e subtarefas como 'done'
8. **Repetir**

### Workflow Padrão (Ponto de Partida)

- Operar dentro do contexto da tag `master` para novos projetos
- Iniciar projetos com `initialize_project` ou `parse_prd`
- Configurar conjuntos de regras durante a inicialização
- Começar sessões de código com `get_tasks` para ver tarefas atuais
- Determinar a próxima tarefa com `next_task`
- Analisar complexidade com `analyze_project_complexity` antes de quebrar tarefas
- Revisar relatório de complexidade com `complexity_report`
- Selecionar tarefas baseado em dependências, prioridade e ordem de ID
- Ver detalhes específicos com `get_task`
- Quebrar tarefas complexas com `expand_task`
- Implementar código seguindo detalhes, dependências e padrões do projeto
- Marcar tarefas completadas com `set_task_status`
- Atualizar tarefas dependentes quando implementação difere do plano original

### Workflows Avançados com Tags

- **Git Feature Branching**: Criar tags que espelham nomes de branches
- **Colaboração em Equipe**: Criar tags separadas para evitar conflitos
- **Experimentos ou Refators Arriscados**: Usar tags sandboxed para trabalho experimental
- **Iniciativas de Features Grandes**: Abordagem estruturada com PRDs
- **Desenvolvimento Baseado em Versão**: Adaptar abordagem baseada na maturidade do projeto

### Ferramentas Principais

- **MCP Tools (Recomendado)**: Melhor performance, dados estruturados e tratamento de erros
- **CLI Commands**: Interface amigável para interação direta ou fallback
- **Sistema de Tags**: Suporte completo para listas de tarefas com tags para gerenciamento multi-contexto

---

## Manutenção e Melhoria de Regras

### Gatilhos para Melhoria

- Novos padrões de código não cobertos por regras existentes
- Implementações similares repetidas em múltiplos arquivos
- Padrões de erro comuns que poderiam ser prevenidos
- Novas bibliotecas ou ferramentas sendo usadas consistentemente
- Melhores práticas emergentes no codebase

### Processo de Análise

- Comparar novo código com regras existentes
- Identificar padrões que devem ser padronizados
- Procurar referências à documentação externa
- Verificar padrões consistentes de tratamento de erros
- Monitorar padrões de teste e cobertura

### Atualizações de Regras

- **Adicionar Novas Regras Quando:**
  - Uma nova tecnologia/padrão é usado em 3+ arquivos
  - Bugs comuns poderiam ser prevenidos por uma regra
  - Code reviews repetidamente mencionam o mesmo feedback
  - Novos padrões de segurança ou performance emergem

- **Modificar Regras Existentes Quando:**
  - Melhores exemplos existem no codebase
  - Casos edge adicionais são descobertos
  - Regras relacionadas foram atualizadas
  - Detalhes de implementação mudaram

### Verificações de Qualidade

- Regras devem ser acionáveis e específicas
- Exemplos devem vir do código atual
- Referências devem estar atualizadas
- Padrões devem ser consistentemente aplicados

### Melhoria Contínua

- Monitorar comentários de code review
- Rastrear perguntas comuns de desenvolvimento
- Atualizar regras após refators maiores
- Adicionar links para documentação relevante
- Referenciar regras relacionadas

### Referências de Arquivos

- Usar links markdown padrão `[nome-do-arquivo](./caminho/para/arquivo.ext)` para referenciar arquivos

### Exemplos de Código

- Usar blocos de código específicos da linguagem
- Mostrar exemplos corretos (✅ DO) e anti-padrões (❌ DON'T)
- Referenciar código atual quando possível
- Manter exemplos sincronizados com o código

### Deprecação de Regras

- Marcar padrões desatualizados como deprecated
- Remover regras que não se aplicam mais
- Atualizar referências a regras deprecated
- Documentar caminhos de migração para padrões antigos

### Atualizações de Documentação

- Manter exemplos sincronizados com o código
- Atualizar referências à documentação externa
- Manter links entre regras relacionadas
- Documentar breaking changes

---
