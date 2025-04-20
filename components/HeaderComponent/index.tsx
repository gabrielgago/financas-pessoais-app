import {Alert, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useMemo, useState} from "react";
import Styles from "./Styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {useDatabase} from "@hooks/useDatabase";
import {useRouter} from "expo-router";

const HeaderComponent = () => {
    const [saldacao, setSaldacao] = useState<string>("");
    const [horaAtual, setHoraAtual] = useState<number>(new Date().getHours());
    const {deleteAllData} = useDatabase();
    const router = useRouter();

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

    // @ts-ignore
    return (
        <View style={Styles.header}>
            <View style={Styles.bemVindo}>
                <Text style={Styles.txtBemVindo}>Ei, Bem vindo de volta</Text>
                <Text style={Styles.txtSaldacao}>{saldacao}</Text>
            </View>
            <TouchableOpacity activeOpacity={5} style={Styles.notificacoes}
                              onPress={() => router.push({pathname: '/home-bichos'})}
                              onLongPress={() => {
                                  Alert.alert("Atenção !!!", "Deseja realmente deletar todos os dados da base ??", [{
                                      style: "cancel",
                                      text: "Não!!!",
                                      onPress: () => {
                                      }
                                  }, {
                                      style: "destructive",
                                      text: "Sim, quero deletar tudo",
                                      onPress: () => {
                                          deleteAllData();
                                      }
                                  }])

                              }}>
                <FontAwesome6 name="bell" size={19} color="#FFFFFF"/>
            </TouchableOpacity>
        </View>
    );
};

export default HeaderComponent;
