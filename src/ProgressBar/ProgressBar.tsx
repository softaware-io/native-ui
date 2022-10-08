import { FC } from "react";
import { Bar } from "react-native-progress";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { ProgressBarProps } from "./types";

export const ProgressBar: FC<ProgressBarProps> = ({
  style,
  indeterminateAnimationDuration,
  animationConfig,
  animationType,
  isDisabled = false,
  useNativeDriver = true,
  _disabled,
  ...props
}) => {
  const { components } = useTheme();
  const theme = components.ProgressBar;

  const defaultStyles = useStyles();

  const {
    color: defaultColor,
    borderColor: defaultBorderColor,
    unfilledColor: defaultUnfilledColor,
    borderWidth: defaultBorderWidth,
    borderRadius: defaultBorderRadius,
    width: defaultWidth,
    height: defaultHeight,
    ...defaultStylesBar
  } = (defaultStyles.bar || {}) as Record<string, any>;

  const {
    color: themeColor,
    borderColor: themeBorderColor,
    unfilledColor: themeUnfilledColor,
    borderWidth: themeBorderWidth,
    borderRadius: themeBorderRadius,
    width: themeWidth,
    height: themeHeight,
    ...themeStylesBar
  } = (theme?.style || {}) as Record<string, any>;

  const {
    color,
    borderColor,
    unfilledColor,
    borderWidth,
    borderRadius,
    width,
    height,
    ...stylesBar
  } = (style || {}) as Record<string, any>;

  const {
    color: defaultDisabledColor,
    borderColor: defaultDisabledBorderColor,
    unfilledColor: defaultDisabledUnfilledColor,
    borderWidth: defaultDisabledBorderWidth,
    borderRadius: defaultDisabledBorderRadius,
    width: defaultDisabledWidth,
    height: defaultDisabledHeight,
    ...defaultStylesDisabledBar
  } = (defaultStyles.disabledBar || {}) as Record<string, any>;

  const {
    color: themeDisabledColor,
    borderColor: themeDisabledBorderColor,
    unfilledColor: themeDisabledUnfilledColor,
    borderWidth: themeDisabledBorderWidth,
    borderRadius: themeDisabledBorderRadius,
    width: themeDisabledWidth,
    height: themeDisabledHeight,
    ...themeStylesDisabledBar
  } = (theme?._disabled?.style || {}) as Record<string, any>;

  const {
    color: disabledColor,
    borderColor: disabledBorderColor,
    unfilledColor: disabledUnfilledColor,
    borderWidth: disabledBorderWidth,
    borderRadius: disabledBorderRadius,
    width: disabledWidth,
    height: disabledHeight,
    ...stylesDisabledBar
  } = (_disabled?.style || {}) as Record<string, any>;

  const transformWidth = (w: any) => {
    if (w === "auto") {
      return null;
    }
    return w;
  };

  return (
    <Bar
      {...props}
      useNativeDriver={useNativeDriver}
      width={transformWidth(
        (isDisabled && disabledWidth) ||
          (isDisabled && themeDisabledWidth) ||
          (isDisabled && defaultDisabledWidth) ||
          width ||
          themeWidth ||
          defaultWidth
      )}
      height={
        (isDisabled && disabledHeight) ||
        (isDisabled && themeDisabledHeight) ||
        (isDisabled && defaultDisabledHeight) ||
        height ||
        themeHeight ||
        defaultHeight
      }
      indeterminateAnimationDuration={
        indeterminateAnimationDuration || theme?.indeterminateAnimationDuration
      }
      pointerEvents={isDisabled ? "none" : "auto"}
      color={
        (isDisabled && disabledColor) ||
        (isDisabled && themeDisabledColor) ||
        (isDisabled && defaultDisabledColor) ||
        color ||
        themeColor ||
        defaultColor
      }
      unfilledColor={
        (isDisabled && disabledUnfilledColor) ||
        (isDisabled && themeDisabledUnfilledColor) ||
        (isDisabled && defaultDisabledUnfilledColor) ||
        unfilledColor ||
        themeUnfilledColor ||
        defaultUnfilledColor
      }
      borderWidth={
        (isDisabled && disabledBorderWidth) ||
        (isDisabled && themeDisabledBorderWidth) ||
        (isDisabled && defaultDisabledBorderWidth) ||
        borderWidth ||
        themeBorderWidth ||
        defaultBorderWidth
      }
      borderColor={
        (isDisabled && disabledBorderColor) ||
        (isDisabled && themeDisabledBorderColor) ||
        (isDisabled && defaultDisabledBorderColor) ||
        borderColor ||
        themeBorderColor ||
        defaultBorderColor
      }
      borderRadius={
        (isDisabled && disabledBorderRadius) ||
        (isDisabled && themeDisabledBorderRadius) ||
        (isDisabled && defaultDisabledBorderRadius) ||
        borderRadius ||
        themeBorderRadius ||
        defaultBorderRadius
      }
      animationConfig={animationConfig || theme?.animationConfig}
      animationType={animationType || theme?.animationType}
      style={[
        defaultStylesBar,
        themeStylesBar,
        stylesBar,
        isDisabled && defaultStylesDisabledBar,
        isDisabled && themeStylesDisabledBar,
        isDisabled && stylesDisabledBar,
      ]}
    />
  );
};

const useStyles = createStyles(({ colors }) => ({
  bar: {
    color: colors.sky[500],
    borderColor: colors.sky[600],
    borderWidth: 0,
    unfilledColor: colors.blue[100],
    borderRadius: wp("5%"),
    width: "auto",
    height: hp("1.5%"),
  },
  disabledBar: {
    opacity: 0.5,
    color: colors.gray[400],
    borderColor: colors.gray[600],
    unfilledColor: colors.gray[200],
    borderWidth: undefined,
    borderRadius: undefined,
    width: undefined,
    height: undefined,
  },
}));
