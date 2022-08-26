import { createContext, ReactNode } from "react";
import {
  DefaultColors,
  DefaultFontSizes,
  ComponentOverrides,
  defaultColors,
  defaultFontSizes,
} from "./theme";

type UiContextProps = {
  colors: DefaultColors;
  fontSizes: DefaultFontSizes;
  components: ComponentOverrides;
};

type UiContextProviderProps = {
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

export const UiContext = createContext<UiContextProps>({
  colors: defaultColors,
  fontSizes: defaultFontSizes,
  components: {},
});

export const UiContextProvider = ({
  theme,
  children,
}: UiContextProviderProps) => {
  const colors = { ...defaultColors, ...theme.colors };
  const fontSizes = { ...defaultFontSizes, ...theme.fontSizes };
  const components = theme.components?.({ colors, fontSizes }) || {};

  return (
    <UiContext.Provider
      value={{
        colors,
        fontSizes,
        components,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
