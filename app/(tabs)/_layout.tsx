import {Tabs} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Animated, Pressable} from "react-native";
import {useRef, useEffect} from "react";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({route}) => ({
                tabBarShowLabel: false, // Sem label
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#fff",
                    height: 70,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    elevation: 10,
                    shadowColor: "#000",
                    shadowOffset: {width: 0, height: -3},
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                    position: "absolute",
                },
                tabBarButton: (props) => <AnimatedTabButton {...props} routeName={route.name}/>,
            })}
        />
    );
}

function AnimatedTabButton({children, onPress, accessibilityState, routeName}: {
    children?: React.ReactNode;
    onPress: () => void;
    accessibilityState: { selected: boolean };
    routeName: string;
}) {
    const focused = accessibilityState.selected;

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const scaleEsfera = useRef(new Animated.Value(0)).current;

    // Quando o foco muda, anima
    useEffect(() => {
        if (focused) {
            // Quando ganha foco: anima o botão e a esfera
            Animated.spring(scaleAnim, {
                toValue: 1.2,
                useNativeDriver: true,
                speed: 20,
                bounciness: 10,
            }).start();
            Animated.spring(scaleEsfera, {
                toValue: 1,
                useNativeDriver: true,
                speed: 20,
                bounciness: 10,
            }).start();
        } else {
            // Quando perde foco: volta ao normal
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                speed: 20,
                bounciness: 10,
            }).start();
            Animated.spring(scaleEsfera, {
                toValue: 0,
                useNativeDriver: true,
                speed: 20,
                bounciness: 10,
            }).start();
        }
    }, [focused]);

    const getIconName = (routeName: string) => {
        switch (routeName) {
            case "index":
                return "card-outline";
            case "home-bichos":
                return "accessibility-outline";
            case "movimentacoes":
                return "bag-add-outline";
            default:
                return "home-outline";
        }
    }

    return (
        <Pressable
            onPress={onPress}
            style={{flex: 1}}
        >
            <Animated.View
                style={{
                    flex: 1,
                    transform: [{scale: scaleAnim}],
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Esfera animada */}
                <Animated.View
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "#FFF",
                        position: "absolute",
                        borderRadius: 50,
                        transform: [{scale: scaleEsfera}],
                    }}
                />

                {/* Ícone */}
                <Ionicons
                    name={getIconName(routeName)}
                    size={28}
                    color={focused ? "tomato" : "gray"}
                />
            </Animated.View>
        </Pressable>
    );
}
