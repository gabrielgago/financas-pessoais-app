// @ts-nocheck

import {
    ActivityIndicator,
    Button,
    FlatList,
    Keyboard,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import React, {useCallback, useState} from "react";
import {Colors} from "@constants/Colors";
import {Theme} from "@constants/Theme";
import {useCustomFonts} from "@hooks/useFonts";
import {useDatabase} from "@hooks/useDatabase";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import HeaderComponent from "@components/HeaderComponent";
import {useMostrarDadosSeguros} from "@hooks/useMostrarDadosSeguros";
import {getIcon} from "../utils/IconUtils";
import {buscarTodasAsContas} from "@services/ContaService";
import Cartao from "@types/Cartao";
import CardsComponent from "@components/CardsComponent";
import {Picker} from '@react-native-picker/picker';
import ColorPicker from "@components/ColorPicker";

const LabeledTextInput = React.memo(
    ({
         label,
         placeholder,
         onChange,
         value,
         type = "default",
         textContentType = "none",
         children
     }: {
        label: string,
        placeholder: string,
        onChange: (v: string) => void,
        value: string,
        type: string,
        textContentType: string,
        children?: React.ReactNode,
    }) => {
        // Use useCallback para memoizar a função onChange
        const handleChange = useCallback(
            (v: string) => {
                onChange(v);
            },
            [onChange]
        );

        return (
            <View style={{gap: 5, marginVertical: 5}}>
                <Text style={styles.modalText}>{label}</Text>
                <View>
                    {children && (<View style={{top: 17.5, zIndex: 1, position: 'absolute', left: 10}}>
                        {children}
                    </View>)}
                    <TextInput
                        placeholder={placeholder}
                        onChangeText={handleChange}
                        value={value}
                        style={styles.inputTxt}
                        cursorColor="#FFFFFF"
                        keyboardType={type}
                        textContentType={textContentType}
                        placeholderTextColor="#7B6F72"
                    />
                </View>
            </View>
        );
    },
    // Comparador personalizado para evitar re-renderizações desnecessárias
    (prevProps: any, nextProps: any) => {
        return prevProps.value === nextProps.value;
    }
);

export default function Home() {
    const [isVisivel, setVisivel] = useState(false);
    //hooks
    const fontsLoaded = useCustomFonts();
    const {cartoes, addCartao} = useDatabase();
    const {isMostrando, toggleMostrando} = useMostrarDadosSeguros();
    //dados cartao
    const [banco, setBanco] = useState();
    const [saldo, setSaldo] = useState();
    const [bandeira, setBandeira] = useState();
    const [numero, setNumero] = useState();
    const [dataExp, setDataExp] = useState();
    const [diaVencimento, setDiaVencimento] = useState();
    const [bandeiraSelecionada, setBandeiraSelecionada] = useState();

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={Colors.light.whiteText}/>;
    }

    const handleAddCartao = () => {
        setVisivel(true);
    };

    const AddCartao = () => {
        return (
            <TouchableOpacity
                style={styles.addCartao}
                activeOpacity={0.8}
                onPress={handleAddCartao}
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
        return (
            <View style={styles.areaTextoSeguro}>
                <Text style={styleComponent}>
                    {isMostrando
                        ? children
                        : children
                            .split("")
                            .map((c: any): string => "•")
                            .join("")}
                </Text>
                <TouchableWithoutFeedback
                    onPress={handleShowCredito}
                    accessible={false}
                >
                    {isMostrando ? (
                        <View>
                            <FontAwesome6
                                name="eye"
                                size={18}
                                color={Colors.light.whiteText}
                            />
                        </View>
                    ) : (
                        <View>
                            <FontAwesome6
                                name="eye-slash"
                                size={18}
                                color={Colors.light.whiteText}
                            />
                        </View>
                    )}
                </TouchableWithoutFeedback>
            </View>
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

    const RegistroConta = ({nomeConta, diaVencimento, icon}: {
        nomeConta: string,
        diaVencimento: number,
        icon: string
    }): React.ReactElement => {
        return (
            <View
                style={[
                    styles.registroConta,
                    {backgroundColor: 'rgba(129,126,126,0.97)', elevation: 5, borderRadius: 14}
                    // {backgroundColor: getRegistroCor(diaVencimento)},
                ]}
            >
                <View
                    style={{
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <FontAwesome6 name={icon} size={25} color="#FFF"/>
                </View>
                <View
                    style={{
                        width: 2,
                        height: 80,
                        backgroundColor: Colors.light.whiteText,
                        marginHorizontal: 3,
                    }}
                ></View>
                <View style={styles.areaInfoConta}>
                    <Text style={Theme.light.txtH1White}>{nomeConta}</Text>
                    <Text
                        style={[
                            Theme.light.txtH3RegularWhiteOpaco70pct,
                            // { textAlign: "center" },
                        ]}
                    >
                        Dia do vencimento: {diaVencimento}
                    </Text>
                </View>
            </View>
        );
        // <View style={styles.registroConta}>
        //     <Image
        //         style={styles.iconItemConta}
        //         source={require("../assets/images/master-logo.png")}
        //     ></Image>
        //     <View
        //         style={{
        //             width: 2,
        //             height: 50,
        //             backgroundColor: Colors.light.whiteText,
        //             marginHorizontal: 3,
        //         }}
        //     ></View>
        //     <View style={styles.areaInfoConta}>
        //         <Text style={Theme.light.txtH1White}>Luz</Text>
        //         <Text
        //             style={[
        //                 Theme.light.txtH3RegularWhiteOpaco70pct,
        //                 {textAlign: "center"},
        //             ]}
        //         >
        //             Dia do vencimento: 10
        //         </Text>
        //     </View>
        // </View>;
    };

    return (
        <View style={styles.container}>
            <HeaderComponent props={{}}/>
            <View style={styles.cards}>
                <View style={styles.headerAreaCardComponent}>
                    <AddCartao/>
                    <Text style={{...Theme.light.txtH1White, color: "#9C2CF3", textAlign: "left"}}>
                        Crédito Total{"\n"}
                        <TextoSeguro styleComponent={Theme.light.txtH2White}>
                            R$ 25.512,34
                        </TextoSeguro>
                    </Text>
                </View>
                <CardsComponent cartoes={cartoes}></CardsComponent>
            </View>
            <View style={styles.contas}>
                <FlatList
                    data={buscarTodasAsContas()}
                    bounces={false}
                    // ListEmptyComponent={<EmptyComponent />}
                    ItemSeparatorComponent={() => <View style={{height: 0}}/>}
                    overScrollMode="never"
                    renderItem={({item}) => (
                        <RegistroConta
                            nomeConta={item.nomeConta}
                            diaVencimento={item.diaVencimento}
                            icon={getIcon(item.icon)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    style={styles.listaContas}
                ></FlatList>
                <View
                    style={{
                        marginVertical: 10,
                        height: 40,
                    }}
                >
                    <Button onPress={() => {
                    }} title="Adicionar Conta" color="#841584"/>
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisivel}
                onRequestClose={() => {
                    setVisivel(false)
                }}
            >
                    <View style={styles.modalBackground}>
                        <ScrollView style={styles.modalContainer}>
                            <TouchableOpacity activeOpacity={.7} onPress={() => setVisivel(false)} style={{alignSelf: 'flex-end'}}>
                                <FontAwesome6 name="xmark" size={20} color={'#696969'}/>
                            </TouchableOpacity>
                            <LabeledTextInput
                                label="Banco"
                                placeholder="Banco"
                                onChange={setBanco}
                                value={banco}
                            >
                                <FontAwesome6 name='piggy-bank' size={16} color={'#696969'}/>
                            </LabeledTextInput>
                            <LabeledTextInput
                                label="Saldo"
                                placeholder="Saldo"
                                onChange={(v) => setSaldo(v)}
                                value={saldo}
                                type="decimal-pad"
                            >
                                <FontAwesome6 name="dollar-sign" size={16} color={'#696969'}/>
                            </LabeledTextInput>
                            <View style={{gap: 5, marginVertical: 5, justifyContent: 'center'}}>
                                <Text style={styles.modalText}>Bandeira</Text>
                                <View style={{borderRadius: 15, backgroundColor: '#000000', overflow: 'hidden'}}>
                                    <Picker
                                        selectedValue={bandeiraSelecionada}
                                        style={[styles.pickerStyle, {}]}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setBandeiraSelecionada(itemValue)
                                        }>
                                        <Picker.Item label="Mastercard" value="0"/>
                                        <Picker.Item label="Visa" value="1"/>
                                        <Picker.Item label="Elo" value="2"/>
                                    </Picker>
                                </View>
                            </View>
                            {/*<LabeledTextInput*/}
                            {/*    label="Bandeira"*/}
                            {/*    placeholder="Bandeira"*/}
                            {/*    onChange={setBandeira}*/}
                            {/*    value={bandeira}*/}
                            {/*/>*/}
                            <LabeledTextInput
                                label="Numero"
                                placeholder="Numero"
                                onChange={setNumero}
                                value={numero}
                                type="numeric"
                            >
                                <FontAwesome6 name="credit-card" size={16} color={'#696969'}/>
                            </LabeledTextInput>
                            <LabeledTextInput
                                label="Data de Expedição"
                                placeholder="Data de expedição"
                                onChange={setDataExp}
                                value={dataExp}
                            >
                                <FontAwesome6 name="calendar" size={16} color={'#696969'}/>
                            </LabeledTextInput>
                            <LabeledTextInput
                                label="Dia do vencimento"
                                placeholder="Dia vencimento"
                                onChange={setDiaVencimento}
                                value={diaVencimento}
                                type="decimal-pad"
                            >
                                <FontAwesome6 name="sun" size={16} color={'#696969'}/>
                            </LabeledTextInput>
                            <View style={{gap: 5, marginVertical: 5}}>
                                <Text style={styles.modalText}>Cor do cartão</Text>
                                {/*<ColorPicker colors={[{color : "#FD6300", selectedColor : "#9C2CF3"}]}/>*/}
                                {/*<ColorPicker colors={[{color : "#EE012B", selectedColor : "#9C2CF3"}]}/>*/}
                                {/*<ColorPicker colors={[{color : "#185A97", selectedColor : "#9C2CF3"}]}/>*/}
                                <ColorPicker
                                    colors={[
                                        {color: "#FFF", selectedColor: "#9C2CF3"},
                                        {color: "#9C2CF3", selectedColor: "#FFF"},
                                        {color: "#185A97", selectedColor: "#9C2CF3"},
                                        {color: "#EE012B", selectedColor: "#9C2CF3"},
                                        {color: "#FD6300", selectedColor: "#9C2CF3"}
                                    ]}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={async () => {
                                    Keyboard.dismiss();

                                    const novoCartao: Cartao = {
                                        nomeBanco: banco,
                                        saldo: saldo,
                                        bandeira: bandeiraSelecionada,
                                        numero: numero,
                                        dataExpedicao: new Date(dataExp),
                                        diaVencimento: diaVencimento,
                                    };

                                    console.log("###### Inserindo cartao...");
                                    await addCartao(novoCartao);
                                    setVisivel(false);
                                }}
                                style={styles.closeButton}
                            >
                                <Text style={styles.buttonText}>Salvar Cartão</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
            </Modal>
        </View>
    )
        ;
}

const styles = StyleSheet.create<any>({
    container: {
        flex: 1,
        backgroundColor: Colors.light.mainGreen,
        paddingTop: Theme.light.padding38,
    },
    cards: {
        paddingVertical: Theme.light.padding38,
        paddingLeft: Theme.light.padding38,
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: "center",
        paddingHorizontal: Theme.light.padding38,
        // backgroundColor: "yellow",
    },
    headerAreaCardComponent: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: Theme.light.padding38,
        paddingVertical: 20,
        paddingRight: Theme.light.padding38,
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
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
    },
    modalContainer: {
        width: 300,
        maxHeight: 700,
        // flexGrow: 1,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
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
    pickerStyle: {
        backgroundColor: "#F7F8F8",
        borderRadius: 15,
        paddingLeft: 40,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: '#7B6F72',
    },
    // height: 10,
    closeButton: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        marginTop: 30
    },
    buttonText: {
        fontFamily: "LeagueSpartan-Regular",
        fontSize: 18,
        color: "#696969",
    },
});
