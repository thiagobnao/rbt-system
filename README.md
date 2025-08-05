# Sistema ROBERTA - Gestão de Concursos Públicos

![Sistema ROBERTA Dashboard](https://lnh8imcnnw7g.manus.space/assets/dashboard-screenshot.png)

## 📚 Visão Geral do Projeto

O Sistema ROBERTA é uma solução completa para a gestão de concursos públicos, desenvolvida com foco em uma arquitetura limpa, leve, escalável e de fácil manutenção. Ele abrange desde o gerenciamento de informações de concursos, escolas e colaboradores, até funcionalidades de dashboard para acompanhamento de KPIs e comunicação. O projeto é dividido em duas partes principais: um backend robusto construído com Flask e um frontend interativo desenvolvido em React.

Este sistema foi projetado para otimizar os processos de gestão de concursos, fornecendo uma interface intuitiva e ferramentas poderosas para administradores e usuários. A arquitetura modular permite a fácil expansão e adição de novas funcionalidades no futuro.

## ✨ Funcionalidades Principais

- **Autenticação de Usuários:** Sistema seguro de login e logout com gerenciamento de sessões.
- **Dashboard Interativo:** Visão geral do sistema com KPIs (Key Performance Indicators) e gráficos para acompanhamento de concursos, escolas, colaboradores e pagamentos.
- **Gestão de Concursos:** Estrutura para o CRUD (Create, Read, Update, Delete) de concursos, incluindo informações detalhadas e resumo de contratação.
- **Gestão de Escolas:** Módulo para cadastro e gerenciamento de escolas, com informações sobre salas e capacidades.
- **Gestão de Colaboradores:** Módulo para registro e acompanhamento de colaboradores envolvidos nos concursos.
- **Relatórios Gerais:** Seção dedicada à geração de relatórios e análises.
- **Configurações do Sistema:** Área para ajustes e personalização do sistema.
- **Comunicação:** Estrutura para funcionalidades de comunicação, como envio de e-mails e notificações.
- **Calendário de Eventos:** Gerenciamento de eventos e prazos relacionados aos concursos.
- **Gestão Financeira:** Módulo para controle de pagamentos e despesas.

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3.x**
- **Flask:** Microframework web para Python.
- **SQLAlchemy:** ORM (Object-Relational Mapper) para interação com o banco de dados.
- **SQLite:** Banco de dados leve e embutido para desenvolvimento e testes.
- **Flask-CORS:** Para permitir requisições cross-origin do frontend.
- **Werkzeug:** Para hashing seguro de senhas.

### Frontend
- **Node.js (com pnpm)**
- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite:** Ferramenta de build rápido para projetos web.
- **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
- **Shadcn/ui:** Coleção de componentes UI reutilizáveis e acessíveis.
- **Recharts:** Biblioteca de gráficos para React.
- **Lucide React:** Biblioteca de ícones.

## ⚙️ Configuração e Execução Local

Para configurar e executar o Sistema ROBERTA em seu ambiente local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Python 3.x](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/) (versão LTS recomendada)
- [pnpm](https://pnpm.io/installation) (gerenciador de pacotes Node.js)
- [Git](https://git-scm.com/downloads/)

### 1. Clonar o Repositório

Primeiro, clone este repositório para sua máquina local:

```bash
git clone https://github.com/thiagobnao/rbt-system.git
cd rbt-system
```

### 2. Configuração e Execução do Backend

Navegue até o diretório raiz do projeto (onde está o `src` do backend) e siga os passos:

```bash
# Navegue para o diretório do backend
cd roberta-backend

# Crie e ative um ambiente virtual
python3 -m venv venv
source venv/bin/activate  # No Windows use `venv\Scripts\activate`

# Instale as dependências do Python
pip install -r requirements.txt

# Crie o banco de dados e o usuário padrão
python create_default_user.py

# Execute o servidor Flask
flask run --host=0.0.0.0 --port=5000
```

O backend estará rodando em `http://localhost:5000`.

### 3. Configuração e Execução do Frontend

Abra um novo terminal, navegue até o diretório raiz do projeto e siga os passos:

```bash
# Navegue para o diretório do frontend
cd roberta-frontend

# Instale as dependências do Node.js com pnpm
pnpm install

# Execute o servidor de desenvolvimento do React
pnpm run dev --host
```

O frontend estará rodando em `http://localhost:5173`.

## 🔑 Credenciais Padrão

Para acessar o sistema após a execução local ou o deploy, utilize as seguintes credenciais:

- **Login:** `betha`
- **Senha:** `12345`

## ☁️ Deploy e Acesso Público

O Sistema ROBERTA foi deployado para um ambiente público para demonstração. Você pode acessá-lo através do seguinte URL:

**URL:** [https://lnh8imcnnw7g.manus.space](https://lnh8imcnnw7g.manus.space)

Utilize as credenciais padrão acima para fazer login.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues, enviar pull requests ou sugerir melhorias.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

*Gerado por Manus AI em 5 de agosto de 2025.*



## 📖 Documentação Técnica

Para uma compreensão aprofundada da arquitetura, tecnologias, estrutura de código e diretrizes de desenvolvimento do Sistema ROBERTA, consulte o manual técnico detalhado:

-   [**Manual Técnico do Sistema ROBERTA**](technical_manual.md)

Este manual é essencial para agentes da Vibe Code que atuarão no projeto, fornecendo informações cruciais para nivelar e atualizar o conhecimento técnico.


