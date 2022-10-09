import {
  OpaqueColorValue,
  PressableProps,
  TextProps,
  ViewProps,
} from "react-native";

export type SwitchLabelProps = Omit<TextProps, "children">;
export type SwitchIconProps = TextProps & {
  type: any;
  size?: number;
  name: string;
  color?: string | OpaqueColorValue;
  [key: string]: any;
};
export type SwitchThumbProps = Omit<ViewProps, "children">;
export type SwitchTrackProps = Omit<ViewProps, "children">;

export type SwitchProps = {
  isDisabled?: boolean;
  isToggled: boolean;
  onValueChange: () => void;
  style?: ViewProps["style"];
  __icon?: SwitchIconProps;
  __thumb?: SwitchThumbProps;
  __track?: SwitchTrackProps;
  _disabled?: {
    style?: ViewProps["style"];
    __icon?: SwitchIconProps;
    __thumb?: SwitchThumbProps;
    __track?: SwitchTrackProps;
  };
  _pressed?: {
    style?: ViewProps["style"];
    __icon?: SwitchIconProps;
    __thumb?: SwitchThumbProps;
    __track?: SwitchTrackProps;
  };
  _toggled?: {
    style?: ViewProps["style"];
    __icon?: SwitchIconProps;
    __thumb?: SwitchThumbProps;
    __track?: SwitchTrackProps;
  };
} & Omit<PressableProps, "disabled" | "style">;
