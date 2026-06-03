import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../theme/colors";
import { radius } from "../../theme/radius";

type AppButtonProps = {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const AppButton = ({
  children,
  onPress,
  disabled = false,
  loading = false,
}: AppButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.button, isDisabled && styles.disabled]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontWeight: "700",
    color: colors.backgroundBody,
  },
});