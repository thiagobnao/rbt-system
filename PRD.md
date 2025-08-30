# **Documento de Requisitos de Produto (PRD) – RBT System v1.0**

## **1. Visão Geral**

O RBT System é uma aplicação web projetada para centralizar, automatizar e proteger as informações críticas relacionadas à organização de concursos públicos. O problema central que o sistema resolve é a alta dependência de planilhas, e-mails e documentos físicos, um processo que acarreta riscos operacionais, excesso de trabalho manual e estresse para a equipe de coordenação. A solução visa estabelecer uma fonte única da verdade, garantindo segurança, controle de processos e a capacidade de gerar trilhas de auditoria confiáveis.

## **2. Usuários e Perfis (Personas)**

O sistema atenderá aos seguintes perfis de usuários, cada um com níveis de acesso distintos para garantir a segurança e a relevância das funcionalidades apresentadas:

* **Admin:** Possui acesso total ao sistema. É responsável pelas configurações gerais, como a gestão de usuários e parâmetros globais. Seu principal benefício é a capacidade de gerenciar todas as informações e funcionalidades da plataforma de forma centralizada.
* **Coordenador (Usuário com Permissões Específicas):** O principal usuário operacional do sistema. É responsável por criar e gerenciar os eventos (concursos), alocar colaboradores, definir equipes para locais de prova, inserir dados pós-evento (como a lista de presença) e gerar relatórios. O benefício é ter uma gestão focada e integrada de todas as etapas de um evento.
* **Usuário Comum:** Possui acesso restrito a funcionalidades específicas, conforme as permissões atribuídas pelo Admin. A interface é adaptada ao seu nível de acesso, focando apenas nas tarefas relevantes para sua função.

## **3. Escopo e Funcionalidades (MVP v1.0)**

A primeira versão do sistema (MVP) focará na resolução do fluxo mais crítico: a gestão de colaboradores e a organização logística de um evento.

### **3.1. Módulo 1: Gestão de Cadastros Essenciais (Fundação)**

* **Cadastro de Colaboradores:** Uma base de dados única e centralizada para todos os colaboradores, contendo dados pessoais (Nome, RG, CPF, PIS/PASEP), endereço, contato e dados bancários (banco, conta, agência, chave Pix). Os campos críticos terão validação para minimizar erros.
* **Cadastro de Escolas/Locais:** Um dossiê digital para cada local de prova, registrando endereço, contatos, estrutura e, crucialmente, a capacidade de cada sala com base no tipo de mobiliário.
* **Cadastro de Concursos/Eventos:** Funcionalidade para criar um novo evento, definindo nome, data, banca organizadora associada e previsão de inscritos.

### **3.2. Módulo 2: Fluxo Operacional do Evento**

* **Alocação de Colaboradores:** Ferramenta para atribuir colaboradores a locais e funções específicas para cada concurso, com alertas para evitar dupla alocação.
* **Confirmação de Presença:** Após o evento, o Coordenador acessará uma tela com a lista de colaboradores alocados para marcar manualmente o status de "Presente" ou "Ausente", com base na lista de presença física.
* **Configuração de Valores de Pagamento:** Dentro do cadastro de cada evento, o Coordenador poderá configurar a tabela de valores de ajuda de custo para cada função (ex: Fiscal, Apoio), garantindo flexibilidade para diferentes concursos.

### **3.3. Módulo 3: Saídas e Controles**

* **Cálculo de Pagamento Automatizado:** O sistema cruzará as informações de alocação, a lista de presença confirmada e a tabela de valores do evento para calcular os pagamentos de forma automática.
* **Relatórios Financeiros:** Geração de um relatório essencial de "Histórico de Pagamentos por Colaborador", detalhando o nome, CPF, chave Pix, o valor total a receber e um detalhamento por evento.
* **Gestão de Ofícios (Simplificada):** Funcionalidade para gerar ofícios individuais para órgãos públicos (ex: polícia, bombeiros), utilizando modelos pré-definidos. O sistema permitirá o controle de status (Pendente, Enviado, Recebido) e o anexo do protocolo de recebimento.

## **4. Requisitos Não-Funcionais**

* **Usabilidade:** O sistema deve possuir um design responsivo, com layout adaptável para desktops, tablets e celulares. A navegação deve ser simples e intuitiva, organizada através de um menu lateral.
* **Segurança:**
  * **Acesso:** Autenticação baseada em login e senha, com proteção de rotas e sessões que expiram após inatividade.
  * **Auditoria:** O sistema deve registrar um log de auditoria para ações críticas (ex: criação/alteração de colaboradores, alteração de valores de pagamento, geração de ofícios) para garantir a rastreabilidade.
  * **LGPD:** O sistema deve ser desenvolvido em conformidade com a Lei Geral de Proteção de Dados, garantindo o tratamento adequado de dados pessoais sensíveis.
* **Desempenho:**
  * O sistema deve suportar até 50 usuários simultâneos sem degradação perceptível na performance.
  * A geração de relatórios financeiros deve ser uma operação rápida, com resultados exibidos de forma "instantânea" para o usuário.

## **5. Arquitetura Técnica**

* **Frontend:** Next.js, TypeScript.
* **UI Libraries:** Shadcn, Aceternity UI.
* **Backend & Banco de Dados:** Supabase.
* **Infraestrutura/Deploy:** Vercel.

## **6. Roadmap de Desenvolvimento (MVP v1.0)**

A construção seguirá uma ordem lógica para garantir uma base estável e entrega de valor incremental.

1. **Fase 1: Fundação**
    * Configuração do ambiente de desenvolvimento (Next.js, Supabase).
    * Implementação do sistema de Autenticação, Níveis de Acesso e Gestão de Perfil.
    * Desenvolvimento dos módulos de cadastro base: Colaboradores, Escolas/Locais e Bancas Organizadoras.

2. **Fase 2: O Fluxo Principal**
    * Desenvolvimento do módulo de Gestão de Concursos/Eventos.
    * Implementação da tela de Alocação de Colaboradores e da tela de Confirmação de Presença manual.
    * Criação da funcionalidade de configuração de valores de pagamento por evento.

3. **Fase 3: Módulos de Suporte e Saídas**
    * Desenvolvimento do Módulo Financeiro, com foco no cálculo automatizado.
    * Implementação da geração do Relatório de Histórico de Pagamentos.
    * Desenvolvimento do Módulo de Gestão de Ofícios (versão simplificada).

## **7. Riscos e Mitigações**

* **Risco de Adoção pela Equipe:** A transição de um processo manual (planilhas) para um sistema novo pode encontrar resistência.
  * **Mitigação:** Focar em uma interface de usuário extremamente intuitiva. Planejar sessões de treinamento e onboarding com a equipe antes do lançamento oficial.
* **Risco de Migração de Dados:** A importação de dados existentes de colaboradores e escolas pode ser complexa e suscetível a erros.
  * **Mitigação:** Planejar uma fase de "higienização" das planilhas existentes antes da importação. Desenvolver um script ou ferramenta de importação robusto e testá-lo exaustivamente em um ambiente de homologação.
* **Risco de Complexidade da Interface:** A flexibilidade de definir valores de pagamento por evento pode levar a uma tela de configuração complexa e confusa.
  * **Mitigação:** Projetar a interface de configuração de valores com foco máximo na clareza e simplicidade. Utilizar feedback visual claro para confirmar as ações do usuário e evitar erros de cadastro que impactariam os pagamentos.
