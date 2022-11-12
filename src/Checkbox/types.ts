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
export type CheckboxThumbProps = Omit<ViewProps, "children">;

export type CheckboxProps = {
  label?: string;
  isDisabled?: boolean;
  isChecked: boolean;
  onValueChange: () => void;
  style?: ViewProps["style"];
  __label?: CheckboxLabelProps;
  __icon?: CheckboxIconProps;
  __thumb?: CheckboxThumbProps;
  _disabled?: NestedCheckboxProps;
  _pressed?: NestedCheckboxProps;
  _checked?: NestedCheckboxProps;
} & Omit<PressableProps, "disabled" | "style" | "onPress">;

export type NestedCheckboxProps = Partial<
  Omit<
    CheckboxProps,
    "isDisabled" | "_disabled" | "isChecked" | "_checked" | "_pressed"
  >
>;
