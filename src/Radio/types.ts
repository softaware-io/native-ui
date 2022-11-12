import { ReactElement } from "react";
import {
  OpaqueColorValue,
  PressableProps,
  TextProps,
  ViewProps,
} from "react-native";

export type RadioLabelProps = Omit<TextProps, "children">;
export type RadioIconProps = TextProps & {
  type: any;
  size?: number;
  name: string;
  color?: string | OpaqueColorValue;
  [key: string]: any;
};
export type RadioThumbProps = Omit<ViewProps, "children">;

export type RadioProps = {
  children: ReactElement<RadioOptionProps> | ReactElement<RadioOptionProps>[];
  onValueChange: (value: any) => void;
  value: any;
} & Omit<ViewProps, "children">;

export type RadioOptionProps = {
  value: any;
  label: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  style?: ViewProps["style"];
  __label?: RadioLabelProps;
  __thumb?: RadioThumbProps;
  __icon?: RadioIconProps;
  _disabled?: NestedRadioOptionProps;
  _pressed?: NestedRadioOptionProps;
  _checked?: NestedRadioOptionProps;
} & Omit<PressableProps, "disabled" | "style">;

export type NestedRadioOptionProps = Partial<
  Omit<
    RadioOptionProps,
    "isDisabled" | "_disabled" | "isChecked" | "_checked" | "_pressed"
  >
>;
