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
} & ViewProps;

export type RadioOptionProps = {
  value: any;
  label: string;
  isDisabled?: boolean;
  isChecked?: boolean;
  style?: ViewProps["style"];
  __label?: RadioLabelProps;
  __thumb?: RadioThumbProps;
  __icon?: RadioIconProps;
  _disabled?: {
    style?: ViewProps["style"];
    __label?: RadioLabelProps;
    __thumb?: RadioThumbProps;
    __icon?: RadioIconProps;
  };
  _pressed?: {
    style?: ViewProps["style"];
    __label?: RadioLabelProps;
    __thumb?: RadioThumbProps;
    __icon?: RadioIconProps;
  };
  _checked?: {
    style?: ViewProps["style"];
    __label?: RadioLabelProps;
    __thumb?: RadioThumbProps;
  };
} & Omit<PressableProps, "disabled" | "style">;
