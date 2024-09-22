import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

interface ContactDetail {
  id: string;
  name: string;
  phoneNumber: string;
  username: string;
}

// This would typically come from a database or API
const dummyContactDetails: { [key: string]: ContactDetail } = {
  '1': { id: '1', name: 'John Doe', phoneNumber: '+1 (555) 123-4567', username: 'johndoe' },
  '2': { id: '2', name: 'Jane Smith', phoneNumber: '+1 (555) 987-6543', username: 'janesmith' },
  '3': { id: '3', name: 'Alice Johnson', phoneNumber: '+1 (555) 246-8135', username: 'alicej' },
};

export default function ContactDetailScreen() {
  const { id, name } = useLocalSearchParams<{ id: string, name: string }>();
  const navigation = useNavigation();
  const contact = dummyContactDetails[id as string];

  useEffect(() => {
    if (name) {
      navigation.setOptions({
        title: name,
        headerBackTitle: ' ', // This sets the back button text to a space (effectively hiding it)
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
        ),
      });
    }
  }, [name, navigation]);

  if (!contact) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Contact not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <ThemedText style={styles.avatarText}>{contact.name[0].toUpperCase()}</ThemedText>
        </View>
        <ThemedText style={styles.name}>{contact.name}</ThemedText>
      </View>
      <View style={styles.detailsContainer}>
        <DetailItem icon="call" label="Phone" value={contact.phoneNumber} />
        <DetailItem icon="at" label="Username" value={contact.username} />
      </View>
    </ScrollView>
  );
}

function DetailItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <TouchableOpacity style={styles.detailItem}>
      <Ionicons name={icon as any} size={24} color="#007AFF" style={styles.icon} />
      <View style={styles.detailTexts}>
        <ThemedText style={styles.detailLabel}>{label}</ThemedText>
        <ThemedText style={styles.detailValue}>{value}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 100, // This should match the height of the avatar
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C8C8C8',
  },
  icon: {
    marginRight: 15,
  },
  detailTexts: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  detailValue: {
    fontSize: 16,
    marginTop: 5,
  },
});