import { FC } from "react";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "../utils/useTheme";
import { SkeletonProps } from "./types";

export const Skeleton: FC<SkeletonProps> = ({
  style,
  fromColor,
  toColor,
  duration = 1000,
  easing = Easing.ease,
  ...props
}) => {
  const { colors, components } = useTheme();
  const theme = components.Skeleton;

  const finalFromColor = [colors.gray[50], theme?.fromColor, fromColor]
    .filter(Boolean)
    .pop() as string;

  const finalToColor = [colors.gray[200], theme?.toColor, toColor]
    .filter(Boolean)
    .pop() as string;

  const finalDuration = [1000, theme?.duration, duration].filter(Boolean).pop();

  const finalEasing = [Easing.ease, theme?.easing, easing]
    .filter(Boolean)
    .pop();

  const backgroundColor = useSharedValue(finalFromColor);
  backgroundColor.value = withRepeat(
    withTiming(finalToColor, {
      duration: finalDuration,
      easing: finalEasing,
    }),
    -1,
    true
  );

  const animatedStyle = useAnimatedStyle(
    () => ({ backgroundColor: backgroundColor.value }),
    []
  );

  return (
    <Animated.View style={[animatedStyle, theme?.style, style]} {...props} />
  );
};
