-- Migration: Create collaborators table
-- Description: Creates the collaborators table for managing collaborator data with RLS policies

-- Create collaborators table
CREATE TABLE IF NOT EXISTS collaborators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal Information
  name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL, -- Brazilian CPF format: XXX.XXX.XXX-XX
  birth_date DATE,
  rg VARCHAR(20),
  rg_issuer VARCHAR(100),
  
  -- Contact Information
  email VARCHAR(255),
  phone VARCHAR(20),
  mobile_phone VARCHAR(20),
  address_street VARCHAR(255),
  address_number VARCHAR(20),
  address_complement VARCHAR(100),
  address_neighborhood VARCHAR(100),
  address_city VARCHAR(100),
  address_state VARCHAR(2), -- Brazilian state abbreviation (SP, RJ, etc.)
  address_zip_code VARCHAR(10), -- Brazilian CEP format: XXXXX-XXX
  
  -- Banking Information
  bank_name VARCHAR(100),
  bank_agency VARCHAR(20),
  bank_account VARCHAR(20),
  bank_account_type VARCHAR(20), -- 'corrente' or 'poupanca'
  pix_key VARCHAR(255),
  pix_key_type VARCHAR(20), -- 'cpf', 'email', 'phone', 'random'
  
  -- System fields
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_collaborators_cpf ON collaborators(cpf);
CREATE INDEX IF NOT EXISTS idx_collaborators_name ON collaborators(name);
CREATE INDEX IF NOT EXISTS idx_collaborators_email ON collaborators(email);
CREATE INDEX IF NOT EXISTS idx_collaborators_status ON collaborators(status);
CREATE INDEX IF NOT EXISTS idx_collaborators_created_at ON collaborators(created_at);

-- Create updated_at trigger
CREATE TRIGGER update_collaborators_updated_at 
  BEFORE UPDATE ON collaborators 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Policy 1: Admins can perform all operations
CREATE POLICY "Admins can manage all collaborators" ON collaborators
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Policy 2: Coordinators can view all collaborators but only edit their own created records
CREATE POLICY "Coordinators can view all collaborators" ON collaborators
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'coordinator')
    )
  );

CREATE POLICY "Coordinators can edit their created collaborators" ON collaborators
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'coordinator'
      AND collaborators.created_by = auth.uid()
    )
  );

CREATE POLICY "Coordinators can insert new collaborators" ON collaborators
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'coordinator')
    )
  );

-- Policy 3: Common users can only view active collaborators
CREATE POLICY "Common users can view active collaborators" ON collaborators
  FOR SELECT USING (
    status = 'active' AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('admin', 'coordinator', 'common')
    )
  );

-- Insert trigger to automatically set created_by
CREATE OR REPLACE FUNCTION set_collaborator_created_by()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_by = auth.uid();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_collaborator_created_by_trigger
  BEFORE INSERT ON collaborators
  FOR EACH ROW
  EXECUTE FUNCTION set_collaborator_created_by();

-- Update trigger to automatically set updated_by
CREATE OR REPLACE FUNCTION set_collaborator_updated_by()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_collaborator_updated_by_trigger
  BEFORE UPDATE ON collaborators
  FOR EACH ROW
  EXECUTE FUNCTION set_collaborator_updated_by();
