import type { TextInputProps } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../../theme/colors";
import { radius } from "../../theme/radius";

type AppInputProps = TextInputProps;

export const AppInput = (props: AppInputProps) => {
  return (
    <TextInput
      placeholderTextColor={colors.primary}
      style={styles.input}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 12,
    color: colors.text,
  },
});