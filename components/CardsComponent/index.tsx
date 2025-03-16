import { View, Text, FlatList, Image } from "react-native";
import Styles from "./Styles";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "@constants/Colors";
import { Theme } from "@constants/Theme";

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
      data={[0]}
      keyExtrator={1}
      renderItem={({ item }) => <Card />}
      bounces={false}
      ListEmptyComponent={<EmptyComponent />}
    ></FlatList>
  );
};

export const Card = ({ bancoNome, saldo, bandeira, numero, dataExp }) => {
  return (
    <View>
      <LinearGradient style={Styles.card} colors={["#9C2CF3", "#3A49F9"]}>
        <View style={Styles.before}></View>
        <View style={Styles.after}></View>
        <View style={Styles.areaCartao}>
          <View style={Styles.header}>
            <View style={Styles.saldo}>
              <Text style={Theme.light.txtH3RegularWhiteOpaco}>Saldo</Text>
              <Text style={Theme.light.txtH1White}>R$5.345,33</Text>
            </View>
            <Image
              style={Styles.tinyLogo}
              source={require("../../assets/images/master-logo.png")}
            ></Image>
          </View>
          <View style={Styles.footer}>
            <Text style={Theme.light.txtH3RegularWhite}>
              2345 2345 2345 2354
            </Text>
            <Text style={Theme.light.txtH3RegularWhite}>09/25</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default CardsComponent;
