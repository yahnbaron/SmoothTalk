import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, useColorScheme, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function ComposeModal() {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const recipientInputRef = useRef<TextInput>(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    recipientInputRef.current?.focus();

    navigation.setOptions({
      title: 'New Message',
      headerBackTitle: ' ', // This sets the back button text to a space (effectively hiding it)
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const canSend = recipient.trim() !== '' && message.trim() !== '';

  const handleSend = () => {
    if (canSend) {
      // TODO: Implement actual send functionality
      console.log('Sending message to:', recipient);
      console.log('Message:', message);
      
      // Replace the current screen with the conversation view
      router.replace({
        pathname: '/conversation/[id]',
        params: { id: 'new', name: recipient }
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 20}
      >
        <View style={styles.recipientContainer}>
          <Text style={[styles.label, isDarkMode && styles.darkText]}>To:</Text>
          <TextInput
            ref={recipientInputRef}
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Enter recipient"
            placeholderTextColor={isDarkMode ? '#999' : '#666'}
            value={recipient}
            onChangeText={setRecipient}
          />
        </View>
        <View style={styles.spacer} />
        <View style={styles.messageContainer}>
          <TextInput
            style={[styles.messageInput, isDarkMode && styles.darkInput]}
            placeholder="Type your message"
            placeholderTextColor={isDarkMode ? '#999' : '#666'}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !canSend && styles.sendButtonDisabled]} 
            onPress={handleSend}
            disabled={!canSend}
          >
            <Ionicons name="send" size={24} color={canSend ? '#007AFF' : '#999'} />
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
  recipientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: 40,
    justifyContent: 'center',
  },
  darkInput: {
    color: '#fff',
  },
  spacer: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10, // Add extra padding for iOS
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    padding: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
