import {useEffect, useState} from "react";
import {
    createTable,
    insertCartao,
    getCartoes,
} from "../database/CartaoRepository";
// @ts-ignore
import Cartao from "@types/Cartao";
import {Alert} from "react-native";

export const useDatabase = () => {
    const [cartoes, setCartoes] = useState<Cartao[]>([]);

    useEffect(() => {
        (async () => {
            // await createTable(); // Cria a tabela ao iniciar
            await buscarCartoes(); // Carrega os usuários
        })();
    }, []);

    const addCartao = async (cartao: Cartao) => {
        console.log("Inserindo cartao: ", cartao);

        try {
            await insertCartao(cartao);
            Alert.alert("Sucesso 🚀!!",
                "Cartão adicionado com sucesso",
                [{
                    text: "Uhull!",
                    onPress: (e) => {
                    },
                    style: "cancel"
                },]);
            await buscarCartoes();
        } catch (e: Error | any) {
            console.log("Stack trace: ", e.stack);
            if (e.message.includes("UNIQUE constraint failed")) {
                Alert.alert("Houve um erro inesperado 🚩",
                    "Um cartão com o mesmo número foi adicionado recentemente...",
                    [{
                        text: "Entendi",
                        onPress: (e) => {
                        },
                        style: "cancel"
                    },]);
            }
        }
    };

    const buscarCartoes = async () => {
        const cartoes: Cartao[] = await getCartoes();
        setCartoes(cartoes);
    };

    return {cartoes, addCartao};
};
