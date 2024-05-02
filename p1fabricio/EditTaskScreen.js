
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const editTask = async () => {
    const token = await AsyncStorage.getItem('authToken');
    await axios.put(
      `http://localhost:3000/tasks/${task._id}`,
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
      <Button title="Atualizar Tarefa" onPress={editTask} />
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

export default EditTaskScreen;
