# Sistema de Formulários - RBT System

Este documento descreve o sistema de formulários implementado no projeto RBT System, integrando React Hook Form com Zod para validação e gerenciamento de estado.

## Componentes de Formulário

### Form

Componente wrapper que fornece o contexto do formulário usando `FormProvider` do React Hook Form.

```tsx
import { Form } from '@/components/ui/form'

<Form {...form}>
  <form onSubmit={handleSubmit}>
    {/* Campos do formulário */}
  </form>
</Form>
```

### FormFieldWrapper

Componente que simplifica a criação de campos de formulário com validação automática.

```tsx
import { FormFieldWrapper } from '@/components/ui/form'

<FormFieldWrapper
  name="email"
  label="Email"
  description="Seu email profissional"
>
  <Input type="email" placeholder="exemplo@email.com" />
</FormFieldWrapper>
```

**Props:**

- `name`: Nome do campo (string)
- `label`: Label do campo (opcional)
- `description`: Descrição do campo (opcional)
- `children`: Componente de input
- `className`: Classes CSS adicionais

### FormSubmitButton

Botão de submit com estado de loading automático.

```tsx
import { FormSubmitButton } from '@/components/ui/form'

<FormSubmitButton loading={isSubmitting}>
  Salvar
</FormSubmitButton>
```

**Props:**

- `loading`: Estado de loading manual (opcional)
- `children`: Conteúdo do botão
- Todas as props do componente Button

## Hooks Personalizados

### useFormWithZod

Hook principal que integra React Hook Form com Zod e fornece funcionalidades extras.

```tsx
import { useFormWithZod } from '@/lib/hooks/useFormWithZod'

const {
  form,
  handleSubmit,
  isSubmitting,
  errors,
  setValue,
  watch,
  resetForm,
  setFieldError,
  clearFieldError,
} = useFormWithZod({
  schema: userSchema,
  defaultValues: {
    name: '',
    email: '',
  },
  onSuccess: async (data) => {
    // Lógica de sucesso
  },
  onError: (error) => {
    // Lógica de erro
  },
  successMessage: 'Operação realizada com sucesso!',
  errorMessage: 'Erro ao processar a operação',
})
```

**Opções:**

- `schema`: Schema Zod para validação
- `defaultValues`: Valores padrão do formulário
- `onSuccess`: Callback executado em caso de sucesso
- `onError`: Callback executado em caso de erro
- `successMessage`: Mensagem de sucesso (usando toast)
- `errorMessage`: Mensagem de erro padrão

### useFormValidation

Hook para validação em tempo real e validação manual.

```tsx
import { useFormValidation } from '@/lib/hooks/useFormWithZod'

const { validateField, validateForm } = useFormValidation(form, schema)

// Validar campo específico
await validateField('email', 'test@example.com')

// Validar formulário completo
const isValid = await validateForm()
```

### useFormattedField

Hook para campos com formatação automática.

```tsx
import { useFormattedField } from '@/lib/hooks/useFormWithZod'

const { value, handleChange } = useFormattedField(
  form,
  'cpf',
  formatCPF
)

<Input 
  value={value}
  onChange={handleChange}
  placeholder="000.000.000-00"
/>
```

## Schemas de Validação com Zod

### Exemplo Básico

```tsx
import { z } from 'zod'

const userSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  
  age: z.number()
    .min(18, 'Idade mínima é 18 anos')
    .max(120, 'Idade máxima é 120 anos'),
  
  role: z.enum(['admin', 'user', 'manager'], {
    required_error: 'Selecione um cargo',
  }),
  
  skills: z.array(z.string())
    .min(1, 'Selecione pelo menos uma habilidade')
    .max(5, 'Máximo de 5 habilidades'),
  
  bio: z.string()
    .max(500, 'Biografia deve ter no máximo 500 caracteres')
    .optional(),
})
```

### Validação Customizada

```tsx
const cpfSchema = z.string()
  .min(11, 'CPF deve ter pelo menos 11 caracteres')
  .max(14, 'CPF deve ter no máximo 14 caracteres')
  .refine((cpf) => {
    const cleanCPF = cpf.replace(/\D/g, '')
    if (cleanCPF.length !== 11) return false
    
    // Validação do CPF
    // ... lógica de validação
    
    return true
  }, 'CPF inválido')
```

### Schemas Condicionais

```tsx
const conditionalSchema = z.object({
  hasPhone: z.boolean(),
  phone: z.string().optional(),
}).refine((data) => {
  if (data.hasPhone && !data.phone) {
    return false
  }
  return true
}, {
  message: "Telefone é obrigatório quando 'hasPhone' é true",
  path: ["phone"],
})
```

## Exemplo Completo

```tsx
'use client'

import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Form, FormFieldWrapper, FormSubmitButton } from '@/components/ui/form'
import { useFormWithZod } from '@/lib/hooks/useFormWithZod'
import { formatCPF } from '@/lib/utils/formatters'

// Schema de validação
const userSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  cpf: z.string().refine(validateCPF, 'CPF inválido'),
  role: z.enum(['admin', 'user'], { required_error: 'Selecione um cargo' }),
  skills: z.array(z.string()).min(1, 'Selecione pelo menos uma habilidade'),
})

export function UserForm() {
  const {
    form,
    handleSubmit,
    isSubmitting,
    setValue,
    watch,
  } = useFormWithZod({
    schema: userSchema,
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      role: undefined,
      skills: [],
    },
    onSuccess: async (data) => {
      console.log('Dados válidos:', data)
      // Enviar para API
    },
  })

  const selectedSkills = watch('skills')

  const handleSkillToggle = (skill: string) => {
    const currentSkills = selectedSkills || []
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill]
    
    setValue('skills', newSkills)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulário de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-lg">
            <FormFieldWrapper
              name="name"
              label="Nome"
              description="Nome completo"
            >
              <Input placeholder="João Silva" />
            </FormFieldWrapper>

            <FormFieldWrapper
              name="email"
              label="Email"
              description="Email profissional"
            >
              <Input type="email" placeholder="joao@email.com" />
            </FormFieldWrapper>

            <FormFieldWrapper
              name="cpf"
              label="CPF"
              description="Apenas números"
            >
              <Input 
                placeholder="000.000.000-00"
                onChange={(e) => setValue('cpf', formatCPF(e.target.value))}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              name="role"
              label="Cargo"
              description="Seu cargo na empresa"
            >
              <Select onValueChange={(value) => setValue('role', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </FormFieldWrapper>

            <FormFieldWrapper
              name="skills"
              label="Habilidades"
              description="Selecione suas habilidades"
            >
              <div className="flex flex-wrap gap-sm">
                {['JavaScript', 'React', 'Node.js'].map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills?.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </FormFieldWrapper>

            <FormSubmitButton loading={isSubmitting}>
              Salvar Usuário
            </FormSubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
```

## Melhores Práticas

### 1. Schemas Reutilizáveis

Crie schemas base e estenda conforme necessário:

```tsx
const baseUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
})

const createUserSchema = baseUserSchema
const updateUserSchema = baseUserSchema.partial().extend({
  id: z.string().uuid(),
})
```

### 2. Validação em Tempo Real

Use `validateField` para validação em tempo real:

```tsx
const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setValue('email', value)
  await validateField('email', value)
}
```

### 3. Formatação de Campos

Use formatters para campos como CPF, telefone, etc.:

```tsx
const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const formatted = formatCPF(e.target.value)
  setValue('cpf', formatted)
}
```

### 4. Tratamento de Erros

Configure callbacks de erro para tratamento personalizado:

```tsx
const { form, handleSubmit } = useFormWithZod({
  schema: userSchema,
  onError: (error) => {
    if (error.code === 'NETWORK_ERROR') {
      toast.error('Erro de conexão. Tente novamente.')
    } else {
      toast.error('Erro inesperado.')
    }
  },
})
```

### 5. Estados de Loading

Use o estado `isSubmitting` para feedback visual:

```tsx
<FormSubmitButton loading={isSubmitting}>
  {isSubmitting ? 'Salvando...' : 'Salvar'}
</FormSubmitButton>
```

## Integração com Design System

O sistema de formulários está totalmente integrado com o design system:

- **Espaçamento**: Usa tokens de espaçamento customizados (`space-y-lg`, `gap-md`)
- **Tipografia**: Integra com famílias de fontes (`font-body`, `font-display`)
- **Cores**: Usa cores semânticas para estados de erro (`text-destructive`)
- **Componentes**: Todos os componentes UI são compatíveis
- **Animações**: Transições suaves e estados de loading

## Testes

Para testar o sistema de formulários:

1. **Validação**: Preencha campos inválidos e verifique as mensagens de erro
2. **Formatação**: Teste campos com formatação (CPF, telefone)
3. **Estados**: Verifique estados de loading e sucesso
4. **Responsividade**: Teste em diferentes tamanhos de tela
5. **Acessibilidade**: Verifique navegação por teclado e leitores de tela

## Exemplo de Página

Acesse `/examples/user-profile` para ver um exemplo completo do sistema de formulários em ação.
