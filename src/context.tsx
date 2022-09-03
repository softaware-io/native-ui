import { createContext, ReactNode } from "react";
import {
  DefaultColors,
  DefaultFontSizes,
  ComponentOverrides,
  defaultColors,
  defaultFontSizes,
  DefaultFunctions,
  defaultFunctions,
} from "./theme";

type NativeUiContextProps = {
  colors: DefaultColors;
  fontSizes: DefaultFontSizes;
  components: ComponentOverrides;
  fn: DefaultFunctions;
};

type NativeUiContextProviderProps = {
  theme: {
    colors?: Omit<DefaultColors, "white" | "black"> & {
      white?: string;
      black?: string;
    };
    fontSizes?: Omit<DefaultFontSizes, "custom">;
    components?: (theme: {
      colors: DefaultColors;
      fontSizes: DefaultFontSizes;
      fn: DefaultFunctions;
    }) => ComponentOverrides;
    fn?: DefaultFunctions;
  };
  children: ReactNode;
};

export const NativeUiContext = createContext<NativeUiContextProps>({
  colors: defaultColors,
  fontSizes: defaultFontSizes,
  components: {},
  fn: defaultFunctions,
});

export const NativeUiContextProvider = ({
  theme,
  children,
}: NativeUiContextProviderProps) => {
  const colors = { ...defaultColors, ...theme.colors };
  const fontSizes = { ...defaultFontSizes, ...theme.fontSizes };
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
