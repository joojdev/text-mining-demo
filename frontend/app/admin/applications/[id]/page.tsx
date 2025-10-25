"use client"

import { useRouter, useParams } from "next/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { ApplicationDetails } from "@/components/application-details"
import { mockApplications } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const application = mockApplications.find((app) => app.id === Number.parseInt(params.id as string))

  if (!application) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background p-6">
          <div className="max-w-7xl mx-auto">
            <Button variant="ghost" onClick={() => router.push("/admin")} className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-2">Candidatura não encontrada</h1>
              <p className="text-muted-foreground">A candidatura que você está procurando não existe.</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Button variant="ghost" onClick={() => router.push("/admin")} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Dashboard
          </Button>
          <ApplicationDetails application={application} />
        </div>
      </div>
    </ProtectedRoute>
  )
}
