import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Edit, Trash2, Gift, Coins } from 'lucide-react';

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [custo, setCusto] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  const fetchRewards = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/recompensas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRewards(res.data);
    } catch {}
  };

  const fetchUserPoints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPoints(res.data.pontos);
    } catch {}
  };

  useEffect(() => {
    fetchRewards();
    fetchUserPoints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (editingId) {
        await axios.put(`http://localhost:3000/api/recompensas/${editingId}`, {
          nome, descricao, custo_em_pontos: custo
        }, { headers: { Authorization: `Bearer ${token}` } });
        setSuccess('Recompensa atualizada!');
      } else {
        await axios.post('http://localhost:3000/api/recompensas', {
          nome, descricao, custo_em_pontos: custo
        }, { headers: { Authorization: `Bearer ${token}` } });
        setSuccess('Recompensa criada!');
      }
      setNome('');
      setDescricao('');
      setCusto('');
      setEditingId(null);
      fetchRewards();
    } catch {
      setError('Erro ao salvar recompensa.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reward) => {
    setEditingId(reward.id);
    setNome(reward.nome);
    setDescricao(reward.descricao || '');
    setCusto(reward.custo_em_pontos);
  };

  const handleDelete = async (id) => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/recompensas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Recompensa excluída!');
      fetchRewards();
    } catch {
      setError('Erro ao excluir recompensa.');
    } finally {
      setLoading(false);
    }
  };

  const handleResgatar = async (id, custo) => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:3000/api/recompensas/${id}/resgatar`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Recompensa resgatada! Pontos descontados.');
      fetchRewards();
      fetchUserPoints();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao resgatar recompensa.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNome('');
    setDescricao('');
    setCusto('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Recompensas</h2>
        <div className="mb-2 font-bold">Seus pontos: {userPoints}</div>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? 'Editar Recompensa' : 'Nova Recompensa'}</CardTitle>
          <CardDescription>Preencha os campos para cadastrar ou editar uma recompensa.</CardDescription>
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
              <Label htmlFor="nome">Nome da recompensa</Label>
              <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="custo">Custo em pontos</Label>
              <Input id="custo" type="number" min={1} value={custo} onChange={e => setCusto(e.target.value)} required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (editingId ? 'Salvando...' : 'Cadastrando...') : (editingId ? 'Salvar' : 'Cadastrar')}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" className="w-full" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
      <h3 className="text-xl font-bold mb-4">Suas recompensas</h3>
      <div className="grid gap-4">
        {rewards.length === 0 && (
          <div className="text-center py-12 border rounded-lg">
            <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma recompensa encontrada</h3>
            <p className="text-muted-foreground mb-4">Crie sua primeira recompensa para resgatar com seus pontos.</p>
          </div>
        )}
        {rewards.map(reward => (
          <Card key={reward.id} className="flex flex-col md:flex-row items-center justify-between p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <Gift className="h-6 w-6 text-primary" /> {reward.nome}
                <span className="ml-2 text-xs font-normal flex items-center"><Coins className="h-4 w-4 mr-1 text-yellow-500" />{reward.custo_em_pontos} pontos</span>
              </div>
              {reward.descricao && <div className="text-muted-foreground text-sm mb-1">{reward.descricao}</div>}
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Button onClick={() => handleEdit(reward)} size="sm" variant="outline">
                <Edit className="mr-1 h-4 w-4" /> Editar
              </Button>
              <Button onClick={() => handleDelete(reward.id)} size="sm" variant="outline">
                <Trash2 className="mr-1 h-4 w-4" /> Excluir
              </Button>
              <Button onClick={() => handleResgatar(reward.id, reward.custo_em_pontos)} size="sm" className={userPoints < reward.custo_em_pontos ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} disabled={userPoints < reward.custo_em_pontos}>
                <Gift className="mr-1 h-4 w-4" /> Resgatar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 