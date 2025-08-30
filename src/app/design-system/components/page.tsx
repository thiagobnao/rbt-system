import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  XCircle, 
  User, 
  Settings, 
  Home,
  FileText,
  Users
} from "lucide-react"

export default function ComponentsPage() {
  return (
    <div className="container mx-auto p-xl space-y-xl">
      <div className="space-y-md">
        <h1 className="text-4xl font-display font-bold">Componentes UI - Design System</h1>
        <p className="text-lg text-muted-foreground">
          Demonstração dos componentes Shadcn/UI evoluídos para o design system do RBT System.
        </p>
      </div>

      {/* Botões */}
      <Card>
        <CardHeader>
          <CardTitle>Botões</CardTitle>
          <CardDescription>Variantes e tamanhos de botões</CardDescription>
        </CardHeader>
        <CardContent className="space-y-md">
          <div className="flex flex-wrap gap-md">
            <Button variant="default">Padrão</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="destructive">Destrutivo</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="success">Sucesso</Button>
            <Button variant="warning">Aviso</Button>
            <Button variant="info">Info</Button>
          </div>
          <div className="flex flex-wrap gap-md">
            <Button size="sm">Pequeno</Button>
            <Button size="default">Padrão</Button>
            <Button size="lg">Grande</Button>
            <Button size="xl">Extra Grande</Button>
          </div>
          <div className="flex flex-wrap gap-md">
            <Button size="icon" variant="outline">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon-sm" variant="outline">
              <User className="h-4 w-4" />
            </Button>
            <Button size="icon-lg" variant="outline">
              <Home className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Variantes de badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-md">
            <Badge variant="default">Padrão</Badge>
            <Badge variant="secondary">Secundário</Badge>
            <Badge variant="destructive">Destrutivo</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Sucesso</Badge>
            <Badge variant="warning">Aviso</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Formulários */}
      <Card>
        <CardHeader>
          <CardTitle>Formulários</CardTitle>
          <CardDescription>Componentes de entrada de dados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-sm">
              <Label htmlFor="input">Input</Label>
              <Input id="input" placeholder="Digite algo..." />
            </div>
            <div className="space-y-sm">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Digite uma descrição..." />
            </div>
          </div>
          <div className="space-y-sm">
            <Label htmlFor="select">Select</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Opção 1</SelectItem>
                <SelectItem value="option2">Opção 2</SelectItem>
                <SelectItem value="option3">Opção 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-md">
            <Switch id="switch" />
            <Label htmlFor="switch">Switch</Label>
          </div>
        </CardContent>
      </Card>

      {/* Progress e Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Progress e Skeleton</CardTitle>
          <CardDescription>Indicadores de progresso e carregamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-md">
          <div className="space-y-sm">
            <Label>Progress Bar</Label>
            <Progress value={33} />
            <Progress value={66} variant="success" />
            <Progress value={90} variant="warning" />
          </div>
          <div className="space-y-sm">
            <Label>Skeleton</Label>
            <div className="space-y-sm">
              <Skeleton size="sm" className="w-32" />
              <Skeleton size="default" className="w-48" />
              <Skeleton size="lg" className="w-64" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>Componentes de avatar com diferentes tamanhos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-md items-center">
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="default">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="2xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>Diferentes tipos de alertas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-md">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription>
              Esta é uma mensagem de sucesso.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Esta é uma mensagem de erro.
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Aviso</AlertTitle>
            <AlertDescription>
              Esta é uma mensagem de aviso.
            </AlertDescription>
          </Alert>
          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription>
              Esta é uma mensagem informativa.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>Navegação por abas</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Conta</TabsTrigger>
              <TabsTrigger value="password">Senha</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-md">
              <p>Conteúdo da aba Conta</p>
            </TabsContent>
            <TabsContent value="password" className="mt-md">
              <p>Conteúdo da aba Senha</p>
            </TabsContent>
            <TabsContent value="settings" className="mt-md">
              <p>Conteúdo da aba Configurações</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Accordion</CardTitle>
          <CardDescription>Acordeão expansível</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Item 1</AccordionTrigger>
              <AccordionContent>
                Conteúdo do item 1
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Item 2</AccordionTrigger>
              <AccordionContent>
                Conteúdo do item 2
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Item 3</AccordionTrigger>
              <AccordionContent>
                Conteúdo do item 3
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Breadcrumb */}
      <Card>
        <CardHeader>
          <CardTitle>Breadcrumb</CardTitle>
          <CardDescription>Navegação por breadcrumbs</CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/design-system">Design System</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Componentes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>

      {/* Tooltip */}
      <Card>
        <CardHeader>
          <CardTitle>Tooltip</CardTitle>
          <CardDescription>Dicas de contexto</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="flex gap-md">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Esta é uma dica de contexto</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Informação adicional</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tabela</CardTitle>
          <CardDescription>Exemplo de tabela de dados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Lista de usuários</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>João Silva</TableCell>
                <TableCell>joao@email.com</TableCell>
                <TableCell>
                  <Badge variant="success">Ativo</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">Editar</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Maria Santos</TableCell>
                <TableCell>maria@email.com</TableCell>
                <TableCell>
                  <Badge variant="warning">Pendente</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">Editar</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Separator />

      <div className="text-center text-muted-foreground">
        <p>Design System RBT System - Componentes UI Evoluídos</p>
      </div>
    </div>
  )
}
