import { StyleProp, ViewStyle } from "react-native";
import { BarPropTypes } from "react-native-progress";

export type ProgressBarStyle = Omit<
  ViewStyle,
  "width" | "height" | "borderColor"
> & {
  unfilledColor?: string;
  color?: string;
  borderColor?: string;
  height?: number;
  width?: number | null;
};

export type ProgressBarProps = {
  isDisabled?: boolean;
  style?: StyleProp<ProgressBarStyle>;
  _disabled?: NestedProgressBarProps;
} & Omit<
  BarPropTypes,
  | "style"
  | "unfilledColor"
  | "borderWidth"
  | "borderColor"
  | "width"
  | "height"
  | "color"
  | "borderRadius"
>;

export type NestedProgressBarProps = Partial<
  Omit<ProgressBarProps, "isDisabled" | "_disabled">
>;
