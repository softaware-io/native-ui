import {
  ActivityIndicatorIOSProps,
  OpaqueColorValue,
  PressableProps,
  TextProps,
  ViewProps,
} from "react-native";

export type ButtonTitleProps = Omit<TextProps, "children">;
export type ButtonIconProps = TextProps & {
  type: any;
  size?: number;
  name: string;
  color?: string | OpaqueColorValue;
  [key: string]: any;
};
export type ButtonSpinnerProps = ActivityIndicatorIOSProps;

export type ButtonProps = {
  title: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: ViewProps["style"];
  __title?: ButtonTitleProps;
  __spinner?: ButtonSpinnerProps;
  __leftIcon?: ButtonIconProps;
  __rightIcon?: ButtonIconProps;
  _pressed?: NestedButtonProps;
  _disabled?: NestedButtonProps;
  _loading?: NestedButtonProps;
} & Omit<PressableProps, "disabled" | "style">;

export type NestedButtonProps = Partial<
  Omit<
    ButtonProps,
    "isDisabled" | "_disabled" | "isLoading" | "_loading" | "_pressed"
  >
>;
