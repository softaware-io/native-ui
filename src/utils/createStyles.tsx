import { DefaultColors, DefaultFontSizes, DefaultFunctions } from "../theme";
import { useTheme } from "./useTheme";

export function createStyles<T>(
  input: (theme: {
    colors: DefaultColors;
    fontSizes: DefaultFontSizes;
    fn: DefaultFunctions;
  }) => T
) {
  const useStyles = () => {
    const theme = useTheme();
    return input(theme);
  };
  return useStyles;
}
