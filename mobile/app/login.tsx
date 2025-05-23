import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { login as loginService } from '../services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    setLoading(true);
    setError('');
    try {
      await loginService(email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Entrar</Text>
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
      {loading ? <ActivityIndicator /> : <Button title="Entrar" onPress={handleLogin} />}
      <TouchableOpacity onPress={() => router.push('/register')} style={{ marginTop: 16 }}>
        <Text style={{ color: '#007AFF' }}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
} 