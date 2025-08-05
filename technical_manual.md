# Manual Técnico do Sistema ROBERTA para Agentes Vibe Code

## 1. Introdução

Este manual técnico detalhado tem como objetivo nivelar e atualizar o conhecimento dos agentes da Vibe Code que atuarão no projeto do Sistema ROBERTA. Ele aborda a arquitetura, as tecnologias utilizadas, a estrutura do código, o processo de deploy e as funcionalidades implementadas, fornecendo uma base sólida para o desenvolvimento, manutenção e suporte do sistema.

O Sistema ROBERTA é uma plataforma de gestão de concursos públicos, desenvolvida para ser uma solução limpa, leve, escalável e de fácil manutenção. Sua concepção visa otimizar os processos internos e externos relacionados à organização e acompanhamento de concursos, desde o cadastro de informações até a geração de relatórios e a comunicação com as partes interessadas.

## 2. Visão Geral da Arquitetura

O Sistema ROBERTA adota uma arquitetura de microsserviços, dividida em duas camadas principais: Backend (API) e Frontend (Interface do Usuário). Essa separação permite o desenvolvimento independente, escalabilidade horizontal e maior flexibilidade na escolha de tecnologias para cada camada.

### 2.1. Diagrama de Arquitetura (Conceitual)

```mermaid
graph TD
    A[Usuário] -->|Acessa via Browser| B(Frontend - React)
    B -->|Requisições HTTP/JSON| C(Backend - Flask API)
    C -->|Interage com| D[Banco de Dados - SQLite]
    C -->|Integrações Externas (futuro)| E[Serviços de Terceiros]
```

### 2.2. Componentes da Arquitetura

-   **Frontend (Interface do Usuário):** Responsável pela apresentação dos dados e interação com o usuário. Desenvolvido como uma Single Page Application (SPA) que consome os serviços do Backend via API RESTful.
-   **Backend (API RESTful):** Atua como o cérebro do sistema, processando as requisições do frontend, interagindo com o banco de dados e implementando a lógica de negócio. Expõe endpoints RESTful para as operações do sistema.
-   **Banco de Dados:** Armazena todos os dados persistentes do sistema, como informações de usuários, concursos, escolas, etc. Para o ambiente de desenvolvimento e deploy atual, utiliza-se SQLite, que é um banco de dados leve e baseado em arquivo. Em ambientes de produção com maior volume de dados, pode ser facilmente migrado para soluções mais robustas como PostgreSQL ou MySQL.

## 3. Tecnologias Utilizadas

### 3.1. Backend

O backend do Sistema ROBERTA é construído com Python e o microframework Flask, conhecido por sua simplicidade e flexibilidade. A escolha do Flask permite um controle granular sobre os componentes e bibliotecas a serem utilizados, resultando em uma aplicação leve e performática.

-   **Linguagem:** Python 3.x
    -   **Versão:** 3.11.0rc1 (no ambiente de desenvolvimento/deploy)
-   **Framework Web:** Flask
    -   **Características:** Leve, flexível, ideal para APIs RESTful.
-   **ORM (Object-Relational Mapper):** SQLAlchemy
    -   **Função:** Facilita a interação com o banco de dados através de objetos Python, abstraindo a necessidade de escrever SQL puro.
-   **Banco de Dados:** SQLite
    -   **Uso:** Ambiente de desenvolvimento e deploy atual. Os dados são armazenados em um arquivo `.db`.
-   **Gerenciamento de Dependências:** `pip` e `requirements.txt`
-   **Segurança:**
    -   **Hashing de Senhas:** Utiliza `werkzeug.security` para armazenar senhas de forma segura (hashing com salting).
    -   **Sessões:** Gerenciamento de sessões para autenticação de usuários, garantindo que apenas usuários logados possam acessar rotas protegidas.
-   **CORS (Cross-Origin Resource Sharing):** `Flask-CORS`
    -   **Função:** Permite que o frontend (rodando em um domínio/porta diferente) faça requisições ao backend.

### 3.2. Frontend

O frontend é desenvolvido com React, uma biblioteca JavaScript popular para construção de interfaces de usuário dinâmicas e reativas. A combinação com Vite e Tailwind CSS proporciona um ambiente de desenvolvimento rápido e eficiente.

-   **Linguagem:** JavaScript (ES6+), JSX
-   **Biblioteca UI:** React
    -   **Características:** Componentização, Virtual DOM, hooks para gerenciamento de estado e ciclo de vida.
-   **Ferramenta de Build:** Vite
    -   **Características:** Servidor de desenvolvimento extremamente rápido, otimização para produção, hot module replacement (HMR).
-   **Estilização:** Tailwind CSS
    -   **Características:** Framework CSS utilitário, classes atômicas para construção rápida de layouts responsivos e customizáveis.
-   **Componentes UI:** Shadcn/ui
    -   **Características:** Coleção de componentes UI construídos com Radix UI e estilizados com Tailwind CSS, oferecendo acessibilidade e personalização.
-   **Gráficos:** Recharts
    -   **Características:** Biblioteca de gráficos baseada em React, fácil de usar para visualização de dados no dashboard.
-   **Ícones:** Lucide React
    -   **Características:** Biblioteca de ícones open-source, leves e personalizáveis.
-   **Gerenciamento de Pacotes:** `pnpm`
    -   **Características:** Gerenciador de pacotes rápido e eficiente, otimiza o uso de espaço em disco.

## 4. Estrutura do Projeto

O repositório do Sistema ROBERTA está organizado em dois diretórios principais, `roberta-backend` e `roberta-frontend`, refletindo a arquitetura separada das duas camadas.

```
rbt-system/
├── roberta-backend/             # Diretório do Backend (Flask)
│   ├── src/                     # Código-fonte do Backend
│   │   ├── models/              # Definições dos modelos de dados (SQLAlchemy)
│   │   │   ├── auth.py
│   │   │   ├── banca.py
│   │   │   ├── calendario.py
│   │   │   ├── colaborador.py
│   │   │   ├── comunicacao.py
│   │   │   ├── concurso.py
│   │   │   ├── escola.py
│   │   │   ├── financeiro.py
│   │   │   ├── fornecedor.py
│   │   │   ├── orgao.py
│   │   │   ├── rota.py
│   │   │   ├── secretaria.py
│   │   │   └── user.py
│   │   ├── routes/              # Definições das rotas da API (endpoints)
│   │   │   ├── auth.py
│   │   │   ├── concurso.py
│   │   │   ├── dashboard.py
│   │   │   └── user.py
│   │   ├── static/              # Arquivos estáticos do Frontend (deploy integrado)
│   │   ├── __init__.py          # Inicialização do Flask app
│   │   └── main.py              # Ponto de entrada principal do Backend
│   ├── venv/                    # Ambiente virtual Python (ignorados pelo Git)
│   ├── instance/                # Arquivos de instância (ex: banco de dados SQLite)
│   │   └── roberta.db
│   ├── create_default_user.py   # Script para criar usuário padrão
│   └── requirements.txt         # Dependências do Python
├── roberta-frontend/            # Diretório do Frontend (React)
│   ├── public/                  # Arquivos públicos (ex: index.html, assets)
│   ├── src/                     # Código-fonte do Frontend
│   │   ├── assets/              # Imagens, ícones, etc.
│   │   ├── components/          # Componentes React reutilizáveis
│   │   │   ├── Dashboard.jsx
│   │   │   └── LoginPage.jsx
│   │   ├── App.css              # Estilos globais (Tailwind CSS)
│   │   ├── App.jsx              # Componente principal da aplicação
│   │   ├── main.jsx             # Ponto de entrada do React
│   │   └── index.css            # Estilos base do Tailwind
│   ├── node_modules/            # Dependências do Node.js (ignorados pelo Git)
│   ├── package.json             # Definições de pacotes e scripts do Node.js
│   ├── pnpm-lock.yaml           # Lockfile do pnpm
│   ├── tailwind.config.js       # Configuração do Tailwind CSS
│   └── vite.config.js           # Configuração do Vite
├── .gitignore                   # Arquivo de ignorados do Git
└── README.md                    # Este arquivo
```

## 5. Modelos de Dados (Backend)

O banco de dados do Sistema ROBERTA é estruturado para suportar as diversas entidades do sistema. Abaixo estão os principais modelos de dados definidos no diretório `roberta-backend/src/models/`:

-   **`auth.py` (Usuario):** Gerencia usuários, autenticação, perfis e segurança de senhas.
-   **`banca.py` (BancaOrganizadora):** Informações sobre as bancas organizadoras de concursos.
-   **`calendario.py` (EventoCalendario):** Eventos e prazos importantes relacionados aos concursos.
-   **`colaborador.py` (Colaborador):** Dados dos colaboradores envolvidos nos concursos.
-   **`comunicacao.py` (Comunicacao):** Gerencia mensagens e notificações do sistema.
-   **`concurso.py` (Concurso):** Detalhes dos concursos públicos, incluindo status, datas e informações de contratação.
-   **`escola.py` (Escola):** Cadastro de escolas e suas características.
-   **`financeiro.py` (TransacaoFinanceira):** Registros de transações financeiras.
-   **`fornecedor.py` (Fornecedor):** Dados de fornecedores de serviços ou produtos.
-   **`orgao.py` (OrgaoPublico):** Informações sobre órgãos públicos.
-   **`rota.py` (Rota):** Definição de rotas e permissões de acesso.
-   **`secretaria.py` (Secretaria):** Dados das secretarias envolvidas.

Cada modelo possui atributos específicos e relacionamentos definidos com outros modelos, garantindo a integridade e a consistência dos dados. A interação com esses modelos é feita através do SQLAlchemy ORM.

## 6. Rotas da API (Backend)

As rotas da API são definidas no diretório `roberta-backend/src/routes/` e expõem os endpoints para comunicação com o frontend e outros serviços. As principais rotas incluem:

-   **`auth.py`:**
    -   `/api/login` (POST): Autenticação de usuário.
    -   `/api/logout` (POST): Encerramento de sessão.
    -   `/api/session` (GET): Verifica o status da sessão do usuário.
    -   `/api/change-password` (PUT): Altera a senha do usuário logado.
    -   `/api/change-login` (PUT): Altera o login do usuário logado.
    -   `/api/profile` (GET): Obtém dados do perfil do usuário logado.

-   **`concurso.py`:**
    -   `/api/concursos` (GET, POST): Lista todos os concursos ou cria um novo.
    -   `/api/concursos/<id>` (GET, PUT, DELETE): Operações CRUD para um concurso específico.

-   **`dashboard.py`:**
    -   `/api/dashboard/kpis` (GET): Retorna os principais indicadores de performance para o dashboard.
    -   `/api/dashboard/concursos-por-mes` (GET): Dados para o gráfico de concursos por mês.
    -   `/api/dashboard/status-concursos` (GET): Dados para o gráfico de status dos concursos.

-   **`user.py`:**
    -   `/api/users` (GET, POST): Lista usuários ou cria um novo.
    -   `/api/users/<id>` (GET, PUT, DELETE): Operações CRUD para um usuário específico.

Todas as rotas sensíveis são protegidas por verificação de sessão, garantindo que apenas usuários autenticados e com as permissões adequadas possam acessá-las.

## 7. Componentes do Frontend

O frontend é modularizado em componentes React, localizados em `roberta-frontend/src/components/`. Os principais componentes desenvolvidos são:

-   **`LoginPage.jsx`:** Componente responsável pela interface de login. Inclui formulário de autenticação e integração com a API de login do backend.
-   **`Dashboard.jsx`:** Componente principal após o login. Contém:
    -   **Menu Lateral:** Navegação entre os diferentes módulos do sistema (Página Inicial, Concursos, Escolas, Colaboradores, Relatórios Gerais, Configurações, Sair).
    -   **Cards de KPIs:** Exibição de métricas importantes (Total de Concursos, Escolas Cadastradas, Colaboradores, Pagamentos).
    -   **Gráficos:** Visualização de dados como 


Concursos por Mês e Status dos Concursos, utilizando a biblioteca Recharts.
    -   **Área de Conteúdo Principal:** Onde os módulos específicos (Concursos, Escolas, etc.) serão renderizados.

Cada componente é projetado para ser reutilizável e modular, facilitando a manutenção e a adição de novas funcionalidades. A estilização é feita com Tailwind CSS, garantindo um design responsivo e consistente em toda a aplicação.

## 8. Processo de Deploy e Configuração de Ambiente

O Sistema ROBERTA foi projetado para ser facilmente deployado. O processo de deploy atual integra o frontend (React) dentro do backend (Flask), servindo os arquivos estáticos do frontend diretamente pelo servidor Flask.

### 8.1. Estrutura de Deploy

Após o build do frontend, os arquivos estáticos (HTML, CSS, JavaScript, imagens) são copiados para o diretório `roberta-backend/src/static/`. O servidor Flask é configurado para servir esses arquivos quando uma requisição é feita para a rota raiz (`/`).

### 8.2. Passos para Deploy (Exemplo para Ambiente de Produção)

1.  **Build do Frontend:**
    ```bash
    cd roberta-frontend
    pnpm install
    pnpm run build
    ```
    Isso criará uma pasta `dist` dentro de `roberta-frontend` com os arquivos otimizados para produção.

2.  **Cópia dos Arquivos do Frontend para o Backend:**
    ```bash
    cp -r roberta-frontend/dist/* roberta-backend/src/static/
    ```
    Certifique-se de que o diretório `roberta-backend/src/static/` exista.

3.  **Configuração do Backend para Produção:**
    Embora o `main.py` do Flask já esteja configurado para servir arquivos estáticos, em um ambiente de produção real, é recomendado usar um servidor WSGI (como Gunicorn ou uWSGI) e um proxy reverso (como Nginx ou Apache) para servir a aplicação Flask e os arquivos estáticos de forma mais eficiente e segura.

    Exemplo de execução com Gunicorn (no diretório `roberta-backend`):
    ```bash
    pip install gunicorn
    gunicorn --bind 0.0.0.0:5000 main:app
    ```

4.  **Acesso ao Sistema Deployado:**
    Uma vez deployado, o sistema estará acessível através do URL configurado para o servidor. No caso do deploy de demonstração, o URL é `https://lnh8imcnnw7g.manus.space`.

### 8.3. Variáveis de Ambiente

Para configurações sensíveis ou que variam entre ambientes (desenvolvimento, teste, produção), é recomendado o uso de variáveis de ambiente. No Flask, isso pode ser feito com bibliotecas como `python-dotenv` para carregar variáveis de um arquivo `.env`.

Exemplos de variáveis de ambiente:
-   `DATABASE_URL`: URL de conexão com o banco de dados.
-   `SECRET_KEY`: Chave secreta para sessões Flask.
-   `DEBUG`: Booleano para ativar/desativar o modo debug.

## 9. Diretrizes de Desenvolvimento

Para garantir a consistência, manutenibilidade e escalabilidade do Sistema ROBERTA, os agentes da Vibe Code devem seguir as seguintes diretrizes de desenvolvimento:

### 9.1. Padrões de Código

-   **Python (Backend):**
    -   Siga o guia de estilo [PEP 8](https://www.python.org/dev/peps/pep-0008/).
    -   Utilize docstrings para documentar funções, classes e módulos.
    -   Prefira nomes de variáveis e funções descritivos e em snake_case.
    -   Mantenha as funções pequenas e com responsabilidade única.
-   **JavaScript/React (Frontend):**
    -   Siga o guia de estilo [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
    -   Utilize componentes funcionais e Hooks para gerenciamento de estado.
    -   Prefira nomes de variáveis e funções descritivos e em camelCase.
    -   Mantenha os componentes pequenos e com responsabilidade única.
    -   Utilize PropTypes ou TypeScript para validação de props.

### 9.2. Controle de Versão (Git)

-   Utilize branches para novas funcionalidades ou correções de bugs (`feature/nome-da-feature`, `bugfix/descricao-do-bug`).
-   Faça commits pequenos e atômicos, com mensagens claras e descritivas.
-   Realize pull requests para integrar o código na branch `main` (ou `master`), exigindo revisão de código.
-   Mantenha a branch `main` sempre estável e deployável.

### 9.3. Testes

-   Escreva testes unitários para a lógica de negócio crítica no backend.
-   Considere testes de integração para verificar a comunicação entre backend e frontend.
-   Utilize ferramentas de teste apropriadas para cada tecnologia (ex: `pytest` para Python, `React Testing Library` para React).

### 9.4. Documentação

-   Mantenha este manual técnico atualizado com quaisquer mudanças significativas na arquitetura ou nas tecnologias.
-   Documente novas APIs e componentes de forma clara e concisa.
-   Utilize comentários no código quando a lógica não for imediatamente óbvia.

## 10. Resolução de Problemas (Troubleshooting)

Esta seção aborda problemas comuns que podem surgir durante o desenvolvimento ou execução do Sistema ROBERTA e como resolvê-los.

### 10.1. Problemas no Backend

-   **`Address already in use` (Porta 5000 já em uso):**
    -   **Causa:** Outro processo está utilizando a porta 5000.
    -   **Solução:** Identifique e encerre o processo que está usando a porta. No Linux/macOS, você pode usar `lsof -i :5000` para encontrar o PID e `kill -9 <PID>` para encerrá-lo. No Windows, use `netstat -ano | findstr :5000` e `taskkill /PID <PID> /F`.
-   **`ModuleNotFoundError`:**
    -   **Causa:** Dependência Python não instalada ou ambiente virtual não ativado.
    -   **Solução:** Certifique-se de que o ambiente virtual está ativado (`source venv/bin/activate`) e que todas as dependências estão instaladas (`pip install -r requirements.txt`).
-   **Erros de Banco de Dados (SQLite):**
    -   **Causa:** Arquivo `roberta.db` corrompido ou permissões incorretas.
    -   **Solução:** Tente deletar o arquivo `roberta.db` (apenas em desenvolvimento!) e execute `create_default_user.py` novamente para recriá-lo.

### 10.2. Problemas no Frontend

-   **Página em branco ou erros no console do navegador:**
    -   **Causa:** Erros de JavaScript, problemas de compilação do React ou falha na comunicação com o backend.
    -   **Solução:** Verifique o console do navegador (F12) para mensagens de erro. Certifique-se de que o servidor de desenvolvimento do frontend (`pnpm run dev`) está rodando e que o backend está acessível.
-   **Problemas de Estilização (Tailwind CSS):**
    -   **Causa:** Classes Tailwind não aplicadas corretamente ou configuração incorreta.
    -   **Solução:** Verifique `tailwind.config.js` e certifique-se de que as classes estão sendo usadas corretamente nos componentes React. Recompile o frontend se necessário.
-   **Erro de CORS:**
    -   **Causa:** O backend não está configurado para permitir requisições do domínio/porta do frontend.
    -   **Solução:** Verifique a configuração do `Flask-CORS` no backend (`main.py` ou `__init__.py`) para garantir que ele permite requisições do frontend.

### 10.3. Problemas de Integração

-   **Frontend não consegue se comunicar com o Backend:**
    -   **Causa:** Backend não está rodando, URL da API incorreta no frontend, ou problema de proxy.
    -   **Solução:** Verifique se o backend está ativo (`http://localhost:5000`). No frontend, certifique-se de que o `vite.config.js` está configurado corretamente para proxy (`/api` para `http://localhost:5000`).

## 11. Conclusão

Este manual técnico forneceu uma visão abrangente do Sistema ROBERTA, cobrindo sua arquitetura, tecnologias, estrutura de código, processo de deploy e diretrizes de desenvolvimento. Com este conhecimento, os agentes da Vibe Code estarão bem equipados para contribuir efetivamente para o projeto, garantindo sua evolução contínua e sucesso.

O Sistema ROBERTA é uma base sólida para a gestão de concursos públicos, e a colaboração e o conhecimento técnico da equipe Vibe Code serão fundamentais para expandir suas funcionalidades e adaptá-lo às futuras necessidades.

---

*Gerado por Manus AI em 5 de agosto de 2025.*

