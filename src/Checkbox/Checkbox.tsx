import { Octicons } from "@expo/vector-icons";
import { createElement, FC } from "react";
import { Pressable, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { CheckboxProps } from "./types";

export const Checkbox: FC<CheckboxProps> = ({
  style,
  label,
  isDisabled = false,
  onValueChange,
  isChecked = false,
  _disabled,
  _pressed,
  _checked,
  __label,
  __icon,
  __thumb,
  ...props
}) => {
  const { components } = useTheme();
  const theme = components.Checkbox;

  const defaultStyles = useStyles();

  return (
    <Pressable
      {...props}
      style={({ pressed: isPressed }) => [
        defaultStyles.container,
        theme?.style,
        style,
        isChecked && theme?._checked?.style,
        isChecked && _checked?.style,
        isPressed && theme?._pressed?.style,
        isPressed && _pressed?.style,
        isDisabled && theme?._disabled?.style,
        isDisabled && _disabled?.style,
      ]}
      onPress={onValueChange}
      disabled={isDisabled}
    >
      {({ pressed: isPressed }) => (
        <>
          <View
            style={[
              defaultStyles.checkbox,
              theme?.__thumb?.style,
              __thumb?.style,
              isChecked && defaultStyles.checkedCheckbox,
              isChecked && theme?._checked?.__thumb?.style,
              isChecked && _checked?.__thumb?.style,
              isPressed && defaultStyles.pressedCheckbox,
              isPressed && theme?._pressed?.__thumb?.style,
              isPressed && _pressed?.__thumb?.style,
              isDisabled && defaultStyles.disabledCheckbox,
              isDisabled && theme?._disabled?.__thumb?.style,
              isDisabled && _disabled?.__thumb?.style,
            ]}
          >
            {isChecked &&
              createElement(__icon?.type || Octicons, {
                name: "check",
                allowFontScaling: false,
                ...theme?.__icon,
                ...__icon,
                ...(isPressed && theme?._pressed?.__icon),
                ...(isPressed && _pressed?.__icon),
                ...(isDisabled && theme?._disabled?.__icon),
                ...(isDisabled && _disabled?.__icon),
                style: [
                  defaultStyles.icon,
                  theme?.__icon?.style,
                  __icon?.style,
                  isPressed && theme?._pressed?.__icon?.style,
                  isPressed && _pressed?.__icon?.style,
                  isDisabled && theme?._disabled?.__icon?.style,
                  isDisabled && _disabled?.__icon?.style,
                ],
              })}
          </View>
          {!!label && (
            <Text
              {...theme?.__label}
              {...__label}
              {...(isChecked && theme?._checked?.__label)}
              {...(isChecked && _checked?.__label)}
              {...(isPressed && theme?._pressed?.__label)}
              {...(isPressed && _pressed?.__label)}
              {...(isDisabled && theme?._disabled?.__label)}
              {...(isDisabled && _disabled?.__label)}
              style={[
                defaultStyles.label,
                theme?.__label?.style,
                __label?.style,
                isChecked && theme?._checked?.__label?.style,
                isChecked && _checked?.__label?.style,
                isPressed && theme?._pressed?.__label?.style,
                isPressed && _pressed?.__label?.style,
                isDisabled && defaultStyles.disabledLabel,
                isDisabled && theme?._disabled?.__label?.style,
                isDisabled && _disabled?.__label?.style,
              ]}
            >
              {label}
            </Text>
          )}
        </>
      )}
    </Pressable>
  );
};

const useStyles = createStyles(({ colors, fontSizes }) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    width: wp("7%"),
    height: wp("7%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: wp("0.5%"),
    borderColor: colors.primary[500],
    backgroundColor: "transparent",
  },
  pressedCheckbox: { opacity: 0.9 },
  checkedCheckbox: {
    backgroundColor: colors.primary[500],
  },
  disabledCheckbox: { opacity: 0.5 },
  icon: {
    fontSize: wp("5%"),
  },
  label: {
    marginLeft: wp("2%"),
    fontWeight: "500",
    fontSize: fontSizes.sm,
  },
  disabledLabel: { opacity: 0.5 },
}));
