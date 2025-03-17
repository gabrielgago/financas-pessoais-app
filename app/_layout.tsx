import { DadosSensiveisProvider } from "@context/DadosSensiveisContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <DadosSensiveisProvider>
      <Slot />
    </DadosSensiveisProvider>
  );
}
