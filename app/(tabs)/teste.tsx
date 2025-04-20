import {
    ActivityIndicator, Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import React, {useState} from "react";
import ModalBichoComponent from "../../components/ModalBichoComponent";
import {TextInputMask} from "react-native-masked-text";

interface ResultadoProp {
    palavra_associada: string;
    descricao: string;
    grupo: string;
    dezena: string;
    centena: string;
    milhar: string;
}


export default function DreamScreen() {

    let saldoRef: any = null;

    const [isGerando, setIsGerando] = useState(false);
    const [valor, setValor] = useState<string>("");
    const [sonho, setSonho] = useState("");
    const [isVisivel, setVisivel] = useState(false);
    const [resultado, setResultado] = useState<ResultadoProp>();
    // "As ondas batiam na encosta"

    const handleGerarJogo = (msg: string) => {
        setIsGerando(true);
        (async () => {
            try {
                console.log('Enviando sonho para API...', msg);
                const response = await fetch('http://10.0.2.2:8000/analisar-sonho', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        texto: msg
                    }),
                });

                const data = await response.json();
                console.log('Data:', data);

                const resultado: ResultadoProp = data;

                const {palavra_associada, descricao, grupo, dezena, centena, milhar} = resultado;

                console.log('Resposta da API:', palavra_associada, descricao, grupo, dezena, centena, milhar);

                setResultado(resultado)

                setIsGerando(prevState => {
                    console.log("###### prevState: ", prevState)
                    return !prevState;
                });

                setVisivel(true);
            } catch (error) {
                console.error('Erro ao enviar o sonho:', error);
            }
        })()
    }

    // const simulaDemora = async () => {
    //     return setTimeout(
    //         () => {
    //             console.log("###### prevState: ")
    //             setIsGerando(prevState => {
    //                 console.log("###### prevState: ", prevState)
    //                 return !prevState;
    //             });
    //             setVisivel(true);
    //         }, 1000)
    // }

    return (<>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient
                    colors={['rgba(255,212,218,0.87)', 'rgba(255,231,219,0.78)', 'rgba(249,217,255,0.73)']}
                    style={styles.container}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    locations={[0, 0.4, 0.7]}
                >
                    <View style={styles.content}>
                        <Text style={styles.welcome}>
                            Ei, bem vindo de volta!{"\n"}
                            Que sonho trás você aqui hoje?
                        </Text>

                        {/* Container com sombra externa limpa */}
                        <View style={styles.cardOuterShadow}>
                            {/* Container com efeito "glass" sem usar BlurView */}

                            <LinearGradient style={styles.glassEffect}
                                            colors={['rgba(255,212,218,0.60)', 'rgba(255,231,219,0.60)', 'rgba(249,217,255,0.60)']}
                                            start={{x: 0, y: 0}}
                                            end={{x: 1, y: 1}}
                                            locations={[0, 0.2, 0.8]}>

                                <View style={styles.formContent}>

                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.label}>Amount</Text>
                                        <LinearGradient style={styles.inputContainer}
                                                        colors={['rgba(255,212,218,0.2)', 'rgba(255,231,219,0.4)', 'rgba(249,217,255,0.4)']}
                                                        start={{x: 0, y: 0}}
                                                        end={{x: 1, y: 1}}
                                                        locations={[0, 0.2, 0.8]}>
                                            <Ionicons name="cash-outline" size={22} color="#888" style={[styles.icon]}/>
                                            <TextInputMask
                                                placeholder={"Saldo"}
                                                style={styles.input}
                                                cursorColor="#FFFFFF"
                                                keyboardType={"decimal-pad"}
                                                textContentType={"none"}
                                                // placeholderTextColor="#FFF"
                                                type={'money'}
                                                options={{
                                                    precision: 2,
                                                    separator: ',',
                                                    delimiter: '.',
                                                    unit: 'R$ ',
                                                    suffixUnit: ''
                                                }}
                                                value={valor}
                                                onChangeText={(text) => setValor(text)}
                                                ref={ref => saldoRef = ref}
                                            />
                                        </LinearGradient>
                                    </View>

                                    <View style={[styles.fieldContainer, {height: 150}]}>
                                        <Text style={styles.label}>Dream</Text>
                                        <LinearGradient style={[styles.inputContainer, {height: 130}]}
                                                        colors={['rgba(255,212,218,0.2)', 'rgba(255,231,219,0.4)', 'rgba(249,217,255,0.4)']}
                                                        start={{x: 0, y: 0}}
                                                        end={{x: 1, y: 1}}
                                                        locations={[0, 0.2, 0.8]}>
                                            <Ionicons name="cloud-outline" size={22} color="#888" style={styles.icon}/>
                                            <TextInput
                                                placeholder="Conte seu sonho"
                                                placeholderTextColor='#555'
                                                style={[styles.input, {
                                                    height: 130,
                                                    textAlignVertical: 'top',
                                                    marginTop: 2, ...Platform.select({ios: {marginTop: 13.5}}),
                                                    textDecorationStyle: 'dashed',
                                                    textDecorationLine: 'none'
                                                }]}
                                                multiline
                                                numberOfLines={6}
                                                textAlignVertical={"top"}
                                                underlineColorAndroid="transparent"
                                                onChangeText={setSonho}
                                                value={sonho}
                                                returnKeyType="done"
                                                onSubmitEditing={Keyboard.dismiss}
                                            />
                                        </LinearGradient>
                                    </View>

                                    <TouchableOpacity activeOpacity={0.8} style={styles.buttonWrapper}
                                                      onPress={() => handleGerarJogo(sonho)}>
                                        <LinearGradient
                                            colors={['#9999ea', '#5c80d0', '#824edc']}
                                            start={{x: 0, y: 0}}
                                            end={{x: 1, y: 1}}
                                            style={styles.button}
                                        >
                                            {isGerando ? <ActivityIndicator size="small" color="#FFF"/> :
                                                <Text style={styles.buttonText}>Manda lá</Text>}
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>

                        </View>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
            {/*<Modal*/}
            {/*    animationType="fade"*/}
            {/*    transparent={true}*/}
            {/*    visible={isVisivel}*/}
            {/*    onRequestClose={() => {*/}
            {/*        setVisivel(false)*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <View style={styles.modalBackground}>*/}
            {/*        <View style={{maxHeight: 300, borderRadius: 10, overflow: "hidden"}}>*/}
            {/*            <View style={styles.modalContainer}>*/}
            {/*                <View style={{*/}
            {/*                    flexDirection: 'row',*/}
            {/*                    justifyContent: "space-between",*/}
            {/*                    alignItems: "center",*/}
            {/*                    padding: 5,*/}
            {/*                    marginBottom: 10*/}
            {/*                }}>*/}
            {/*                    <Text style={styles.txtBicho}>ÁGUIA</Text>*/}
            {/*                    <View>*/}
            {/*                        <TouchableOpacity activeOpacity={.7} onPress={() => {*/}
            {/*                            // limpaFormulario();*/}
            {/*                            setVisivel(false)*/}
            {/*                        }}*/}
            {/*                                          style={{alignSelf: 'flex-end'}}>*/}
            {/*                            <FontAwesome6 name="xmark" size={20} color={'#696969'}/>*/}
            {/*                        </TouchableOpacity>*/}
            {/*                    </View>*/}
            {/*                </View>*/}
            {/*                <View>*/}

            {/*                    <Text style={styles.numeroJogo}>Grupo: 2</Text>*/}
            {/*                    <Text style={styles.numeroJogo}>Dezena: 07</Text>*/}
            {/*                    <Text style={styles.numeroJogo}>Centena: 907</Text>*/}
            {/*                    <Text style={styles.numeroJogo}>Milhar: 8907</Text>*/}
            {/*                </View>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*</Modal>*/}
            <ModalBichoComponent isVisivel={isVisivel} setVisivel={setVisivel} resultData={resultado}/>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    welcome: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    // Sombra externa apenas
    cardOuterShadow: {
        width: 300,
        borderRadius: 24,
        // Aplicando apenas a sombra externa
        ...Platform.select({
            ios: {
                shadowColor: "#333",
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity: 0.15,
                shadowRadius: 20,
            },
            android: {
                shadowColor: "rgba(51,51,51,0.6)",
                shadowOffset: {
                    width: 0,
                    height: 20,
                },
                shadowOpacity: 0.10,
                shadowRadius: 10,
                elevation: 50,
                // No Android, precisamos de um backgroundColor para a elevation funcionar
                backgroundColor: 'transparent',
                // Isto ajuda no Android a evitar o efeito de sombra interna
                overflow: 'visible'
            },
        }),
    },
    // Efeito glass sem usar BlurView
    glassEffect: {
        width: '100%',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        overflow: 'hidden',
        // Subtle gradient to enhance glass effect
        backfaceVisibility: 'hidden',
    },
    formContent: {
        padding: 24,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 55,

        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',

        shadowColor: "rgba(51,51,51,0.6)",
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.10,
        shadowRadius: 10,
        elevation: 50,
        // No Android, precisamos de um backgroundColor para a elevation funcionar
        backgroundColor: 'transparent',
        // Isto ajuda no Android a evitar o efeito de sombra interna
        overflow: 'visible',

        // Subtle gradient to enhance glass effect
        backfaceVisibility: 'hidden',
    },
    icon: {
        marginRight: 10,
        marginTop: 15
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#333',
        textDecorationStyle: 'solid',
    },
    buttonWrapper: {
        marginTop: 10,
    },
    button: {
        height: 55,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});