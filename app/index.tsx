import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  Button,
  Keyboard,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "@constants/Colors";
import { Theme } from "@constants/Theme";
import { useCustomFonts } from "@hooks/useFonts";
import { StatusBar } from "expo-status-bar";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import HeaderComponent from "@components/HeaderComponent";
import CardsComponent from "@components/CardsComponent";
import { useMostrarDadosSeguros } from "@hooks/useMostrarDadosSeguros";
import { getIcon } from "../utils/IconUtils";
import { buscarTodasAsContas } from "@services/ContaService";
import { isMostrando } from "@contexts/useContextDadosSeguros";

export default function Home() {
  const { isVisivel, setVisivel } = useState(false);
  const fontsLoaded = useCustomFonts();
  const { isMostrando, toggleMostrando } = useMostrarDadosSeguros();

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={Colors.light.whiteText} />;
  }

  const handleAddCartao = () => {};

  const AddCartao = () => {
    return (
      <TouchableOpacity
        style={styles.addCartao}
        activeOpacity={0.8}
        onPress={handleAddCartao}
      >
        <FontAwesome6 name="plus" size={30} color={Colors.light.whiteText} />
      </TouchableOpacity>
    );
  };

  const handleShowCredito = () => {
    Keyboard.dismiss;
    toggleMostrando();
  };

  const TextoSeguro = ({ styleComponent, children }) => {
    return (
      <View style={styles.areaTextoSeguro}>
        <Text style={styleComponent}>
          {isMostrando
            ? children
            : children
                .split("")
                .map((c) => "•")
                .join("")}
        </Text>
        <TouchableWithoutFeedback
          onPress={handleShowCredito}
          accessible={false}
        >
          {isMostrando ? (
            <View>
              <FontAwesome6
                name="eye"
                size={18}
                color={Colors.light.whiteText}
              />
            </View>
          ) : (
            <View>
              <FontAwesome6
                name="eye-slash"
                size={18}
                color={Colors.light.whiteText}
              />
            </View>
          )}
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const getRegistroCor = (dia: number) => {
    if (new Date().getDate() > dia) {
      return "#F94449";
    } else if (new Date().getDate() < dia - 2) {
      return "#6BD14F";
    } else {
      return "#FFD700";
    }
  };

  const RegistroConta = ({ nomeConta, diaVencimento, icon }) => {
    return (
      <View
        style={[
          styles.registroConta,
          { backgroundColor: getRegistroCor(diaVencimento) },
        ]}
      >
        {/* <Image style={styles.iconItemConta} source={icon}></Image> */}
        <View
          style={{
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome6 name={icon} size={25} color="#FFF" />
        </View>
        <View
          style={{
            width: 2,
            height: 50,
            backgroundColor: Colors.light.whiteText,
            marginHorizontal: 3,
          }}
        ></View>
        <View style={styles.areaInfoConta}>
          <Text style={Theme.light.txtH1White}>{nomeConta}</Text>
          <Text
            style={[
              Theme.light.txtH3RegularWhiteOpaco70pct,
              // { textAlign: "center" },
            ]}
          >
            Dia do vencimento: {diaVencimento}
          </Text>
        </View>
      </View>
    );
    <View style={styles.registroConta}>
      <Image
        style={styles.iconItemConta}
        source={require("../assets/images/master-logo.png")}
      ></Image>
      <View
        style={{
          width: 2,
          height: 50,
          backgroundColor: Colors.light.whiteText,
          marginHorizontal: 3,
        }}
      ></View>
      <View style={styles.areaInfoConta}>
        <Text style={Theme.light.txtH1White}>Luz</Text>
        <Text
          style={[
            Theme.light.txtH3RegularWhiteOpaco70pct,
            { textAlign: "center" },
          ]}
        >
          Dia do vencimento: 10
        </Text>
      </View>
    </View>;
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
      <View style={styles.contas}>
        <FlatList
          data={buscarTodasAsContas()}
          bounces={false}
          // ListEmptyComponent={<EmptyComponent />}
          ItemSeparatorComponent={<View style={{ height: 0 }} />}
          overScrollMode="never"
          renderItem={({ item }) => (
            <RegistroConta
              nomeConta={item.nomeConta}
              diaVencimento={item.diaVencimento}
              icon={getIcon(item.icon)}
            />
          )}
          keyExtrator={(item) => item.id}
          style={styles.listaContas}
        ></FlatList>
        <View
          style={{
            marginVertical: 10,
            height: 40,
          }}
        >
          <Button onPress={() => {}} title="Adicionar Conta" color="#841584" />
        </View>
      </View>
      <Modal
        animationType="fade" // Pode ser "slide", "fade" ou "none"
        transparent={true} // Deixa o fundo do modal transparente
        visible={isVisivel}
        onRequestClose={() => setVisivel(false)} // Para fechar no iOS ao apertar "Voltar"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Este é um Modal!</Text>

            {/* Botão para fechar o modal */}
            <TouchableOpacity
              onPress={() => setVisivel(false)}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: "center",
    paddingHorizontal: Theme.light.padding38,
    // backgroundColor: "yellow",
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
  listaContas: {
    paddingVertical: 10,
  },
  iconItemConta: {
    height: 50,
    width: 50,
    marginHorizontal: 10,
  },
  registroConta: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  areaInfoConta: {
    textAlign: "center",
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
