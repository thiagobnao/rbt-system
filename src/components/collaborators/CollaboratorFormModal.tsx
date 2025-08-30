'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, User, Phone, MapPin, CreditCard } from 'lucide-react';
import { CreateCollaboratorRequest } from '@/lib/types/collaborator';
import { createCollaboratorSchema } from '@/lib/validations/collaborator';
import { collaboratorService } from '@/lib/services/collaboratorService';
import { formatCPF, formatPhone, formatCEP } from '@/lib/utils/formatters';
import { useToast } from '@/lib/hooks/useToast';
import { cn } from '@/lib/utils';

interface CollaboratorFormModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CollaboratorFormModal({ onSuccess, onCancel }: CollaboratorFormModalProps) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateCollaboratorRequest>({
    resolver: zodResolver(createCollaboratorSchema),
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
  });

  const { formState: { errors }, handleSubmit, setValue, watch } = form;

  const onSubmit = async (data: CreateCollaboratorRequest) => {
    try {
      setLoading(true);
      await collaboratorService.createCollaborator(data);
      toast.success('Colaborador criado com sucesso!');
      onSuccess();
    } catch (error: any) {
      console.error('Error saving collaborator:', error);
      
      // Handle validation errors from server
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          if (err.field) {
            form.setError(err.field as any, { message: err.message });
          }
        });
      } else {
        toast.error(error.response?.data?.message || 'Erro ao salvar colaborador');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCPF(value);
    setValue('cpf', formatted);
  };

  const handlePhoneChange = (field: 'phone' | 'mobile_phone') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhone(value);
    setValue(field, formatted);
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCEP(value);
    setValue('address_zip_code', formatted);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                className={cn(errors.name && 'border-red-500')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                {...form.register('cpf')}
                onChange={handleCPFChange}
                className={cn(errors.cpf && 'border-red-500')}
              />
              {errors.cpf && (
                <p className="text-sm text-red-500">{errors.cpf.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth_date">Data de Nascimento</Label>
              <Input
                id="birth_date"
                type="date"
                {...form.register('birth_date')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rg">RG</Label>
              <Input
                id="rg"
                {...form.register('rg')}
                className={cn(errors.rg && 'border-red-500')}
              />
              {errors.rg && (
                <p className="text-sm text-red-500">{errors.rg.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rg_issuer">Órgão Emissor</Label>
              <Input
                id="rg_issuer"
                {...form.register('rg_issuer')}
                className={cn(errors.rg_issuer && 'border-red-500')}
              />
              {errors.rg_issuer && (
                <p className="text-sm text-red-500">{errors.rg_issuer.message}</p>
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
                className={cn(errors.email && 'border-red-500')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                {...form.register('phone')}
                onChange={handlePhoneChange('phone')}
                className={cn(errors.phone && 'border-red-500')}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile_phone">Celular</Label>
              <Input
                id="mobile_phone"
                {...form.register('mobile_phone')}
                onChange={handlePhoneChange('mobile_phone')}
                className={cn(errors.mobile_phone && 'border-red-500')}
              />
              {errors.mobile_phone && (
                <p className="text-sm text-red-500">{errors.mobile_phone.message}</p>
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
                className={cn(errors.address_street && 'border-red-500')}
              />
              {errors.address_street && (
                <p className="text-sm text-red-500">{errors.address_street.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_number">Número</Label>
              <Input
                id="address_number"
                {...form.register('address_number')}
                className={cn(errors.address_number && 'border-red-500')}
              />
              {errors.address_number && (
                <p className="text-sm text-red-500">{errors.address_number.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_complement">Complemento</Label>
              <Input
                id="address_complement"
                {...form.register('address_complement')}
                className={cn(errors.address_complement && 'border-red-500')}
              />
              {errors.address_complement && (
                <p className="text-sm text-red-500">{errors.address_complement.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_neighborhood">Bairro</Label>
              <Input
                id="address_neighborhood"
                {...form.register('address_neighborhood')}
                className={cn(errors.address_neighborhood && 'border-red-500')}
              />
              {errors.address_neighborhood && (
                <p className="text-sm text-red-500">{errors.address_neighborhood.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_city">Cidade</Label>
              <Input
                id="address_city"
                {...form.register('address_city')}
                className={cn(errors.address_city && 'border-red-500')}
              />
              {errors.address_city && (
                <p className="text-sm text-red-500">{errors.address_city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_state">Estado</Label>
              <Select
                value={watch('address_state') || 'placeholder'}
                onValueChange={(value) => setValue('address_state', value === 'placeholder' ? '' : value as any)}
              >
                <SelectTrigger className={cn(errors.address_state && 'border-red-500')}>
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder">Selecione</SelectItem>
                  <SelectItem value="AC">Acre</SelectItem>
                  <SelectItem value="AL">Alagoas</SelectItem>
                  <SelectItem value="AP">Amapá</SelectItem>
                  <SelectItem value="AM">Amazonas</SelectItem>
                  <SelectItem value="BA">Bahia</SelectItem>
                  <SelectItem value="CE">Ceará</SelectItem>
                  <SelectItem value="DF">Distrito Federal</SelectItem>
                  <SelectItem value="ES">Espírito Santo</SelectItem>
                  <SelectItem value="GO">Goiás</SelectItem>
                  <SelectItem value="MA">Maranhão</SelectItem>
                  <SelectItem value="MT">Mato Grosso</SelectItem>
                  <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                  <SelectItem value="MG">Minas Gerais</SelectItem>
                  <SelectItem value="PA">Pará</SelectItem>
                  <SelectItem value="PB">Paraíba</SelectItem>
                  <SelectItem value="PR">Paraná</SelectItem>
                  <SelectItem value="PE">Pernambuco</SelectItem>
                  <SelectItem value="PI">Piauí</SelectItem>
                  <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                  <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                  <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                  <SelectItem value="RO">Rondônia</SelectItem>
                  <SelectItem value="RR">Roraima</SelectItem>
                  <SelectItem value="SC">Santa Catarina</SelectItem>
                  <SelectItem value="SP">São Paulo</SelectItem>
                  <SelectItem value="SE">Sergipe</SelectItem>
                  <SelectItem value="TO">Tocantins</SelectItem>
                </SelectContent>
              </Select>
              {errors.address_state && (
                <p className="text-sm text-red-500">{errors.address_state.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_zip_code">CEP</Label>
              <Input
                id="address_zip_code"
                {...form.register('address_zip_code')}
                onChange={handleCEPChange}
                className={cn(errors.address_zip_code && 'border-red-500')}
              />
              {errors.address_zip_code && (
                <p className="text-sm text-red-500">{errors.address_zip_code.message}</p>
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
                className={cn(errors.bank_name && 'border-red-500')}
              />
              {errors.bank_name && (
                <p className="text-sm text-red-500">{errors.bank_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank_agency">Agência</Label>
              <Input
                id="bank_agency"
                {...form.register('bank_agency')}
                className={cn(errors.bank_agency && 'border-red-500')}
              />
              {errors.bank_agency && (
                <p className="text-sm text-red-500">{errors.bank_agency.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank_account">Conta</Label>
              <Input
                id="bank_account"
                {...form.register('bank_account')}
                className={cn(errors.bank_account && 'border-red-500')}
              />
              {errors.bank_account && (
                <p className="text-sm text-red-500">{errors.bank_account.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank_account_type">Tipo de Conta</Label>
              <Select
                value={watch('bank_account_type') || 'placeholder'}
                onValueChange={(value) => setValue('bank_account_type', value === 'placeholder' ? '' : value as any)}
              >
                <SelectTrigger className={cn(errors.bank_account_type && 'border-red-500')}>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder">Selecione</SelectItem>
                  <SelectItem value="corrente">Corrente</SelectItem>
                  <SelectItem value="poupanca">Poupança</SelectItem>
                </SelectContent>
              </Select>
              {errors.bank_account_type && (
                <p className="text-sm text-red-500">{errors.bank_account_type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pix_key">Chave PIX</Label>
              <Input
                id="pix_key"
                {...form.register('pix_key')}
                className={cn(errors.pix_key && 'border-red-500')}
              />
              {errors.pix_key && (
                <p className="text-sm text-red-500">{errors.pix_key.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pix_key_type">Tipo da Chave PIX</Label>
              <Select
                value={watch('pix_key_type') || 'placeholder'}
                onValueChange={(value) => setValue('pix_key_type', value === 'placeholder' ? '' : value as any)}
              >
                <SelectTrigger className={cn(errors.pix_key_type && 'border-red-500')}>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder">Selecione</SelectItem>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="random">Chave Aleatória</SelectItem>
                </SelectContent>
              </Select>
              {errors.pix_key_type && (
                <p className="text-sm text-red-500">{errors.pix_key_type.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Salvando...' : 'Criar Colaborador'}
        </Button>
      </div>
    </form>
  );
}
