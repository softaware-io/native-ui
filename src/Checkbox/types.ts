import {
  OpaqueColorValue,
  PressableProps,
  TextProps,
  ViewProps,
} from "react-native";

export type CheckboxLabelProps = Omit<TextProps, "children">;
export type CheckboxIconProps = TextProps & {
  type: any;
  size?: number;
  name: string;
  color?: string | OpaqueColorValue;
  [key: string]: any;
};

export type CheckboxProps = {
  label?: string;
  isDisabled?: boolean;
  value: boolean;
  onValueChange: () => void;
  style?: ViewProps["style"];
  __label?: CheckboxLabelProps;
  __icon?: CheckboxIconProps;
  _disabled?: {
    style?: ViewProps["style"];
    __label?: CheckboxLabelProps;
    __icon?: CheckboxIconProps;
  };
  _pressed?: {
    style?: ViewProps["style"];
    __label?: CheckboxLabelProps;
    __icon?: CheckboxIconProps;
  };
  _checked?: {
    style?: ViewProps["style"];
    __label?: CheckboxLabelProps;
  };
} & Omit<PressableProps, "disabled">;
