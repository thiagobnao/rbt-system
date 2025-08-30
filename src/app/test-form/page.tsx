import { CollaboratorFormRefactored } from '@/components/collaborators/CollaboratorFormRefactored';

export default function TestFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <CollaboratorFormRefactored mode="create" />
    </div>
  );
}
