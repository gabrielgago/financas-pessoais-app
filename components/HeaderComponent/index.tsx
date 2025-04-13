import { View, Text } from "react-native";
import { useState, useEffect, useMemo } from "react";
import Styles from "./Styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const HeaderComponent = () => {
  const [saldacao, setSaldacao] = useState<string>("");
  const [horaAtual, setHoraAtual] = useState<number>(new Date().getHours());

  const txtSaldacao = useMemo(() => {
    if (horaAtual >= 5 && horaAtual < 12) return "Bom dia";
    else if (horaAtual >= 12 && horaAtual < 18) return "Boa tarde";
    else return "Boa noite";
  }, [horaAtual]);

  const atualizaSaldacao = () => {
    const horarioDeAgora = new Date().getHours();
    if (horarioDeAgora !== horaAtual) {
      setHoraAtual(horarioDeAgora);
    }
  };

  useEffect(() => {
    setSaldacao(txtSaldacao);
  }, [horaAtual]);

  useEffect(() => {
    atualizaSaldacao();
    const interval = setInterval(atualizaSaldacao, 10000); // Atualiza a cada minuto

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <View style={Styles.header}>
      <View style={Styles.bemVindo}>
        <Text style={Styles.txtBemVindo}>Ei, Bem vindo de volta</Text>
        <Text style={Styles.txtSaldacao}>{saldacao}</Text>
      </View>
      <View style={Styles.notificacoes}>
        <FontAwesome6 name="bell" size={19} color="#FFFFFF" />
      </View>
    </View>
  );
};

export default HeaderComponent;
