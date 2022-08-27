import { DefaultColors, DefaultFontSizes } from "../theme";
import { useTheme } from "./useTheme";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function createStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  input: (theme: {
    colors: DefaultColors;
    fontSizes: DefaultFontSizes;
  }) => T | NamedStyles<T>
) {
  const useStyles = () => {
    const theme = useTheme();
    return StyleSheet.create(input(theme));
  };
  return useStyles;
}
