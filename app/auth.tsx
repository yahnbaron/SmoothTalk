import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Modal } from 'react-native';
import RegisterScreen from './components/RegisterScreen';

interface AuthScreenProps {
  onLogin: () => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    // Dummy login functionality
    console.log('Login attempt with:', username, password);
    // Simulate successful login
    onLogin();
  };

  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <Text style={[styles.title, isDarkMode && styles.textDark]}>Login</Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Username"
        placeholderTextColor={isDarkMode ? '#888' : '#999'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#888' : '#999'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={() => setShowRegister(true)}>
        <Text style={[styles.registerButtonText, isDarkMode && styles.textDark]}>Register</Text>
      </TouchableOpacity>
      <Modal visible={showRegister} animationType="slide">
        <RegisterScreen onClose={() => setShowRegister(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#1c1c1e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#f0f0f0',
  },
  inputDark: {
    color: '#fff',
    backgroundColor: '#2c2c2e',
    borderColor: '#444',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 10,
  },
  registerButtonText: {
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});