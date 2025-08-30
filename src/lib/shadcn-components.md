# Componentes Shadcn/UI - RBT System

Este documento descreve os componentes Shadcn/UI atualizados e evoluídos para usar o design system do RBT System.

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

### Switch

**Componente novo adicionado:**

- `Switch` - Componente de toggle

**Características:**

- Integração com design system
- Transições suaves
- Estados de hover e focus
- Acessibilidade completa

**Exemplo de uso:**

```tsx
<Switch id="airplane-mode" />
<Label htmlFor="airplane-mode">Modo avião</Label>
```

### Progress

**Variantes disponíveis:**

- `default` - Progress padrão (primary)
- `success` - Progress para sucessos
- `warning` - Progress para avisos
- `destructive` - Progress para erros
- `info` - Progress para informações

**Exemplo de uso:**

```tsx
<Progress value={33} />
<Progress value={66} variant="success" />
<Progress value={90} variant="warning" />
```

### Skeleton

**Tamanhos disponíveis:**

- `sm` - Pequeno (h-4)
- `default` - Padrão (h-6)
- `lg` - Grande (h-8)
- `xl` - Extra grande (h-12)
- `2xl` - Muito grande (h-16)

**Variantes disponíveis:**

- `default` - Cor padrão
- `subtle` - Cor mais sutil

**Exemplo de uso:**

```tsx
<Skeleton size="sm" className="w-32" />
<Skeleton size="default" className="w-48" />
<Skeleton size="lg" className="w-64" />
```

### Avatar

**Tamanhos disponíveis:**

- `sm` - Pequeno (h-8 w-8)
- `default` - Padrão (h-10 w-10)
- `lg` - Grande (h-12 w-12)
- `xl` - Extra grande (h-16 w-16)
- `2xl` - Muito grande (h-20 w-20)

**Componentes disponíveis:**

- `Avatar` - Container principal
- `AvatarImage` - Imagem do avatar
- `AvatarFallback` - Fallback quando não há imagem

**Exemplo de uso:**

```tsx
<Avatar size="lg">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

### Alert

**Variantes disponíveis:**

- `default` - Alert padrão
- `destructive` - Alert para erros
- `success` - Alert para sucessos
- `warning` - Alert para avisos
- `info` - Alert para informações

**Componentes disponíveis:**

- `Alert` - Container principal
- `AlertTitle` - Título do alert
- `AlertDescription` - Descrição do alert

**Exemplo de uso:**

```tsx
<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Sucesso</AlertTitle>
  <AlertDescription>
    Operação realizada com sucesso.
  </AlertDescription>
</Alert>
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

## Novos Componentes Adicionados

### Tabs

**Componentes disponíveis:**

- `Tabs` - Container principal
- `TabsList` - Lista de abas
- `TabsTrigger` - Gatilho da aba
- `TabsContent` - Conteúdo da aba

**Características:**

- Integração completa com design system
- Espaçamento customizado
- Tipografia consistente
- Estados de hover e focus

**Exemplo de uso:**

```tsx
<Tabs defaultValue="account" className="w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="account">Conta</TabsTrigger>
    <TabsTrigger value="password">Senha</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Conteúdo da conta
  </TabsContent>
  <TabsContent value="password">
    Conteúdo da senha
  </TabsContent>
</Tabs>
```

### Accordion

**Componentes disponíveis:**

- `Accordion` - Container principal
- `AccordionItem` - Item do acordeão
- `AccordionTrigger` - Gatilho do item
- `AccordionContent` - Conteúdo do item

**Características:**

- Animações suaves
- Integração com design system
- Tipografia consistente
- Estados de hover

**Exemplo de uso:**

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>
      Conteúdo do item 1
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Breadcrumb

**Componentes disponíveis:**

- `Breadcrumb` - Container principal
- `BreadcrumbList` - Lista de breadcrumbs
- `BreadcrumbItem` - Item individual
- `BreadcrumbLink` - Link do breadcrumb
- `BreadcrumbPage` - Página atual
- `BreadcrumbSeparator` - Separador
- `BreadcrumbEllipsis` - Elipses para overflow

**Características:**

- Navegação acessível
- Integração com design system
- Estados de hover
- Responsivo

**Exemplo de uso:**

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Página Atual</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Tooltip

**Componentes disponíveis:**

- `TooltipProvider` - Provedor de contexto
- `Tooltip` - Container principal
- `TooltipTrigger` - Gatilho do tooltip
- `TooltipContent` - Conteúdo do tooltip

**Características:**

- Posicionamento automático
- Animações suaves
- Integração com design system
- Acessibilidade completa

**Exemplo de uso:**

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Esta é uma dica de contexto</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
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

- Novas variantes para botões, badges, progress e alerts (success, warning, info)
- Integração completa com o sistema de cores

### 4. Efeitos e Transições

- Hover effects melhorados
- Transições suaves (`transition-all duration-200`)
- Efeitos de escala em botões (`active:scale-95`)

### 5. Sombras e Bordas

- Uso consistente de sombras do design system
- Bordas que mudam de cor no hover/focus
- Efeitos visuais mais refinados

### 6. Novos Componentes

- **Switch**: Componente de toggle
- **Tabs**: Navegação por abas
- **Accordion**: Acordeão expansível
- **Breadcrumb**: Navegação por breadcrumbs
- **Tooltip**: Dicas de contexto

### 7. Variantes de Tamanho

- **Avatar**: 5 tamanhos (sm, default, lg, xl, 2xl)
- **Skeleton**: 5 tamanhos (sm, default, lg, xl, 2xl)
- **Progress**: 5 variantes de cor (default, success, warning, destructive, info)

## Compatibilidade

Todos os componentes mantêm total compatibilidade com a API original do Shadcn/UI, apenas adicionando:

- Novas variantes de cores
- Novos tamanhos
- Novos componentes
- Melhorias visuais
- Integração com o design system

## Página de Demonstração

Uma página completa de demonstração foi criada em `/design-system/components` que mostra todos os componentes evoluídos em ação, incluindo:

- Todas as variantes de botões
- Todos os tamanhos de componentes
- Exemplos de uso prático
- Integração entre componentes

## Uso Recomendado

1. **Sempre use as variantes semânticas** quando apropriado (success, warning, info)
2. **Prefira os tamanhos customizados** para consistência
3. **Combine com os tokens de espaçamento** do design system
4. **Use as famílias de fontes** apropriadas para cada contexto
5. **Explore os novos componentes** para funcionalidades avançadas
6. **Teste a página de demonstração** para ver todos os componentes em ação
