import { StyleSheet } from "react-native";
import { Colors } from "@constants/Colors";
import { Theme } from "@constants/Theme";

const Styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  highlighted: {
    backgroundColor: '#9C2CF3',
    transform: [{ scale: 2.05 }],
  },
  listaContas: {
    paddingVertical: 8,
    // height: 350
    // marginVertical: 8
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    // marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  }
});

export default Styles;
