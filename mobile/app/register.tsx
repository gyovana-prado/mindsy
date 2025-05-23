import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { register as registerService } from '../services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister() {
    setLoading(true);
    setError('');
    try {
      await registerService(name, username, email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Criar conta</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{ width: '100%', borderWidth: 1, borderRadius: 8, marginBottom: 12, padding: 8 }}
      />
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{ width: '100%', borderWidth: 1, borderRadius: 8, marginBottom: 12, padding: 8 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ width: '100%', borderWidth: 1, borderRadius: 8, marginBottom: 12, padding: 8 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: '100%', borderWidth: 1, borderRadius: 8, marginBottom: 16, padding: 8 }}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
      {loading ? <ActivityIndicator /> : <Button title="Cadastrar" onPress={handleRegister} />}
      <TouchableOpacity onPress={() => router.push('/login')} style={{ marginTop: 16 }}>
        <Text style={{ color: '#007AFF' }}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
} 