// Carrega automaticamente todas as rotas da pasta "app" e monta a navegação

import { ExpoRoot } from "expo-router";

export default function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}
