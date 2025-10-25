// Extended mock data for applications with full ATS details
export interface Application {
  id: number
  name: string
  email: string
  phone: string
  location: string
  appliedDate: string
  status: "new" | "reviewing" | "interview" | "rejected" | "accepted"
  resumeUrl: string
  experience: string
  education: string
  skills: string[]
  linkedIn?: string
  github?: string
  portfolio?: string
  coverLetter: string
  expectedSalary: string
  availability: string
  notes: Note[]
  timeline: TimelineEvent[]
  score?: number
}

export interface Note {
  id: number
  author: string
  content: string
  date: string
}

export interface TimelineEvent {
  id: number
  type: "applied" | "viewed" | "status_change" | "note_added" | "interview_scheduled"
  description: string
  date: string
  author?: string
}

export const mockApplications: Application[] = [
  {
    id: 1,
    name: "Ana Carolina Santos",
    email: "ana.santos@email.com",
    phone: "+55 11 98765-4321",
    location: "São Paulo, SP",
    appliedDate: "2025-01-20",
    status: "new",
    resumeUrl: "#",
    experience: "5 anos",
    education: "Bacharelado em Ciência da Computação - USP",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    linkedIn: "https://linkedin.com/in/anacarolina",
    github: "https://github.com/anacarolina",
    portfolio: "https://anacarolina.dev",
    coverLetter:
      "Tenho grande interesse em fazer parte da equipe Nexus Labs. Com 5 anos de experiência em desenvolvimento full-stack, acredito que posso contribuir significativamente para os projetos da empresa.",
    expectedSalary: "R$ 12.000 - R$ 15.000",
    availability: "Imediata",
    score: 85,
    notes: [
      {
        id: 1,
        author: "Admin",
        content: "Perfil muito interessante, experiência sólida em React.",
        date: "2025-01-20T14:30:00",
      },
    ],
    timeline: [
      {
        id: 1,
        type: "applied",
        description: "Candidatura recebida",
        date: "2025-01-20T10:00:00",
      },
      {
        id: 2,
        type: "viewed",
        description: "Currículo visualizado por Admin",
        date: "2025-01-20T14:30:00",
        author: "Admin",
      },
    ],
  },
  {
    id: 2,
    name: "Bruno Oliveira",
    email: "bruno.oliveira@email.com",
    phone: "+55 21 99876-5432",
    location: "Rio de Janeiro, RJ",
    appliedDate: "2025-01-19",
    status: "reviewing",
    resumeUrl: "#",
    experience: "3 anos",
    education: "Tecnólogo em Sistemas para Internet - UERJ",
    skills: ["Vue.js", "JavaScript", "Python", "MongoDB", "Git"],
    linkedIn: "https://linkedin.com/in/brunooliveira",
    github: "https://github.com/brunooliveira",
    coverLetter:
      "Sou desenvolvedor apaixonado por criar soluções inovadoras. Tenho experiência com Vue.js e Python, e estou sempre buscando aprender novas tecnologias.",
    expectedSalary: "R$ 8.000 - R$ 10.000",
    availability: "30 dias",
    score: 72,
    notes: [
      {
        id: 1,
        author: "Admin",
        content: "Boa experiência com Vue, mas precisamos avaliar fit com nossa stack React.",
        date: "2025-01-19T16:00:00",
      },
    ],
    timeline: [
      {
        id: 1,
        type: "applied",
        description: "Candidatura recebida",
        date: "2025-01-19T09:15:00",
      },
      {
        id: 2,
        type: "status_change",
        description: "Status alterado para Em Análise",
        date: "2025-01-19T16:00:00",
        author: "Admin",
      },
    ],
  },
  {
    id: 3,
    name: "Carla Mendes",
    email: "carla.mendes@email.com",
    phone: "+55 11 97654-3210",
    location: "São Paulo, SP",
    appliedDate: "2025-01-18",
    status: "interview",
    resumeUrl: "#",
    experience: "7 anos",
    education: "Mestrado em Engenharia de Software - UNICAMP",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "Kubernetes", "CI/CD", "TDD"],
    linkedIn: "https://linkedin.com/in/carlamendes",
    github: "https://github.com/carlamendes",
    portfolio: "https://carlamendes.com",
    coverLetter:
      "Com mais de 7 anos de experiência em desenvolvimento de software e mestrado em Engenharia de Software, tenho expertise em arquitetura de sistemas escaláveis e liderança técnica.",
    expectedSalary: "R$ 18.000 - R$ 22.000",
    availability: "Imediata",
    score: 95,
    notes: [
      {
        id: 1,
        author: "Admin",
        content: "Excelente perfil! Experiência sólida e qualificações impressionantes.",
        date: "2025-01-18T11:00:00",
      },
      {
        id: 2,
        author: "Admin",
        content: "Entrevista agendada para 25/01 às 14h.",
        date: "2025-01-18T15:30:00",
      },
    ],
    timeline: [
      {
        id: 1,
        type: "applied",
        description: "Candidatura recebida",
        date: "2025-01-18T08:00:00",
      },
      {
        id: 2,
        type: "status_change",
        description: "Status alterado para Em Análise",
        date: "2025-01-18T11:00:00",
        author: "Admin",
      },
      {
        id: 3,
        type: "interview_scheduled",
        description: "Entrevista agendada para 25/01/2025 às 14:00",
        date: "2025-01-18T15:30:00",
        author: "Admin",
      },
      {
        id: 4,
        type: "status_change",
        description: "Status alterado para Entrevista",
        date: "2025-01-18T15:30:00",
        author: "Admin",
      },
    ],
  },
  {
    id: 4,
    name: "Daniel Costa",
    email: "daniel.costa@email.com",
    phone: "+55 85 98765-1234",
    location: "Fortaleza, CE",
    appliedDate: "2025-01-17",
    status: "rejected",
    resumeUrl: "#",
    experience: "1 ano",
    education: "Cursando Análise e Desenvolvimento de Sistemas",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    github: "https://github.com/danielcosta",
    coverLetter: "Sou desenvolvedor júnior em busca de oportunidades para crescer na carreira.",
    expectedSalary: "R$ 3.000 - R$ 4.500",
    availability: "Imediata",
    score: 45,
    notes: [
      {
        id: 1,
        author: "Admin",
        content: "Experiência ainda limitada para a vaga. Sugerir vaga júnior futura.",
        date: "2025-01-17T13:00:00",
      },
    ],
    timeline: [
      {
        id: 1,
        type: "applied",
        description: "Candidatura recebida",
        date: "2025-01-17T10:30:00",
      },
      {
        id: 2,
        type: "status_change",
        description: "Status alterado para Rejeitado",
        date: "2025-01-17T13:00:00",
        author: "Admin",
      },
    ],
  },
  {
    id: 5,
    name: "Eduarda Lima",
    email: "eduarda.lima@email.com",
    phone: "+55 31 99123-4567",
    location: "Belo Horizonte, MG",
    appliedDate: "2025-01-16",
    status: "new",
    resumeUrl: "#",
    experience: "4 anos",
    education: "Bacharelado em Sistemas de Informação - UFMG",
    skills: ["React", "Node.js", "Express", "MySQL", "Redis", "Jest"],
    linkedIn: "https://linkedin.com/in/eduardalima",
    github: "https://github.com/eduardalima",
    coverLetter:
      "Desenvolvedora full-stack com foco em criar aplicações performáticas e escaláveis. Tenho experiência em trabalhar com metodologias ágeis.",
    expectedSalary: "R$ 10.000 - R$ 13.000",
    availability: "15 dias",
    score: 78,
    notes: [],
    timeline: [
      {
        id: 1,
        type: "applied",
        description: "Candidatura recebida",
        date: "2025-01-16T14:20:00",
      },
    ],
  },
  {
    id: 6,
    name: "Felipe Rodrigues",
    email: "felipe.rodrigues@email.com",
    phone: "+55 48 98234-5678",
    location: "Florianópolis, SC",
    appliedDate: "2025-01-15",
    status: "reviewing",
    resumeUrl: "#",
    experience: "6 anos",
    education: "Bacharelado em Engenharia de Computação - UFSC",
    skills: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "AWS", "Terraform"],
    linkedIn: "https://linkedin.com/in/feliperodrigues",
    github: "https://github.com/feliperodrigues",
    portfolio: "https://feliperodrigues.dev",
    coverLetter:
      "Engenheiro de software com 6 anos de experiência em desenvolvimento de aplicações web modernas. Especialista em React e arquitetura cloud.",
    expectedSalary: "R$ 15.000 - R$ 18.000",
    availability: "Imediata",
    score: 88,
    notes: [
      {
        id: 1,
        author: "Admin",
        content: "Perfil muito forte, experiência relevante com nossa stack.",
        date: "2025-01-15T10:00:00",
      },
    ],
    timeline: [
      {
        id: 1,
        type: "applied",
        description: "Candidatura recebida",
        date: "2025-01-15T09:00:00",
      },
      {
        id: 2,
        type: "status_change",
        description: "Status alterado para Em Análise",
        date: "2025-01-15T10:00:00",
        author: "Admin",
      },
    ],
  },
]
