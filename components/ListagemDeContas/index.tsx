import {Animated, FlatList, Platform, Text, View} from "react-native";
import React, {useRef, useState} from "react";
import {buscarTodasAsContas} from "@services/ContaService";
import Styles from './Styles'
import {Theme} from "@constants/Theme";

const ITEM_HEIGHT = 100;

export default function ListagemDeContas(props: {
    itemSeparatorComponent: () => React.JSX.Element,
}) {

    const data = buscarTodasAsContas();

    return <FlatList
        contentContainerStyle={Styles.listaContas}
        data={data}
        bounces={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        // ListEmptyComponent={<EmptyComponent />}
        ItemSeparatorComponent={() => <View style={{height: 0}}/>}
        overScrollMode="never"
        keyExtractor={(item) => String(item.id)}
        renderItem={({item, index}) => {

            return (<ContaComponent item={item}
                                    style={Platform.OS === "ios" ? Styles.itemIOS : Styles.itemAndroid}/>)
        }}
    ></FlatList>;
}

function ContaComponent({item: {nomeConta, diaVencimento}, style}: {
                            item: { nomeConta: string, diaVencimento: number };
                            style: any
                        }
) {
    return (
        <View
            style={style}
        >
            <View>
                <Text style={Theme.light.txtH3RegularWhiteOpaco70pct}>{nomeConta}</Text>
                <Text style={Styles.subtitle}>Dia de vencimento: {diaVencimento}</Text>
            </View>
        </View>
    );
}

