import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Nexus Labs</h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance">Construindo o futuro da tecnologia</p>
        </div>

        <div className="space-y-4 pt-8">
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Estamos procurando desenvolvedores talentosos para se juntar à nossa equipe. Faça parte de uma empresa que
            valoriza inovação e excelência.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="text-base">
            <Link href="/apply">
              Candidatar-se à vaga
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
