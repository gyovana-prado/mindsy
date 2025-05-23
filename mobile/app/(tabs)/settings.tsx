import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { logout } from '../../services/authService';

export default function SettingsScreen() {
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.replace('/onboarding');
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Configurações</Text>
      {/* Aqui virão opções de perfil, notificações e logout */}
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
} 