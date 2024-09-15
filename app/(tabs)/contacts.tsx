import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const dummyContacts: Contact[] = [
  { id: '1', name: 'John Doe', phoneNumber: '+1 (555) 123-4567' },
  { id: '2', name: 'Jane Smith', phoneNumber: '+1 (555) 987-6543' },
  { id: '3', name: 'Alice Johnson', phoneNumber: '+1 (555) 246-8135' },
  // Add more dummy contacts as needed
];

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity style={styles.contactItem}>
      <View style={styles.avatar}>
        <ThemedText style={styles.avatarText}>{item.name[0]}</ThemedText>
      </View>
      <View style={styles.contactDetails}>
        <ThemedText style={styles.name}>{item.name}</ThemedText>
        <ThemedText style={styles.phoneNumber}>{item.phoneNumber}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ThemedView style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.sortButton}>
            <ThemedText style={styles.sortButtonText}>Sort</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>Contacts</ThemedText>
        </View>
      </ThemedView>
      <FlatList
        data={dummyContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 100 }]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    lineHeight: 48,
  },
  sortButton: {
    zIndex: 2,
    justifyContent: 'center',
    height: 44,
  },
  sortButtonText: {
    color: '#007AFF',
    fontSize: 20,
  },
  addButton: {
    zIndex: 2,
    justifyContent: 'center',
    height: 44,
  },
  list: {
    flex: 1,
  },
  listContent: {
    // paddingTop is set dynamically in the component
  },
  contactItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C8C8C8',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
