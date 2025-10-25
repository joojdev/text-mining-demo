import { ApplicationForm } from "@/components/application-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ApplyPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">Desenvolvedor Full Stack</h1>
            <p className="text-lg text-muted-foreground">Nexus Labs · Remoto · Tempo Integral</p>
          </div>

          <div className="space-y-4 pt-4 text-muted-foreground">
            <p className="text-pretty leading-relaxed">
              Estamos buscando um desenvolvedor full stack apaixonado por criar experiências digitais excepcionais. Você
              trabalhará em projetos desafiadores usando tecnologias modernas.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Requisitos:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Experiência com React, TypeScript e Next.js</li>
                <li>Conhecimento em Node.js e APIs RESTful</li>
                <li>Familiaridade com bancos de dados SQL e NoSQL</li>
                <li>Capacidade de trabalhar de forma autônoma</li>
              </ul>
            </div>
          </div>
        </div>

        <ApplicationForm />
      </div>
    </div>
  )
}
