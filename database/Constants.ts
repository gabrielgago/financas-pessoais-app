//-- DML
export const createTableCartaoSQL = `
    CREATE TABLE IF NOT EXISTS tb_cartao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_banco VARCHAR(100) NOT NULL,
        saldo DECIMAL(9,2) NOT NULL,
        bandeira TINYINT NOT NULL,
        numero VARCHAR(16) NOT NULL UNIQUE,
        data_expedicao TEXT NOT NULL,
        dia_vencimento TINYINT NOT NULL
        );
    
`;

export const createTableContaSQL = `
    CREATE TABLE IF NOT EXISTS tb_conta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_conta VARCHAR(100) NOT NULL UNIQUE,
        dia_vencimento TINYINT NOT NULL,
        categoria TEXT NOT NULL CHECK (categoria IN ('DESCONHECIDO', 'LAZER', 'PROGRAMADOS', 'ALIMENTACAO', 'MORADIA', 'PESSOAL', 'COMUNICACAO', 'FINANCEIRO', 'SAUDE', 'SEGURO', 'VEICULO', 'STREAMING'))        );
`;

export const alterTableAddColumnCorSelecionadaSQL = `
    ALTER TABLE tb_cartao ADD COLUMN cor_selecionada VARCHAR(7) NOT NULL DEFAULT "#9C2CF3";
`;

//-- DDL

export const insertCartaoSQL = `
    INSERT INTO tb_cartao (nome_banco, saldo, bandeira, numero, data_expedicao, dia_vencimento, cor_selecionada)
    VALUES (?, ?, ?, ?, ?, ?, ?);
`;

export const insertContaSQL = `
    INSERT INTO tb_conta (nome_conta, dia_vencimento, categoria)
    VALUES (?, ?, ?);
`;

export const getCartoesSQL = `SELECT * FROM tb_cartao;`;
export const getContasSQL = `SELECT * FROM tb_conta;`;
