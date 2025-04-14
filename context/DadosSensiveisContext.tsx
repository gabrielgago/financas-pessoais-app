import React, {createContext, ReactNode, useContext, useMemo, useState} from "react";

interface DadosSensiveisProps {
    isMostrando: boolean,
    toggleMostrando: () => void
}

const DadosSensiveisContext = createContext(null as unknown as DadosSensiveisProps);

export const DadosSensiveisProvider = ({children}: { children: ReactNode }) => {
    console.log("DadosSensiveisProvider está ativo");

    const [isMostrando, setIsMostrando] = useState(false);

    const toggleMostrando = () => setIsMostrando(prev => !prev);

    const valores: DadosSensiveisProps = useMemo(() => ({
        isMostrando,
        toggleMostrando,
    }), [isMostrando]);

    return (
        <DadosSensiveisContext.Provider value={valores}>
            {children}
        </DadosSensiveisContext.Provider>
    );
};

export const useMostrarDadosSeguros: () => DadosSensiveisProps = () => {
    console.log("Executando useMostrarDadosSeguros");
    return useContext(DadosSensiveisContext);
};
