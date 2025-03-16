import { StyleSheet } from "react-native";
import { Colors } from "@constants/Colors";
import { Theme } from "@constants/Theme";

const Styles = StyleSheet.create({
  card: {
    height: 184,
    width: 315,
    borderRadius: 30,
    overflow: "hidden",
  },
  before: {
    position: "absolute",
    height: 320,
    width: 321,
    left: 100,
    bottom: 80,
    backgroundColor: "#000000",
    borderRadius: 200,
    opacity: 0.2,
    transform: [{ rotateX: "-28deg" }, { rotateY: "-5deg" }],
  },
  after: {
    position: "absolute",
    height: 320,
    width: 321,
    right: 100,
    top: 90,
    backgroundColor: "#000000",
    borderRadius: 200,
    opacity: 0.2,
    transform: [{ rotateX: "-28deg" }, { rotateY: "-5deg" }],
  },
  txtEmptyList: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.whiteText,
  },
  emptyContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 160,
    paddingVertical: Theme.light.padding38,
  },
  emptyIcon: {
    height: 75,
    width: 75,
    backgroundColor: "rgba(255,255,255,.5)",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  header: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Theme.light.padding38,
    paddingTop: 26,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Theme.light.padding38,
  },
  areaCartao: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 26,
  },
  saldo: {
    gap: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default Styles;
