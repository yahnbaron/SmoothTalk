import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export default function ConversationScreen() {
  const { id, name } = useLocalSearchParams<{ id: string, name: string }>();
  const navigation = useNavigation();
  const [contactName, setContactName] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey there!', sender: 'other', timestamp: new Date() },
    { id: '2', text: 'Hi! How are you?', sender: 'user', timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (name) {
      navigation.setOptions({
        title: name,
      });
    }
  }, [name, navigation]);

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
      <ThemedText style={item.sender === 'user' ? styles.userMessageText : styles.otherMessageText}>{item.text}</ThemedText>
    </View>
  );

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
    >
      <ThemedView style={styles.innerContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
        />
        <View style={[styles.inputContainer, { paddingBottom: Math.max(insets.bottom, 5) }]}>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor={isDarkMode ? '#999' : '#666'}
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={!newMessage.trim()}>
            <Ionicons name="send" size={24} color={newMessage.trim() ? '#007AFF' : '#999'} />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

// Placeholder function to get contact name
async function getContactName(id: string): Promise<string> {
  // In a real app, this would fetch the name from your data source
  // For now, we'll return a dummy name based on the id
  return `Contact ${id}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#303030', // Darker gray for better contrast
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 15, // Increased bottom padding
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    alignItems: 'flex-end', // Align items to the bottom
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    color: '#000000',
    maxHeight: 100, // Set a maximum height
    minHeight: 40, // Set a minimum height
  },
  darkInput: {
    color: '#FFFFFF',
    borderColor: '#303030',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end', // Align the button to the bottom
    marginBottom: 5, // Add some margin to align with the text input
  },
});