import {Alert, Keyboard, Modal, Text, TouchableOpacity, View} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// @ts-ignore
import React, {useState} from "react";
import Styles from "./Styles";
import {Conta} from "@services/ContaService";
import CaptionTextInput from "@components/CaptionTextInput";

export default function FormCadastroContasModalComponent({isVisivel, setVisivel, addConta}: {
    isVisivel: boolean,
    setVisivel: (v: boolean) => void,
    addConta: (v: Conta) => void
}) {

    //dados contas
    const [conta, setConta] = useState("");
    const [diaVencimento, setDiaVencimento] = useState("");


    function limpaFormulario() {
        setConta("")
        setDiaVencimento("")
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
                <View style={{maxHeight: 300, borderRadius: 10, overflow: "hidden"}}>
                    <View style={Styles.modalContainer}>
                        <TouchableOpacity activeOpacity={.7} onPress={() => {
                            limpaFormulario();
                            setVisivel(false)
                        }}
                                          style={{alignSelf: 'flex-end'}}>
                            <FontAwesome6 name="xmark" size={20} color={'#696969'}/>
                        </TouchableOpacity>
                        <CaptionTextInput
                            label="Nome Conta"
                            placeholder="Nome da conta"
                            onChange={setConta}
                            value={conta}
                        >
                            <FontAwesome6 name='piggy-bank' size={16} color={'#696969'}/>
                        </CaptionTextInput>
                        <CaptionTextInput
                            label="Dia do vencimento"
                            placeholder="Dia vencimento"
                            onChange={(v) => {
                                if (Number(v) > 31) {
                                    Alert.alert('Data rejeitada', 'A data ultrapassou o limite permitido pelo calendário (31). Por favor, tente novamente.', [{text: 'OK'}]);
                                    setDiaVencimento("1");
                                } else {
                                    setDiaVencimento(v);
                                }
                            }}
                            value={diaVencimento}
                            type="decimal-pad"
                            maxLength={2}
                        >
                            <FontAwesome6 name="sun" size={16} color={'#696969'}/>
                        </CaptionTextInput>
                        <View style={Styles.closeButton}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("######### Chamou salvar conta !!!!");
                                    Keyboard.dismiss();

                                    limpaFormulario();
                                    setVisivel(false);
                                }}
                            >
                                <Text style={Styles.buttonText}>Salvar Conta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}