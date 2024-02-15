import { createContext, ReactNode } from "react";
import {
  DefaultColors,
  DefaultFontSizes,
  ComponentOverrides,
  defaultColors,
  defaultFontSizes,
  DefaultFunctions,
  defaultFunctions,
  ColorShades,
} from "./theme";

type NativeUiContextProps = {
  colors: DefaultColors;
  fontSizes: DefaultFontSizes;
  components: ComponentOverrides;
  fn: DefaultFunctions;
};

type NativeUiContextProviderProps = {
  theme?: {
    colors?: Record<string, Partial<ColorShades> | string>;
    defaultLength?: number;
    fontSizes?: Record<string, number>;
    components?: (theme: {
      colors: DefaultColors;
      fontSizes: DefaultFontSizes;
      fn: DefaultFunctions;
    }) => ComponentOverrides;
    fn?: Record<string, (...args: any[]) => any>;
  };
  children: ReactNode;
};

export const NativeUiContext = createContext<NativeUiContextProps>({
  colors: defaultColors,
  fontSizes: defaultFontSizes(),
  components: {},
  fn: defaultFunctions,
});

export const NativeUiContextProvider = ({
  theme = {},
  children,
}: NativeUiContextProviderProps) => {
  const colors = { ...defaultColors, ...theme.colors };
  const fontSizes = {
    ...defaultFontSizes(theme.defaultLength),
    ...theme.fontSizes,
  };
  const fn = { ...defaultFunctions, ...theme.fn };
  const components = theme.components?.({ colors, fontSizes, fn }) || {};

  return (
    <NativeUiContext.Provider
      value={{
        colors,
        fontSizes,
        components,
        fn,
      }}
    >
      {children}
    </NativeUiContext.Provider>
  );
};
