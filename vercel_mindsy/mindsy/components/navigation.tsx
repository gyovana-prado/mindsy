"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, CheckSquare, Gift, Settings, LogOut, Menu, Brain } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function Navigation() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/", label: "Início", icon: <Home className="h-5 w-5" /> },
    { href: "/tarefas", label: "Tarefas", icon: <CheckSquare className="h-5 w-5" /> },
    { href: "/recompensas", label: "Recompensas", icon: <Gift className="h-5 w-5" /> },
    { href: "/configuracoes", label: "Configurações", icon: <Settings className="h-5 w-5" /> },
  ]

  if (!user) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Brain className="h-6 w-6 text-primary" />
            <span>Mindsy</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ModeToggle />
            {pathname !== "/login" && (
              <Button asChild variant="default" size="sm">
                <Link href="/login">Entrar</Link>
              </Button>
            )}
            {pathname !== "/register" && (
              <Button asChild variant="outline" size="sm">
                <Link href="/register">Cadastrar</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      {/* Mobile Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Brain className="h-6 w-6 text-primary" />
            <span>Mindsy</span>
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-6">
                    <Brain className="h-6 w-6 text-primary" />
                    <span className="font-bold">Mindsy</span>
                  </div>

                  {user && (
                    <div className="flex flex-col items-center mb-6 p-4 border rounded-lg">
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.username}`} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">@{user.username}</div>
                      <div className="mt-2 w-full">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Nível {user.nivel}</span>
                          <span>{user.xp}/100 XP</span>
                        </div>
                        <Progress value={user.xp} className="h-2" />
                      </div>
                      <div className="text-sm mt-2">
                        <span className="font-medium">{user.pontos}</span> pontos
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col gap-2 flex-1">
                    {navItems.map((item) => (
                      <Button
                        key={item.href}
                        variant={isActive(item.href) ? "default" : "ghost"}
                        className="justify-start"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={item.href}>
                          {item.icon}
                          <span className="ml-2">{item.label}</span>
                        </Link>
                      </Button>
                    ))}
                  </nav>

                  <Button
                    variant="outline"
                    className="mt-auto justify-start"
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sair
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <div className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 z-50 border-r bg-background">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Brain className="h-6 w-6 text-primary" />
            <span>Mindsy</span>
          </Link>
        </div>

        {user && (
          <div className="flex flex-col items-center m-4 p-4 border rounded-lg">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={`https://avatar.vercel.sh/${user.username}`} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">@{user.username}</div>
            <div className="mt-2 w-full">
              <div className="flex justify-between text-sm mb-1">
                <span>Nível {user.nivel}</span>
                <span>{user.xp}/100 XP</span>
              </div>
              <Progress value={user.xp} className="h-2" />
            </div>
            <div className="text-sm mt-2">
              <span className="font-medium">{user.pontos}</span> pontos
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-auto py-4 px-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "default" : "ghost"}
                className="justify-start"
                asChild
              >
                <Link href={item.href}>
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-4 border-t p-4">
          <ModeToggle />
          <Button variant="outline" className="flex-1 justify-start" onClick={logout}>
            <LogOut className="h-5 w-5 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Content padding for desktop */}
      <div className="hidden md:block md:pl-64" />
    </>
  )
}
