import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
    },
    modalContainer: {
        width: 300,
        flexGrow: 1,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20
    },
    modalText: {
        fontFamily: "LeagueSpartan-Regular",
        fontSize: 18,
        color: "#696969",
    },
    inputTxt: {
        backgroundColor: "#F7F8F8",
        borderRadius: 15,
        paddingLeft: 40,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: '#7B6F72',
        height: 55,
    },
    pickerStyleAndroid: {
        backgroundColor: "#F7F8F8",
        borderRadius: 15,
        paddingLeft: 40,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: '#7B6F72',
    },
    pickerStyleIOS: {
        backgroundColor: "#F7F8F8",
        fontFamily: "Poppins-Regular",
    },
    closeButton: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginTop: 8,
    },
    buttonText: {
        fontFamily: "LeagueSpartan-Regular",
        fontSize: 18,
        color: "#696969",
    },
})

export default styles;