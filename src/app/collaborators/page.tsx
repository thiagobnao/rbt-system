'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';
import { CollaboratorList } from '@/components/collaborators/CollaboratorList';
import { CreateCollaboratorModal } from '@/components/collaborators/CreateCollaboratorModal';
import { CollaboratorFormModal } from '@/components/collaborators/CollaboratorFormModal';
import { collaboratorService } from '@/lib/services/collaboratorService';
import { Collaborator, CollaboratorFilters } from '@/lib/types/collaborator';
import { useToast } from '@/lib/hooks/useToast';
import { PageLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function CollaboratorsPage() {
  const router = useRouter();
  const toast = useToast();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CollaboratorFilters>({
    page: 1,
    limit: 10
  });
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadCollaborators();
  }, [filters.page, filters.limit, filters.search, filters.status]);

  const loadCollaborators = async () => {
    try {
      setLoading(true);
      const response = await collaboratorService.getCollaborators(filters);
      setCollaborators(response.collaborators);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error loading collaborators:', error);
      toast.error('Erro ao carregar colaboradores');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value, page: 1 }));
  };

  const handleStatusFilter = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      status: value === 'all' ? undefined : value as any, 
      page: 1 
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleDelete = async (id: string) => {
    try {
      await collaboratorService.deleteCollaborator(id);
      toast.success('Colaborador excluído com sucesso');
      loadCollaborators();
    } catch (error) {
      console.error('Error deleting collaborator:', error);
      toast.error('Erro ao excluir colaborador');
    }
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    loadCollaborators();
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ProtectedRoute>
      <PageLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Colaboradores</h1>
              <p className="text-muted-foreground">
                Gerencie os colaboradores do sistema
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Colaborador
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar colaboradores..."
                    value={filters.search || ''}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={filters.status || 'all'}
                  onValueChange={handleStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {total} colaboradores encontrados
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collaborators List */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Colaboradores</CardTitle>
            </CardHeader>
            <CardContent>
              <CollaboratorList
                collaborators={collaborators}
                loading={loading}
                onDelete={handleDelete}
                onEdit={(id: string) => router.push(`/collaborators/${id}/edit`)}
                onView={(id: string) => router.push(`/collaborators/${id}`)}
                currentPage={filters.page || 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                total={total}
              />
            </CardContent>
          </Card>
        </div>

        {/* Modal de Cadastro */}
        <CreateCollaboratorModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        >
          <CollaboratorFormModal
            onSuccess={handleModalSuccess}
            onCancel={handleModalCancel}
          />
        </CreateCollaboratorModal>
      </PageLayout>
    </ProtectedRoute>
  );
}
