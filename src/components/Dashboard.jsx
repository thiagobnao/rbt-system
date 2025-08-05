import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Building, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  MapPin,
  FileText,
  Clock,
  LogOut,
  Settings,
  Home,
  BarChart3,
  School,
  UserCheck,
  Cog
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import '../App.css'

export default function Dashboard({ user, onLogout }) {
  const [kpis, setKpis] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [proximosEventos, setProximosEventos] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [kpisResponse, eventosResponse] = await Promise.all([
        fetch('/api/dashboard/kpis'),
        fetch('/api/dashboard/proximos-eventos')
      ])

      if (kpisResponse.ok) {
        const kpisData = await kpisResponse.json()
        setKpis(kpisData.kpis)
      }

      if (eventosResponse.ok) {
        const eventosData = await eventosResponse.json()
        setProximosEventos(eventosData.eventos)
      }
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const menuItems = [
    { id: 'dashboard', label: 'Página Inicial', icon: Home },
    { id: 'concursos', label: 'Concursos', icon: FileText },
    { id: 'escolas', label: 'Escolas', icon: School },
    { id: 'colaboradores', label: 'Colaboradores', icon: UserCheck },
    { id: 'relatorios', label: 'Relatórios Gerais', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Cog },
  ]

  const kpiCards = [
    {
      title: 'Total de Concursos',
      value: kpis.total_concursos || 0,
      description: `${kpis.concursos_ativos || 0} ativos`,
      icon: FileText,
      color: 'bg-[var(--roberta-blue)]'
    },
    {
      title: 'Escolas Cadastradas',
      value: kpis.total_escolas || 0,
      description: `${kpis.total_salas || 0} salas disponíveis`,
      icon: Building,
      color: 'bg-[var(--roberta-mint)]'
    },
    {
      title: 'Colaboradores',
      value: kpis.total_colaboradores || 0,
      description: 'Cadastrados no sistema',
      icon: Users,
      color: 'bg-[var(--roberta-pink)]'
    },
    {
      title: 'Pagamentos (Mês)',
      value: `R$ ${(kpis.valor_pagamentos_mes || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      description: `${kpis.pagamentos_mes || 0} transações`,
      icon: DollarSign,
      color: 'bg-[var(--roberta-lavender)]'
    }
  ]

  const chartData = [
    { name: 'Jan', concursos: 4, pagamentos: 15000 },
    { name: 'Fev', concursos: 3, pagamentos: 12000 },
    { name: 'Mar', concursos: 6, pagamentos: 25000 },
    { name: 'Abr', concursos: 8, pagamentos: 32000 },
    { name: 'Mai', concursos: 5, pagamentos: 18000 },
    { name: 'Jun', concursos: 7, pagamentos: 28000 },
  ]

  const pieData = [
    { name: 'Concursos Ativos', value: kpis.concursos_ativos || 0, color: 'var(--roberta-blue)' },
    { name: 'Concursos Finalizados', value: (kpis.total_concursos || 0) - (kpis.concursos_ativos || 0), color: 'var(--roberta-gray)' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--roberta-blue)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--roberta-white)] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Sistema ROBERTA</h1>
          <p className="text-sm text-gray-600 mt-1">Gestão de Concursos</p>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 hover:bg-[var(--roberta-gray)] ${
                  activeSection === item.id 
                    ? 'bg-[var(--roberta-blue)] text-gray-800 border-r-4 border-gray-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            )
          })}
        </nav>
        
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-[var(--roberta-blue)] rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-medium text-gray-800">
                {user?.login?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{user?.login}</p>
              <p className="text-xs text-gray-500">{user?.perfil}</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {activeSection === 'dashboard' ? 'Dashboard' : 'Página em Desenvolvimento'}
            </h2>
            <p className="text-gray-600">
              {activeSection === 'dashboard' 
                ? 'Visão geral do sistema e indicadores principais'
                : 'Esta funcionalidade será implementada em breve'
              }
            </p>
          </div>

          {activeSection === 'dashboard' && (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {kpiCards.map((kpi, index) => {
                  const Icon = kpi.icon
                  return (
                    <Card key={index} className="roberta-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                              {kpi.title}
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                              {kpi.value}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {kpi.description}
                            </p>
                          </div>
                          <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-gray-700" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="roberta-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      Concursos por Mês
                    </CardTitle>
                    <CardDescription>
                      Evolução mensal dos concursos realizados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="concursos" fill="var(--roberta-blue)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="roberta-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      Status dos Concursos
                    </CardTitle>
                    <CardDescription>
                      Distribuição atual dos concursos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Próximos Eventos */}
              <Card className="roberta-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Próximos Eventos
                  </CardTitle>
                  <CardDescription>
                    Concursos e eventos programados para os próximos dias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {proximosEventos.length > 0 ? (
                    <div className="space-y-4">
                      {proximosEventos.map((evento, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-[var(--roberta-gray)] rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[var(--roberta-blue)] rounded-full flex items-center justify-center mr-4">
                              <Clock className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{evento.titulo}</p>
                              <p className="text-sm text-gray-600">{evento.descricao}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {new Date(evento.data).toLocaleDateString('pt-BR')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhum evento programado</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {activeSection !== 'dashboard' && (
            <Card className="roberta-card">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-[var(--roberta-gray)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cog className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Módulo em Desenvolvimento
                </h3>
                <p className="text-gray-600 mb-6">
                  Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
                </p>
                <Button 
                  onClick={() => setActiveSection('dashboard')}
                  className="roberta-button-primary"
                >
                  Voltar ao Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

