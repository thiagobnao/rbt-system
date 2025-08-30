import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { LayoutProvider } from '@/components/layout'
import { AuthProvider } from '@/lib/hooks/useAuth'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RBT System',
  description: 'Sistema de Gestão de Colaboradores e Eventos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
