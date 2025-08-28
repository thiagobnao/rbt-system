'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CollaboratorList } from '@/components/collaborators/CollaboratorList';
import { collaboratorService } from '@/lib/services/collaboratorService';
import { Collaborator, CollaboratorFiltersInput } from '@/lib/types/collaborator';
import { toast } from 'sonner';

export default function CollaboratorsPage() {
  const router = useRouter();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  
  // Filters state
  const [filters, setFilters] = useState<CollaboratorFiltersInput>({
    search: '',
    status: undefined,
    city: '',
    state: '',
  });
  
  // Available filter options
  const [cities, setCities] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Load collaborators
  const loadCollaborators = async () => {
    try {
      setLoading(true);
      const response = await collaboratorService.getCollaborators({
        ...filters,
        page,
        limit,
      });
      
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

  // Load filter options
  const loadFilterOptions = async () => {
    try {
      const [citiesData, statesData] = await Promise.all([
        collaboratorService.getCities(),
        collaboratorService.getStates(),
      ]);
      
      setCities(citiesData);
      setStates(statesData);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof CollaboratorFiltersInput, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  // Handle search
  const handleSearch = (value: string) => {
    handleFilterChange('search', value);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle collaborator deletion
  const handleDelete = async (id: string) => {
    try {
      await collaboratorService.deleteCollaborator(id);
      toast.success('Colaborador excluído com sucesso');
      loadCollaborators(); // Reload the list
    } catch (error) {
      console.error('Error deleting collaborator:', error);
      toast.error('Erro ao excluir colaborador');
    }
  };

  // Load data on mount and when filters/page change
  useEffect(() => {
    loadCollaborators();
  }, [filters, page]);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Colaboradores</h1>
          <p className="text-muted-foreground">
            Gerencie os colaboradores do sistema
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => router.push('/collaborators/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Colaborador
          </Button>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou CPF..."
                value={filters.search || ''}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select
              value={filters.status || ''}
              onValueChange={(value) => handleFilterChange('status', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="suspended">Suspenso</SelectItem>
              </SelectContent>
            </Select>

            {/* City Filter */}
            <Select
              value={filters.city || ''}
              onValueChange={(value) => handleFilterChange('city', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* State Filter */}
            <Select
              value={filters.state || ''}
              onValueChange={(value) => handleFilterChange('state', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {brazilianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {loading ? (
            'Carregando...'
          ) : (
            `Mostrando ${collaborators.length} de ${total} colaboradores`
          )}
        </div>
        
        {total > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Página</span>
            <span className="text-sm font-medium">
              {page} de {totalPages}
            </span>
          </div>
        )}
      </div>

      {/* Collaborators List */}
      <CollaboratorList
        collaborators={collaborators}
        loading={loading}
        onEdit={(id) => router.push(`/collaborators/${id}/edit`)}
        onDelete={handleDelete}
        onView={(id) => router.push(`/collaborators/${id}`)}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
