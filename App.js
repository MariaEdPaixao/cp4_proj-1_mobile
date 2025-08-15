import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import QueryClientProvider from './src/api/QueryClientProvider';
import App from './src/App';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Main() {
  return (
    <QueryClientProvider>
      <SafeAreaView>
        <App/>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
