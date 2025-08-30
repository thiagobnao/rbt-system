# Design System - RBT System

Este documento descreve o sistema de design implementado no projeto RBT System, incluindo todos os tokens disponíveis e como utilizá-los.

## Cores

### Cores Base

- `bg-background` / `text-foreground` - Cor de fundo e texto principal
- `bg-card` / `text-card-foreground` - Cores para cards
- `bg-popover` / `text-popover-foreground` - Cores para popovers
- `bg-muted` / `text-muted-foreground` - Cores para elementos muted
- `border-border` - Cor das bordas

### Cores Primárias

- `bg-primary` / `text-primary-foreground` - Cor primária principal
- `bg-primary-50` até `bg-primary-950` - Escala completa de cores primárias
- `text-primary-50` até `text-primary-950` - Texto nas cores primárias

### Cores Secundárias

- `bg-secondary` / `text-secondary-foreground` - Cor secundária principal
- `bg-secondary-50` até `bg-secondary-950` - Escala completa de cores secundárias
- `text-secondary-50` até `text-secondary-950` - Texto nas cores secundárias

### Cores Semânticas

- `bg-destructive` / `text-destructive-foreground` - Para ações destrutivas
- `bg-success` / `text-success-foreground` - Para sucessos
- `bg-warning` / `text-warning-foreground` - Para avisos
- `bg-info` / `text-info-foreground` - Para informações

## Tipografia

### Famílias de Fontes

- `font-sans` - Fonte sans-serif padrão (Inter)
- `font-serif` - Fonte serif (Georgia)
- `font-mono` - Fonte monospace (JetBrains Mono)
- `font-display` - Fonte para títulos (Inter)
- `font-body` - Fonte para corpo de texto (Inter)

### Tamanhos de Fonte

- `text-xs` - 0.75rem (12px)
- `text-sm` - 0.875rem (14px)
- `text-base` - 1rem (16px)
- `text-lg` - 1.125rem (18px)
- `text-xl` - 1.25rem (20px)
- `text-2xl` - 1.5rem (24px)
- `text-3xl` - 1.875rem (30px)
- `text-4xl` - 2.25rem (36px)
- `text-5xl` - 3rem (48px)
- `text-6xl` - 3.75rem (60px)

## Espaçamento

### Espaçamento Customizado

- `p-xs` / `m-xs` - 0.25rem (4px)
- `p-sm` / `m-sm` - 0.5rem (8px)
- `p-md` / `m-md` - 1rem (16px)
- `p-lg` / `m-lg` - 1.5rem (24px)
- `p-xl` / `m-xl` - 2rem (32px)
- `p-2xl` / `m-2xl` - 3rem (48px)
- `p-3xl` / `m-3xl` - 4rem (64px)
- `p-4xl` / `m-4xl` - 6rem (96px)
- `p-5xl` / `m-5xl` - 8rem (128px)

## Bordas

### Border Radius

- `rounded-xs` - Muito pequeno
- `rounded-sm` - Pequeno
- `rounded-md` - Médio
- `rounded-lg` - Grande
- `rounded-full` - Circular

## Sombras

### Box Shadows

- `shadow-xs` - Sombra muito sutil
- `shadow-sm` - Sombra pequena
- `shadow-md` - Sombra média
- `shadow-lg` - Sombra grande
- `shadow-xl` - Sombra extra grande
- `shadow-2xl` - Sombra máxima
- `shadow-inner` - Sombra interna
- `shadow-none` - Sem sombra

## Animações

### Animações Disponíveis

- `animate-fade-in` - Fade in
- `animate-fade-out` - Fade out
- `animate-slide-in-from-top` - Slide do topo
- `animate-slide-in-from-bottom` - Slide de baixo
- `animate-slide-in-from-left` - Slide da esquerda
- `animate-slide-in-from-right` - Slide da direita
- `animate-scale-in` - Scale in
- `animate-scale-out` - Scale out
- `animate-accordion-down` - Accordion down
- `animate-accordion-up` - Accordion up

## Z-Index

### Camadas de Z-Index

- `z-dropdown` - Dropdowns (1000)
- `z-sticky` - Elementos sticky (1020)
- `z-banner` - Banners (1030)
- `z-overlay` - Overlays (1040)
- `z-modal` - Modais (1050)
- `z-popover` - Popovers (1060)
- `z-tooltip` - Tooltips (1070)

## Exemplos de Uso

### Botão Primário

```html
<button class="bg-primary text-primary-foreground px-md py-sm rounded-md shadow-sm hover:shadow-md transition-shadow">
  Botão Primário
</button>
```

### Card com Sombra

```html
<div class="bg-card text-card-foreground p-lg rounded-lg shadow-md">
  <h3 class="text-xl font-display mb-md">Título do Card</h3>
  <p class="text-muted-foreground">Conteúdo do card</p>
</div>
```

### Texto com Tipografia

```html
<h1 class="text-4xl font-display text-foreground">Título Principal</h1>
<h2 class="text-2xl font-body text-foreground">Subtítulo</h2>
<p class="text-base font-body text-muted-foreground">Texto do corpo</p>
```

### Container com Espaçamento

```html
<div class="bg-background p-xl">
  <div class="max-w-4xl mx-auto space-y-lg">
    <!-- Conteúdo -->
  </div>
</div>
```

## Modo Escuro

O sistema suporta automaticamente modo escuro através da classe `.dark`. Todas as variáveis CSS são definidas para ambos os modos (claro e escuro) e o Tailwind CSS aplica automaticamente as cores corretas baseado no tema ativo.

## Variáveis CSS

Todas as cores e tokens são definidos como variáveis CSS no arquivo `globals.css`, permitindo fácil customização e manutenção do design system.
