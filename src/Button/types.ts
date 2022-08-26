import { ReactNode } from "react";
import {
  ActivityIndicatorIOSProps,
  PressableProps,
  TextProps,
  ViewProps,
} from "react-native";

export type ButtonTitleProps = Omit<TextProps, "children">;

export type ButtonProps = {
  title: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: ViewProps["style"];
  __title?: ButtonTitleProps;
  __spinner?: ActivityIndicatorIOSProps;
  __leftIcon?: ViewProps;
  __rightIcon?: ViewProps;
  _pressed?: {
    style?: ViewProps["style"];
    __title?: ButtonTitleProps;
    __leftIcon?: ViewProps;
    __rightIcon?: ViewProps;
  };
  _disabled?: {
    style?: ViewProps["style"];
    __title?: ButtonTitleProps;
    __leftIcon?: ViewProps;
    __rightIcon?: ViewProps;
  };
  _loading?: {
    title?: string;
    style?: ViewProps["style"];
    __title?: ButtonTitleProps;
    __leftIcon?: ViewProps;
    __rightIcon?: ViewProps;
  };
} & Omit<PressableProps, "disabled">;
