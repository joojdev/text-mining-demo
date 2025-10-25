"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Linkedin,
  Github,
  Globe,
  DollarSign,
  Clock,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Star,
} from "lucide-react"
import type { Application } from "@/lib/mock-data"

interface ApplicationDetailsProps {
  application: Application
}

const statusConfig = {
  new: { label: "Novo", variant: "default" as const, color: "text-blue-500" },
  reviewing: { label: "Em análise", variant: "secondary" as const, color: "text-yellow-500" },
  interview: { label: "Entrevista", variant: "outline" as const, color: "text-purple-500" },
  rejected: { label: "Rejeitado", variant: "destructive" as const, color: "text-red-500" },
  accepted: { label: "Aceito", variant: "default" as const, color: "text-green-500" },
}

const timelineIcons = {
  applied: Calendar,
  viewed: FileText,
  status_change: Star,
  note_added: MessageSquare,
  interview_scheduled: Clock,
}

export function ApplicationDetails({ application }: ApplicationDetailsProps) {
  const [status, setStatus] = useState(application.status)
  const [notes, setNotes] = useState(application.notes)
  const [newNote, setNewNote] = useState("")
  const [timeline, setTimeline] = useState(application.timeline)
  const { toast } = useToast()

  const handleApprove = () => {
    setStatus("accepted")
    const newEvent = {
      id: timeline.length + 1,
      type: "status_change" as const,
      description: "Status alterado para Aceito",
      date: new Date().toISOString(),
      author: "Admin",
    }
    setTimeline([...timeline, newEvent])
    toast({
      title: "Candidato aprovado",
      description: `${application.name} foi aprovado para a vaga.`,
    })
  }

  const handleReject = () => {
    setStatus("rejected")
    const newEvent = {
      id: timeline.length + 1,
      type: "status_change" as const,
      description: "Status alterado para Rejeitado",
      date: new Date().toISOString(),
      author: "Admin",
    }
    setTimeline([...timeline, newEvent])
    toast({
      title: "Candidato rejeitado",
      description: `${application.name} foi rejeitado para a vaga.`,
      variant: "destructive",
    })
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const note = {
      id: notes.length + 1,
      author: "Admin",
      content: newNote,
      date: new Date().toISOString(),
    }
    setNotes([...notes, note])

    const newEvent = {
      id: timeline.length + 1,
      type: "note_added" as const,
      description: "Nova nota adicionada",
      date: new Date().toISOString(),
      author: "Admin",
    }
    setTimeline([...timeline, newEvent])

    setNewNote("")
    toast({
      title: "Nota adicionada",
      description: "Sua nota foi adicionada com sucesso.",
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl">{getInitials(application.name)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{application.name}</h1>
                  <Badge variant={statusConfig[status].variant}>{statusConfig[status].label}</Badge>
                  {application.score && (
                    <Badge variant="outline" className="gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {application.score}/100
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {application.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {application.phone}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {application.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Aplicou em {new Date(application.appliedDate).toLocaleDateString("pt-BR")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Disponibilidade: {application.availability}
                  </span>
                  <span className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {application.expectedSalary}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleApprove} disabled={status === "accepted"} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Aprovar Candidato
                </Button>
                <Button onClick={handleReject} disabled={status === "rejected"} variant="destructive" className="gap-2">
                  <XCircle className="h-4 w-4" />
                  Rejeitar Candidato
                </Button>
                <Button variant="outline" asChild>
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Currículo
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Professional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Experiência</h3>
                </div>
                <p className="text-muted-foreground">{application.experience}</p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Educação</h3>
                </div>
                <p className="text-muted-foreground">{application.education}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {application.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Links</h3>
                <div className="flex flex-wrap gap-2">
                  {application.linkedIn && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={application.linkedIn} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {application.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={application.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {application.portfolio && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={application.portfolio} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Portfolio
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          <Card>
            <CardHeader>
              <CardTitle>Carta de Apresentação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{application.coverLetter}</p>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notas e Comentários</CardTitle>
              <CardDescription>Adicione observações sobre este candidato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Adicionar nova nota..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Adicionar Nota
                </Button>
              </div>

              {notes.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">{note.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(note.date).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Linha do Tempo</CardTitle>
              <CardDescription>Histórico de atividades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline
                  .slice()
                  .reverse()
                  .map((event, index) => {
                    const Icon = timelineIcons[event.type]
                    return (
                      <div key={event.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          {index < timeline.length - 1 && <div className="w-px h-full bg-border mt-2" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm font-medium">{event.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(event.date).toLocaleString("pt-BR")}
                          </p>
                          {event.author && <p className="text-xs text-muted-foreground">por {event.author}</p>}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
