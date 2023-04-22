import {
  ComponentOverrides,
  DefaultColors,
  DefaultFontSizes,
  DefaultFunctions,
} from "../theme";

export function extendComponents(
  input: (theme: {
    colors: DefaultColors;
    fontSizes: DefaultFontSizes;
    fn: DefaultFunctions;
  }) => ComponentOverrides
) {
  return input;
}
