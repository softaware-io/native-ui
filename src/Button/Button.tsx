import { FC } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { ButtonProps } from "./types";

export const Button: FC<ButtonProps> = ({
  style,
  title,
  isDisabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  _disabled,
  _pressed,
  _loading,
  __title,
  __spinner,
  __leftIcon,
  __rightIcon,
  ...props
}) => {
  const { components } = useTheme();
  const theme = components.Button;

  const defaultStyles = useStyles();

  return (
    <Pressable
      {...props}
      style={({ pressed: isPressed }) => [
        defaultStyles.button,
        theme?.style,
        style,
        isPressed && defaultStyles.pressedButton,
        isPressed && theme?._pressed?.style,
        isPressed && _pressed?.style,
        isLoading && defaultStyles.loadingButton,
        isLoading && theme?._loading?.style,
        isLoading && _loading?.style,
        isDisabled && defaultStyles.disabledButton,
        isDisabled && theme?._disabled?.style,
        isDisabled && _disabled?.style,
      ]}
      disabled={isDisabled || isLoading}
    >
      {({ pressed: isPressed }) => (
        <>
          {isLoading && (
            <ActivityIndicator
              {...theme?.__spinner}
              {...__spinner}
              style={[
                defaultStyles.spinner,
                theme?.__spinner?.style,
                __spinner?.style,
              ]}
            />
          )}
          {!!leftIcon && (
            <View
              {...theme?.__leftIcon}
              {...__leftIcon}
              {...(isPressed && theme?._pressed?.__leftIcon)}
              {...(isPressed && _pressed?.__leftIcon)}
              {...(isLoading && theme?._loading?.__leftIcon)}
              {...(isLoading && _loading?.__leftIcon)}
              {...(isDisabled && theme?._disabled?.__leftIcon)}
              {...(isDisabled && _disabled?.__leftIcon)}
              style={[
                defaultStyles.leftIcon,
                theme?.__leftIcon?.style,
                __leftIcon?.style,
                isPressed && theme?._pressed?.__leftIcon?.style,
                isPressed && _pressed?.__leftIcon?.style,
                isLoading && theme?._loading?.__leftIcon?.style,
                isLoading && _loading?.__leftIcon?.style,
                isDisabled && theme?._disabled?.__leftIcon?.style,
                isDisabled && _disabled?.__leftIcon?.style,
              ]}
            >
              {leftIcon}
            </View>
          )}
          <Text
            {...theme?.__title}
            {...__title}
            {...(isPressed && theme?._pressed?.__title)}
            {...(isPressed && _pressed?.__title)}
            {...(isLoading && theme?._loading?.__title)}
            {...(isLoading && _loading?.__title)}
            {...(isDisabled && theme?._disabled?.__title)}
            {...(isDisabled && _disabled?.__title)}
            style={[
              defaultStyles.title,
              theme?.__title?.style,
              __title?.style,
              isPressed && theme?._pressed?.__title?.style,
              isPressed && _pressed?.__title?.style,
              isLoading && theme?._loading?.__title?.style,
              isLoading && _loading?.__title?.style,
              isDisabled && theme?._disabled?.__title?.style,
              isDisabled && _disabled?.__title?.style,
            ]}
          >
            {!isLoading ? title : _loading?.title}
          </Text>
          {!!rightIcon && (
            <View
              {...theme?.__rightIcon}
              {...__rightIcon}
              {...(isPressed && theme?._pressed?.__rightIcon)}
              {...(isPressed && _pressed?.__rightIcon)}
              {...(isLoading && theme?._loading?.__rightIcon)}
              {...(isLoading && _loading?.__rightIcon)}
              {...(isDisabled && theme?._disabled?.__rightIcon)}
              {...(isDisabled && _disabled?.__rightIcon)}
              style={[
                defaultStyles.rightIcon,
                theme?.__rightIcon?.style,
                __rightIcon?.style,
                isPressed && theme?._pressed?.__rightIcon?.style,
                isPressed && _pressed?.__rightIcon?.style,
                isLoading && theme?._loading?.__rightIcon?.style,
                isLoading && _loading?.__rightIcon?.style,
                isDisabled && theme?._disabled?.__rightIcon?.style,
                isDisabled && _disabled?.__rightIcon?.style,
              ]}
            >
              {leftIcon}
            </View>
          )}
        </>
      )}
    </Pressable>
  );
};

const useStyles = createStyles(({ colors, fontSizes }) => ({
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
