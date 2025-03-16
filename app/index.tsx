import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Colors } from "@constants/Colors";
import { Theme } from "@constants/Theme";
import { useCustomFonts } from "@hooks/useFonts";
import { StatusBar } from "expo-status-bar";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import HeaderComponent from "@components/HeaderComponent";
import CardsComponent from "@components/CardsComponent";
import Styles from "./../components/CardsComponent/Styles";

export default function Home() {
  const [showed, setShow] = useState(false);
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={Colors.light.whiteText} />;
  }

  const AddCartao = () => {
    return (
      <TouchableOpacity style={styles.addCartao} activeOpacity={0.8}>
        <FontAwesome6 name="plus" size={30} color={Colors.light.whiteText} />
      </TouchableOpacity>
    );
  };

  const handleShowCredito = () => {
    setShow(!showed);
  };

  const TextoSeguro = ({ styleComponent, children }) => {
    return (
      <View style={styles.areaTextoSeguro}>
        <Text style={styleComponent}>
          {showed
            ? children
            : children
                .split("")
                .map((c) => "•")
                .join("")}
        </Text>
        <TouchableWithoutFeedback onPress={handleShowCredito}>
          {showed ? (
            <FontAwesome6 name="eye" size={18} color={Colors.light.whiteText} />
          ) : (
            <FontAwesome6
              name="eye-slash"
              size={18}
              color={Colors.light.whiteText}
            />
          )}
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.cards}>
        <View style={styles.headerAreaCardComponent}>
          <AddCartao />
          <Text style={[Theme.light.txtH1White, { color: "#9C2CF3" }]}>
            Crédito Total{"\n"}
            <TextoSeguro styleComponent={Theme.light.txtH2White}>
              R$ 25.512,34
            </TextoSeguro>
          </Text>
        </View>
        <CardsComponent></CardsComponent>
      </View>
      <View style={styles.contas}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.mainGreen,
    paddingTop: Theme.light.padding38,
  },
  cards: {
    paddingVertical: Theme.light.padding38,
    paddingLeft: Theme.light.padding38,
  },
  addCartao: {
    height: 50,
    width: 50,
    backgroundColor: "#9C2CF3",
    borderRadius: 10,
    // marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contas: {
    backgroundColor: Colors.light.whiteText,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // height: "100%",
  },
  headerAreaCardComponent: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: Theme.light.padding38,
    paddingVertical: 20,
    paddingRight: Theme.light.padding38,
  },
  areaTextoSeguro: {
    flexDirection: "row",
    gap: 5,
  },
});
