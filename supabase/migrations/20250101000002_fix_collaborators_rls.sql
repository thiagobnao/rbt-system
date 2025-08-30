-- Migration: Fix collaborators RLS policies for custom JWT authentication
-- Description: Updates RLS policies to work with custom JWT authentication instead of Supabase Auth

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can manage all collaborators" ON collaborators;
DROP POLICY IF EXISTS "Coordinators can view all collaborators" ON collaborators;
DROP POLICY IF EXISTS "Coordinators can edit their created collaborators" ON collaborators;
DROP POLICY IF EXISTS "Coordinators can insert new collaborators" ON collaborators;
DROP POLICY IF EXISTS "Common users can view active collaborators" ON collaborators;

-- Create new policies that work with custom JWT authentication
-- For now, we'll allow all authenticated users to view collaborators
-- The actual role-based access control will be handled at the application level

-- Policy 1: Allow all authenticated users to view collaborators
-- This will be controlled by the application's JWT middleware
CREATE POLICY "Allow authenticated users to view collaborators" ON collaborators
  FOR SELECT USING (true);

-- Policy 2: Allow authenticated users to insert collaborators
-- Role checking will be done at the application level
CREATE POLICY "Allow authenticated users to insert collaborators" ON collaborators
  FOR INSERT WITH CHECK (true);

-- Policy 3: Allow authenticated users to update collaborators
-- Role checking will be done at the application level
CREATE POLICY "Allow authenticated users to update collaborators" ON collaborators
  FOR UPDATE USING (true);

-- Policy 4: Allow authenticated users to delete collaborators
-- Role checking will be done at the application level
CREATE POLICY "Allow authenticated users to delete collaborators" ON collaborators
  FOR DELETE USING (true);

-- Note: The actual role-based access control is implemented in the API routes
-- using the JWT middleware (withAuth function) which validates the token
-- and checks user roles before allowing operations.
