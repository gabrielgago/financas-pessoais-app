import {FlatList, Platform, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {ContaDB} from "@services/ContaService";
import Styles from './Styles'
import {Theme} from "@constants/Theme";
import {SwipeListView} from 'react-native-swipe-list-view';
import {LinearGradient} from 'expo-linear-gradient';


export default function ListagemDeContas(props: {
    itemSeparatorComponent: () => React.JSX.Element,
    itens: ContaDB[]
}) {

    // const data = buscarTodasAsContas();

    return <SwipeListView
        contentContainerStyle={Styles.listaContas}
        data={props.itens}
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 0}}/>}
        overScrollMode="never"
        keyExtractor={(item) => String(item.id)}
        renderHiddenItem={({item}) => (
            <LinearGradient
                style={{...(Platform.OS === "ios" ? Styles.itemIOS : Styles.itemAndroid), ...Styles.rowBack}}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                locations={[0, 0.5]}
                colors={['#FFFFFF', '#F94449']}>
                <TouchableOpacity onPress={() => alert('Deletando...')}>
                    <Text style={Styles.deleteText}>Deletar</Text>
                </TouchableOpacity>
            </LinearGradient>
        )}
        rightOpenValue={-75}
        stopRightSwipe={-80}
        disableRightSwipe
        renderItem={({item, index}) => <ContaComponent item={item}
                                                       style={Platform.OS === "ios" ? Styles.itemIOS : Styles.itemAndroid}/>}
    ></SwipeListView>;
}

function ContaComponent({item, style}: {
                            item: ContaDB;
                            style: any
                        }
) {
    return (
        <LinearGradient colors={["#9C2CF3", "#3A49F9"]}
                        style={style}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        locations={[0.2, 1]}
        >
            <View>
                <Text style={Styles.title}>{item.nome_conta}</Text>
                <Text style={Theme.light.txtH3RegularWhiteOpaco}>Dia de vencimento: {item.dia_vencimento}</Text>
            </View>
        </LinearGradient>
    );
}

