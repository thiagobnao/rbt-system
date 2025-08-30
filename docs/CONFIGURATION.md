# Configuração do Projeto RBT System

## Versões Estáveis Confirmadas

Este projeto foi testado e validado com as seguintes versões estáveis:

### Core Dependencies
- **Next.js**: `15.5.2` (versão estável)
- **React**: `19.1.1` (versão estável)
- **TypeScript**: `5.9.2` (versão estável)
- **Tailwind CSS**: `3.4.17` (versão estável - **IMPORTANTE**: Não usar v4.x)

### UI & Components
- **Radix UI**: `^1.2.12` (componentes base)
- **shadcn/ui**: Configurado com Tailwind CSS v3
- **Lucide React**: `0.542.0` (ícones)
- **Sonner**: `2.0.7` (notificações)

### Forms & Validation
- **React Hook Form**: `7.62.0`
- **Zod**: `4.1.5`
- **@hookform/resolvers**: `5.2.1`

### Backend & Database
- **Supabase**: `2.56.1`
- **Supabase Auth Helpers**: `0.9.0`
- **bcryptjs**: `3.0.2`
- **jsonwebtoken**: `9.0.2`

### Build Tools
- **PostCSS**: `8.5.6`
- **Autoprefixer**: `10.4.21`
- **ESLint**: `9.34.0`

## Configurações Críticas

### Tailwind CSS Configuration
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### CSS Global Setup
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* CSS Variables for theming */
  }
}
```

### Tailwind Config
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx,mdx}',
  ],
  // ... rest of configuration
}
```

## Problemas Conhecidos e Soluções

### ❌ Tailwind CSS v4
**Problema**: Versões 4.x são instáveis e causam problemas de compilação
**Solução**: Usar sempre Tailwind CSS v3.4.17

### ❌ PostCSS Configuration
**Problema**: `@tailwindcss/postcss` não funciona com Tailwind v3
**Solução**: Usar `tailwindcss: {}` no postcss.config.js

### ❌ CSS @reference Directive
**Problema**: `@reference "tailwindcss"` não é necessário no Tailwind v3
**Solução**: Remover esta diretiva do globals.css

### ⚠️ TypeScript ZodResolver
**Problema**: Conflitos de tipos entre Zod e React Hook Form
**Solução**: Usar `as any` para resolver temporariamente

## Organização do Projeto

### Metodologia de Desenvolvimento
O projeto segue uma metodologia de separação clara entre responsabilidades de backend e frontend:

#### Estrutura de Tarefas
- **Tag `master`**: Foco em backend, APIs, banco de dados e lógica de negócio
- **Tag `frontend-design`**: Foco em UI, componentes, formulários e experiência do usuário

#### Fluxo de Trabalho
1. **Backend First**: Desenvolver APIs e serviços antes da interface
2. **Separação Clara**: Evitar misturar responsabilidades em uma única tarefa
3. **Dependências Cruzadas**: Utilizar dependências entre tags quando necessário

### Benefícios da Organização
- **Arquitetura Limpa**: Separação clara de responsabilidades
- **Desenvolvimento Paralelo**: Possibilidade de trabalhar backend e frontend simultaneamente
- **Manutenibilidade**: Código mais organizado e fácil de manter
- **Escalabilidade**: Padrão claro para crescimento do projeto

## Setup Inicial

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   ```bash
   cp .env.example .env.local
   # Editar .env.local com suas credenciais do Supabase
   ```

3. **Iniciar servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Build de produção**:
   ```bash
   npm run build
   ```

## Verificação de Saúde

Para verificar se tudo está funcionando corretamente:

1. **Verificar versões**:
   ```bash
   npm list tailwindcss postcss autoprefixer
   ```

2. **Testar build**:
   ```bash
   npm run build
   ```

3. **Verificar estilos**:
   - Acessar `http://localhost:3000/collaborators`
   - Confirmar que os estilos do Tailwind estão aplicados
   - Verificar se não há erros no console

## Troubleshooting

### Estilos não aparecem
1. Verificar se Tailwind CSS é v3.4.17
2. Confirmar postcss.config.js está correto
3. Limpar cache: `rm -rf .next`
4. Reinstalar: `npm install`

### Erros de TypeScript
1. Verificar versões do Zod e React Hook Form
2. Usar `as any` para resolver conflitos de tipos
3. Atualizar tipos se necessário

### Problemas de Build
1. Verificar se todas as dependências estão na versão correta
2. Limpar node_modules e reinstalar
3. Verificar configuração do Next.js
