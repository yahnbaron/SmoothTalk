import React, { useState } from 'react';
import { StyleSheet, View, TextInput, useColorScheme, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';

const countries = ['United Kingdom', 'United States', 'Australia', 'Canada', 'Ireland'];
const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];

export default function DialectSettings() {
  const [selectedCountry, setSelectedCountry] = useState('United Kingdom');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [city, setCity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('');
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#000' : '#F2F2F7',
    },
    pickerContainer: {
      backgroundColor: isDarkMode ? '#1C1C1E' : 'white',
    },
    text: {
      color: isDarkMode ? 'white' : 'black',
    },
    input: {
      backgroundColor: isDarkMode ? '#1C1C1E' : 'white',
      color: isDarkMode ? 'white' : 'black',
    },
    modalBackground: {
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: isDarkMode ? '#1C1C1E' : 'white',
    },
  };

  const openPicker = (pickerType: any) => {
    setCurrentPicker(pickerType);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        if (currentPicker === 'country') {
          setSelectedCountry(item);
        } else {
          setSelectedLanguage(item);
        }
        setModalVisible(false);
      }}
    >
      <ThemedText style={styles.modalItemText}>{item}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Dialect",
          headerBackTitle: "Settings",
        }} 
      />
      <SafeAreaView style={[styles.container, dynamicStyles.container]} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <ThemedText style={styles.label}>Country</ThemedText>
            <TouchableOpacity
              style={[styles.pickerContainer, dynamicStyles.pickerContainer]}
              onPress={() => openPicker('country')}
            >
              <ThemedText style={[styles.pickerText, dynamicStyles.text]}>{selectedCountry}</ThemedText>
              <Ionicons name="chevron-down" size={24} color={isDarkMode ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.label}>Language</ThemedText>
            <TouchableOpacity
              style={[styles.pickerContainer, dynamicStyles.pickerContainer]}
              onPress={() => openPicker('language')}
            >
              <ThemedText style={[styles.pickerText, dynamicStyles.text]}>{selectedLanguage}</ThemedText>
              <Ionicons name="chevron-down" size={24} color={isDarkMode ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.label}>City</ThemedText>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={city}
              onChangeText={setCity}
              placeholder="Enter your city"
              placeholderTextColor={isDarkMode ? '#666' : '#999'}
            />
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={[styles.modalBackground, dynamicStyles.modalBackground]}>
            <View style={[styles.modalContent, dynamicStyles.modalContent]}>
              <FlatList
                data={currentPicker === 'country' ? countries : languages}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  pickerText: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalItem: {
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCCCCC',
  },
  modalItemText: {
    fontSize: 18,
  },
});