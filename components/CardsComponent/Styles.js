import { StyleSheet } from "react-native";
import { Colors } from "@constants/Colors";
import { Theme } from "@constants/Theme";

const Styles = StyleSheet.create({
  card: {
    height: 184,
    width: 315,
    borderRadius: 15,
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
    color: "#9C2CF3",
    fontFamily: "LeagueSpartan-Regular",
    fontSize: 18,
    lineHeight: 16,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 160,
    paddingVertical: Theme.light.padding38,
    marginHorizontal: Theme.light.padding38,
    backgroundColor: "rgba(245,242,242,0.9)",
    fontFamily: "LeagueSpartan-Regular",
    fontSize: 14,
    lineHeight: 13,
  },
  emptyIcon: {
    height: 75,
    width: 75,
    // backgroundColor: "rgba(231,231,231,0.9)",
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
  cardVirado: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Styles;
