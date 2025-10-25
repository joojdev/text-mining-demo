"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    toast({
      title: "Candidatura enviada!",
      description: "Entraremos em contato em breve.",
    })
  }

  if (isSubmitted) {
    return (
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold">Candidatura Enviada!</h3>
              <p className="text-muted-foreground text-pretty">
                Obrigado pelo seu interesse. Nossa equipe analisará sua candidatura e entrará em contato em breve.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Envie sua candidatura</CardTitle>
        <CardDescription>Preencha o formulário abaixo para se candidatar à vaga</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" name="name" placeholder="João Silva" required disabled={isSubmitting} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="joao@exemplo.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Currículo (PDF)</Label>
            <div className="relative">
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf"
                required
                disabled={isSubmitting}
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {fileName && (
                <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {fileName}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar candidatura"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
