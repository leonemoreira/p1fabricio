
import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const response = await axios.get('http://localhost:3000/tasks', {
      headers: { Authorization: token },
    });
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Adicionar Tarefa" onPress={() => navigation.navigate('AddTask')} />
      {tasks.map((task) => (
        <View key={task._id} style={styles.task}>
          <Text>{task.title}</Text>
          <Button
            title="Editar"
            onPress={() => navigation.navigate('EditTask', { task })}
          />
          <Button title="Excluir" onPress={() => deleteTask(task._id)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  task: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
});

export default TaskListScreen;
