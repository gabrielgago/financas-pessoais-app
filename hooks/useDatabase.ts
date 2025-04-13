import {useEffect, useState} from "react";
// @ts-ignore
import Cartao from "@types/Cartao";
import {Alert} from "react-native";
import {createTableSQL, getCartoesSQL, insertCartaoSQL} from "../database/Constants";
import {useSQLiteContext} from "expo-sqlite";

export const useDatabase = () => {

    const db = useSQLiteContext();

    const [cartoes, setCartoes] = useState<Cartao[]>([]);
    const [saldoCreditoTotal, setSaldoCreditoTotal] = useState(0);

    useEffect(() => {
        const initialize = async () => {
            try {
                await db.execAsync(createTableSQL);
            } catch (e) {
                console.error("##### Error: ", e)
            }
            await buscarCartoes();
            const saldoTotal = cartoes.reduce((acc, cartao) => acc + cartao.saldo, 0);
            setSaldoCreditoTotal(saldoTotal || 0)
        };
        initialize();
    }, []);

    const insertCartao = async (cartao: Cartao): Promise<void> => {
        if (!db) throw new Error("Banco de dados não inicializado!");

        const {nomeBanco, saldo, bandeira, numero, dataExpedicao, diaVencimento} = cartao;

        await db.withTransactionAsync(async (): Promise<void> => {

            const dtExp = dataExpedicao && dataExpedicao.toISOString().split("T")[0];
            const result = await db.runAsync(insertCartaoSQL,
                nomeBanco || 'undefined',
                saldo || "0.00",
                bandeira || 0,
                numero || "0000 0000 0000 0000",
                dtExp || new Date().toISOString(), // Formata para 'YYYY-MM-DD'
                diaVencimento || 0);

            if (!result.changes) {
                throw Error("Houve um erro ao tentar salvar um cartâo no bd.");
            }

            setSaldoCreditoTotal(saldoCreditoTotal + saldo);
        })
    };

    const addCartao = async (cartao: Cartao) => {
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

    const getCartoes = async (): Promise<Cartao[]> => {
        if (!db) throw new Error("Banco de dados não inicializado!");
        const cartoes: Cartao[] = await db.getAllAsync(getCartoesSQL);
        return cartoes;
    };

    const buscarCartoes = async () => {
        const cartoes: Cartao[] = await getCartoes();
        setCartoes(cartoes);
    };

    return {cartoes, addCartao, saldoCreditoTotal};
};
