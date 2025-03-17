export interface Cartao {
  id: number;
  bancoNome: string;
  saldo: string;
  bandeira: string;
  numero: string;
  dataExp: string;
}

const generateCardNumber = () => {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(1000 + Math.random() * 9000)) // Gera números entre 1000 e 9999
    .join(" ");
};

const cartoes = [
  {
    id: 1,
    bancoNome: "Banco do Brasil",
    saldo: 2500.75,
    bandeira: "Visa",
    numero: generateCardNumber(),
    dataExp: "12/26",
    diaVencimento: 10,
  },
  {
    id: 2,
    bancoNome: "Itaú",
    saldo: 1800.5,
    bandeira: "Mastercard",
    numero: generateCardNumber(),
    dataExp: "07/25",
    diaVencimento: 10,
  },
  {
    id: 3,
    bancoNome: "Bradesco",
    saldo: 3200.0,
    bandeira: "Elo",
    numero: generateCardNumber(),
    dataExp: "09/27",
    diaVencimento: 10,
  },
  {
    id: 4,
    bancoNome: "Nubank",
    saldo: 500.25,
    bandeira: "Mastercard",
    numero: generateCardNumber(),
    dataExp: "05/24",
    diaVencimento: 10,
  },
  {
    id: 5,
    bancoNome: "Santander",
    saldo: 4200.9,
    bandeira: "Visa",
    numero: generateCardNumber(),
    dataExp: "03/28",
    diaVencimento: 10,
  },
  {
    id: 6,
    bancoNome: "Caixa Econômica",
    saldo: 1200.3,
    bandeira: "Elo",
    numero: generateCardNumber(),
    dataExp: "11/26",
    diaVencimento: 10,
  },
];

export const buscarTodosOsCartoes = (): Array<Cartao> => {
  return cartoes;
};
