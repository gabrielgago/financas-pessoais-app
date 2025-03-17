import { createContext, useState, ReactNode } from "react";

// Definir o tipo do contexto
interface DadosSensiveisContextType {
  isMostrando: boolean;
  toggleMostrando: () => void;
}

// Criar o contexto
export const DadosSensiveisContext = createContext<
  DadosSensiveisContextType | undefined
>(undefined);

// Criar o Provider
export const DadosSensiveisProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isMostrando, setIsMostrando] = useState(false);

  // Alterna o valor entre true e false
  const toggleMostrando = () => setIsMostrando((prev) => !prev);

  return (
    <DadosSensiveisContext.Provider value={{ isMostrando, toggleMostrando }}>
      {children}
    </DadosSensiveisContext.Provider>
  );
};
