import { ComponentOverrides, DefaultColors, DefaultFontSizes } from "../theme";

export function extendComponents(
  input: (theme: {
    colors: DefaultColors;
    fontSizes: DefaultFontSizes;
  }) => ComponentOverrides
) {
  return input;
}
