import { CollaboratorForm } from '@/components/collaborators/CollaboratorForm';

interface EditCollaboratorPageProps {
  params: {
    id: string;
  };
}

export default function EditCollaboratorPage({ params }: EditCollaboratorPageProps) {
  return <CollaboratorForm mode="edit" collaboratorId={params.id} />;
}
