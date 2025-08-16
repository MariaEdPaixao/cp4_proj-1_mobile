// Define a estrutura padrão do app (provedores + navegação em pilha)

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import QueryClientProvider from "../providers/QueryClientProvider";

export default function Layout() {
  return (
    <QueryClientProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
