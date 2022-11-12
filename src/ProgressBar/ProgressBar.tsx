import merge from "lodash.merge";
import { FC } from "react";
import { Bar } from "react-native-progress";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { ProgressBarProps, ProgressBarStyle } from "./types";

export const ProgressBar: FC<ProgressBarProps> = ({
  isDisabled = false,
  ...props
}) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();

  const defualtProps = {
    useNativeDriver: true,
    style: defaultStyles.bar,
    _disabled: {
      style: defaultStyles.disabledBar,
    },
  };

  const { _disabled, ...remainingProps } = merge(
    defualtProps,
    components.ProgressBar,
    props
  );

  const { style, ...mergedProps } = merge(
    remainingProps,
    isDisabled ? _disabled : undefined
  );

  const {
    color,
    borderColor,
    unfilledColor,
    borderWidth,
    borderRadius,
    width,
    height,
    ...remainingStyle
  } = style as ProgressBarStyle;

  return (
    <Bar
      {...mergedProps}
      width={width}
      height={height}
      pointerEvents={isDisabled ? "none" : "auto"}
      color={color}
      unfilledColor={unfilledColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      borderRadius={borderRadius}
      style={remainingStyle}
    />
  );
};

type Style = {
  bar: ProgressBarStyle;
  disabledBar: ProgressBarStyle;
};

const useStyles = createStyles<Style>(({ colors }) => ({
  bar: {
    color: colors.sky[500],
    borderColor: colors.sky[600],
    borderWidth: 0,
    unfilledColor: colors.blue[100],
    borderRadius: wp("5%"),
    width: null,
    height: hp("1.5%"),
  },
  disabledBar: {
    opacity: 0.5,
    color: colors.gray[400],
    borderColor: colors.gray[600],
    unfilledColor: colors.gray[200],
  },
}));
