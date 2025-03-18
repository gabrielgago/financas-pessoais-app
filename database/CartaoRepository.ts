import * as SQLite from "expo-sqlite";
import Cartao from "@types/Cartao";

const db = SQLite.openDatabaseAsync("financas.db"); // Nome do banco

export const createTable = async () => {
  await db.withTransactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      `CREATE TABLE IF NOT EXISTS tb_cartao (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome_banco VARCHAR(100) NOT NULL, 
        saldo DECIMAL(9,2) NOT NULL,
        bandeira VARCHAR(100) NOT NULL,
        numero VARCHAR(16) NOT NULL UNIQUE,
        data_expedicao TIMESTAMP NOT NULL,
        dia_vencimento TINYINT NOT NULL
      );`
    );
    console.log("Tabela tb_cartao criada com sucesso!");
  });
};

export const insertCartao = async (
  nomeBanco: string,
  saldo: number,
  bandeira: string,
  numero: string,
  dataExpedicao = new Date(),
  diaVencimento: number
) => {
  await db.withTransactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      "INSERT INTO tb_cartao (nome_banco, saldo, bandeira, numero, data_expedicao, dia_vencimento) VALUES (?, ?, ?, ?, ?, ?);",
      [nomeBanco, saldo, bandeira, numero, dataExpedicao, diaVencimento],
      (_, result) => console.log("Cartão inserido:", result),
      (_, error) => console.log("Erro ao inserir cartão:", error)
    );
  });
};

export const getCartoes = async (callback: (cartoes: Cartao[]) => void) => {
  await db.withTransactionAsync(async (tx) => {
    await tx.executeSqlAsync(
      "SELECT * FROM tb_cartao;",
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.log("Erro ao buscar cartões:", error)
    );
  });
};

export default db;
