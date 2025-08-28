import { z } from 'zod';

// Brazilian states
const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;

// CPF validation function
function validateCPF(cpf: string): boolean {
  // Remove non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Check if it has 11 digits
  if (cleanCPF.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Validate first digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Validate second digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
}

// CEP validation function
function validateCEP(cep: string): boolean {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
}

// Phone validation function
function validatePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

// Base collaborator schema
const baseCollaboratorSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  
  cpf: z.string()
    .min(11, 'CPF deve ter pelo menos 11 caracteres')
    .max(14, 'CPF deve ter no máximo 14 caracteres')
    .refine(validateCPF, 'CPF inválido'),
  
  birth_date: z.string().optional(),
  
  rg: z.string().max(20, 'RG deve ter no máximo 20 caracteres').optional(),
  rg_issuer: z.string().max(100, 'Emissor do RG deve ter no máximo 100 caracteres').optional(),
  
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().refine(validatePhone, 'Telefone inválido').optional().or(z.literal('')),
  mobile_phone: z.string().refine(validatePhone, 'Celular inválido').optional().or(z.literal('')),
  
  address_street: z.string().max(255, 'Rua deve ter no máximo 255 caracteres').optional(),
  address_number: z.string().max(20, 'Número deve ter no máximo 20 caracteres').optional(),
  address_complement: z.string().max(100, 'Complemento deve ter no máximo 100 caracteres').optional(),
  address_neighborhood: z.string().max(100, 'Bairro deve ter no máximo 100 caracteres').optional(),
  address_city: z.string().max(100, 'Cidade deve ter no máximo 100 caracteres').optional(),
  address_state: z.enum(brazilianStates).optional(),
  address_zip_code: z.string().refine(validateCEP, 'CEP inválido').optional(),
  
  bank_name: z.string().max(100, 'Nome do banco deve ter no máximo 100 caracteres').optional(),
  bank_agency: z.string().max(20, 'Agência deve ter no máximo 20 caracteres').optional(),
  bank_account: z.string().max(20, 'Conta deve ter no máximo 20 caracteres').optional(),
  bank_account_type: z.enum(['corrente', 'poupanca']).optional(),
  pix_key: z.string().max(255, 'Chave PIX deve ter no máximo 255 caracteres').optional(),
  pix_key_type: z.enum(['cpf', 'email', 'phone', 'random']).optional(),
});

// Schema for creating a new collaborator
export const createCollaboratorSchema = baseCollaboratorSchema;

// Schema for updating an existing collaborator
export const updateCollaboratorSchema = baseCollaboratorSchema.partial().extend({
  id: z.string().uuid('ID inválido'),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
});

// Schema for collaborator filters
export const collaboratorFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  city: z.string().optional(),
  state: z.enum(brazilianStates).optional(),
  page: z.number().min(1, 'Página deve ser maior que 0').optional(),
  limit: z.number().min(1, 'Limite deve ser maior que 0').max(100, 'Limite máximo é 100').optional(),
});

// Schema for pagination
export const paginationSchema = z.object({
  page: z.number().min(1, 'Página deve ser maior que 0').default(1),
  limit: z.number().min(1, 'Limite deve ser maior que 0').max(100, 'Limite máximo é 100').default(20),
});

// Export types
export type CreateCollaboratorInput = z.infer<typeof createCollaboratorSchema>;
export type UpdateCollaboratorInput = z.infer<typeof updateCollaboratorSchema>;
export type CollaboratorFiltersInput = z.infer<typeof collaboratorFiltersSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
