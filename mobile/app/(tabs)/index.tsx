import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getTasks, createTask, deleteTask } from '../../services/taskService';
import { getXpAndLevel } from '../../services/progressService';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('Fácil');
  const [points, setPoints] = useState('10');
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [error, setError] = useState('');

  async function loadData() {
    setLoading(true);
    try {
      const [tasksData, progress] = await Promise.all([
        getTasks(),
        getXpAndLevel(),
      ]);
      setTasks(tasksData);
      setXp(progress.xp);
      setLevel(progress.level);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAddTask() {
    if (!title) return;
    try {
      await createTask({ title, difficulty, points: Number(points) });
      setTitle('');
      setPoints('10');
      setDifficulty('Fácil');
      loadData();
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Erro ao criar tarefa');
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id);
      loadData();
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Erro ao remover tarefa');
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>XP: {xp} | Nível: {level}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TextInput
          placeholder="Nova tarefa"
          value={title}
          onChangeText={setTitle}
          style={{ flex: 1, borderWidth: 1, borderRadius: 8, padding: 8, marginRight: 8 }}
        />
        <TextInput
          placeholder="Pontos"
          value={points}
          onChangeText={setPoints}
          keyboardType="numeric"
          style={{ width: 70, borderWidth: 1, borderRadius: 8, padding: 8, marginRight: 8 }}
        />
        <TouchableOpacity onPress={handleAddTask} style={{ backgroundColor: '#007AFF', borderRadius: 8, padding: 12 }}>
          <Text style={{ color: 'white' }}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
      {loading ? <ActivityIndicator /> : (
        <FlatList
          data={tasks}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: '#f2f2f2', borderRadius: 8, padding: 8 }}>
              <Text style={{ flex: 1 }}>{item.title} ({item.difficulty}) - {item.points} pts</Text>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text style={{ color: 'red' }}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
