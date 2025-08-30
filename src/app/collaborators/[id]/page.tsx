'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, User, Phone, MapPin, CreditCard } from 'lucide-react';
import { Collaborator } from '@/lib/types/collaborator';
import { collaboratorService } from '@/lib/services/collaboratorService';
import { formatCPF, formatPhone, formatDate } from '@/lib/utils/formatters';
import { toast } from 'sonner';
import { PageLayout } from '@/components/layout';

interface CollaboratorDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CollaboratorDetailPage({ params }: CollaboratorDetailPageProps) {
  const router = useRouter();
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollaborator = async () => {
      try {
        const { id } = await params;
        const data = await collaboratorService.getCollaborator(id);
        setCollaborator(data);
      } catch (error) {
        console.error('Error loading collaborator:', error);
        toast.error('Erro ao carregar dados do colaborador');
        router.push('/collaborators');
      } finally {
        setLoading(false);
      }
    };

    loadCollaborator();
  }, [params, router]);

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
      <PageLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!collaborator) {
    return (
      <PageLayout>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Colaborador não encontrado</h1>
          <p className="text-muted-foreground">O colaborador solicitado não foi encontrado.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="space-y-6">
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{collaborator.name}</h1>
            <p className="text-muted-foreground">Detalhes do colaborador</p>
          </div>
          <Button onClick={() => router.push(`/collaborators/${collaborator.id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
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
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                <p className="text-lg">{collaborator.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">CPF</label>
                <p className="font-mono">{formatCPF(collaborator.cpf)}</p>
              </div>
              {collaborator.birth_date && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data de Nascimento</label>
                  <p>{formatDate(collaborator.birth_date)}</p>
                </div>
              )}
              {collaborator.rg && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">RG</label>
                  <p>{collaborator.rg}</p>
                </div>
              )}
              {collaborator.rg_issuer && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Órgão Emissor</label>
                  <p>{collaborator.rg_issuer}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">{getStatusBadge(collaborator.status)}</div>
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
              {collaborator.email && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                  <p>{collaborator.email}</p>
                </div>
              )}
              {collaborator.phone && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                  <p>{formatPhone(collaborator.phone)}</p>
                </div>
              )}
              {collaborator.mobile_phone && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Celular</label>
                  <p>{formatPhone(collaborator.mobile_phone)}</p>
                </div>
              )}
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
              {collaborator.address_street && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rua</label>
                  <p>{collaborator.address_street}</p>
                </div>
              )}
              {collaborator.address_number && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Número</label>
                  <p>{collaborator.address_number}</p>
                </div>
              )}
              {collaborator.address_complement && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Complemento</label>
                  <p>{collaborator.address_complement}</p>
                </div>
              )}
              {collaborator.address_neighborhood && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Bairro</label>
                  <p>{collaborator.address_neighborhood}</p>
                </div>
              )}
              {collaborator.address_city && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cidade</label>
                  <p>{collaborator.address_city}</p>
                </div>
              )}
              {collaborator.address_state && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Estado</label>
                  <p>{collaborator.address_state}</p>
                </div>
              )}
              {collaborator.address_zip_code && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CEP</label>
                  <p>{collaborator.address_zip_code}</p>
                </div>
              )}
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
              {collaborator.bank_name && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome do Banco</label>
                  <p>{collaborator.bank_name}</p>
                </div>
              )}
              {collaborator.bank_agency && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Agência</label>
                  <p>{collaborator.bank_agency}</p>
                </div>
              )}
              {collaborator.bank_account && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Conta</label>
                  <p>{collaborator.bank_account}</p>
                </div>
              )}
              {collaborator.bank_account_type && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tipo de Conta</label>
                  <p className="capitalize">{collaborator.bank_account_type}</p>
                </div>
              )}
              {collaborator.pix_key && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Chave PIX</label>
                  <p>{collaborator.pix_key}</p>
                </div>
              )}
              {collaborator.pix_key_type && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Tipo da Chave PIX</label>
                  <p className="capitalize">{collaborator.pix_key_type}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
