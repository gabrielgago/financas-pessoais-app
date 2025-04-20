import {Modal, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {BlurView} from "expo-blur";

export default function ModalBichoComponent({isVisivel, setVisivel, resultData}) {
    return (
        <Modal
            visible={isVisivel}
            transparent
            animationType="fade"
            onRequestClose={() => setVisivel(false)}
        >
            <View style={styles.overlay}>
                <LinearGradient
                    colors={['rgba(255,212,218,1)', 'rgba(255,231,219,1)', 'rgba(249,217,255,1)']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.modalContent}
                >
                    <BlurView intensity={30} tint="light" style={{padding: 20}}>
                        <View style={styles.header}>
                            <Text style={styles.title}>{resultData?.palavra_associada?.toUpperCase() || 'IA'}</Text>
                            <TouchableOpacity onPress={() => setVisivel(false)}>
                                <Ionicons name="close" size={24} color="#555"/>
                            </TouchableOpacity>
                        </View>


                        <Text style={styles.subTitulo}>{resultData?.descricao || 'A inteligência artificial por trás desse código não encontrou uma correlação exata entre seu sonho e um animal. No entanto, sugerimos a seguir uma possível indicação para o seu jogo.'}</Text>

                        <View style={styles.divider}/>

                        <View style={styles.body}>
                            <View style={styles.row}>
                                <Text style={styles.field}>Grupo:</Text>
                                <Text style={styles.value}>{resultData?.grupo || '2'}</Text>
                            </View>
                            <View style={styles.divider}/>

                            <View style={styles.row}>
                                <Text style={styles.field}>Dezena:</Text>
                                <Text style={styles.value}>{resultData?.dezena || '07'}</Text>
                            </View>
                            <View style={styles.divider}/>

                            <View style={styles.row}>
                                <Text style={styles.field}>Centena:</Text>
                                <Text style={styles.value}>{resultData?.centena || '907'}</Text>
                            </View>
                            <View style={styles.divider}/>

                            <View style={styles.row}>
                                <Text style={styles.field}>Milhar:</Text>
                                <Text style={styles.value}>{resultData?.milhar || '8907'}</Text>
                            </View>
                        </View>
                    </BlurView>

                </LinearGradient>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        width: 300,
        borderRadius: 20,
        // padding: 20,
        backgroundColor: 'rgba(255,255,255, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'Poppins-Regular',
    },
    body: {
        // marginTop: 20,
        padding: 18
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    field: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    value: {
        fontSize: 16,
        color: '#555',
        fontWeight: '600',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'Poppins-SemiBold',
    },
    subTitulo: {
        fontSize: 18,
        color: '#555',
        fontWeight: '600',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'Poppins-SemiBold',
        padding: 10,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginVertical: 2,
    },
});
