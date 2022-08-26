import { EasingFunction, ViewProps } from "react-native";
import { EasingFunctionFactory } from "react-native-reanimated";

export type SkeletonProps = {
  fromColor?: string;
  toColor?: string;
  duration?: number;
  easing?: EasingFunction | EasingFunctionFactory;
} & ViewProps;
