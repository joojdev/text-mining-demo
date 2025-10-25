export interface User {
  id: string
  email: string
  name: string
}

export interface AuthToken {
  token: string
  user: User
}

// Mock JWT authentication - In production, this would call a real API
export async function login(email: string, password: string): Promise<AuthToken> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock credentials - In production, validate against backend
  if (email === "admin@nexuslabs.com" && password === "admin123") {
    const user: User = {
      id: "1",
      email: "admin@nexuslabs.com",
      name: "Administrador",
    }

    // Mock JWT token - In production, this comes from backend
    const token = btoa(
      JSON.stringify({
        user,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    )

    return { token, user }
  }

  throw new Error("Credenciais inválidas")
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = JSON.parse(atob(token))

    // Check if token is expired
    if (decoded.exp < Date.now()) {
      return null
    }

    return decoded.user
  } catch {
    return null
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("auth_token")
}

export function setStoredToken(token: string): void {
  localStorage.setItem("auth_token", token)
}

export function removeStoredToken(): void {
  localStorage.removeItem("auth_token")
}
