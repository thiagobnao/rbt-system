export interface Collaborator {
  id: string;
  
  // Personal Information
  name: string;
  cpf: string;
  birth_date?: string;
  rg?: string;
  rg_issuer?: string;
  
  // Contact Information
  email?: string;
  phone?: string;
  mobile_phone?: string;
  address_street?: string;
  address_number?: string;
  address_complement?: string;
  address_neighborhood?: string;
  address_city?: string;
  address_state?: string;
  address_zip_code?: string;
  
  // Banking Information
  bank_name?: string;
  bank_agency?: string;
  bank_account?: string;
  bank_account_type?: 'corrente' | 'poupanca';
  pix_key?: string;
  pix_key_type?: 'cpf' | 'email' | 'phone' | 'random';
  
  // System fields
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Brazilian states type
export type BrazilianState = 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO';

export interface CreateCollaboratorRequest {
  name: string;
  cpf: string;
  birth_date?: string;
  rg?: string;
  rg_issuer?: string;
  email?: string;
  phone?: string;
  mobile_phone?: string;
  address_street?: string;
  address_number?: string;
  address_complement?: string;
  address_neighborhood?: string;
  address_city?: string;
  address_state?: BrazilianState;
  address_zip_code?: string;
  bank_name?: string;
  bank_agency?: string;
  bank_account?: string;
  bank_account_type?: 'corrente' | 'poupanca';
  pix_key?: string;
  pix_key_type?: 'cpf' | 'email' | 'phone' | 'random';
}

export interface UpdateCollaboratorRequest extends Partial<CreateCollaboratorRequest> {
  id: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface CollaboratorFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'suspended';
  city?: string;
  state?: BrazilianState;
  page?: number;
  limit?: number;
}

export interface CollaboratorListResponse {
  collaborators: Collaborator[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
