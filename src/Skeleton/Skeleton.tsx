import merge from "lodash.merge";
import { FC, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../utils/useTheme";
import { SkeletonProps, SkeletonStyle } from "./types";

export const Skeleton: FC<SkeletonProps> = ({ ...props }) => {
  const { colors, components } = useTheme();

  const defualtProps = {
    duration: 1000,
    easing: Easing.ease,
    style: {
      fromColor: colors.gray[50],
      toColor: colors.gray[200],
    },
  };

  const { duration, easing, style, ...containerProps } = merge(
    defualtProps,
    components.Skeleton,
    props
  );

  const { fromColor, toColor, ...remainingStyle } = style as SkeletonStyle;

  const backgroundColor = useSharedValue(fromColor);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  useEffect(() => {
    if (toColor) {
      backgroundColor.value = withRepeat(
        withTiming(toColor, {
          duration: duration,
          easing: easing,
        }),
        -1,
        true
      );
    }
  }, [toColor, duration, easing, backgroundColor]);

  return (
    <Animated.View
      {...containerProps}
      style={[remainingStyle, animatedStyle]}
    />
  );
};
