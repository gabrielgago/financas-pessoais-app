export const getIcon = (icon: string) => {
  const images = {
    luz: "bolt-lightning",
    agua: "water",
    telefone: "phone",
    celular: "phone",
    cartao: "credit-card",
    internet: "wifi",
    casa: "house",
    saude: "heart",
    carro: "car",
  };

  return images[icon] || images["luz"]; // Retorna uma imagem padrão caso não encontre
};
