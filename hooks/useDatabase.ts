import {useEffect, useState} from "react";
import {
    createTable,
    insertCartao,
    getCartoes,
} from "../database/CartaoRepository";
// @ts-ignore
import Cartao from "@types/Cartao";

export const useDatabase = () => {
    const [cartoes, setCartoes] = useState<Cartao[]>([]);

    useEffect(() => {
        (async () => {
            await createTable(); // Cria a tabela ao iniciar
            await buscarCartoes(); // Carrega os usuários
        })();
    }, []);

    const addCartao = async (cartao: Cartao) => {
        console.log("Inserindo cartao: ", cartao);
        await insertCartao(cartao);
        console.log("Buscando cartoes... ");
        await buscarCartoes();
    };

    const buscarCartoes = async () => {
        const cartoes: Cartao[] = await getCartoes();
        setCartoes(cartoes);
    };

    return {cartoes, addCartao};
};
