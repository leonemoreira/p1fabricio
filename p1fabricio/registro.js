
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3000/users/register', { username, password });
      alert('Usuário registrado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      alert('Erro ao registrar usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Usuário:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="Usuário"
      />
      <Text>Senha:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Senha"
      />
      <Button title="Registrar" onPress={handleRegister} />
      <Text onPress={() => navigation.navigate('Login')}>Já tem uma conta? Faça login!</Text>
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

export default RegisterScreen;
