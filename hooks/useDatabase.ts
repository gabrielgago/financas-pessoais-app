import { useEffect, useState } from "react";
import {
  createTable,
  insertCartao,
  getCartoes,
} from "../database/CartaoRepository";
import Cartao from "@types/Cartao";

export const useDatabase = () => {
  const [cartoes, setCartoes] = useState<Cartao[]>([]);

  useEffect(() => {
    (async () => {
      await createTable(); // Cria a tabela ao iniciar
      await getCartoes();
    })(); // Carrega os usuários
  }, []);

  const addCartao = async ({
    nomeBanco,
    saldo,
    bandeira,
    numero,
    dataExpedicao,
    diaVencimento,
  }) => {
    console.log(
      "Inserindo cartao: ",
      nomeBanco,
      saldo,
      bandeira,
      numero,
      dataExpedicao,
      diaVencimento
    );
    await insertCartao(
      nomeBanco,
      saldo,
      bandeira,
      numero,
      dataExpedicao,
      diaVencimento
    );
    console.log("Buscando cartoes... ");
    await buscarCartoes();
  };

  const buscarCartoes = async () => {
    await getCartoes((data) => setCartoes(data));
  };

  return { cartoes, addCartao };
};
