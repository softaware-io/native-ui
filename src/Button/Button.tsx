import merge from "lodash.merge";
import { createElement, FC, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { ButtonProps } from "./types";

export const Button: FC<ButtonProps> = ({
  isDisabled = false,
  isLoading = false,
  ...props
}) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();
  const [isPressed, setIsPressed] = useState(false);

  const defualtProps = {
    style: defaultStyles.button,
    _pressed: {
      style: defaultStyles.pressedButton,
    },
    _loading: {
      style: defaultStyles.loadingButton,
    },
    _disabled: {
      style: defaultStyles.disabledButton,
    },
    __spinner: {
      style: defaultStyles.spinner,
    },
    __leftIcon: {
      style: defaultStyles.leftIcon,
    },
    __rightIcon: {
      style: defaultStyles.rightIcon,
    },
    __title: {
      style: defaultStyles.title,
    },
  };

  const { _disabled, _pressed, _loading, ...remainingProps } = merge(
    defualtProps,
    components.Button,
    props
  );

  const { title, __title, __spinner, __leftIcon, __rightIcon, ...mergedProps } =
    merge(
      remainingProps,
      isPressed ? _pressed : undefined,
      isLoading ? _loading : undefined,
      isDisabled ? _disabled : undefined
    );

  const { onPressIn, onPressOut, ...containerProps } = mergedProps;

  return (
    <Pressable
      {...containerProps}
      onPressIn={(e) => {
        setIsPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setIsPressed(false);
        onPressOut?.(e);
      }}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <ActivityIndicator {...__spinner} />}
      {!!__leftIcon.type && createElement(__leftIcon?.type, __leftIcon)}
      <Text {...__title}>{title}</Text>
      {!!__rightIcon.type && createElement(__rightIcon?.type, __rightIcon)}
    </Pressable>
  );
};

type Style = {
  button: ViewStyle;
  pressedButton: ViewStyle;
  loadingButton: ViewStyle;
  disabledButton: ViewStyle;
  spinner: ViewStyle;
  leftIcon: TextStyle;
  rightIcon: TextStyle;
  title: TextStyle;
};

const useStyles = createStyles<Style>(({ colors, fontSizes }) => ({
  button: {
    paddingHorizontal: wp("6%"),
    paddingVertical: hp("2%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[500],
  },
  pressedButton: { backgroundColor: colors.primary[600] },
  loadingButton: { opacity: 0.7 },
  disabledButton: { opacity: 0.5 },
  spinner: { marginRight: wp("3%") },
  leftIcon: { marginRight: wp("2%") },
  rightIcon: { marginLeft: wp("2%") },
  title: {
    fontWeight: "500",
    fontSize: fontSizes.normal,
  },
}));
