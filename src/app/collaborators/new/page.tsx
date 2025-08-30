import { CollaboratorForm } from '@/components/collaborators/CollaboratorForm';
import { PageLayout } from '@/components/layout';

export default function NewCollaboratorPage() {
  return (
    <PageLayout>
      <CollaboratorForm mode="create" />
    </PageLayout>
  );
}
