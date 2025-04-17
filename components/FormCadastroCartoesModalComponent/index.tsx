import {
    Alert,
    Keyboard,
    KeyboardTypeOptions,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TextInputIOSProps,
    TouchableOpacity,
    View
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {Picker} from "@react-native-picker/picker";
import ColorPicker from "@components/ColorPicker";
// @ts-ignore
import Cartao from "@types/Cartao";
import React, {useCallback, useState} from "react";
import Styles from "./Styles";
import DateTimePicker from "react-native-modal-datetime-picker";
import {TextInputMask} from "react-native-masked-text";

const LabeledTextInput = React.memo(
    ({
         label,
         placeholder,
         onChange,
         value,
         type = "default",
         textContentType = "none",
         children,
         maxLength,
     }: {
        label: string,
        placeholder: string,
        onChange: (v: string) => void,
        value: string,
        type?: KeyboardTypeOptions,
        textContentType?: TextInputIOSProps['textContentType'],
        children?: React.ReactNode,
        maxLength?: number,
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
                <Text style={Styles.modalText}>{label}</Text>
                <View>
                    {children && (<View style={{top: 17.5, zIndex: 1, position: 'absolute', left: 10}}>
                        {children}
                    </View>)}
                    <TextInput
                        placeholder={placeholder}
                        onChangeText={onChange}
                        value={value}
                        style={Styles.inputTxt}
                        cursorColor="#FFFFFF"
                        keyboardType={type}
                        textContentType={textContentType}
                        placeholderTextColor="#7B6F72"
                        maxLength={maxLength}
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

export default function FormCadastroCartoesModalComponent({isVisivel, setVisivel, addCartao}: {
    isVisivel: boolean,
    setVisivel: (v: boolean) => void,
    addCartao: (v: Cartao) => void
}) {

    //dados cartao
    const [banco, setBanco] = useState("");
    const [saldo, setSaldo] = useState("");
    const [numero, setNumero] = useState("");
    const [dataExp, setDataExp] = useState("");
    const [diaVencimento, setDiaVencimento] = useState("");
    const [bandeiraSelecionada, setBandeiraSelecionada] = useState(0);
    const [isOpen, setOpen] = useState(false);
    const [corSelecionada, setCorSelecionada] = useState("");

    let saldoRef: any = null;
    let numeroRef: any = null;

    function limpaFormulario() {
        setBanco("")
        setSaldo("")
        setNumero("")
        setDiaVencimento("")
        setBandeiraSelecionada(0)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisivel}
            onRequestClose={() => {
                setVisivel(false)
            }}
        >
            <View style={Styles.modalBackground}>
                <View style={{maxHeight: 700, borderRadius: 10, overflow: "hidden"}}>
                    <ScrollView bounces={false}
                                alwaysBounceVertical={false}
                                keyboardShouldPersistTaps={'handled'}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={Styles.modalContainer}
                                automaticallyAdjustKeyboardInsets={true}
                    >
                        <TouchableOpacity activeOpacity={.7} onPress={() => {
                            limpaFormulario();
                            setVisivel(false)
                        }}
                                          style={{alignSelf: 'flex-end'}}>
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
                        <View style={{gap: 5, marginVertical: 5}}>
                            <Text style={Styles.modalText}>Saldo</Text>
                            <View>
                                <View style={{top: 17.5, zIndex: 1, position: 'absolute', left: 10}}>
                                    <FontAwesome6 name="dollar-sign" size={16} color={'#696969'}/>
                                </View>
                                <TextInputMask
                                    placeholder={"Saldo"}
                                    style={Styles.inputTxt}
                                    cursorColor="#FFFFFF"
                                    keyboardType={"decimal-pad"}
                                    textContentType={"none"}
                                    placeholderTextColor="#7B6F72"
                                    type={'money'}
                                    options={{
                                        precision: 2,
                                        separator: ',',
                                        delimiter: '.',
                                        unit: 'R$ ',
                                        suffixUnit: ''
                                    }}
                                    value={saldo}
                                    onChangeText={setSaldo}
                                    ref={ref => saldoRef = ref}
                                />
                            </View>
                        </View>
                        <View style={{gap: 5, marginVertical: 5, justifyContent: 'center'}}>
                            <Text style={Styles.modalText}>Bandeira</Text>
                            <View style={{borderRadius: 15, backgroundColor: '#000000', overflow: 'hidden'}}>
                                <Picker
                                    selectedValue={bandeiraSelecionada}
                                    style={Platform.OS === 'android' ? Styles.pickerStyleAndroid : Styles.pickerStyleIOS}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setBandeiraSelecionada(itemValue)
                                    }>
                                    <Picker.Item label="Mastercard" value="0"/>
                                    <Picker.Item label="Visa" value="1"/>
                                    <Picker.Item label="Elo" value="2"/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{gap: 5, marginVertical: 5}}>
                            <Text style={Styles.modalText}>Número</Text>
                            <View>
                                <View style={{top: 17.5, zIndex: 1, position: 'absolute', left: 10}}>
                                    <FontAwesome6 name="credit-card" size={16} color={'#696969'}/>
                                </View>
                                <TextInputMask
                                    placeholder={"Número"}
                                    style={Styles.inputTxt}
                                    cursorColor="#FFFFFF"
                                    keyboardType={"decimal-pad"}
                                    textContentType={"none"}
                                    placeholderTextColor="#7B6F72"
                                    type={'custom'}
                                    options={{
                                        mask: '9999 9999 9999 9999',
                                    }}
                                    value={numero}
                                    onChangeText={setNumero}
                                    ref={ref => numeroRef = ref}
                                />
                            </View>
                        </View>
                        <View style={{gap: 5, justifyContent: 'center'}}>
                            <Text style={Styles.modalText}>Data de expiração</Text>
                            <Pressable onPress={() => setOpen(true)}
                                       style={{
                                           flexDirection: 'row',
                                           gap: 10,
                                           justifyContent: 'flex-start',
                                           alignItems: 'center', ...Styles.inputTxt,
                                           paddingLeft: 10,
                                       }}>
                                <FontAwesome6 name="calendar" size={16} color={'#696969'}/>
                                <Text style={{
                                    fontFamily: "Poppins-Regular",
                                    fontSize: 14,
                                    color: '#7B6F72',
                                }}>{dataExp ? new Intl.DateTimeFormat("pt-BR", {
                                        calendar: "gregory",
                                        dateStyle: "short",
                                    }).format(new Date(dataExp))
                                    : "Selecione a data"}</Text>
                            </Pressable>
                        </View>
                        <DateTimePicker
                            isVisible={isOpen}
                            mode="date"
                            date={new Date()}
                            minimumDate={new Date()}
                            display="inline"
                            onConfirm={(value) => {
                                if (value) {
                                    setDataExp(value.toISOString());
                                }
                                setOpen(false);
                            }}
                            onCancel={() => {
                                setOpen(false);
                            }}
                        />
                        <LabeledTextInput
                            label="Dia do vencimento"
                            placeholder="Dia vencimento"
                            onChange={(v) => {
                                if (Number(v) > 31) {
                                    Alert.alert('Data rejeitada', 'A data ultrapassou o limite permitido pelo calendário (31). Por favor, tente novamente.', [{text: 'OK'}]);
                                    setDiaVencimento("1");
                                } else {
                                    // const data = v.padStart(2, "0");
                                    // console.log("######### data: " + data);
                                    setDiaVencimento(v);
                                }
                            }}
                            value={diaVencimento}
                            type="decimal-pad"
                            maxLength={2}
                        >
                            <FontAwesome6 name="sun" size={16} color={'#696969'}/>
                        </LabeledTextInput>
                        <View style={{gap: 5, marginVertical: 5}}>
                            <Text style={Styles.modalText}>Cor do cartão</Text>
                            <ColorPicker
                                colors={[
                                    {color: "#9C2CF3", label: "Roxo", isSelecionado: true},
                                    {color: "#185A97", label: "Azul"},
                                    {color: "#EE012B", label: "Vermelho"},
                                    {color: "#FD6300", label: "Amarelo"},
                                    {color: "#000", label: "Preto"}
                                ]}
                                callbackSetSelectedColor={cor => setCorSelecionada(cor)}
                                highlightColor = '#f6efef'
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                console.log("######### Chamou salvar cartao !!!!");

                                Keyboard.dismiss();

                                const novoCartao: Cartao = {
                                    nomeBanco: banco,
                                    saldo: saldoRef.getRawValue().toFixed(2),
                                    bandeira: bandeiraSelecionada,
                                    numero: numeroRef.getRawValue(),
                                    dataExpedicao: new Date(dataExp),
                                    diaVencimento: Number(diaVencimento),
                                    corSelecionada: corSelecionada
                                };

                                addCartao(novoCartao);
                                limpaFormulario();
                                setVisivel(false);
                            }}
                            style={Styles.closeButton}
                        >
                            <Text style={Styles.buttonText}>Salvar Cartão</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}