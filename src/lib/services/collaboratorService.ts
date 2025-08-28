import {
  Collaborator,
  CreateCollaboratorRequest,
  UpdateCollaboratorRequest,
  CollaboratorFilters,
  CollaboratorListResponse
} from '@/lib/types/collaborator';

export class CollaboratorService {
  private baseUrl = '/api/collaborators';

  // Get all collaborators with filters and pagination
  async getCollaborators(filters: CollaboratorFilters = {}): Promise<CollaboratorListResponse> {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.city) params.append('city', filters.city);
    if (filters.state) params.append('state', filters.state);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await fetch(`${this.baseUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao buscar colaboradores');
    }

    return response.json();
  }

  // Get a single collaborator by ID
  async getCollaborator(id: string): Promise<Collaborator> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao buscar colaborador');
    }

    return response.json();
  }

  // Create a new collaborator
  async createCollaborator(data: CreateCollaboratorRequest): Promise<Collaborator> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar colaborador');
    }

    return response.json();
  }

  // Update an existing collaborator
  async updateCollaborator(id: string, data: UpdateCollaboratorRequest): Promise<Collaborator> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao atualizar colaborador');
    }

    return response.json();
  }

  // Delete a collaborator (soft delete)
  async deleteCollaborator(id: string): Promise<{ message: string; collaborator: Collaborator }> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao excluir colaborador');
    }

    return response.json();
  }

  // Get cities for filtering
  async getCities(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}?limit=1000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const cities = data.collaborators
      .map((c: Collaborator) => c.address_city)
      .filter((city: any): city is string => typeof city === 'string' && city.length > 0);
    
    return Array.from(new Set(cities as string[])).sort();
  }

  // Get states for filtering
  async getStates(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}?limit=1000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const states = data.collaborators
      .map((c: Collaborator) => c.address_state)
      .filter((state: any): state is string => typeof state === 'string' && state.length > 0);
    
    return Array.from(new Set(states as string[])).sort();
  }

  // Helper method to get auth token from localStorage or cookies
  private getAuthToken(): string {
    // Try to get from localStorage first
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) return token;
    }

    // Fallback to cookies or other storage methods
    // This is a simplified version - you might want to implement proper token management
    return '';
  }
}

// Export a singleton instance
export const collaboratorService = new CollaboratorService();
