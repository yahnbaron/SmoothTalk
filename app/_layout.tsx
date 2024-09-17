import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TouchableOpacity, Text } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="compose"
          options={{
            presentation: 'modal',
            title: 'New Message',
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ color: '#007AFF', fontSize: 17, marginRight: 10 }}>Cancel</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="conversation/[id]"
          options={{
            title: 'Conversation',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="contact/[id]"
          options={{
            title: 'Contact Details',
            headerBackTitle: 'Contacts',
          }}
        />
        <Stack.Screen
          name="add-contact"
          options={{
            presentation: 'modal',
            title: 'New Contact',
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ color: '#007AFF', fontSize: 17, marginRight: 10 }}>Cancel</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
