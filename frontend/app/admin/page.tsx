"use client"

import { AdminDashboard } from "@/components/admin-dashboard"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { ArrowLeft, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const { logout, user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Painel Administrativo</h1>
              <p className="text-muted-foreground">Bem-vindo, {user?.name} • Gerencie as candidaturas recebidas</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Link>
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>

          <AdminDashboard />
        </div>
      </div>
    </ProtectedRoute>
  )
}
