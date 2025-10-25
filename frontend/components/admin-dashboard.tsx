"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Mail, Calendar, Search, Eye } from "lucide-react"
import { mockApplications } from "@/lib/mock-data"

type ApplicationStatus = "new" | "reviewing" | "interview" | "rejected" | "accepted"

const statusConfig = {
  new: { label: "Novo", variant: "default" as const },
  reviewing: { label: "Em análise", variant: "secondary" as const },
  interview: { label: "Entrevista", variant: "outline" as const },
  rejected: { label: "Rejeitado", variant: "destructive" as const },
  accepted: { label: "Aceito", variant: "default" as const },
}

export function AdminDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockApplications.length,
    new: mockApplications.filter((app) => app.status === "new").length,
    reviewing: mockApplications.filter((app) => app.status === "reviewing").length,
    interview: mockApplications.filter((app) => app.status === "interview").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total de Candidaturas</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Novas</CardDescription>
            <CardTitle className="text-3xl">{stats.new}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Em Análise</CardDescription>
            <CardTitle className="text-3xl">{stats.reviewing}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Entrevistas</CardDescription>
            <CardTitle className="text-3xl">{stats.interview}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Candidaturas</CardTitle>
          <CardDescription>Visualize e gerencie todas as candidaturas recebidas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="new">Novo</SelectItem>
                <SelectItem value="reviewing">Em análise</SelectItem>
                <SelectItem value="interview">Entrevista</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
                <SelectItem value="accepted">Aceito</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applications List */}
          <div className="space-y-3">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Nenhuma candidatura encontrada</p>
              </div>
            ) : (
              filteredApplications.map((application) => (
                <Card key={application.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg">{application.name}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5" />
                                {application.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(application.appliedDate).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                          </div>
                          <Badge variant={statusConfig[application.status].variant}>
                            {statusConfig[application.status].label}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => router.push(`/admin/applications/${application.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="h-4 w-4 mr-2" />
                            Currículo
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
