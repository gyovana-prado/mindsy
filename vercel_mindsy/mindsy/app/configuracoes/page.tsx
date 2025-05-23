"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, HelpCircle, Save } from "lucide-react"

export default function ConfiguracoesPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)

  // Perfil
  const [name, setName] = useState(user?.name || "")
  const [username, setUsername] = useState(user?.username || "")
  const [email, setEmail] = useState(user?.email || "")

  // Notificações
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [taskReminders, setTaskReminders] = useState(true)
  const [levelUpNotifications, setLevelUpNotifications] = useState(true)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de notificação foram atualizadas.",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e informações de conta.</p>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="perfil">
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notificacoes">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="seguranca">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="ajuda">
            <HelpCircle className="h-4 w-4 mr-2" />
            Ajuda
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <Card>
              <CardHeader>
                <CardTitle>Informações pessoais</CardTitle>
                <CardDescription>Atualize suas informações de perfil</CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveProfile}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de usuário</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </CardContent>

                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar alterações"}
                    <Save className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seu perfil</CardTitle>
                <CardDescription>Visualize como seu perfil aparece</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://avatar.vercel.sh/${username}`} alt={name} />
                  <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <h3 className="font-medium text-lg">{name}</h3>
                  <p className="text-sm text-muted-foreground">@{username}</p>
                </div>

                <Separator className="my-4" />

                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Nível</span>
                    <span className="font-medium">{user?.nivel || 1}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">XP</span>
                    <span className="font-medium">{user?.xp || 0}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pontos</span>
                    <span className="font-medium">{user?.pontos || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de notificação</CardTitle>
              <CardDescription>Escolha como e quando deseja receber notificações</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveNotifications}>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificações por email</Label>
                    <p className="text-sm text-muted-foreground">Receba atualizações importantes por email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="task-reminders">Lembretes de tarefas</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba lembretes sobre tarefas próximas do vencimento
                    </p>
                  </div>
                  <Switch id="task-reminders" checked={taskReminders} onCheckedChange={setTaskReminders} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="level-up">Notificações de nível</Label>
                    <p className="text-sm text-muted-foreground">Receba notificações quando subir de nível</p>
                  </div>
                  <Switch id="level-up" checked={levelUpNotifications} onCheckedChange={setLevelUpNotifications} />
                </div>
              </CardContent>

              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar preferências"}
                  <Save className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da conta</CardTitle>
              <CardDescription>Gerencie a segurança da sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha atual</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nova senha</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>

            <CardFooter>
              <Button>Alterar senha</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="ajuda">
          <Card>
            <CardHeader>
              <CardTitle>Central de ajuda</CardTitle>
              <CardDescription>Encontre respostas para suas dúvidas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Como funciona o sistema de pontos?</h3>
                <p className="text-sm text-muted-foreground">
                  Ao completar tarefas, você ganha pontos com base na dificuldade da tarefa. Tarefas fáceis valem 10
                  pontos, médias valem 20 pontos e difíceis valem 30 pontos. Esses pontos podem ser usados para resgatar
                  recompensas que você mesmo define.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Como subir de nível?</h3>
                <p className="text-sm text-muted-foreground">
                  Ao completar tarefas, você também ganha XP. Quando atingir 100 XP, você sobe de nível automaticamente
                  e seu XP é reiniciado. A cada nível, você desbloqueia novas funcionalidades.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Preciso de mais ajuda</h3>
                <p className="text-sm text-muted-foreground">
                  Se você tiver mais dúvidas ou precisar de suporte, entre em contato conosco pelo email
                  suporte@mindsy.com.br
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
