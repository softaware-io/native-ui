import { StyleProp } from "react-native";
import { BarPropTypes } from "react-native-progress";

export type ProgressBarStyle = BarPropTypes["style"] &
  StyleProp<{
    unfilledColor?: string;
    color?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    width?: number | "auto";
    height?: number;
  }>;

export type ProgressBarProps = {
  isDisabled?: boolean;
  style?: ProgressBarStyle;
  _disabled?: {
    style?: ProgressBarStyle;
  };
} & Omit<BarPropTypes, "style">;
