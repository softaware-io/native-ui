import { FC } from "react";
import { Bar } from "react-native-progress";
import { useTheme } from "../utils/useTheme";
import { ProgressBarProps } from "./types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";

export const ProgressBar: FC<ProgressBarProps> = ({
  style,
  indeterminateAnimationDuration,
  color,
  unfilledColor,
  borderWidth,
  borderColor,
  borderRadius,
  animationConfig,
  animationType,
  isDisabled = false,
  _disabled,
  width,
  height,
  ...props
}) => {
  const { colors, components } = useTheme();
  const theme = components.ProgressBar;

  const defaultStyles = useStyles();

  return (
    <Bar
      {...props}
      {...theme}
      width={width || theme?.width || null}
      height={height || theme?.height || hp("1.5%")}
      indeterminateAnimationDuration={
        indeterminateAnimationDuration || theme?.indeterminateAnimationDuration
      }
      pointerEvents={isDisabled ? "none" : "auto"}
      color={
        (isDisabled && _disabled?.color) ||
        (isDisabled && theme?._disabled?.color) ||
        (isDisabled && colors.gray[400]) ||
        color ||
        theme?.color ||
        colors.sky[500]
      }
      unfilledColor={
        (isDisabled && _disabled?.unfilledColor) ||
        (isDisabled && theme?._disabled?.unfilledColor) ||
        unfilledColor ||
        theme?.unfilledColor
      }
      borderWidth={
        (isDisabled && _disabled?.borderWidth) ||
        (isDisabled && theme?._disabled?.borderWidth) ||
        borderWidth ||
        theme?.borderWidth ||
        0
      }
      borderColor={
        (isDisabled && _disabled?.borderColor) ||
        (isDisabled && theme?._disabled?.borderColor) ||
        (isDisabled && colors.gray[500]) ||
        borderColor ||
        theme?.borderColor ||
        colors.sky[500]
      }
      borderRadius={
        (isDisabled && _disabled?.borderRadius) ||
        (isDisabled && theme?._disabled?.borderRadius) ||
        borderRadius ||
        theme?.borderRadius
      }
      animationConfig={animationConfig || theme?.animationConfig}
      animationType={animationType || theme?.animationType}
      style={[theme?.style, style, isDisabled && defaultStyles.disabledBar]}
    />
  );
};

const useStyles = createStyles(() => ({
  disabledBar: { opacity: 0.5 },
}));
