import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthScreen } from "./src/screens/AuthScreen";
import { isAuthenticated } from "./src/utils/tokenUtils";
import { colors } from "./src/theme/colors";
import { AppButton } from "@/components/_common/AppButton";
import { storageService } from "@/services/storage/storageService";
import { spacing } from "@/theme/spacing";

export default function App() {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async (): Promise<void> => {
            const result = await isAuthenticated();

            setAuthenticated(result);
            setCheckingAuth(false);
        };

        void checkAuth();
    }, []);

    if (checkingAuth) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <>
            <StatusBar style="light" />

            {authenticated ? (
                <View style={styles.authenticatedContainer}>
                    <Text style={styles.authenticatedText}>Autenticado</Text>
                    <AppButton style={styles.exitButton} children={<Text>Sair</Text>} onPress={() => storageService.clearTokens()} />
                </View>
            ) : (
                <AuthScreen onAuthenticated={() => setAuthenticated(true)} />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.backgroundBody,
    },
    authenticatedContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.backgroundBody,
    },
    authenticatedText: {
        color: colors.text,
        fontSize: 18,
    },
    exitButton:{
      flex: 1,
      padding: spacing.md
    }
});
