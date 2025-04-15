import {StyleSheet} from "react-native";
import {Theme} from "@constants/Theme";

const Styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    subtitle: {
        fontSize: 14,
        color: '#070707',
        marginTop: 4,
    },
    highlighted: {
        backgroundColor: '#9C2CF3',
        transform: [{scale: 2.05}],
    },
    listaContas: {
        paddingHorizontal: Theme.light.padding38,
        paddingBottom: 15
        // paddingVertical: 8,
        // height: 350
        // marginVertical: 8
    },
    itemAndroid: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#9C2CF3",
        marginHorizontal: 5,
        marginVertical: 8,
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        height: 80,
    },
    itemIOS: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#9C2CF3",
        marginHorizontal: 5,
        marginVertical: 8,
        borderRadius: 16,
        padding: 16,
        height: 80,

        shadowColor: '#696969', // Cor da sombra
        shadowOffset: {width: 0, height: 2}, // Deslocamento da sombra
        shadowOpacity: 0.1, // Opacidade da sombra
        shadowRadius: 10, // Tamanho do raio de desfoque
        elevation: 2, // Ainda funciona no Android para sombras
    },
    rowBack: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 15,
        height: 80
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Styles;
