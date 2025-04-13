import {DadosSensiveisProvider} from "@context/DadosSensiveisContext";
import {Slot} from "expo-router";
import {SQLiteProvider} from "expo-sqlite";
import * as Notifications from "expo-notifications";
import {useEffect} from "react";

export default function RootLayout() {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    // let interval = null;

    useEffect(() => {
        // 1. Solicita permissão
        const solicitarPermissao = async () => {
            const {status} = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permissão para notificações não concedida!');
                return;
            }

            // 2. Dispara uma notificação simples ao abrir o app
            // interval = setInterval(async () => {
            //     await Notifications.scheduleNotificationAsync({
            //         content: {
            //             title: "🚀 Seja bem-vindo!",
            //             body: "Seu app está funcionando com notificações locais.",
            //         },
            //         trigger: { seconds: 2 }, // dispara imediatamente
            //     });
            // }, 3000)
        };

        solicitarPermissao()

        // () => {
        //     interval && clearInterval(interval);
        // }
    }, []);

    return (
        <SQLiteProvider databaseName="financas.db">
            <DadosSensiveisProvider>
                <Slot/>
            </DadosSensiveisProvider>
        </SQLiteProvider>
    );
}
