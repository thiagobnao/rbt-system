import { UserProfileForm } from '@/components/examples/UserProfileForm'

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-xl">
        <div className="mb-xl text-center">
          <h1 className="text-4xl font-display text-foreground mb-md">
            Exemplo de Formulário
          </h1>
          <p className="text-lg text-muted-foreground">
            Demonstração da integração React Hook Form + Zod com design system
          </p>
        </div>
        
        <UserProfileForm />
      </div>
    </div>
  )
}
