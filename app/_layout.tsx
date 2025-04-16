import {DadosSensiveisProvider} from "@context/DadosSensiveisContext";
import {Slot} from "expo-router";
import {SQLiteProvider} from "expo-sqlite";
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from "react";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    useEffect(() => {
        const solicitarPermissaoENotificar = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permissão de notificações negada!');
                return;
            }

            const prepare = async () => {
                // Aguarda fontes ou dados carregarem aqui...
                await new Promise(resolve => setTimeout(resolve, 1000)); // simula delay
                await SplashScreen.hideAsync(); // esconde a splash screen
            };

            prepare();

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '💸 Organize-se!',
                    body: 'Já adicionou suas contas hoje?',
                },
                trigger: null, // dispara imediatamente
            });
        };

        solicitarPermissaoENotificar();
    }, []);

    return (
        <SQLiteProvider databaseName="financas.db">
            <DadosSensiveisProvider>
                <Slot/>
            </DadosSensiveisProvider>
        </SQLiteProvider>
    );
}
