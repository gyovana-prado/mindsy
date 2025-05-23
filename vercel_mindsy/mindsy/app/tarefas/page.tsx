"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "@/components/auth-provider"
import { format, differenceInDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CalendarIcon,
  CheckCircle2,
  Edit,
  Trash2,
  AlertCircle,
  Star,
  Filter,
  X,
  Clock,
  AlertTriangle,
} from "lucide-react"

type Task = {
  id: string
  title: string
  description: string
  difficulty: "facil" | "medio" | "dificil"
  category: "diarias" | "semanais" | "mensais"
  points: number
  due_date: string | null
  completed: boolean
}

const dificuldadePontuacao = {
  facil: 10,
  medio: 20,
  dificil: 30,
}

const dificuldadeIcones = {
  facil: <Star className="h-4 w-4 text-yellow-500" />,
  medio: <AlertTriangle className="h-4 w-4 text-orange-500" />,
  dificil: <AlertCircle className="h-4 w-4 text-red-500" />,
}

const getExpirationText = (dueDate: string | null) => {
  if (!dueDate) return null

  const today = new Date()
  const diff = differenceInDays(new Date(dueDate), today)

  if (diff < 0) {
    return { text: "Vencida", variant: "destructive" as const }
  }
  if (diff === 0) {
    return { text: "Expira hoje", variant: "warning" as const }
  }
  return {
    text: `Faltam ${diff} ${diff === 1 ? "dia" : "dias"}`,
    variant: "outline" as const,
  }
}

export default function TarefasPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState<"facil" | "medio" | "dificil">("facil")
  const [category, setCategory] = useState<"diarias" | "semanais" | "mensais">("diarias")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Filtros
  const [showFilters, setShowFilters] = useState(false)
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined)
  const [filterCategory, setFilterCategory] = useState("")
  const [filterDifficulty, setFilterDifficulty] = useState("")
  const [filterCompleted, setFilterCompleted] = useState<"all" | "completed" | "pending">("all")

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:3000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks(res.data)
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar tarefas",
        description: "Não foi possível carregar suas tarefas. Tente novamente mais tarde.",
      })
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const points = dificuldadePontuacao[difficulty]
    const token = localStorage.getItem("token")

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/api/tasks/${editingId}`,
          {
            title,
            description,
            difficulty,
            category,
            points,
            dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        toast({
          title: "Tarefa atualizada",
          description: "Sua tarefa foi atualizada com sucesso.",
        })
      } else {
        await axios.post(
          "http://localhost:3000/api/tasks",
          {
            title,
            description,
            difficulty,
            category,
            points,
            dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        toast({
          title: "Tarefa criada",
          description: "Sua tarefa foi criada com sucesso.",
        })
      }

      setTitle("")
      setDescription("")
      setDifficulty("facil")
      setCategory("diarias")
      setDueDate(undefined)
      setEditingId(null)
      fetchTasks()
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: editingId ? "Não foi possível atualizar a tarefa." : "Não foi possível criar a tarefa.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (task: Task) => {
    setEditingId(task.id)
    setTitle(task.title)
    setDescription(task.description || "")
    setDifficulty(task.difficulty)
    setCategory(task.category || "diarias")
    setDueDate(task.due_date ? new Date(task.due_date) : undefined)
  }

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchTasks()
      toast({
        title: "Tarefa excluída",
        description: "Sua tarefa foi excluída com sucesso.",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Não foi possível excluir a tarefa.",
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setTitle("")
    setDescription("")
    setDifficulty("facil")
    setCategory("diarias")
    setDueDate(undefined)
  }

  const handleComplete = async (id: string) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `http://localhost:3000/api/tasks/${id}/complete`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      fetchTasks()
      toast({
        title: "Tarefa concluída!",
        description: `Você ganhou XP e pontos. Novo nível: ${res.data.level}, XP: ${res.data.xp}, Pontos: ${res.data.points}`,
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível concluir a tarefa.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchDate = !filterDate || (task.due_date && task.due_date.split("T")[0] === format(filterDate, "yyyy-MM-dd"))
    const matchCategory = !filterCategory || task.category === filterCategory
    const matchDifficulty = !filterDifficulty || task.difficulty === filterDifficulty
    const matchCompleted =
      filterCompleted === "all" ? true : filterCompleted === "completed" ? task.completed : !task.completed

    return matchDate && matchCategory && matchDifficulty && matchCompleted
  })

  const resetFilters = () => {
    setFilterDate(undefined)
    setFilterCategory("")
    setFilterDifficulty("")
    setFilterCompleted("all")
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Suas Tarefas</h1>
        <p className="text-muted-foreground">Organize, acompanhe e complete suas tarefas para ganhar XP e pontos.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Tabs defaultValue="todas" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="todas">Todas</TabsTrigger>
                <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
              </TabsList>

              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? <X className="h-4 w-4 mr-2" /> : <Filter className="h-4 w-4 mr-2" />}
                {showFilters ? "Ocultar filtros" : "Filtros"}
              </Button>
            </div>

            {showFilters && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {filterDate ? (
                              format(filterDate, "dd/MM/yyyy", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={filterDate} onSelect={setFilterDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Todas as categorias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as categorias</SelectItem>
                          <SelectItem value="diarias">Diárias</SelectItem>
                          <SelectItem value="semanais">Semanais</SelectItem>
                          <SelectItem value="mensais">Mensais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Dificuldade</Label>
                      <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                        <SelectTrigger>
                          <SelectValue placeholder="Todas as dificuldades" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as dificuldades</SelectItem>
                          <SelectItem value="facil">Fácil</SelectItem>
                          <SelectItem value="medio">Médio</SelectItem>
                          <SelectItem value="dificil">Difícil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={filterCompleted}
                        onValueChange={(value) => setFilterCompleted(value as "all" | "completed" | "pending")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Todos os status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="completed">Concluídas</SelectItem>
                          <SelectItem value="pending">Pendentes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      Limpar filtros
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <TabsContent value="todas">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhuma tarefa encontrada.</p>
                  {(filterDate || filterCategory || filterDifficulty || filterCompleted !== "all") && (
                    <Button variant="link" onClick={resetFilters}>
                      Limpar filtros
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onComplete={handleComplete}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="pendentes">
              {filteredTasks.filter((t) => !t.completed).length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhuma tarefa pendente encontrada.</p>
                  {(filterDate || filterCategory || filterDifficulty) && (
                    <Button variant="link" onClick={resetFilters}>
                      Limpar filtros
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTasks
                    .filter((task) => !task.completed)
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onComplete={handleComplete}
                      />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="concluidas">
              {filteredTasks.filter((t) => t.completed).length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhuma tarefa concluída encontrada.</p>
                  {(filterDate || filterCategory || filterDifficulty) && (
                    <Button variant="link" onClick={resetFilters}>
                      Limpar filtros
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTasks
                    .filter((task) => task.completed)
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onComplete={handleComplete}
                      />
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? "Editar Tarefa" : "Nova Tarefa"}</CardTitle>
              <CardDescription>
                {editingId ? "Atualize os detalhes da tarefa selecionada" : "Adicione uma nova tarefa à sua lista"}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Nome da tarefa"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Detalhes da tarefa"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Dificuldade</Label>
                    <Select
                      value={difficulty}
                      onValueChange={(value) => setDifficulty(value as "facil" | "medio" | "dificil")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facil">Fácil</SelectItem>
                        <SelectItem value="medio">Médio</SelectItem>
                        <SelectItem value="dificil">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={category}
                      onValueChange={(value) => setCategory(value as "diarias" | "semanais" | "mensais")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diarias">Diária</SelectItem>
                        <SelectItem value="semanais">Semanal</SelectItem>
                        <SelectItem value="mensais">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Data de expiração (opcional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "dd/MM/yyyy", { locale: ptBR }) : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : editingId ? "Salvar alterações" : "Criar tarefa"}
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
                <CardTitle>Seu progresso</CardTitle>
                <CardDescription>Acompanhe seu nível e pontos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Nível {user.nivel}</span>
                    <span className="text-sm text-muted-foreground">{user.xp}/100 XP</span>
                  </div>
                  <Progress value={user.xp} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Pontos disponíveis</span>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
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

function TaskCard({
  task,
  onEdit,
  onDelete,
  onComplete,
}: {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onComplete: (id: string) => void
}) {
  const expiration = task.due_date ? getExpirationText(task.due_date) : null

  return (
    <Card className={task.completed ? "opacity-75" : ""}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </h3>
              {task.completed && (
                <Badge variant="success" className="ml-2">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Concluída
                </Badge>
              )}
            </div>
            {task.description && (
              <p className={`text-sm ${task.completed ? "text-muted-foreground" : ""}`}>{task.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {dificuldadeIcones[task.difficulty]}
              <span className="ml-1 capitalize">{task.difficulty}</span>
            </Badge>
            <Badge variant="outline">{task.points} pts</Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Badge variant="secondary">
            {task.category === "diarias" ? "Diária" : task.category === "semanais" ? "Semanal" : "Mensal"}
          </Badge>

          {task.due_date && (
            <Badge variant={expiration?.variant || "outline"}>
              <Clock className="h-3 w-3 mr-1" />
              {expiration?.text}
            </Badge>
          )}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-end gap-2">
          {!task.completed && (
            <Button variant="outline" size="sm" onClick={() => onComplete(task.id)}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Concluir
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>

          <Button variant="outline" size="sm" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
