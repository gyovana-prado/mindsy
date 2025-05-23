import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { differenceInDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { CalendarIcon, CheckCircle2, Edit, Trash2, AlertCircle, Star, Filter, X, Clock, AlertTriangle } from 'lucide-react';

const API_URL = 'http://localhost:3000/api/tasks';

const dificuldadePontuacao = {
  facil: 10,
  medio: 20,
  dificil: 30,
};

const dificuldadeIcones = {
  facil: <Star className="h-4 w-4 text-yellow-500" />,
  medio: <AlertTriangle className="h-4 w-4 text-orange-500" />,
  dificil: <AlertCircle className="h-4 w-4 text-red-500" />,
};

function getExpirationText(dueDate) {
  if (!dueDate) return null;
  const today = new Date();
  const diff = differenceInDays(new Date(dueDate), today);
  if (diff < 0) return { text: 'Vencida', variant: 'destructive' };
  if (diff === 0) return { text: 'Expira hoje', variant: 'warning' };
  return { text: `Faltam ${diff} ${diff === 1 ? 'dia' : 'dias'}`, variant: 'outline' };
}

export default function TaskCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('facil');
  const [category, setCategory] = useState('diarias');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [userStats, setUserStats] = useState({ xp: 0, pontos: 0, nivel: 1 });

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setTasks([]);
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserStats({ xp: res.data.xp, pontos: res.data.pontos, nivel: res.data.nivel });
    } catch {}
  };

  useEffect(() => {
    fetchTasks();
    fetchUserStats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    const points = dificuldadePontuacao[difficulty];
    const token = localStorage.getItem('token');
    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          {
            title,
            description,
            difficulty,
            category,
            points,
            dueDate: dueDate || null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccess('Tarefa atualizada com sucesso!');
      } else {
        await axios.post(
          API_URL,
          {
            title,
            description,
            difficulty,
            category,
            points,
            dueDate: dueDate || null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccess('Tarefa cadastrada com sucesso!');
      }
      setTitle('');
      setDescription('');
      setDifficulty('facil');
      setCategory('diarias');
      setDueDate('');
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      setError('Erro ao cadastrar/editar tarefa.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description || '');
    setDifficulty(task.difficulty);
    setCategory(task.category || 'diarias');
    setDueDate(task.due_date ? task.due_date : '');
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
      setSuccess('Tarefa excluída com sucesso!');
    } catch (err) {
      setError('Erro ao excluir tarefa.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setDifficulty('facil');
    setCategory('diarias');
    setDueDate('');
  };

  const handleConcluir = async (id) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:3000/api/tasks/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Task completed! XP and points updated.');
      fetchTasks();
      setUserStats({ xp: res.data.xp, pontos: res.data.points, nivel: res.data.level });
    } catch (err) {
      setError('Error completing task.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchDate = !filterDate || task.due_date === filterDate;
    const matchCategory = !filterCategory || task.category === filterCategory;
    const matchDifficulty = !filterDifficulty || task.difficulty === filterDifficulty;
    return matchDate && matchCategory && matchDifficulty;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <div className="font-bold text-lg mb-2">Nível: {userStats.nivel} | XP: {userStats.xp}/100 | Pontos: {userStats.pontos}</div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${Math.min(userStats.xp, 100)}%` }}
          />
        </div>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? 'Editar Tarefa' : 'Nova Tarefa'}</CardTitle>
          <CardDescription>Preencha os campos para cadastrar ou editar uma tarefa.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">Nome da tarefa</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input id="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Dificuldade</Label>
                <select id="difficulty" className="w-full rounded-md border px-3 py-2" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                  <option value="facil">Fácil</option>
                  <option value="medio">Médio</option>
                  <option value="dificil">Difícil</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <select id="category" className="w-full rounded-md border px-3 py-2" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="diarias">Diárias</option>
                  <option value="semanais">Semanais</option>
                  <option value="mensais">Mensais</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de expiração</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (editingId ? 'Salvando...' : 'Cadastrando...') : (editingId ? 'Salvar' : 'Cadastrar')}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" className="w-full" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
      <div className="mb-4 flex items-center gap-4">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </Button>
        {showFilters && (
          <div className="flex gap-4">
            <Input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} placeholder="Filtrar por data" />
            <select className="rounded-md border px-3 py-2" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              <option value="">Todas as categorias</option>
              <option value="diarias">Diárias</option>
              <option value="semanais">Semanais</option>
              <option value="mensais">Mensais</option>
            </select>
            <select className="rounded-md border px-3 py-2" value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)}>
              <option value="">Todas as dificuldades</option>
              <option value="facil">Fácil</option>
              <option value="medio">Médio</option>
              <option value="dificil">Difícil</option>
            </select>
            <Button variant="outline" onClick={() => { setFilterDate(''); setFilterCategory(''); setFilterDifficulty(''); }}>
              <X className="mr-2 h-4 w-4" />
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold mb-4">Tarefas cadastradas</h3>
      <div className="grid gap-4">
        {filteredTasks.length === 0 && <div className="text-muted-foreground">Nenhuma tarefa encontrada.</div>}
        {filteredTasks.map(task => (
          <Card key={task.id} className="flex flex-col md:flex-row items-center justify-between p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-lg">
                {dificuldadeIcones[task.difficulty]} {task.title}
                <span className="ml-2 text-xs font-normal">({task.points} pontos)</span>
                {task.due_date && (
                  <span className="ml-2 text-xs">
                    <Clock className="inline h-4 w-4 mr-1" />
                    {getExpirationText(task.due_date)?.text}
                  </span>
                )}
              </div>
              {task.description && <div className="text-muted-foreground text-sm mb-1">{task.description}</div>}
              <div className="text-xs text-muted-foreground mb-1">Categoria: {task.category}</div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              {!task.completed && (
                <Button onClick={() => handleConcluir(task.id)} size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Concluir
                </Button>
              )}
              <Button onClick={() => handleEdit(task)} size="sm" variant="outline">
                <Edit className="mr-1 h-4 w-4" /> Editar
              </Button>
              <Button onClick={() => handleDelete(task.id)} size="sm" variant="outline">
                <Trash2 className="mr-1 h-4 w-4" /> Excluir
              </Button>
              {task.completed && <span className="text-green-600 font-bold ml-2">Concluída!</span>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 