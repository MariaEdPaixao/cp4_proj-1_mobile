import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import QueryClientProvider from './src/QueryClientProvider';
import App from './src/App';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Main() {
  return (
    <QueryClientProvider>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
