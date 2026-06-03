import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../_common/AppButton";
import { AppInput } from "../_common/AppInput";
import { loginUser } from "../../services/auth/authService";
import { getApiErrorMessage } from "../../utils/apiError";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { PasswordInput } from "../_common/PasswordInput";

type LoginFormProps = {
    onSwitch: () => void;
    onSuccess: () => void;
};

export const LoginForm = ({ onSwitch, onSuccess }: LoginFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (): Promise<void> => {
        if (!email.trim() || !password.trim()) {
            setError("Preencha email e senha.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await loginUser({
                email: email.trim(),
                password,
            });

            onSuccess();
        } catch (err: unknown) {
            setError(getApiErrorMessage(err, "Erro ao entrar na conta"));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.form}>
            <AppInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <PasswordInput placeholder="Senha" value={password} onChangeText={setPassword} />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <AppButton onPress={handleLogin} loading={loading}>
                Entrar
            </AppButton>

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Não tem conta?</Text>

                <Pressable onPress={onSwitch}>
                    <Text style={styles.switchAction}>Criar agora</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        gap: spacing.lg,
    },
    error: {
        color: colors.danger,
        fontSize: 14,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: spacing.xs,
    },
    switchText: {
        color: colors.text,
        fontSize: 14,
    },
    switchAction: {
        color: colors.accent,
        fontSize: 14,
        fontWeight: "700",
    },
});
