
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTask = async () => {
    const token = await AsyncStorage.getItem('authToken');
    await axios.post(
      'http://localhost:3000/tasks',
      { title, description },
      {
        headers: { Authorization: token },
      }
    );
    navigation.navigate('TaskList');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Título da Tarefa"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição da Tarefa"
        style={styles.input}
      />
      <Button title="Adicionar Tarefa" onPress={addTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
});

export default AddTaskScreen;
