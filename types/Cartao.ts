export default interface Cartao {
  id: number | undefined;
  nomeBanco: string;
  saldo: number;
  bandeira: number;
  numero: string;
  dataExpedicao: Date;
  diaVencimento: number;
}

export interface CartaoDB {
  id: number | undefined;
  nome_banco: string;
  saldo: number;
  bandeira: number;
  numero: string;
  data_expedicao: string;
  dia_vencimento: number;
}

