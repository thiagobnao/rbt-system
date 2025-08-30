# Componentes Shadcn/UI - RBT System

Este documento descreve os componentes Shadcn/UI atualizados para usar o design system do RBT System.

## Componentes Atualizados

### Button

**Variantes disponíveis:**
- `default` - Botão primário com sombra e efeitos hover
- `destructive` - Botão para ações destrutivas
- `outline` - Botão com borda
- `secondary` - Botão secundário
- `ghost` - Botão transparente
- `link` - Botão como link
- `success` - Botão para ações de sucesso
- `warning` - Botão para avisos
- `info` - Botão para informações

**Tamanhos disponíveis:**
- `default` - Tamanho padrão (h-10)
- `sm` - Pequeno (h-9)
- `lg` - Grande (h-11)
- `xl` - Extra grande (h-12)
- `icon` - Para ícones (h-10 w-10)
- `icon-sm` - Ícone pequeno (h-8 w-8)
- `icon-lg` - Ícone grande (h-12 w-12)

**Exemplo de uso:**
```tsx
<Button variant="default" size="default">
  Botão Primário
</Button>

<Button variant="success" size="lg">
  Sucesso
</Button>

<Button variant="icon" size="icon">
  <Icon />
</Button>
```

### Card

**Componentes disponíveis:**
- `Card` - Container principal
- `CardHeader` - Cabeçalho do card
- `CardTitle` - Título do card
- `CardDescription` - Descrição do card
- `CardContent` - Conteúdo do card
- `CardFooter` - Rodapé do card

**Características:**
- Usa espaçamento customizado (`p-lg`)
- Tipografia melhorada (`font-display` para títulos)
- Efeitos hover com sombra
- Transições suaves

**Exemplo de uso:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição do card</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Conteúdo do card</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>
```

### Badge

**Variantes disponíveis:**
- `default` - Badge padrão (primary)
- `secondary` - Badge secundário
- `destructive` - Badge para erros
- `success` - Badge para sucessos
- `warning` - Badge para avisos
- `info` - Badge para informações
- `outline` - Badge com borda

**Exemplo de uso:**
```tsx
<Badge variant="success">Sucesso</Badge>
<Badge variant="warning">Aviso</Badge>
<Badge variant="info">Informação</Badge>
```

### Input

**Características:**
- Espaçamento customizado (`px-md py-sm`)
- Tipografia do design system (`font-body`)
- Efeitos hover e focus melhorados
- Transições suaves
- Bordas que mudam de cor no hover/focus

**Exemplo de uso:**
```tsx
<Input placeholder="Digite algo..." />
```

### Textarea

**Características:**
- Mesmas melhorias do Input
- Espaçamento consistente
- Tipografia do design system
- Efeitos hover e focus

**Exemplo de uso:**
```tsx
<Textarea placeholder="Digite uma descrição..." />
```

### Select

**Componentes disponíveis:**
- `Select` - Componente raiz
- `SelectTrigger` - Gatilho do select
- `SelectContent` - Conteúdo do dropdown
- `SelectItem` - Item individual
- `SelectValue` - Valor selecionado
- `SelectGroup` - Grupo de itens

**Características:**
- Espaçamento customizado
- Tipografia do design system
- Efeitos hover e focus
- Animações suaves

**Exemplo de uso:**
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecione uma opção" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Opção 1</SelectItem>
    <SelectItem value="option2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

### Table

**Componentes disponíveis:**
- `Table` - Tabela principal
- `TableHeader` - Cabeçalho da tabela
- `TableBody` - Corpo da tabela
- `TableFooter` - Rodapé da tabela
- `TableRow` - Linha da tabela
- `TableHead` - Célula de cabeçalho
- `TableCell` - Célula de dados
- `TableCaption` - Legenda da tabela

**Características:**
- Espaçamento customizado (`p-md`)
- Tipografia do design system (`font-body`)
- Hover effects melhorados
- Transições suaves

**Exemplo de uso:**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>João</TableCell>
      <TableCell>joao@email.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Label

**Características:**
- Tipografia do design system (`font-body`)
- Estilo consistente com outros componentes

**Exemplo de uso:**
```tsx
<Label htmlFor="email">Email</Label>
```

### Skeleton

**Características:**
- Cor de fundo mais sutil (`bg-muted/50`)
- Mantém a animação de pulse

**Exemplo de uso:**
```tsx
<Skeleton className="h-4 w-32" />
```

## Melhorias Implementadas

### 1. Espaçamento Consistente
- Todos os componentes usam tokens de espaçamento customizados (`px-md`, `py-sm`, etc.)
- Removidos valores hardcoded como `px-3`, `py-2`, etc.

### 2. Tipografia Melhorada
- Componentes de texto usam `font-body` para corpo
- Títulos usam `font-display` para destaque
- Consistência com o design system

### 3. Cores Semânticas
- Novas variantes para botões e badges (success, warning, info)
- Integração completa com o sistema de cores

### 4. Efeitos e Transições
- Hover effects melhorados
- Transições suaves (`transition-all duration-200`)
- Efeitos de escala em botões (`active:scale-95`)

### 5. Sombras e Bordas
- Uso consistente de sombras do design system
- Bordas que mudam de cor no hover/focus
- Efeitos visuais mais refinados

## Compatibilidade

Todos os componentes mantêm total compatibilidade com a API original do Shadcn/UI, apenas adicionando:
- Novas variantes de cores
- Novos tamanhos
- Melhorias visuais
- Integração com o design system

## Uso Recomendado

1. **Sempre use as variantes semânticas** quando apropriado (success, warning, info)
2. **Prefira os tamanhos customizados** para consistência
3. **Combine com os tokens de espaçamento** do design system
4. **Use as famílias de fontes** apropriadas para cada contexto
