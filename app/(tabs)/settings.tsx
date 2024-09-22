import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface SettingsItem {
  id: string;
  title: string;
}

const dummySettings: SettingsItem[] = [
  { id: '1', title: 'Account' },
  { id: '2', title: 'Language / Region' },
  // Add more settings items as needed
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderItem = ({ item }: { item: SettingsItem }) => (
    <TouchableOpacity style={styles.settingsItem}>
      <ThemedText style={styles.settingsItemText}>{item.title}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ThemedView style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.topRow}>
          {/* Add any buttons or elements you want in the top row */}
        </View>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>Settings</ThemedText>
        </View>
      </ThemedView>
      <FlatList
        data={dummySettings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 100 }]}
      />
      <TouchableOpacity 
        style={[
          styles.logoutButton, 
          { marginBottom: insets.bottom }
        ]} 
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
  list: {
    flex: 1,
  },
  listContent: {
    // paddingTop is set dynamically in the component
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C8C8C8',
  },
  settingsItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20, // Add horizontal margin for consistency
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});