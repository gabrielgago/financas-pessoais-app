import {useCallback, useEffect, useMemo, useState} from "react";
// @ts-ignore
import Cartao, {CartaoDB} from "@types/Cartao";
import {Alert} from "react-native";
import {createTableSQL, getCartoesSQL, getContasSQL, insertCartaoSQL, insertContaSQL} from "../database/Constants";
import {useSQLiteContext} from "expo-sqlite";
import {Conta, ContaDB} from "@services/ContaService";

export const useDatabase = () => {

    const db = useSQLiteContext();

    const [cartoes, setCartoes] = useState<CartaoDB[]>([]);
    const [contas, setContas] = useState<ContaDB[]>([])
    const [saldoCreditoTotal, setSaldoCreditoTotal] = useState(0);

    useEffect(() => {
        const initialize = async () => {
            try {
                await db.execAsync(createTableSQL);
                await buscarCartoes();
                await buscarContas();
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

    const insertConta = async (conta: Conta): Promise<void> => {
        if (!db) throw new Error("Banco de dados não inicializado!");

        const {nomeConta, diaVencimento, categoria} = conta;

        await db.withTransactionAsync(async (): Promise<void> => {

            const result = await db.runAsync(insertContaSQL,
                nomeConta || 'Sem Nome',
                diaVencimento || 0,
                categoria || 'DESCONHECIDO');

            if (!result.changes) {
                throw Error("Houve um erro ao tentar salvar uma conta no bd.");
            }
        })
    };

    const buscarCartoes = async () => {
        const cartoes: CartaoDB[] = await getCartoes();
        setCartoes(prevCartoes => cartoes);
    };

    const buscarContas = async () => {
        const contas: ContaDB[] = await getContas();
        setContas(prevConta => contas);
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

    const addConta = useCallback(async (conta: Conta) => {
        try {
            await insertConta(conta);
            Alert.alert("Sucesso 🚀!!",
                "Conta adicionado com sucesso",
                [{
                    text: "Uhull!",
                    onPress: (e) => {
                    },
                    style: "cancel"
                },]);
            await buscarContas();
        } catch (e: Error | any) {
            console.log("Stack trace: ", e.stack);
            if (e.message.includes("UNIQUE constraint failed")) {
                Alert.alert("Houve um erro inesperado 🚩",
                    "Uma conta com o mesmo nome foi adicionada recentemente...",
                    [{
                        text: "Entendi",
                        onPress: (e) => {
                        },
                        style: "cancel"
                    },]);
            }
        }
    }, [insertConta, buscarContas]);

    const deleteConta = async (id: number) => {
        try {
            console.log("Deletando conta: ", id);
            await db.runAsync(`DELETE
                               FROM tb_conta
                               WHERE id = ${id}`);
            for (let idx in contas) {
                const index = Number(idx);
                if (contas[index].id === id) {
                    const contasCopy = [...contas];
                    contasCopy.splice(index, 1)
                    setContas(contas => contasCopy);
                }
            }
            console.log("Conta deletada com sucesso: ", id);
        } catch (e) {
            console.error("Houve um erro ao tentar deletar uma conta: ", e);
        }
    }

    const getCartoes = async (): Promise<CartaoDB[]> => {
        if (!db) throw new Error("Banco de dados não inicializado!");
        return await db.getAllAsync(getCartoesSQL);
    };

    const getContas = async (): Promise<ContaDB[]> => {
        if (!db) throw new Error("Banco de dados não inicializado!");
        return await db.getAllAsync(getContasSQL);
    };

    const deleteAllData = async () => {
        try {
            console.log("Deletando tudo...");
            await db.runAsync(`DELETE FROM tb_conta`);
            await db.runAsync(`DELETE FROM tb_cartao`);
            await buscarCartoes();
            await buscarContas();
            console.log("Dados deletados...");
        } catch (e) {
            console.error("Houve um erro ao tentar deletar tudo: ", e);
        }
    }

    return useMemo(() => ({
        cartoes,
        addCartao,
        saldoCreditoTotal,
        contas,
        addConta,
        setContas,
        deleteConta,
        deleteAllData
    }), [cartoes, addCartao, saldoCreditoTotal, contas, addConta, setContas, deleteConta, deleteAllData]);
};
