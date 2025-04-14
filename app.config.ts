import { ExpoConfig } from "@expo/config";

const config: ExpoConfig = {
    name: "financas-pessoais",
    slug: "financas-pessoais",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
    },
    android: {
        package: "com.gago2024.financaspessoais",
        adaptiveIcon: {
            foregroundImage: "./assets/images/default_logo.png",
            backgroundColor: "#ffffff",
        },
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
    },
    plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
                image: "./assets/images/master-logo.png",
                imageWidth: 500,
                resizeMode: "contain",
                backgroundColor: "#ffffff",
            },
        ],
        "expo-font",
        "expo-sqlite",
        [
            "expo-notifications",
            {
                mode: "production",
                android: {
                    useNextNotificationsApi: true,
                },
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
    },
};

export default config;
