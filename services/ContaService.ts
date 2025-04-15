export interface Conta {
  id?: number;
  nomeConta: string;
  diaVencimento: number;
  icon?: string;
  categoria?: string;
}

export interface ContaDB {
  id: number;
  nome_conta: string;
  dia_vencimento: number;
  categoria: string;
}

const contas = [
  {
    id: 1,
    nomeConta: "Energia Elétrica",
    diaVencimento: 10,
    icon: "luz",
    categoria: ["Residencial", "Essencial"],
  },
  {
    id: 2,
    nomeConta: "Água e Esgoto",
    diaVencimento: 15,
    icon: "agua",
    categoria: ["Residencial", "Essencial"],
  },
  {
    id: 3,
    nomeConta: "Internet",
    diaVencimento: 5,
    icon: "internet",
    categoria: ["Entretenimento", "Trabalho"],
  },
  {
    id: 4,
    nomeConta: "Telefone Celular",
    diaVencimento: 20,
    icon: "celular",
    categoria: ["Comunicação", "Pessoal"],
  },
  {
    id: 5,
    nomeConta: "Cartão de Crédito",
    diaVencimento: 25,
    icon: "cartao",
    categoria: ["Financeiro", "Gastos Mensais"],
  },
  {
    id: 6,
    nomeConta: "Aluguel",
    diaVencimento: 8,
    icon: "casa",
    categoria: ["Moradia", "Essencial"],
  },
  {
    id: 7,
    nomeConta: "Plano de Saúde",
    diaVencimento: 12,
    icon: "saude",
    categoria: ["Saúde", "Seguro"],
  },
  {
    id: 8,
    nomeConta: "Seguro do Carro",
    diaVencimento: 18,
    icon: "carro",
    categoria: ["Seguro", "Veículo"],
  },
  {
    id: 9,
    nomeConta: "Academia",
    diaVencimento: 22,
    icon: "saude",
    categoria: ["Saúde", "Lazer"],
  },
  {
    id: 10,
    nomeConta: "Streaming (Netflix)",
    diaVencimento: 28,
    icon: "internet",
    categoria: ["Entretenimento", "Lazer"],
  },
];

// export const buscarTodasAsContas = (): Array<Conta> => {
//   return contas;
// };
