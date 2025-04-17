import {Animated, FlatList, Image, ImageSourcePropType, Text, TouchableOpacity, View,} from "react-native";
import {useRef, useState} from "react";
import Styles from "./Styles";
import {LinearGradient} from "expo-linear-gradient";
import {Theme} from "@constants/Theme";
// @ts-ignore
import {CartaoDB} from "@types/Cartao";
import {useMostrarDadosSeguros} from "@context/DadosSensiveisContext";

const CardsComponent = ({cartoes, callbackDeleteCartao}: {
    cartoes: CartaoDB[],
    callbackDeleteCartao: (id: number) => void
}) => {
    const {isMostrando} = useMostrarDadosSeguros();
    return (
        <FlatList
            contentContainerStyle={{paddingLeft: 38, paddingEnd: 5, paddingVertical: 5}}
            horizontal={true}
            data={cartoes}
            keyExtractor={(item: CartaoDB): string => String(item.id)}
            renderItem={({item}: { item: CartaoDB }) => <Card item={item} isMostrando={isMostrando}
                                                              callbackDeleteCartao={callbackDeleteCartao}/>}
            bounces={false}
            ItemSeparatorComponent={() => <View style={{width: 20}}/>}
            overScrollMode="never"
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
        ></FlatList>
    );
};

export const Card = ({item, isMostrando, callbackDeleteCartao}: {
    item: CartaoDB,
    isMostrando: boolean,
    callbackDeleteCartao: (id: number) => void
}) => {
    console.log("Cor: " + item.cor_selecionada);

    const {nome_banco, saldo, bandeira, numero, data_expedicao, dia_vencimento, cor_selecionada} = item;
    const [virado, setVirado] = useState(false);

    const rotateAnim = useRef(new Animated.Value(0)).current;

    const rotateElement = () => {
        rotateAnim.setValue(0);
        Animated.timing(rotateAnim, {
            toValue: 1, // Girar 360°
            duration: 500, // Tempo da animação (1 segundo)
            useNativeDriver: true, // Usa a renderização nativa para melhor desempenho
        }).start(() => setVirado(!virado)); // Reseta o valor após a animação
    };

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"], // Define a rotação completa
    });

    const resolveBandeira = (bandeira: number): ImageSourcePropType => {
        if (bandeira === 0) return require("../../assets/images/master_logo.png")
        if (bandeira === 1) return require("../../assets/images/visa_logo.png")
        if (bandeira === 2) return require("../../assets/images/elo_logo.png")
        return require("../../assets/images/default_logo.png"); // Default case
    }

    const Cartao = () => {
        return (
            <LinearGradient style={Styles.card} colors={[cor_selecionada || "#9C2CF3", cor_selecionada || "#3A49F9"]}>
                <View style={Styles.before}></View>
                <View style={Styles.after}></View>
                <View style={Styles.areaCartao}>
                    <View style={Styles.header}>
                        <View style={Styles.saldo}>
                            <Text style={Theme.light.txtH3RegularWhiteOpaco}>
                                {nome_banco}
                            </Text>
                            <Text style={{...Theme.light.txtH1White, textAlign: "left"}}>
                                {isMostrando
                                    ? saldo.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })
                                    : saldo.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    }).split("")
                                        .map((c) => "•")
                                        .join("")}
                            </Text>
                        </View>
                        <Image
                            style={Styles.tinyLogo}
                            source={resolveBandeira(bandeira)}
                            resizeMode="contain"
                        ></Image>
                    </View>
                    <View style={Styles.footer}>
                        <Text style={Theme.light.txtH3RegularWhite}>
                            {isMostrando
                                ? numero
                                : numero
                                    .split("")
                                    .map((c, idx) => {
                                        if (idx > 13) {
                                            return c;
                                        }
                                        return "•";
                                    })
                                    .join("")}
                        </Text>
                        <Text
                            style={Theme.light.txtH3RegularWhite}>{new Date(data_expedicao).getMonth().toString().padStart(2, '0') + "/" + new Date(data_expedicao).getFullYear()}</Text>
                    </View>
                </View>
            </LinearGradient>
        );
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={rotateElement}
                          onLongPress={() => callbackDeleteCartao(item?.id || 0)}>
            <Animated.View style={{transform: [{rotateY: rotation}]}}>
                {virado ? (
                    <LinearGradient
                        style={[Styles.card, Styles.cardVirado]}
                        colors={[cor_selecionada || "#9C2CF3", "#3A49F9"]}
                    >
                        <View style={Styles.before}></View>
                        <View style={Styles.after}></View>
                        <Text style={{...Theme.light.txtH1White, textAlign: "center"}}>
                            Data de vencimento {"\n"} {dia_vencimento}
                        </Text>
                    </LinearGradient>
                ) : (
                    <Cartao/>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

export default CardsComponent;