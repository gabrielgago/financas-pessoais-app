import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        maxHeight: 150,
        minHeight: 10,
        // backgroundColor: "#696969",
    },
    display: {
        flexGrow: 1,
        flexShrink: 1,
        padding: 0,
        margin: 0
    },
    areaColor: {
        flex: 1,
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap",
        marginBottom: 30,
    },
    clicado: {
        elevation: 2,
        borderColor: 'red'
    }
});