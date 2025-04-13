// @ts-nocheck

import {ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Colors} from "@constants/Colors";
import {Theme} from "@constants/Theme";
import {useCustomFonts} from "@hooks/useFonts";
import {useDatabase} from "@hooks/useDatabase";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import HeaderComponent from "@components/HeaderComponent";
import {useMostrarDadosSeguros} from "@hooks/useMostrarDadosSeguros";
import CardsComponent from "@components/CardsComponent";
import ListagemDeContas from "@components/ListagemDeContas";
import Styles from "@components/CardsComponent/Styles";
import FormCadastroCartoesModalComponent from "@components/FormCadastroCartoesModalComponent";
import * as Notifications from "expo-notifications";

export default function Home() {

    const [isVisivel, setVisivel] = useState(false);
    //hooks
    const fontsLoaded = useCustomFonts();
    const {cartoes, addCartao, saldoCreditoTotal} = useDatabase();
    const {isMostrando, toggleMostrando} = useMostrarDadosSeguros();

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={Colors.light.whiteText}/>;
    }

    useEffect(() => {
        const cartoesEncontrados = cartoes.includes(cards => cards.diaVencimento === new Date().getDate());
        console.log(cartoesEncontrados);
        if (cartoesEncontrados) {
            console.log(cartoesEncontrados);
            (async () => {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "🚀 Fique atento!",
                        body: "Alguns cartões estão vencendo hoje.",
                    },
                    trigger: {seconds: 2}, // dispara imediatamente
                })
            })();
        }
    }, []);

    const AddCartao = () => {
        return (
            <TouchableOpacity
                style={styles.addCartao}
                activeOpacity={0.8}
                onPress={() => setVisivel(true)}
            >
                <FontAwesome6 name="plus" size={30} color={Colors.light.whiteText}/>
            </TouchableOpacity>
        );
    };

    const handleShowCredito = () => {
        toggleMostrando();
    };

    // @ts-ignore
    const TextoSeguro = ({styleComponent, children}) => {
        return (<>
                <View style={styles.areaTextoSeguro}>
                    <Text style={styleComponent}>
                        {isMostrando
                            ? children
                            : children
                                .split("")
                                .map((c: any): string => "•")
                                .join("")}
                    </Text>
                </View>
                <Pressable
                    onPress={handleShowCredito}
                    style={({pressed}) => [
                        {
                            opacity: pressed ? 0.5 : 1,
                        },
                    ]}
                >
                    <FontAwesome6
                        name={isMostrando ? "eye" : "eye-slash"}
                        size={18}
                        color="#9C2CF3"
                        style={{marginTop: 5, marginLeft: 5}}
                    />
                </Pressable>
            </>
        );
    };

    const getRegistroCor = (dia: number) => {
        if (new Date().getDate() > dia) {
            return "#F94449";
        } else if (new Date().getDate() < dia - 2) {
            return "#6BD14F";
        } else {
            return "#FFD700";
        }
    };

    const handleAddCartao = (cartao: Cartao) => {
        (async () => {
            await addCartao(cartao);
        })();
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent props={{}}/>
            <View style={styles.cards}>
                <View style={styles.headerAreaCardComponent}>
                    <AddCartao/>
                    <Text style={{...Theme.light.txtH1White, color: "#9C2CF3", textAlign: "left"}}>
                        Crédito Total{"\n"}
                        <TextoSeguro styleComponent={{...Theme.light.txtH2White, color: "#9C2CF3"}}>
                            {Intl.NumberFormat("pt-BR", {currency: "BRL", style: "currency"}).format(saldoCreditoTotal)}
                        </TextoSeguro>
                    </Text>
                </View>
                {cartoes.length === 0 ? (
                    <View style={Styles.emptyContainer}>
                        <View style={Styles.emptyIcon}>
                            <FontAwesome6
                                name="sad-tear"
                                size={50}
                                color={"#9C2CF3"}
                            />
                        </View>
                        <Text style={Styles.txtEmptyList} ellipsizeMode={'tail'}>
                            Ainda não existem cartões cadastrados...
                        </Text>
                    </View>
                ) : <CardsComponent cartoes={cartoes}></CardsComponent>}
            </View>
            <View style={styles.contas}>
                <View style={styles.headerListagemContas}>
                    <Text style={styles.seeOther}>Veja outras contas</Text>
                    <TouchableOpacity><Text style={styles.addConta}>Adicionar Conta</Text></TouchableOpacity>
                </View>
                <ListagemDeContas
                    itemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#9C2CF3'}}/>}/>
            </View>
            <FormCadastroCartoesModalComponent isVisivel={isVisivel} setVisivel={setVisivel}
                                               addCartao={(cartao) => handleAddCartao(cartao)}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create<any>({
        container: {
            flex: 1,
            backgroundColor: Colors.light.primaryBackgroundColor,
            paddingTop: Theme.light.padding38,
        },
        cards: {
            paddingVertical: Theme.light.padding38,
            // paddingLeft: Theme.light.padding38,
        },
        addCartao: {
            height: 50,
            width: 50,
            backgroundColor: "#9C2CF3",
            borderRadius: 10,
            // marginVertical: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        contas: {
            // backgroundColor: Colors.light.whiteText,
            flex: 1,
            // height: 350,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            justifyContent: "center",
            paddingHorizontal: Theme.light.padding38,
            // marginBottom: 10,
            // backgroundColor: "yellow",
        },
        headerAreaCardComponent: {
            flexDirection: "row",
            alignItems: "flex-end",
            gap: Theme.light.padding38,
            paddingVertical: 20,
            paddingRight: Theme.light.padding38,
            paddingLeft: Theme.light.padding38,
        },
        areaTextoSeguro: {
            flexDirection: "row",
            gap: 5,
        },
        listaContas: {
            paddingVertical: 10,
        },
        iconItemConta: {
            height: 50,
            width: 50,
            marginHorizontal: 10,
        },
        registroConta: {
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            padding: 10,
            marginBottom: 15,
        },
        areaInfoConta: {
            textAlign: "center",
            marginLeft: 10,
        },
        headerListagemContas: {
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: Theme.light.padding38,
            paddingVertical: 20,
            paddingHorizontal: 5
            // paddingRight: Theme.light.padding38,
        },
        seeOther: {
            color: "#9C2CF3",
            ...Theme.light.txtH1White,
            color: "#9C2CF3",
            textAlign: "left"
        },
        addConta: {
            // color: "#9C2CF3",
        }
    })
;
