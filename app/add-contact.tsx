import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, useColorScheme, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AddContactModal() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const nameInputRef = useRef<TextInput>(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    nameInputRef.current?.focus();

    navigation.setOptions({
      title: 'Add Contact',
      headerBackTitle: ' ', // This sets the back button text to a space (effectively hiding it)
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving new contact:', { name, phoneNumber, username });
    router.back();
  };

  const renderInput = (label: string, value: string, onChangeText: (text: string) => void, placeholder: string, ref?: React.RefObject<TextInput>) => (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isDarkMode && styles.darkText]}>{label}</Text>
      <TextInput
        ref={ref}
        style={[styles.input, isDarkMode && styles.darkInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? '#999' : '#666'}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerSpacing} />
          {renderInput('Name', name, setName, 'Enter name', nameInputRef)}
          {renderInput('Phone', phoneNumber, setPhoneNumber, 'Enter phone number')}
          {renderInput('Username', username, setUsername, 'Enter username')}
        </ScrollView>
        <View style={[styles.saveButtonContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerSpacing: {
    height: 20,
  },
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 5,
    color: '#000',
  },
  darkInput: {
    color: '#fff',
    borderBottomColor: '#333',
  },
  saveButtonContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});