PRD FrontEnd
============

Resumo de uso
------------

Este PRD descreve, de forma concisa e objetiva, as estruturas de layout, os componentes de interface e os wireframes textuais do projeto. Não contém código, apenas definições e guias visuais para a equipe de frontend.

1. Estrutura de Layout

- Sidebar (menu lateral)
  - Fixa à esquerda em telas grandes.
  - Lista de navegação principal com ícone + rótulo por item.
  - Suporta agrupamento de seções e estados colapsado/expandido.

- Header (cabeçalho)
  - Barra superior com logo/título, breadcrumbs, notificações, avatar do usuário e alternância de tema.
  - Exibe contexto da página e ações rápidas.

- Área de Conteúdo Principal
  - Espaço central para páginas: dashboard, listas, formulários, detalhes.
  - Conteúdo organizado em seções com título, filtros e ações.

- Modais / Diálogos
  - Sobrepõem o conteúdo, fundo escurecido.
  - Usados para confirmações, formulários rápidos e visualização de detalhes.

- Cards e Grades
  - Cards para métricas e resumos, dispostos em grid responsivo.

- Tabelas de Dados
  - Listagens com cabeçalho, filtros, paginação e ações por linha (editar, excluir, ver).

- Formulários
  - Campos agrupados, validação inline, botões de ação (salvar/cancelar).

- Breadcrumbs
  - Trilhas de navegação para contexto de localização dentro da aplicação.

- Notificações / Toasts
  - Mensagens temporárias de sucesso, erro ou aviso, desaparecendo automaticamente.

2.Componentes e Bibliotecas (adaptado à stack alvo)

- UI / Estilo
  - Tailwind CSS: utilitários para espaçamento, tipografia, grid e responsividade.

- Componentes Acessíveis
  - Radix UI: usar primitives e componentes (Dialog, Toast, DropdownMenu, Avatar, Switch, NavigationMenu/Popover) para garantir acessibilidade e comportamento consistente.

- Formulários e Validação
  - React Hook Form: controle e performance dos formulários.
  - Zod: schemas de validação integrados ao React Hook Form.

- Autenticação e Backend
  - Supabase (Postgres) como banco; autenticação do backend com JWT e bcrypt conforme stack especificada.

- Estado e Hooks
  - Preferir hooks e contextos locais para estado de UI (tema, toasts, auth). Evitar libs globais pesadas a menos que necessário.

3.Padrões de Componentização (diretrizes rápidas)

- Componentes pequenos e reutilizáveis: Botão, Input, Select, Modal, Card, TableRow.
- Separar componentes de layout (Sidebar, Header, PageLayout) de componentes funcionais (FormFields, Tables, Charts).
- Usar Radix para primitives acessíveis e Tailwind para aparência.
- Formularios: criar componentes de campo que integrem React Hook Form + Zod (mensagens de erro visíveis abaixo do campo).

4.Wireframes textuais (telas principais)

- Dashboard

  Header: Logo | Breadcrumbs | Notificações | Avatar | Tema
  Sidebar: Menu Principal (Dashboard, Escolas, Colaboradores, Concursos, ...)
  Conteúdo: Grid de cards com métricas, painel de atividade recente, atalhos rápidos.

- Listagem (Ex.: Escolas)

  Header: título da página, botão "Novo" à direita
  Filtros/Busca acima da tabela
  Tabela: colunas (Nome, Código, Município, Status, Ações)
  Cada linha: ações (Editar, Excluir, Ver)

- Formulário (Cadastro / Edição)

  Título + Breadcrumbs
  Formulário em cartão central: campos (texto, selects, checkboxes)
  Botões: Salvar (primário), Cancelar (secundário)

- Modal / Diálogo

  Caixa central com título, conteúdo (mensagem ou formulário) e botões Confirmar/Cancelar
  Fundo escuro semi-transparente

- Notificações / Toasts

  Pequenos balões no canto superior direito ou inferior; desaparecem após alguns segundos

- Responsividade

  - Sidebar recolhe para um menu hamburguer em telas pequenas.
  - Grids e tabelas colapsam para uma ou duas colunas conforme a largura.

5.Observações importantes

- Este documento é estritamente descritivo: não contém código nem decisões de implementação fora da stack informada.
- Servirá como referência visual e estrutural do projeto.

6.Detalhamento dos wireframes

Esta seção expande os wireframes textuais já apresentados, detalhando áreas, comportamentos e variações para cada tela principal.

- Dashboard (visão principal)
  - Cabeçalho
    - Elementos: logo/título à esquerda, breadcrumbs (quando aplicável), área de ações rápidas (busca, filtros), ícone de notificações, avatar do usuário, alternância de tema.
    - Comportamento: ações rápidas podem abrir painéis ou popovers; notificações mostram um dropdown com itens recentes.

  - Sidebar
    - Elementos: lista vertical de itens com ícone e rótulo; agrupadores com subtítulos; item ativo destacado.
    - Estados: expandida (ícone + rótulo), colapsada (apenas ícones) e escondida em mobile (menu hamburger).

  - Conteúdo
    - Topo: título da página, filtros de contexto e botões de ação (ex.: "Novo").
    - Corpo: grid de cards (métricas) em uma linha ou múltiplas colunas conforme largura; painel de atividade recente listado abaixo ou à direita.
    - Empty state: cards mostram placeholder e botão de ação principal disponível.

- Listagem (ex.: Escolas)
  - Cabeçalho da página com título e botão "Novo" alinhado à direita.
  - Barra de filtros/ações: campos de busca, selects para status/município, botão para limpar filtros e exportar (se aplicável).
  - Tabela principal: cabeçalho persistente; linhas com dados; coluna de ações com menu dropdown (ver, editar, excluir).
  - Paginação: controle no rodapé da tabela com número de páginas e botão para próximo/anterior.
  - Estados: loading (skeleton rows), empty (mensagem e botão "Novo"), error (mensagem e ação para tentar novamente).

- Formulário (Cadastro / Edição)
  - Layout em cartão centralizado com título e breadcrumb acima.
  - Campos dispostos em uma ou duas colunas conforme importância. Campos principais no topo.
  - Validação: erros exibidos abaixo do campo; campos com erro recebem destaque visual.
  - Ações: botões "Salvar" (primário) e "Cancelar" (secundário); salvar pode abrir um toast de sucesso e fechar/redirect.

- Modal / Diálogo
  - Caixa central com título, corpo e área de ações.
  - Usos típicos: confirmação de exclusão, edição rápida, detalhes rápidos.
  - Fechamento: botão cancelar, botão fechar (x), clique fora (configurável), tecla ESC.

- Notificações / Toasts
  - Localização: canto superior direito (ou inferior direito) com empilhamento vertical.
  - Conteúdo: título curto, mensagem e opcional ação (ex.: desfazer).
  - Tempo: visibilidade curta (ex.: 3–5s) com possibilidade de persistência para erros críticos.

- Responsividade e regras gerais
  - Breakpoints: adaptar grids e colunas; em mobile o conteúdo principal deve ficar em uma coluna única.
  - Sidebar: transforma-se em drawer/hamburger no mobile.
  - Tabelas: podem virar listas ou cards em telas pequenas.

7.Especificação de componentes para equipe de frontend

As descrições abaixo orientam a criação de componentes reutilizáveis, seu propósito, entradas e comportamentos esperados, sem detalhes de implementação.

- Layout / Estruturais
  - PageLayout
    - Propósito: envolver páginas, posicionando Sidebar, Header e área de conteúdo.
    - Entradas: título opcional, breadcrumb, flags de layout (com ou sem sidebar).
    - Comportamentos: responsividade da sidebar, ajuste do conteúdo, foco inicial quando necessário.

  - Sidebar
    - Propósito: navegação principal do app.
    - Entradas: lista de itens (rótulo, rota, ícone, grupo), item ativo.
    - Estados: expanded, collapsed, hidden (mobile).
    - Acessibilidade: navegação por teclado, aria-current no item ativo.

  - Header
    - Propósito: ações globais, contexto da página e atalhos do usuário.
    - Entradas: breadcrumb, ações (array de botões), notificações count, user info.
    - Comportamentos: abrir popovers para notificações e menu do usuário.

- Elementos de visualização
  - Card
    - Propósito: mostrar métricas ou resumo de informação.
    - Entradas: título, valor, subtítulo, ícone, ações opcionais.
    - Variantes: pequeno, médio, grande; com/sem gráfico.

  - Grid
    - Propósito: organizar cards ou blocos responsivamente.
    - Comportamentos: ajustar colunas por breakpoint.

- Listagem e Tabela
  - Table
    - Propósito: exibir coleções tabulares com cabeçalho, ordenação e seleção opcional.
    - Entradas: colunas (rótulo, key, sortable), rows (objetos de dados), ações por linha.
    - Estados: loading, empty, error.

  - TableRow
    - Propósito: representar uma linha de dados na tabela.
    - Entradas: dados do item, ações (menu).
    - Comportamentos: highlight ao passar o mouse, foco por teclado.

  - Pagination
    - Propósito: controlar navegação entre páginas de dados.
    - Entradas: página atual, total de páginas, callbacks para mudança.

- Filtros / Barra de Ações
  - FiltersBar
    - Propósito: agrupar controles de busca e filtros para a listagem.
    - Entradas: schema de filtros (texto, select, date), estado atual.
    - Comportamentos: aplicar, limpar, abrir painel avançado.

- Formulários e campos
  - FormCard (container de formulário)
    - Propósito: embalar formulários com cabeçalho, corpo e ações.
    - Entradas: título, descrição, children (campos), onSubmit.

  - InputField
    - Propósito: campo de texto controlado por React Hook Form.
    - Entradas: name, label, placeholder, validation message.
    - Estados: normal, focus, error, disabled.
    - Integração: exibir mensagens do Zod/React Hook Form.

  - SelectField
    - Propósito: escolher uma opção entre várias.
    - Entradas: name, label, options (valor/rótulo), placeholder.
    - Estados: loading (quando opções vêm de API), error.

  - Checkbox / Switch
    - Propósito: valores booleanos ou toggles.
    - Entradas: name, label, checked.

  - DateField
    - Propósito: seleção de data (ou intervalo).
    - Entradas: value, onChange, placeholder.

  - FieldGroup
    - Propósito: agrupar campos relacionados (endereço, contato).

- Modais e diálogos
  - Modal / Dialog
    - Propósito: exibir conteúdo modal (formulários, confirmações).
    - Entradas: title, body, actions (confirm/cancel), open flag.
    - Comportamentos: trap de foco, fechamento por ESC, clique fora opcional.

  - ConfirmationDialog
    - Propósito: confirmar ações críticas (ex.: exclusão).
    - Entradas: message, onConfirm, onCancel.

- Feedback e notificações
  - Toast
    - Propósito: mensagens temporárias de feedback.
    - Entradas: tipo (sucesso, erro, info), message, action opcional.
    - Comportamentos: tempo de vida, possibilidade de ação (ex.: desfazer).

  - InlineAlert
    - Propósito: mensagens persistentes dentro da página (erro de carregamento, aviso importante).

- Identidade e navegação
  - Avatar
    - Propósito: exibir o usuário atual (foto, iniciais).
    - Entradas: src, name; ao clicar abre menu com ações de conta.

  - Breadcrumbs
    - Propósito: indicar hierarquia de navegação.
    - Entradas: lista de itens (label, href opcional).

  - NavigationMenu
    - Propósito: estruturas de menu com seções e submenus (usar Radix primitives quando necessário).

- Hooks e integrações (descrição concisa)
  - useAuth (descrição)
    - Propósito: gerenciar estado de autenticação no frontend (login, logout, user).
    - Integração: ações que conversam com backend/Supabase; exposições: user, isAuthenticated, loading, login(), logout().

  - useToast / ToastProvider
    - Propósito: expor API para disparar toasts globalmente.

  - Form helpers
    - Propósito: padrões para integrar React Hook Form com Zod, centralizando mensagens e tratamento de erros.

FIM
