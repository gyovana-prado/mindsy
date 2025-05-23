import { API_BASE_URL } from '../constants/Api';
import { getToken } from './authService';

export async function getRewards() {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/recompensas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erro ao buscar recompensas');
  return res.json();
}

export async function createReward(reward: any) {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/recompensas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(reward),
  });
  if (!res.ok) throw new Error('Erro ao criar recompensa');
  return res.json();
}

export async function updateReward(id: number, fields: any) {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/recompensas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error('Erro ao atualizar recompensa');
  return res.json();
}

export async function deleteReward(id: number) {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/recompensas/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erro ao remover recompensa');
  return true;
} 