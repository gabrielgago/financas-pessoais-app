// Queries
export const createTableSQL = `
    CREATE TABLE IF NOT EXISTS tb_cartao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_banco VARCHAR(100) NOT NULL,
        saldo DECIMAL(9,2) NOT NULL,
        bandeira TINYINT NOT NULL,
        numero VARCHAR(16) NOT NULL UNIQUE,
        data_expedicao TEXT NOT NULL,
        dia_vencimento TINYINT NOT NULL
        );
--     INSERT INTO tb_cartao (nome_banco, saldo, bandeira, numero, data_expedicao, dia_vencimento) VALUES ('NuTeste', 333, 1, 123, '2026-05-30', 10);
`;

export const insertCartaoSQL = `
    INSERT INTO tb_cartao (nome_banco, saldo, bandeira, numero, data_expedicao, dia_vencimento)
    VALUES (?, ?, ?, ?, ?, ?);
`;

export const getCartoesSQL = `SELECT * FROM tb_cartao;`;