import { API_BASE_URL } from '../constants/Api';
import { getToken } from './authService';

export async function getTasks() {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/tarefas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erro ao buscar tarefas');
  return res.json();
}

export async function createTask(task: any) {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/tarefas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Erro ao criar tarefa');
  return res.json();
}

export async function updateTask(id: number, fields: any) {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error('Erro ao atualizar tarefa');
  return res.json();
}

export async function deleteTask(id: number) {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/tarefas/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erro ao remover tarefa');
  return true;
} 