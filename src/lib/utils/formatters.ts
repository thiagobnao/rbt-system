/**
 * Utility functions for formatting Brazilian data
 */

/**
 * Format CPF with dots and dash (XXX.XXX.XXX-XX)
 */
export function formatCPF(cpf: string): string {
  if (!cpf) return '';
  
  // Remove non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Apply mask
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Format phone number with parentheses and dash
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  
  // Remove non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleanPhone.length === 11) {
    // Mobile: (XX) XXXXX-XXXX
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 10) {
    // Landline: (XX) XXXX-XXXX
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  // Return as is if doesn't match expected patterns
  return phone;
}

/**
 * Format CEP with dash (XXXXX-XXX)
 */
export function formatCEP(cep: string): string {
  if (!cep) return '';
  
  // Remove non-numeric characters
  const cleanCEP = cep.replace(/\D/g, '');
  
  // Apply mask
  return cleanCEP.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Format date to Brazilian format (DD/MM/YYYY)
 */
export function formatDate(date: string | Date): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toLocaleDateString('pt-BR');
}

/**
 * Format date and time to Brazilian format (DD/MM/YYYY HH:mm)
 */
export function formatDateTime(date: string | Date): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format currency to Brazilian Real (R$ X,XX)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Format number with Brazilian locale
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
}

/**
 * Format RG with dots and dash
 */
export function formatRG(rg: string): string {
  if (!rg) return '';
  
  // Remove non-numeric characters
  const cleanRG = rg.replace(/\D/g, '');
  
  // Apply mask (XX.XXX.XXX-X)
  if (cleanRG.length === 9) {
    return cleanRG.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  }
  
  // Return as is if doesn't match expected pattern
  return rg;
}
