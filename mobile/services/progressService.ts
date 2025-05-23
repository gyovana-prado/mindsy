import { API_BASE_URL } from '../constants/Api';
import { getToken } from './authService';

export async function getXpAndLevel() {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/auth/xp`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erro ao buscar progresso');
  return res.json();
} 