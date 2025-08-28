-- Seed data for RBT System
-- Execute this in Supabase SQL Editor

-- 1. Create admin user
INSERT INTO users (email, password_hash, role) 
VALUES (
  'admin@rbt.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- 2. Create coordinator user
INSERT INTO users (email, password_hash, role) 
VALUES (
  'coordinator@rbt.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  'coordinator'
) ON CONFLICT (email) DO NOTHING;

-- 3. Create common user
INSERT INTO users (email, password_hash, role) 
VALUES (
  'user@rbt.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  'common'
) ON CONFLICT (email) DO NOTHING;

-- 4. Create sample collaborators
INSERT INTO collaborators (
  name, cpf, birth_date, rg, rg_issuer, email, phone, mobile_phone,
  address_street, address_number, address_complement, address_neighborhood,
  address_city, address_state, address_zip_code,
  bank_name, bank_agency, bank_account, bank_account_type, pix_key, pix_key_type,
  status
) VALUES 
(
  'João Silva Santos',
  '123.456.789-01',
  '1985-03-15',
  '12.345.678-9',
  'SSP/SP',
  'joao.silva@email.com',
  '(11) 3333-4444',
  '(11) 99999-8888',
  'Rua das Flores',
  '123',
  'Apto 45',
  'Centro',
  'São Paulo',
  'SP',
  '01234-567',
  'Banco do Brasil',
  '0001',
  '12345-6',
  'corrente',
  'joao.silva@email.com',
  'email',
  'active'
),
(
  'Maria Oliveira Costa',
  '987.654.321-00',
  '1990-07-22',
  '98.765.432-1',
  'SSP/RJ',
  'maria.oliveira@email.com',
  '(21) 4444-5555',
  '(21) 88888-7777',
  'Avenida Brasil',
  '456',
  'Casa',
  'Copacabana',
  'Rio de Janeiro',
  'RJ',
  '22070-001',
  'Itaú',
  '0002',
  '65432-1',
  'poupanca',
  '98765432100',
  'cpf',
  'active'
),
(
  'Pedro Santos Lima',
  '111.222.333-44',
  '1988-11-10',
  '11.222.333-4',
  'SSP/MG',
  'pedro.santos@email.com',
  '(31) 5555-6666',
  '(31) 77777-6666',
  'Rua da Liberdade',
  '789',
  'Sala 101',
  'Savassi',
  'Belo Horizonte',
  'MG',
  '30112-000',
  'Bradesco',
  '0003',
  '78901-2',
  'corrente',
  '(31) 77777-6666',
  'phone',
  'active'
);
