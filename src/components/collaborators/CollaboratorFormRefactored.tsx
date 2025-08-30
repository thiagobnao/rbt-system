'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, User, Phone, MapPin, CreditCard } from 'lucide-react';
import { CreateCollaboratorRequest } from '@/lib/types/collaborator';
import { createCollaboratorSchema } from '@/lib/validations/collaborator';
import { collaboratorService } from '@/lib/services/collaboratorService';
import { formatCPF, formatPhone, formatCEP } from '@/lib/utils/formatters';
import { 
  Form, 
  FormFieldWrapper, 
  FormSubmitButton 
} from '@/components/ui/form';
import { useFormWithZod } from '@/lib/hooks/useFormWithZod';
import { 
  InputField, 
  SelectField, 
  FormattedInputField 
} from '@/components/ui/form-fields';

interface CollaboratorFormProps {
  mode: 'create' | 'edit';
  collaboratorId?: string;
}

// Opções para os campos select
const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

const bankAccountTypes = [
  { value: 'corrente', label: 'Conta Corrente' },
  { value: 'poupanca', label: 'Conta Poupança' },
];

const pixKeyTypes = [
  { value: 'cpf', label: 'CPF' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Telefone' },
  { value: 'random', label: 'Chave Aleatória' },
];

export function CollaboratorFormRefactored({ mode, collaboratorId }: CollaboratorFormProps) {
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(mode === 'edit');

  const {
    form,
    handleSubmit,
    isSubmitting,
    setValue,
    watch,
    errors,
  } = useFormWithZod({
    schema: createCollaboratorSchema,
    defaultValues: {
      name: '',
      cpf: '',
      email: '',
      birth_date: '',
      rg: '',
      rg_issuer: '',
      phone: '',
      mobile_phone: '',
      address_street: '',
      address_number: '',
      address_complement: '',
      address_neighborhood: '',
      address_city: '',
      address_state: undefined,
      address_zip_code: '',
      bank_name: '',
      bank_agency: '',
      bank_account: '',
      bank_account_type: undefined,
      pix_key: '',
      pix_key_type: undefined,
    },
    onSuccess: async (data) => {
      try {
        if (mode === 'create') {
          await collaboratorService.createCollaborator(data);
        } else {
          await collaboratorService.updateCollaborator(collaboratorId!, { id: collaboratorId!, ...data });
        }
        router.push('/collaborators');
      } catch (error: any) {
        console.error('Error saving collaborator:', error);
        
        // Handle validation errors from server
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err: any) => {
            if (err.field) {
              form.setError(err.field as any, { message: err.message });
            }
          });
        }
        throw error; // Re-throw to trigger onError
      }
    },
    successMessage: mode === 'create' ? 'Colaborador criado com sucesso!' : 'Colaborador atualizado com sucesso!',
    errorMessage: 'Erro ao salvar colaborador',
  });

  // Load collaborator data for edit mode
  useEffect(() => {
    if (mode === 'edit' && collaboratorId) {
      const loadCollaborator = async () => {
        try {
          const collaborator = await collaboratorService.getCollaborator(collaboratorId);
          
          // Set form values
          Object.entries(collaborator).forEach(([key, value]) => {
            if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && key !== 'created_by' && key !== 'updated_by') {
              setValue(key as any, value || '');
            }
          });
        } catch (error) {
          console.error('Error loading collaborator:', error);
          router.push('/collaborators');
        } finally {
          setInitialLoading(false);
        }
      };

      loadCollaborator();
    } else {
      setInitialLoading(false);
    }
  }, [mode, collaboratorId, setValue, router]);

  if (initialLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/collaborators')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === 'create' ? 'Novo Colaborador' : 'Editar Colaborador'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'create' ? 'Cadastre um novo colaborador' : 'Atualize os dados do colaborador'}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldWrapper
                  name="name"
                  label="Nome Completo"
                  description="Nome completo do colaborador"
                >
                  <InputField
                    name="name"
                    placeholder="João Silva"
                    error={errors.name?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="cpf"
                  label="CPF"
                  description="CPF do colaborador"
                >
                  <FormattedInputField
                    name="cpf"
                    placeholder="000.000.000-00"
                    formatter={formatCPF}
                    error={errors.cpf?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="birth_date"
                  label="Data de Nascimento"
                  description="Data de nascimento"
                >
                  <InputField
                    name="birth_date"
                    type="date"
                    error={errors.birth_date?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="rg"
                  label="RG"
                  description="Número do RG"
                >
                  <InputField
                    name="rg"
                    placeholder="00.000.000-0"
                    maxLength={20}
                    error={errors.rg?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="rg_issuer"
                  label="Emissor do RG"
                  description="Órgão emissor do RG"
                >
                  <InputField
                    name="rg_issuer"
                    placeholder="SSP"
                    maxLength={100}
                    error={errors.rg_issuer?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="email"
                  label="Email"
                  description="Email profissional"
                >
                  <InputField
                    name="email"
                    type="email"
                    placeholder="joao@email.com"
                    error={errors.email?.message}
                  />
                </FormFieldWrapper>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldWrapper
                  name="phone"
                  label="Telefone"
                  description="Telefone fixo"
                >
                  <FormattedInputField
                    name="phone"
                    placeholder="(11) 3333-3333"
                    formatter={formatPhone}
                    error={errors.phone?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="mobile_phone"
                  label="Celular"
                  description="Telefone celular"
                >
                  <FormattedInputField
                    name="mobile_phone"
                    placeholder="(11) 99999-9999"
                    formatter={formatPhone}
                    error={errors.mobile_phone?.message}
                  />
                </FormFieldWrapper>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormFieldWrapper
                  name="address_zip_code"
                  label="CEP"
                  description="Código postal"
                >
                  <FormattedInputField
                    name="address_zip_code"
                    placeholder="00000-000"
                    formatter={formatCEP}
                    error={errors.address_zip_code?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="address_state"
                  label="Estado"
                  description="Estado"
                >
                  <SelectField
                    name="address_state"
                    options={brazilianStates}
                    error={errors.address_state?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="address_city"
                  label="Cidade"
                  description="Cidade"
                >
                  <InputField
                    name="address_city"
                    placeholder="São Paulo"
                    maxLength={100}
                    error={errors.address_city?.message}
                  />
                </FormFieldWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldWrapper
                  name="address_street"
                  label="Rua"
                  description="Nome da rua"
                >
                  <InputField
                    name="address_street"
                    placeholder="Rua das Flores"
                    maxLength={255}
                    error={errors.address_street?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="address_number"
                  label="Número"
                  description="Número da residência"
                >
                  <InputField
                    name="address_number"
                    placeholder="123"
                    maxLength={20}
                    error={errors.address_number?.message}
                  />
                </FormFieldWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldWrapper
                  name="address_complement"
                  label="Complemento"
                  description="Apartamento, bloco, etc."
                >
                  <InputField
                    name="address_complement"
                    placeholder="Apto 101"
                    maxLength={100}
                    error={errors.address_complement?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="address_neighborhood"
                  label="Bairro"
                  description="Bairro"
                >
                  <InputField
                    name="address_neighborhood"
                    placeholder="Centro"
                    maxLength={100}
                    error={errors.address_neighborhood?.message}
                  />
                </FormFieldWrapper>
              </div>
            </CardContent>
          </Card>

          {/* Bank Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Informações Bancárias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldWrapper
                  name="bank_name"
                  label="Banco"
                  description="Nome do banco"
                >
                  <InputField
                    name="bank_name"
                    placeholder="Banco do Brasil"
                    maxLength={100}
                    error={errors.bank_name?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="bank_agency"
                  label="Agência"
                  description="Número da agência"
                >
                  <InputField
                    name="bank_agency"
                    placeholder="0000"
                    maxLength={20}
                    error={errors.bank_agency?.message}
                  />
                </FormFieldWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldWrapper
                  name="bank_account"
                  label="Conta"
                  description="Número da conta"
                >
                  <InputField
                    name="bank_account"
                    placeholder="00000-0"
                    maxLength={20}
                    error={errors.bank_account?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="bank_account_type"
                  label="Tipo de Conta"
                  description="Tipo da conta bancária"
                >
                  <SelectField
                    name="bank_account_type"
                    options={bankAccountTypes}
                    error={errors.bank_account_type?.message}
                  />
                </FormFieldWrapper>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormFieldWrapper
                  name="pix_key"
                  label="Chave PIX"
                  description="Chave PIX para pagamentos"
                >
                  <InputField
                    name="pix_key"
                    placeholder="chave@email.com"
                    maxLength={255}
                    error={errors.pix_key?.message}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper
                  name="pix_key_type"
                  label="Tipo da Chave PIX"
                  description="Tipo da chave PIX"
                >
                  <SelectField
                    name="pix_key_type"
                    options={pixKeyTypes}
                    error={errors.pix_key_type?.message}
                  />
                </FormFieldWrapper>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/collaborators')}
            >
              Cancelar
            </Button>
            <FormSubmitButton loading={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {mode === 'create' ? 'Criar Colaborador' : 'Atualizar Colaborador'}
            </FormSubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
