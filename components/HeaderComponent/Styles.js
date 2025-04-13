import { StyleSheet } from "react-native";
import { Colors } from "@constants/Colors";
import { Theme } from "@constants/Theme";

const Styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingHorizontal: Theme.light.padding38,
    paddingTop: 10,
  },
  bemVindo: {
    flex: 1,
    height: 35,
  },
  notificacoes: {
    backgroundColor: Colors.light.blackText,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBemVindo: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    lineHeight: 22,
    textAlign: "left",
    color: Colors.light.blackText,
  },
  txtSaldacao: {
    fontFamily: "LeagueSpartan-Regular",
    fontSize: 14,
    lineHeight: 13,
    color: Colors.light.blackText,
  },
});

export default Styles;
