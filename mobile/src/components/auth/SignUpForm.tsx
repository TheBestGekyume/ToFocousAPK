import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../_common/AppButton";
import { AppInput } from "../_common/AppInput";
import { signUpUser } from "../../services/auth/authService";
import { getApiErrorMessage } from "../../utils/apiError";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { PasswordInput } from "../_common/PasswordInput";

type SignUpFormProps = {
  onSwitch: () => void;
};

export const SignUpForm = ({ onSwitch }: SignUpFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignUp = async (): Promise<void> => {
    setError(null);
    setSuccess(null);

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await signUpUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setSuccess(
        `Conta criada com sucesso!\nAtive sua conta pelo email ${email.trim()}`,
      );

      setTimeout(() => {
        onSwitch();
      }, 5000);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Erro ao criar conta"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <AppInput
        placeholder="Nome de usuário"
        value={name}
        onChangeText={setName}
      />

      <AppInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <PasswordInput
  placeholder="Senha"
  value={password}
  onChangeText={setPassword}
/>

<PasswordInput
  placeholder="Confirmar senha"
  value={confirmPassword}
  onChangeText={setConfirmPassword}
/>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {success ? <Text style={styles.success}>{success}</Text> : null}

      <AppButton onPress={handleSignUp} loading={loading}>
        Criar conta
      </AppButton>

      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Já tem conta?</Text>

        <Pressable onPress={onSwitch}>
          <Text style={styles.switchAction}>Entrar</Text>
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
  success: {
    color: colors.success,
    fontSize: 14,
    lineHeight: 20,
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