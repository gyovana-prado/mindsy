import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Bem-vindo ao Mindsy!</Text>
      <Text style={{ textAlign: 'center', marginBottom: 24 }}>
        Organize sua rotina, ganhe pontos e evolua de forma divertida. O Mindsy foi feito para ajudar pessoas com TDAH a manterem o foco e a disciplina.
      </Text>
      {/* Slides simplificados para MVP */}
      <Button title="Entrar" onPress={() => router.push('/login')} />
      <View style={{ height: 12 }} />
      <Button title="Criar conta" onPress={() => router.push('/register')} />
    </View>
  );
} 