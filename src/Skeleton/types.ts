import { EasingFunction, StyleProp, ViewProps, ViewStyle } from "react-native";
import { EasingFunctionFactory } from "react-native-reanimated";

export type SkeletonStyle = Omit<ViewStyle, "backgroundColor"> & {
  fromColor?: string;
  toColor?: string;
};

export type SkeletonProps = {
  duration?: number;
  easing?: EasingFunction | EasingFunctionFactory;
  style?: StyleProp<SkeletonStyle>;
} & Omit<ViewProps, "style">;
