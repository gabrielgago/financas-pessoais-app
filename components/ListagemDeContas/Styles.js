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
    // paddingVertical: 8,
    // height: 350
    // marginVertical: 8
  },
  itemAndroid: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
  },
  itemIOS: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,

    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.07, // Opacidade da sombra
    shadowRadius: 2, // Tamanho do raio de desfoque
    // elevation: 1, // Ainda funciona no Android para sombras
  }
});

export default Styles;
