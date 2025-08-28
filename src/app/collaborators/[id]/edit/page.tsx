import { CollaboratorForm } from '@/components/collaborators/CollaboratorForm';

interface EditCollaboratorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCollaboratorPage({ params }: EditCollaboratorPageProps) {
  const { id } = await params;
  return <CollaboratorForm mode="edit" collaboratorId={id} />;
}
