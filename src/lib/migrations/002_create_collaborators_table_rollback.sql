-- Rollback Migration: Drop collaborators table
-- Description: Removes the collaborators table and all related objects

-- Drop triggers first
DROP TRIGGER IF EXISTS set_collaborator_updated_by_trigger ON collaborators;
DROP TRIGGER IF EXISTS set_collaborator_created_by_trigger ON collaborators;
DROP TRIGGER IF EXISTS update_collaborators_updated_at ON collaborators;

-- Drop functions
DROP FUNCTION IF EXISTS set_collaborator_updated_by();
DROP FUNCTION IF EXISTS set_collaborator_created_by();

-- Drop indexes
DROP INDEX IF EXISTS idx_collaborators_created_at;
DROP INDEX IF EXISTS idx_collaborators_status;
DROP INDEX IF EXISTS idx_collaborators_email;
DROP INDEX IF EXISTS idx_collaborators_name;
DROP INDEX IF EXISTS idx_collaborators_cpf;

-- Drop table
DROP TABLE IF EXISTS collaborators;
