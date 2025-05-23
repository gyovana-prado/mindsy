"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Edit, Trash2, Gift, Plus, Coins } from "lucide-react"

type Reward = {
  id: string
  nome: string
  descricao: string
  custo_em_pontos: number
}

export default function RecompensasPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [rewards, setRewards] = useState<Reward[]>([])
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [custo, setCusto] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchRewards = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:3000/api/recompensas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setRewards(res.data)
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar recompensas",
        description: "Não foi possível carregar suas recompensas. Tente novamente mais tarde.",
      })
    }
  }

  useEffect(() => {
    fetchRewards()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")

      if (editingId) {
        await axios.put(
          `http://localhost:3000/api/recompensas/${editingId}`,
          {
            nome,
            descricao,
            custo_em_pontos: custo,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        toast({
          title: "Recompensa atualizada",
          description: "Sua recompensa foi atualizada com sucesso.",
        })
      } else {
        await axios.post(
          "http://localhost:3000/api/recompensas",
          {
            nome,
            descricao,
            custo_em_pontos: custo,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        toast({
          title: "Recompensa criada",
          description: "Sua recompensa foi criada com sucesso.",
        })
      }

      setNome("")
      setDescricao("")
      setCusto("")
      setEditingId(null)
      fetchRewards()
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: editingId ? "Não foi possível atualizar a recompensa." : "Não foi possível criar a recompensa.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (reward: Reward) => {
    setEditingId(reward.id)
    setNome(reward.nome)
    setDescricao(reward.descricao || "")
    setCusto(reward.custo_em_pontos.toString())
  }

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:3000/api/recompensas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast({
        title: "Recompensa excluída",
        description: "Sua recompensa foi excluída com sucesso.",
      })

      fetchRewards()
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Não foi possível excluir a recompensa.",
      })
    }
  }

  const handleResgatar = async (id: string, custo: number) => {
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      await axios.post(
        `http://localhost:3000/api/recompensas/${id}/resgatar`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      toast({
        title: "Recompensa resgatada!",
        description: `Você resgatou sua recompensa. ${custo} pontos foram descontados.`,
      })

      fetchRewards()
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : "Não foi possível resgatar a recompensa."

      toast({
        variant: "destructive",
        title: "Erro ao resgatar",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setNome("")
    setDescricao("")
    setCusto("")
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Suas Recompensas</h1>
        <p className="text-muted-foreground">Crie e resgate recompensas usando seus pontos acumulados.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div>
          {rewards.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma recompensa encontrada</h3>
              <p className="text-muted-foreground mb-4">Crie sua primeira recompensa para resgatar com seus pontos.</p>
              <Button onClick={() => document.getElementById("nome")?.focus()}>
                <Plus className="h-4 w-4 mr-2" />
                Criar recompensa
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {rewards.map((reward) => (
                <Card key={reward.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium text-lg">{reward.nome}</h3>
                        {reward.descricao && <p className="text-sm text-muted-foreground">{reward.descricao}</p>}
                      </div>

                      <Badge variant="secondary" className="text-base px-3 py-1">
                        <Coins className="h-4 w-4 mr-1" />
                        {reward.custo_em_pontos} pontos
                      </Badge>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(reward)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleDelete(reward.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </Button>

                      <Button
                        variant={user && user.pontos >= reward.custo_em_pontos ? "default" : "outline"}
                        size="sm"
                        disabled={!user || user.pontos < reward.custo_em_pontos}
                        onClick={() => handleResgatar(reward.id, reward.custo_em_pontos)}
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Resgatar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? "Editar Recompensa" : "Nova Recompensa"}</CardTitle>
              <CardDescription>
                {editingId
                  ? "Atualize os detalhes da recompensa selecionada"
                  : "Adicione uma nova recompensa para resgatar"}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    placeholder="Nome da recompensa"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição (opcional)</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Detalhes da recompensa"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custo">Custo em pontos</Label>
                  <Input
                    id="custo"
                    type="number"
                    placeholder="100"
                    value={custo}
                    onChange={(e) => setCusto(e.target.value)}
                    min={1}
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : editingId ? "Salvar alterações" : "Criar recompensa"}
                </Button>

                {editingId && (
                  <Button variant="outline" className="w-full" type="button" onClick={handleCancelEdit}>
                    Cancelar edição
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>

          {user && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Seus pontos</CardTitle>
                <CardDescription>Pontos disponíveis para resgatar recompensas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Total de pontos</span>
                  <Badge variant="secondary" className="text-xl px-4 py-2">
                    <Coins className="h-5 w-5 mr-2" />
                    {user.pontos}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
