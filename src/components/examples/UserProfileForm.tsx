'use client'

import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Form, 
  FormFieldWrapper, 
  FormSubmitButton 
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatCPF, formatPhone } from '@/lib/utils/formatters'
import { toast } from 'sonner'

// Schema de validação para o formulário de perfil
const userProfileSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  
  email: z.string()
    .email('Email inválido')
    .min(1, 'Email é obrigatório'),
  
  cpf: z.string()
    .min(11, 'CPF deve ter pelo menos 11 caracteres')
    .max(14, 'CPF deve ter no máximo 14 caracteres')
    .refine((cpf) => {
      const cleanCPF = cpf.replace(/\D/g, '')
      if (cleanCPF.length !== 11) return false
      if (/^(\d)\1{10}$/.test(cleanCPF)) return false
      
      // Validação simplificada do CPF
      let sum = 0
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
      }
      let remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) remainder = 0
      if (remainder !== parseInt(cleanCPF.charAt(9))) return false
      
      sum = 0
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
      }
      remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) remainder = 0
      if (remainder !== parseInt(cleanCPF.charAt(10))) return false
      
      return true
    }, 'CPF inválido'),
  
  phone: z.string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .max(15, 'Telefone deve ter no máximo 15 dígitos')
    .refine((phone) => {
      const cleanPhone = phone.replace(/\D/g, '')
      return cleanPhone.length >= 10 && cleanPhone.length <= 11
    }, 'Telefone inválido'),
  
  role: z.enum(['admin', 'user', 'manager']).refine((val) => val !== undefined, {
    message: 'Selecione um cargo',
  }),
  
  department: z.string()
    .min(1, 'Departamento é obrigatório')
    .max(50, 'Departamento deve ter no máximo 50 caracteres'),
  
  bio: z.string()
    .max(500, 'Biografia deve ter no máximo 500 caracteres')
    .optional(),
  
  skills: z.array(z.string())
    .min(1, 'Selecione pelo menos uma habilidade')
    .max(5, 'Máximo de 5 habilidades'),
})

type UserProfileFormData = z.infer<typeof userProfileSchema>

const availableSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 
  'Java', 'C#', 'PHP', 'SQL', 'MongoDB', 'AWS', 'Docker'
]

const roleOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'user', label: 'Usuário' },
  { value: 'manager', label: 'Gerente' },
]

export function UserProfileForm() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(userProfileSchema) as any,
    defaultValues: {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      role: undefined,
      department: '',
      bio: '',
      skills: [],
    },
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = form

  const onSubmit = async (data: any) => {
    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Dados do formulário:', data)
      toast.success('Perfil atualizado com sucesso!')
      router.push('/profile')
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    }
  }

  const selectedSkills = watch('skills') as string[]

  const handleSkillToggle = (skill: string) => {
    const currentSkills = selectedSkills || []
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill]
    
    setValue('skills', newSkills as any)
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formatCPF(value)
    setValue('cpf', formatted)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formatPhone(value)
    setValue('phone', formatted)
  }

  return (
    <div className="max-w-2xl mx-auto p-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-display">
            Perfil do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
                  <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
              {/* Informações Pessoais */}
              <div className="space-y-md">
                <h3 className="text-lg font-body font-semibold text-foreground">
                  Informações Pessoais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <FormFieldWrapper
                    name="name"
                    label="Nome Completo"
                    description="Digite seu nome completo"
                  >
                    <Input placeholder="João Silva" />
                  </FormFieldWrapper>

                  <FormFieldWrapper
                    name="email"
                    label="Email"
                    description="Seu email profissional"
                  >
                    <Input type="email" placeholder="joao@empresa.com" />
                  </FormFieldWrapper>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <FormFieldWrapper
                    name="cpf"
                    label="CPF"
                    description="Digite apenas os números"
                  >
                    <Input 
                      placeholder="000.000.000-00"
                      onChange={handleCPFChange}
                    />
                  </FormFieldWrapper>

                  <FormFieldWrapper
                    name="phone"
                    label="Telefone"
                    description="Com DDD"
                  >
                    <Input 
                      placeholder="(11) 99999-9999"
                      onChange={handlePhoneChange}
                    />
                  </FormFieldWrapper>
                </div>
              </div>

              {/* Informações Profissionais */}
              <div className="space-y-md">
                <h3 className="text-lg font-body font-semibold text-foreground">
                  Informações Profissionais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
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
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormFieldWrapper>

                  <FormFieldWrapper
                    name="department"
                    label="Departamento"
                    description="Seu departamento"
                  >
                    <Input placeholder="Tecnologia" />
                  </FormFieldWrapper>
                </div>

                <FormFieldWrapper
                  name="bio"
                  label="Biografia"
                  description="Conte um pouco sobre você (opcional)"
                >
                  <Textarea 
                    placeholder="Sou um desenvolvedor apaixonado por..."
                    rows={4}
                  />
                </FormFieldWrapper>
              </div>

              {/* Habilidades */}
              <div className="space-y-md">
                <h3 className="text-lg font-body font-semibold text-foreground">
                  Habilidades
                </h3>
                
                <FormFieldWrapper
                  name="skills"
                  label="Selecione suas habilidades"
                  description="Escolha até 5 habilidades principais"
                >
                  <div className="flex flex-wrap gap-sm">
                    {availableSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills?.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/10 transition-colors"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </FormFieldWrapper>

                {selectedSkills && selectedSkills.length > 0 && (
                  <div className="flex flex-wrap gap-sm">
                    {selectedSkills.map((skill) => (
                      <Badge key={skill} variant="success">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Botões */}
              <div className="flex gap-md pt-md">
                <FormSubmitButton loading={isSubmitting}>
                  Salvar Perfil
                </FormSubmitButton>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
