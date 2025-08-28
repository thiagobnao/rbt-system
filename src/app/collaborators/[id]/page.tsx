'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, User, Phone, MapPin, CreditCard, Calendar, FileText } from 'lucide-react';
import { Collaborator } from '@/lib/types/collaborator';
import { collaboratorService } from '@/lib/services/collaboratorService';
import { formatCPF, formatPhone, formatCEP, formatDate } from '@/lib/utils/formatters';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

interface CollaboratorDetailPageProps {
  params: {
    id: string;
  };
}

export default function CollaboratorDetailPage({ params }: CollaboratorDetailPageProps) {
  const router = useRouter();
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollaborator();
  }, [params.id]);

  const loadCollaborator = async () => {
    try {
      setLoading(true);
      const data = await collaboratorService.getCollaborator(params.id);
      setCollaborator(data);
    } catch (error) {
      console.error('Error loading collaborator:', error);
      toast.error('Erro ao carregar dados do colaborador');
      router.push('/collaborators');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inativo</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspenso</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!collaborator) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Colaborador não encontrado</h1>
          <p className="text-muted-foreground mt-2">
            O colaborador que você está procurando não existe ou foi removido.
          </p>
          <Button onClick={() => router.push('/collaborators')} className="mt-4">
            Voltar para a lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            <h1 className="text-3xl font-bold tracking-tight">{collaborator.name}</h1>
            <p className="text-muted-foreground">
              Detalhes do colaborador
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {getStatusBadge(collaborator.status)}
          <Button onClick={() => router.push(`/collaborators/${params.id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Nome Completo</Label>
                <p className="text-lg font-medium">{collaborator.name}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-muted-foreground">CPF</Label>
                <p className="font-mono">{formatCPF(collaborator.cpf)}</p>
              </div>
              
              {collaborator.birth_date && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Data de Nascimento</Label>
                  <p>{formatDate(collaborator.birth_date)}</p>
                </div>
              )}
              
              {collaborator.rg && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">RG</Label>
                  <p>{collaborator.rg}</p>
                </div>
              )}
              
              {collaborator.rg_issuer && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Órgão Emissor</Label>
                  <p>{collaborator.rg_issuer}</p>
                </div>
              )}
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
            <div className="grid grid-cols-1 gap-4">
              {collaborator.email && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">E-mail</Label>
                  <p>{collaborator.email}</p>
                </div>
              )}
              
              {collaborator.phone && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Telefone</Label>
                  <p>{formatPhone(collaborator.phone)}</p>
                </div>
              )}
              
              {collaborator.mobile_phone && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Celular</Label>
                  <p>{formatPhone(collaborator.mobile_phone)}</p>
                </div>
              )}
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
            <div className="grid grid-cols-1 gap-4">
              {collaborator.address_street && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Rua</Label>
                  <p>{collaborator.address_street}</p>
                </div>
              )}
              
              {collaborator.address_number && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Número</Label>
                  <p>{collaborator.address_number}</p>
                </div>
              )}
              
              {collaborator.address_complement && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Complemento</Label>
                  <p>{collaborator.address_complement}</p>
                </div>
              )}
              
              {collaborator.address_neighborhood && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Bairro</Label>
                  <p>{collaborator.address_neighborhood}</p>
                </div>
              )}
              
              {collaborator.address_city && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Cidade</Label>
                  <p>{collaborator.address_city}</p>
                </div>
              )}
              
              {collaborator.address_state && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
                  <p>{collaborator.address_state}</p>
                </div>
              )}
              
              {collaborator.address_zip_code && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">CEP</Label>
                  <p>{formatCEP(collaborator.address_zip_code)}</p>
                </div>
              )}
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
            <div className="grid grid-cols-1 gap-4">
              {collaborator.bank_name && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Nome do Banco</Label>
                  <p>{collaborator.bank_name}</p>
                </div>
              )}
              
              {collaborator.bank_agency && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Agência</Label>
                  <p>{collaborator.bank_agency}</p>
                </div>
              )}
              
              {collaborator.bank_account && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Conta</Label>
                  <p>{collaborator.bank_account}</p>
                </div>
              )}
              
              {collaborator.bank_account_type && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Tipo de Conta</Label>
                  <p className="capitalize">{collaborator.bank_account_type}</p>
                </div>
              )}
              
              {collaborator.pix_key && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Chave PIX</Label>
                  <p>{collaborator.pix_key}</p>
                </div>
              )}
              
              {collaborator.pix_key_type && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Tipo da Chave PIX</Label>
                  <p className="capitalize">{collaborator.pix_key_type}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Informações do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Data de Criação</Label>
              <p>{formatDate(collaborator.created_at)}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Última Atualização</Label>
              <p>{formatDate(collaborator.updated_at)}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Status</Label>
              <div className="mt-1">
                {getStatusBadge(collaborator.status)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
