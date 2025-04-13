import {Animated, Text, View} from "react-native";
import React, {useRef, useState} from "react";
import {buscarTodasAsContas} from "@services/ContaService";
import Styles from './Styles'
import {Theme} from "@constants/Theme";

const ITEM_HEIGHT = 100;

export default function ListagemDeContas(props: {
    itemSeparatorComponent: () => React.JSX.Element,
}) {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [listHeight, setListHeight] = useState(0);
    const [isEnd, setEnd] = useState(false);

    const data = buscarTodasAsContas();


    return <Animated.FlatList
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
        contentContainerStyle={{...Styles.listaContas}}
        data={data}
        bounces={false}
        // ListEmptyComponent={<EmptyComponent />}
        ItemSeparatorComponent={() => <View style={{height: 0}}/>}
        overScrollMode="never"
        onScroll={
            Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {useNativeDriver: true}
            )}
        scrollEventThrottle={16}
        onEndReached={() => setEnd(true)}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item, index}) => {
            const outputRangeScale = [0.95, 1, 0.95];
            const outputRangeOpacity = [0.5, 1, 0.5];

            const itemCenterPosition = index * ITEM_HEIGHT + ITEM_HEIGHT / 2;

            const visibleTop = scrollY;

            const distance = Animated.subtract(itemCenterPosition, visibleTop);

            const normalized = Animated.divide(distance, ITEM_HEIGHT);

            const scale = normalized.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: outputRangeScale,
                extrapolate: 'clamp',
            });

            const opacity = normalized.interpolate({
                inputRange: [0, 0, 4.5],
                outputRange: outputRangeOpacity,
                extrapolate: 'clamp',
            });

            return (<ContaComponent item={item}
                                    style={{
                                        ...Styles.item,
                                        transform: [{scale}],
                                        opacity
                                    }}/>)
        }}
    ></Animated.FlatList>;
}

function ContaComponent({item: {nomeConta, diaVencimento}, style}: {
                            item: { nomeConta: string, diaVencimento: number };
                            style: any
                        }
) {
    return (
        <Animated.View
            style={style}
        >
            <View>
                <Text style={Theme.light.txtH3RegularWhiteOpaco70pct}>{nomeConta}</Text>
                <Text style={Styles.subtitle}>Dia de vencimento: {diaVencimento}</Text>
            </View>
        </Animated.View>
    );
}

