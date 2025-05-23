"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import axios from "axios"

type User = {
  id: string
  name: string
  username: string
  email: string
  xp: number
  pontos: number
  nivel: number
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        try {
          const res = await axios.get("http://localhost:3000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
          setUser(res.data)
        } catch (error) {
          localStorage.removeItem("token")
          if (!isPublicRoute(pathname)) {
            router.push("/login")
          }
        }
      } else if (!isPublicRoute(pathname)) {
        router.push("/login")
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  const isPublicRoute = (path: string) => {
    return path === "/login" || path === "/register" || path === "/"
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)

      const userRes = await axios.get("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      })

      setUser(userRes.data)
      router.push("/tarefas")
    } catch (error) {
      throw new Error("Credenciais inválidas")
    }
  }

  const register = async (name: string, username: string, email: string, password: string) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        name,
        username,
        email,
        password,
      })
      router.push("/login")
    } catch (error) {
      throw new Error("Erro ao cadastrar usuário")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
