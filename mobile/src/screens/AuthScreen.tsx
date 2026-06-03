import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm} from "@/components/auth/SignUpForm"

type AuthMode = "login" | "signUp";

type AuthScreenProps = {
  onAuthenticated: () => void;
};

export const AuthScreen = ({ onAuthenticated }: AuthScreenProps) => {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            {mode === "login" ? "Entrar" : "Criar conta"}
          </Text>

          {mode === "login" ? (
            <LoginForm
              onSwitch={() => setMode("signUp")}
              onSuccess={onAuthenticated}
            />
          ) : (
            <SignUpForm onSwitch={() => setMode("login")} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.backgroundBody  ,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  card: {
    width: "100%",
    borderRadius: radius.lg,
    backgroundColor: colors.backgroundHeader,
    padding: 24,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
});