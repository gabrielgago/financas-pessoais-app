import { useContext } from "react";
import { DadosSensiveisContext } from "../context/DadosSensiveisContext";

export const useMostrarDadosSeguros = () => {
  const context = useContext(DadosSensiveisContext);

  if (!context) {
    throw new Error("useApp deve ser usado dentro de um AppProvider");
  }

  return {
    isMostrando: context.isMostrando,
    toggleMostrando: context.toggleMostrando,
  };
};
