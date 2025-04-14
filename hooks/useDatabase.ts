import {useCallback, useEffect, useMemo, useState} from "react";
// @ts-ignore
import Cartao, {CartaoDB} from "@types/Cartao";
import {Alert} from "react-native";
import {createTableSQL, getCartoesSQL, insertCartaoSQL} from "../database/Constants";
import {useSQLiteContext} from "expo-sqlite";

export const useDatabase = () => {

    const db = useSQLiteContext();

    const [cartoes, setCartoes] = useState<CartaoDB[]>([]);
    const [saldoCreditoTotal, setSaldoCreditoTotal] = useState(0);

    useEffect(() => {
        const initialize = async () => {
            try {
                await db.execAsync(createTableSQL);
                await buscarCartoes();
            } catch (e) {
                console.error("##### Error: ", e)
            }
        };
        initialize();
    }, []);

    useEffect(() => {
        const atualizaState = async () => {
            const saldoTotal = cartoes.reduce((acc, cartao) => acc + cartao.saldo, 0);
            setSaldoCreditoTotal(saldoTotal || 0)
        };
        atualizaState();
    }, [cartoes]);

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

    const buscarCartoes = async () => {
        const cartoes: CartaoDB[] = await getCartoes();
        setCartoes(prevCartoes => cartoes);
    };

    const addCartao = useCallback(async (cartao: Cartao) => {
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
    }, [insertCartao, buscarCartoes]);

    const getCartoes = async (): Promise<CartaoDB[]> => {
        if (!db) throw new Error("Banco de dados não inicializado!");
        return await db.getAllAsync(getCartoesSQL);
    };

    return useMemo(() => ({
        cartoes,
        addCartao,
        saldoCreditoTotal,
    }), [cartoes, addCartao, saldoCreditoTotal]);
};
