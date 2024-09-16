import React, { useState } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, useColorScheme, Platform, StatusBar, Animated, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// import { SearchBar } from '@/components/SearchBar'; // Assume this component exists

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
}

const dummyConversations: Conversation[] = [
  { id: '1', name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM' },
  { id: '2', name: 'Jane Smith', lastMessage: "Don't forget about our meeting", time: 'Yesterday' },
  { id: '3', name: 'Alejandra Yahn', lastMessage: 'Who the fuck is Alice', time: 'Tue' },
  // Add more dummy conversations as needed
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [scrollY] = useState(new Animated.Value(0));
  const colorScheme = useColorScheme();
  const router = useRouter();

  const titleScale = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -10],
    extrapolate: 'clamp',
  });

  const handleComposePress = () => {
    console.log('Compose button pressed');
    router.push('/modal');
  };


  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity style={styles.conversationItem}>
      <View style={styles.avatar}>
        <ThemedText style={styles.avatarText}>{item.name[0]}</ThemedText>
      </View>
      <View style={styles.conversationDetails}>
        <View style={styles.conversationHeader}>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
          <ThemedText style={styles.time}>{item.time}</ThemedText>
        </View>
        <ThemedText style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ThemedView style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.editButton}>
            <ThemedText style={styles.editButtonText}>Edit</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.composeButton} onPress={handleComposePress}>
            <Ionicons name="create-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.titleContainer, { transform: [{ scale: titleScale }, { translateY: titleTranslateY }] }]}>
          <ThemedText style={styles.title}>SmoothTalk Free Beta</ThemedText>
        </Animated.View>
      </ThemedView>
      <Animated.FlatList
        data={dummyConversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 100 }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
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
    paddingBottom: 16, // Increased padding
  },
  title: {
    fontSize: 38, // Increased font size
    fontWeight: 'bold',
    lineHeight: 48, // Added line height to prevent text from being cut off
  },
  editButton: {
    zIndex: 2,
    justifyContent: 'center',
    height: 44,
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 20,
  },
  composeButton: {
    zIndex: 2,
    justifyContent: 'center',
    height: 44,
  },
  list: {
    flex: 1,
  },
  listContent: {
    // paddingTop is now set dynamically in the component
  },
  conversationItem: {
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
  conversationDetails: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#8E8E93',
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93',
  },
});
