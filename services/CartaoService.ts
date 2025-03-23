// @ts-ignore
import Cartao from "@types/Cartao";

const generateCardNumber = () => {
    return Array(4)
        .fill(0)
        .map(() => Math.floor(1000 + Math.random() * 9000)) // Gera números entre 1000 e 9999
        .join(" ");
};

const cartoes: Array<Cartao> = [
    {
        id: 1,
        nomeBanco: "Banco do Brasil",
        saldo: 2500.75,
        bandeira: 1,
        numero: generateCardNumber(),
        dataExpedicao: "12/26",
        diaVencimento: 10,
    },
    {
        id: 2,
        nomeBanco: "Itaú",
        saldo: 1800.5,
        bandeira: 0,
        numero: generateCardNumber(),
        dataExpedicao: "07/25",
        diaVencimento: 10,
    },
    {
        id: 3,
        nomeBanco: "Bradesco",
        saldo: 3200.0,
        bandeira: 2,
        numero: generateCardNumber(),
        dataExpedicao: "09/27",
        diaVencimento: 10,
    },
    {
        id: 4,
        nomeBanco: "Nubank",
        saldo: 500.25,
        bandeira: 0,
        numero: generateCardNumber(),
        dataExpedicao: "05/24",
        diaVencimento: 10,
    },
    {
        id: 5,
        nomeBanco: "Santander",
        saldo: 4200.9,
        bandeira: 1,
        numero: generateCardNumber(),
        dataExpedicao: "03/28",
        diaVencimento: 10,
    },
    {
        id: 6,
        nomeBanco: "Caixa Econômica",
        saldo: 1200.3,
        bandeira: 2,
        numero: generateCardNumber(),
        dataExpedicao: "11/26",
        diaVencimento: 10,
    },
];

export const buscarTodosOsCartoes = (): Array<Cartao> => {
    return cartoes;
};
