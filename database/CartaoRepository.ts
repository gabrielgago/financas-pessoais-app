// import * as SQLite from "expo-sqlite";
// import {createTableSQL, getCartoesSQL, insertCartaoSQL} from "./Constants";
// // @ts-ignore
// import Cartao from "@types/Cartao";
// import {SQLiteRunResult} from "expo-sqlite";
//
// // Inicializar o banco
// let db: SQLite.SQLiteDatabase;
//
// // Função para inicializar o banco de forma assíncrona
// export const openDatabase = async (): Promise<void> => {
//     db = await SQLite.openDatabaseAsync("financas.db", {
//         useNewConnection: true
//     });
//     console.log("Banco de dados inicializado com sucesso");
// };
//
// openDatabase();
//
// export const createTable = async (): Promise<void> => {
//     console.log("Chamou o create Table!");
//     if (!db) {
//         console.error("Banco de dados não inicializado!");
//         throw new Error("Banco de dados não inicializado!")
//     }
//     await db.execAsync(createTableSQL);
//     console.log("Tabela `tb_cartao` criada com sucesso!");
// };
//
// createTable();
//
// export const insertCartao = async (cartao: Cartao): Promise<void> => {
//     if (!db) throw new Error("Banco de dados não inicializado!");
//
//     const {nomeBanco, saldo, bandeira, numero, dataExpedicao, diaVencimento} = cartao;
//
//     await db.withTransactionAsync( async (): Promise<void> => {
//
//         const result = await db.runAsync(insertCartaoSQL,
//             nomeBanco,
//             saldo,
//             bandeira,
//             numero,
//             dataExpedicao.toISOString().split("T")[0], // Formata para 'YYYY-MM-DD'
//             diaVencimento);
//
//         if(!result.changes) {
//             throw Error("Houve um erro ao tentar salvar um cartâo no bd.");
//         }
//
//     })
// };
//
// export const getCartoes = async (): Promise<Cartao[]> => {
//     if (!db) throw new Error("Banco de dados não inicializado!");
//     const cartoes: Cartao[] = await db.getAllAsync(getCartoesSQL);
//     console.log("#### Cartoes:", cartoes);
//     return cartoes;
// };