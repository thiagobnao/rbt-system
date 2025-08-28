'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, User, Phone, MapPin, CreditCard } from 'lucide-react';
import { Collaborator, CreateCollaboratorRequest, UpdateCollaboratorRequest } from '@/lib/types/collaborator';
import { createCollaboratorSchema, updateCollaboratorSchema } from '@/lib/validations/collaborator';
import { collaboratorService } from '@/lib/services/collaboratorService';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CollaboratorFormProps {
  mode: 'create' | 'edit';
  collaboratorId?: string;
  onSuccess?: () => void;
}

export function CollaboratorForm({ mode, collaboratorId, onSuccess }: CollaboratorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(mode === 'edit');

  // Form setup with Zod validation
  const schema = mode === 'create' ? createCollaboratorSchema : updateCollaboratorSchema;
  const form = useForm<CreateCollaboratorRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      cpf: '',
      birth_date: '',
      rg: '',
      rg_issuer: '',
      email: '',
      phone: '',
      mobile_phone: '',
      address_street: '',
      address_number: '',
      address_complement: '',
      address_neighborhood: '',
      address_city: '',
      address_state: '',
      address_zip_code: '',
      bank_name: '',
      bank_agency: '',
      bank_account: '',
      bank_account_type: 'corrente',
      pix_key: '',
      pix_key_type: 'cpf',
    },
  });

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Load collaborator data for edit mode
  useEffect(() => {
    if (mode === 'edit' && collaboratorId) {
      loadCollaborator();
    }
  }, [mode, collaboratorId]);

  const loadCollaborator = async () => {
    try {
      setInitialLoading(true);
      const collaborator = await collaboratorService.getCollaborator(collaboratorId!);
      
      // Convert date format for input field
      const birthDate = collaborator.birth_date 
        ? new Date(collaborator.birth_date).toISOString().split('T')[0]
        : '';

      form.reset({
        name: collaborator.name || '',
        cpf: collaborator.cpf || '',
        birth_date: birthDate,
        rg: collaborator.rg || '',
        rg_issuer: collaborator.rg_issuer || '',
        email: collaborator.email || '',
        phone: collaborator.phone || '',
        mobile_phone: collaborator.mobile_phone || '',
        address_street: collaborator.address_street || '',
        address_number: collaborator.address_number || '',
        address_complement: collaborator.address_complement || '',
        address_neighborhood: collaborator.address_neighborhood || '',
        address_city: collaborator.address_city || '',
        address_state: collaborator.address_state || '',
        address_zip_code: collaborator.address_zip_code || '',
        bank_name: collaborator.bank_name || '',
        bank_agency: collaborator.bank_agency || '',
        bank_account: collaborator.bank_account || '',
        bank_account_type: collaborator.bank_account_type || 'corrente',
        pix_key: collaborator.pix_key || '',
        pix_key_type: collaborator.pix_key_type || 'cpf',
      });
    } catch (error) {
      console.error('Error loading collaborator:', error);
      toast.error('Erro ao carregar dados do colaborador');
      router.push('/collaborators');
    } finally {
      setInitialLoading(false);
    }
  };

  const onSubmit = async (data: CreateCollaboratorRequest) => {
    try {
      setLoading(true);
      
      if (mode === 'create') {
        await collaboratorService.createCollaborator(data);
        toast.success('Colaborador criado com sucesso!');
      } else {
        const updateData: UpdateCollaboratorRequest = {
          id: collaboratorId!,
          ...data,
        };
        await collaboratorService.updateCollaborator(collaboratorId!, updateData);
        toast.success('Colaborador atualizado com sucesso!');
      }
      
      onSuccess?.();
      router.push('/collaborators');
    } catch (error: any) {
      console.error('Error saving collaborator:', error);
      
      // Handle validation errors from API
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        Object.keys(apiErrors).forEach((field) => {
          form.setError(field as keyof CreateCollaboratorRequest, {
            type: 'server',
            message: apiErrors[field],
          });
        });
        toast.error('Por favor, corrija os erros no formulário');
      } else {
        toast.error(mode === 'create' ? 'Erro ao criar colaborador' : 'Erro ao atualizar colaborador');
      }
    } finally {
      setLoading(false);
    }
  };

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
            {mode === 'create' 
              ? 'Preencha os dados para criar um novo colaborador'
              : 'Atualize os dados do colaborador'
            }
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  placeholder="Digite o nome completo"
                  className={cn(
                    form.formState.errors.name && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  {...form.register('cpf')}
                  placeholder="000.000.000-00"
                  className={cn(
                    form.formState.errors.cpf && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.cpf && (
                  <p className="text-sm text-red-500">{form.formState.errors.cpf.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birth_date">Data de Nascimento</Label>
                <Input
                  id="birth_date"
                  type="date"
                  {...form.register('birth_date')}
                  className={cn(
                    form.formState.errors.birth_date && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.birth_date && (
                  <p className="text-sm text-red-500">{form.formState.errors.birth_date.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rg">RG</Label>
                <Input
                  id="rg"
                  {...form.register('rg')}
                  placeholder="00.000.000-0"
                  className={cn(
                    form.formState.errors.rg && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.rg && (
                  <p className="text-sm text-red-500">{form.formState.errors.rg.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rg_issuer">Órgão Emissor</Label>
                <Input
                  id="rg_issuer"
                  {...form.register('rg_issuer')}
                  placeholder="SSP/SP"
                  className={cn(
                    form.formState.errors.rg_issuer && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.rg_issuer && (
                  <p className="text-sm text-red-500">{form.formState.errors.rg_issuer.message}</p>
                )}
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  placeholder="email@exemplo.com"
                  className={cn(
                    form.formState.errors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  {...form.register('phone')}
                  placeholder="(11) 0000-0000"
                  className={cn(
                    form.formState.errors.phone && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile_phone">Celular</Label>
                <Input
                  id="mobile_phone"
                  {...form.register('mobile_phone')}
                  placeholder="(11) 00000-0000"
                  className={cn(
                    form.formState.errors.mobile_phone && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.mobile_phone && (
                  <p className="text-sm text-red-500">{form.formState.errors.mobile_phone.message}</p>
                )}
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address_street">Rua</Label>
                <Input
                  id="address_street"
                  {...form.register('address_street')}
                  placeholder="Nome da rua"
                  className={cn(
                    form.formState.errors.address_street && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.address_street && (
                  <p className="text-sm text-red-500">{form.formState.errors.address_street.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_number">Número</Label>
                <Input
                  id="address_number"
                  {...form.register('address_number')}
                  placeholder="123"
                  className={cn(
                    form.formState.errors.address_number && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.address_number && (
                  <p className="text-sm text-red-500">{form.formState.errors.address_number.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_complement">Complemento</Label>
                <Input
                  id="address_complement"
                  {...form.register('address_complement')}
                  placeholder="Apto 101"
                  className={cn(
                    form.formState.errors.address_complement && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.address_complement && (
                  <p className="text-sm text-red-500">{form.formState.errors.address_complement.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_neighborhood">Bairro</Label>
                <Input
                  id="address_neighborhood"
                  {...form.register('address_neighborhood')}
                  placeholder="Nome do bairro"
                  className={cn(
                    form.formState.errors.address_neighborhood && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.address_neighborhood && (
                  <p className="text-sm text-red-500">{form.formState.errors.address_neighborhood.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_city">Cidade</Label>
                <Input
                  id="address_city"
                  {...form.register('address_city')}
                  placeholder="Nome da cidade"
                  className={cn(
                    form.formState.errors.address_city && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.address_city && (
                  <p className="text-sm text-red-500">{form.formState.errors.address_city.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_state">Estado</Label>
                <Select
                  value={form.watch('address_state')}
                  onValueChange={(value) => form.setValue('address_state', value)}
                >
                  <SelectTrigger className={cn(
                    form.formState.errors.address_state && "border-red-500 focus-visible:ring-red-500"
                  )}>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.address_state && (
                  <p className="text-sm text-red-500">{form.formState.errors.address_state.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_zip_code">CEP</Label>
                <Input
                  id="address_zip_code"
                  {...form.register('address_zip_code')}
                  placeholder="00000-000"
                  className={cn(
                    form.formState.errors.address_zip_code && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.address_zip_code && (
                  <p className="text-sm text-red-500">{form.formState.errors.address_zip_code.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Banking Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Dados Bancários
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank_name">Nome do Banco</Label>
                <Input
                  id="bank_name"
                  {...form.register('bank_name')}
                  placeholder="Nome do banco"
                  className={cn(
                    form.formState.errors.bank_name && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.bank_name && (
                  <p className="text-sm text-red-500">{form.formState.errors.bank_name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bank_agency">Agência</Label>
                <Input
                  id="bank_agency"
                  {...form.register('bank_agency')}
                  placeholder="0000"
                  className={cn(
                    form.formState.errors.bank_agency && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.bank_agency && (
                  <p className="text-sm text-red-500">{form.formState.errors.bank_agency.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bank_account">Conta</Label>
                <Input
                  id="bank_account"
                  {...form.register('bank_account')}
                  placeholder="00000-0"
                  className={cn(
                    form.formState.errors.bank_account && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.bank_account && (
                  <p className="text-sm text-red-500">{form.formState.errors.bank_account.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bank_account_type">Tipo de Conta</Label>
                <Select
                  value={form.watch('bank_account_type')}
                  onValueChange={(value) => form.setValue('bank_account_type', value as 'corrente' | 'poupanca')}
                >
                  <SelectTrigger className={cn(
                    form.formState.errors.bank_account_type && "border-red-500 focus-visible:ring-red-500"
                  )}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrente">Corrente</SelectItem>
                    <SelectItem value="poupanca">Poupança</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.bank_account_type && (
                  <p className="text-sm text-red-500">{form.formState.errors.bank_account_type.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pix_key">Chave PIX</Label>
                <Input
                  id="pix_key"
                  {...form.register('pix_key')}
                  placeholder="Chave PIX"
                  className={cn(
                    form.formState.errors.pix_key && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {form.formState.errors.pix_key && (
                  <p className="text-sm text-red-500">{form.formState.errors.pix_key.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pix_key_type">Tipo da Chave PIX</Label>
                <Select
                  value={form.watch('pix_key_type')}
                  onValueChange={(value) => form.setValue('pix_key_type', value as 'cpf' | 'email' | 'phone' | 'random')}
                >
                  <SelectTrigger className={cn(
                    form.formState.errors.pix_key_type && "border-red-500 focus-visible:ring-red-500"
                  )}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpf">CPF</SelectItem>
                    <SelectItem value="email">E-mail</SelectItem>
                    <SelectItem value="phone">Telefone</SelectItem>
                    <SelectItem value="random">Chave Aleatória</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.pix_key_type && (
                  <p className="text-sm text-red-500">{form.formState.errors.pix_key_type.message}</p>
                )}
              </div>
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
          <Button type="submit" disabled={loading || form.formState.isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {loading || form.formState.isSubmitting ? 'Salvando...' : mode === 'create' ? 'Criar Colaborador' : 'Atualizar Colaborador'}
          </Button>
        </div>
      </form>
    </div>
  );
}
