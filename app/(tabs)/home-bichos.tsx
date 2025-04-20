// import {
//     ActivityIndicator,
//     ImageBackground,
//     Modal,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from "react-native";
// import React, {useState} from "react";
// import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import {TextInputMask} from "react-native-masked-text";
// import HeaderComponent from "@components/HeaderComponent";
//
// const HomeBichos = () => {
//     let saldoRef: any = null;
//     const [valor, setValor] = useState("");
//     const [isGerando, setIsGerando] = useState(false);
//     const [isVisivel, setVisivel] = useState(false);
//
//     const handleGerarJogo = () => {
//         setIsGerando(true);
//         simulaDemora();
//     }
//
//     const simulaDemora = async () => {
//         return setTimeout(
//             () => {
//                 console.log("###### prevState: ")
//                 setIsGerando(prevState => {
//                     console.log("###### prevState: ", prevState)
//                     return !prevState;
//                 });
//                 setVisivel(true);
//             }, 1000)
//     }
//
//     return (<>
//         <ImageBackground style={{flex: 1, paddingVertical: 40}}
//                          source={require('../../assets/images/leao.png')} blurRadius={2}>
//             <HeaderComponent/>
//             <View style={styles.container}>
//                 <View style={styles.areaContainer}>
//                     <View style={{gap: 5, marginVertical: 5}}>
//                         <Text style={styles.modalText}>Saldo</Text>
//                         <View>
//                             <View style={{top: 17.5, zIndex: 1, position: 'absolute', left: 10}}>
//                                 <FontAwesome6 name="dollar-sign" size={16} color={'#696969'}/>
//                             </View>
//                             <TextInputMask
//                                 placeholder={"Saldo"}
//                                 style={styles.inputTxt}
//                                 cursorColor="#FFFFFF"
//                                 keyboardType={"decimal-pad"}
//                                 textContentType={"none"}
//                                 placeholderTextColor="#FFF"
//                                 type={'money'}
//                                 options={{
//                                     precision: 2,
//                                     separator: ',',
//                                     delimiter: '.',
//                                     unit: 'R$ ',
//                                     suffixUnit: ''
//                                 }}
//                                 value={valor}
//                                 onChangeText={setValor}
//                                 ref={ref => saldoRef = ref}
//                             />
//                         </View>
//                     </View>
//                     <Text style={{...styles.modalText, color: "#000"}}>Conte-nos seu sonho</Text>
//                     <TextInput
//                         style={styles.input}
//                         multiline
//                         numberOfLines={6}
//                         placeholder="Digite seu comentário aqui..."
//                         placeholderTextColor="#FFF"
//                     />
//                     <View style={styles.areaGerarJogo}>
//                         <TouchableOpacity style={styles.btnGerarJogo} onPress={() => handleGerarJogo()}>
//                             {isGerando ? <ActivityIndicator size="small" color="#FFF"/> :
//                                 <Text style={styles.txtGerarJogo}>Gerar Jogo</Text>}
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </ImageBackground>
//         <Modal
//             animationType="fade"
//             transparent={true}
//             visible={isVisivel}
//             onRequestClose={() => {
//                 setVisivel(false)
//             }}
//         >
//             <View style={styles.modalBackground}>
//                 <View style={{maxHeight: 300, borderRadius: 10, overflow: "hidden"}}>
//                     <View style={styles.modalContainer}>
//                     <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center", padding: 5, marginBottom: 10}}>
//                             <Text style={styles.txtBicho}>ÁGUIA</Text>
//                             <View>
//                                 <TouchableOpacity activeOpacity={.7} onPress={() => {
//                                     // limpaFormulario();
//                                     setVisivel(false)
//                                 }}
//                                                   style={{alignSelf: 'flex-end'}}>
//                                     <FontAwesome6 name="xmark" size={20} color={'#696969'}/>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                         <View>
//
//                             <Text style={styles.numeroJogo}>Grupo: 2</Text>
//                             <Text style={styles.numeroJogo}>Dezena: 07</Text>
//                             <Text style={styles.numeroJogo}>Centena: 907</Text>
//                             <Text style={styles.numeroJogo}>Milhar: 8907</Text>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     </>)
//         ;
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     areaContainer: {
//         height: 400,
//         width: 350,
//         backgroundColor: 'rgba(255, 255, 255, 0.2)',
//         padding: 20,
//         borderRadius: 10,
//         justifyContent: 'space-between',
//         // elevation: 5
//     },
//     input: {
//         height: 150, // ou usa flex para ajustar
//         borderColor: '#FFF',
//         borderWidth: 1,
//         padding: 10,
//         textAlignVertical: 'top',
//         backgroundColor: '#000',
//         borderRadius: 10,
//         marginBottom: 15
//         // textAlign: "center",
//     },
//     modalText: {
//         fontSize: 20,
//         color: "#000",
//         fontFamily: "Poppins-SemiBold",
//         lineHeight: 22,
//         // marginBottom: 5,
//     },
//     btnGerarJogo: {
//         backgroundColor: '#000',
//         padding: 10,
//         borderRadius: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 150,
//         height: 50,
//     },
//     txtGerarJogo: {
//         // fontFamily: "Roboto-Regular",
//         fontSize: 18,
//         color: "#FFF",
//         textAlign: "center",
//         fontFamily: "Poppins-SemiBold",
//     },
//     areaGerarJogo: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     inputTxt: {
//         backgroundColor: "#000",
//         borderRadius: 15,
//         paddingLeft: 40,
//         fontFamily: "Poppins-Regular",
//         fontSize: 14,
//         color: '#FFF',
//         height: 55,
//     },
//     modalBackground: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
//     },
//     modalContainer: {
//         width: 250,
//         // flexGrow: 1,
//         backgroundColor: "white",
//         borderRadius: 10,
//         padding: 20
//     },
//     numeroJogo: {
//         fontSize: 20,
//         color: "#000",
//         fontFamily: "Poppins-SemiBold",
//     },
//     txtBicho: {
//         fontSize: 20,
//         color: '#696969',
//         fontFamily: "Poppins-SemiBold"
//     },
// })
//
// export default HomeBichos;