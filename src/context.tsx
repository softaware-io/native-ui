import { createContext, ReactNode } from "react";
import {
  DefaultColors,
  DefaultFontSizes,
  ComponentOverrides,
  defaultColors,
  defaultFontSizes,
} from "./theme";

type NativeUiContextProps = {
  colors: DefaultColors;
  fontSizes: DefaultFontSizes;
  components: ComponentOverrides;
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
    }) => ComponentOverrides;
  };
  children: ReactNode;
};

export const NativeUiContext = createContext<NativeUiContextProps>({
  colors: defaultColors,
  fontSizes: defaultFontSizes,
  components: {},
});

export const NativeUiContextProvider = ({
  theme,
  children,
}: NativeUiContextProviderProps) => {
  const colors = { ...defaultColors, ...theme.colors };
  const fontSizes = { ...defaultFontSizes, ...theme.fontSizes };
  const components = theme.components?.({ colors, fontSizes }) || {};

  return (
    <NativeUiContext.Provider
      value={{
        colors,
        fontSizes,
        components,
      }}
    >
      {children}
    </NativeUiContext.Provider>
  );
};
