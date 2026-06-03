
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

import { colors } from "../../theme/colors";
import { radius } from "../../theme/radius";

type PasswordInputProps = Omit<TextInputProps, "secureTextEntry">;

export const PasswordInput = ({ style, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.primary}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />

      <Pressable
        onPress={() => setShowPassword((current) => !current)}
        style={styles.button}
        hitSlop={8}
      >
        {showPassword ? (
          <EyeOff size={20} color={colors.primary} />
        ) : (
          <Eye size={20} color={colors.primary} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.md,
    backgroundColor: colors.inputBackground,
    paddingLeft: 12,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    color: colors.text,
    fontSize: 16,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});