import { CollaboratorForm } from '@/components/collaborators/CollaboratorForm';
import { PageLayout } from '@/components/layout';

interface EditCollaboratorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCollaboratorPage({ params }: EditCollaboratorPageProps) {
  const { id } = await params;
  return (
    <PageLayout>
      <CollaboratorForm mode="edit" collaboratorId={id} />
    </PageLayout>
  );
}
