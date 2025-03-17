import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRef, useState } from "react";
import Styles from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "@constants/Colors";
import { Theme } from "@constants/Theme";
import { buscarTodosOsCartoes, Cartao } from "@services/CartaoService";
import { isMostrando } from "@hooks/useMostrarDadosSeguros";
import { useMostrarDadosSeguros } from "@hooks/useMostrarDadosSeguros";

const CardsComponent = () => {
  const EmptyComponent = () => {
    return (
      <View style={Styles.emptyContainer}>
        <View style={Styles.emptyIcon}>
          <FontAwesome6
            name="thermometer-empty"
            size={50}
            color={Colors.light.whiteText}
          />
        </View>
        <Text style={Styles.txtEmptyList}>
          Ainda não existem cartões cadastrados...
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      horizontal={true}
      data={buscarTodosOsCartoes()}
      keyExtrator={(item: Cartao) => item.id}
      renderItem={({ item }: Cartao) => <Card item={item} />}
      bounces={false}
      ListEmptyComponent={<EmptyComponent />}
      ItemSeparatorComponent={<View style={{ width: 20 }} />}
      overScrollMode="never"
    ></FlatList>
  );
};

export const Card = ({ item }) => {
  const { bancoNome, saldo, bandeira, numero, dataExp, diaVencimento } = item;
  const [virado, setVirado] = useState(false);
  const { isMostrando } = useMostrarDadosSeguros();

  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotateElement = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1, // Girar 360°
      duration: 500, // Tempo da animação (1 segundo)
      useNativeDriver: true, // Usa a renderização nativa para melhor desempenho
    }).start(() => setVirado(!virado)); // Reseta o valor após a animação
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Define a rotação completa
  });

  const Cartao = () => {
    return (
      <LinearGradient style={Styles.card} colors={["#9C2CF3", "#3A49F9"]}>
        <View style={Styles.before}></View>
        <View style={Styles.after}></View>
        <View style={Styles.areaCartao}>
          <View style={Styles.header}>
            <View style={Styles.saldo}>
              <Text style={Theme.light.txtH3RegularWhiteOpaco}>
                {bancoNome}
              </Text>
              <Text style={Theme.light.txtH1White}>
                {isMostrando
                  ? new String(saldo)
                  : new String(saldo)
                      .split("")
                      .map((c) => "•")
                      .join("")}
              </Text>
            </View>
            <Image
              style={Styles.tinyLogo}
              source={
                bandeira == 0
                  ? require("../../assets/images/master-logo.png")
                  : require("../../assets/images/master-logo.png")
              }
            ></Image>
          </View>
          <View style={Styles.footer}>
            <Text style={Theme.light.txtH3RegularWhite}>
              {isMostrando
                ? numero
                : numero
                    .split("")
                    .map((c, idx) => {
                      if (idx > 13) {
                        return c;
                      }
                      return "•";
                    })
                    .join("")}
            </Text>
            <Text style={Theme.light.txtH3RegularWhite}>{dataExp}</Text>
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={rotateElement}>
      <Animated.View style={{ transform: [{ rotateY: rotation }] }}>
        {virado ? (
          <LinearGradient
            style={[Styles.card, Styles.cardVirado]}
            colors={["#9C2CF3", "#3A49F9"]}
          >
            <View style={Styles.before}></View>
            <View style={Styles.after}></View>
            <Text style={[Theme.light.txtH1White, { textAlign: "center" }]}>
              Data de vencimento {"\n"} {diaVencimento}
            </Text>
          </LinearGradient>
        ) : (
          <Cartao />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CardsComponent;
