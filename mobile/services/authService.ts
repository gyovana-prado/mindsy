// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../constants/Api';

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Usuário ou senha inválidos');
  const data = await res.json();
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('user', JSON.stringify(data.user));
  return data.user;
}

export async function register(name: string, username: string, email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, username, email, password }),
  });
  if (!res.ok) throw new Error('Erro ao cadastrar. Verifique os dados.');
  const data = await res.json();
  // Após cadastro, já faz login automático
  return await login(email, password);
}

export async function logout() {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
}

export async function getToken() {
  return AsyncStorage.getItem('token');
}

export async function getUser() {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user) : null;
} 