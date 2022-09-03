import { createElement, FC, ReactElement } from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { RadioOptionProps, RadioProps } from "./types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import maxBorderRadius from "../utils/maxBorderRadius";
import { FontAwesome } from "@expo/vector-icons";

export const Radio: FC<RadioProps> & { Option: typeof Option } = ({
  style,
  children,
  onValueChange,
  value,
  ...props
}) => {
  const { components } = useTheme();
  const theme = components.Radio;

  const createRadioOptions = (
    options: ReactElement<RadioOptionProps> | ReactElement<RadioOptionProps>[]
  ) => {
    const elements = Array.isArray(options) ? options : [options];

    return elements.map((element, index) =>
      createElement(element.type, {
        ...element.props,
        key: index,
        isChecked: element.props.isChecked || element.props.value === value,
        onPress: (e: GestureResponderEvent) => {
          onValueChange(element.props.value);
          element.props.onPress?.(e);
        },
      })
    );
  };

  return (
    <View {...props} style={[theme?.style, style]}>
      {createRadioOptions(children)}
    </View>
  );
};

const Option: FC<RadioOptionProps> = ({
  style,
  label,
  isDisabled = false,
  isChecked = false,
  _disabled,
  _pressed,
  _checked,
  __label,
  __thumb,
  __icon,
  ...props
}) => {
  const { components } = useTheme();
  const theme = components.Radio?.Option;

  const defaultStyles = useStyles();

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      style={({ pressed: isPressed }) => [
        defaultStyles.optionContainer,
        theme?.style,
        style,
        isChecked && theme?._checked?.style,
        isChecked && _checked?.style,
        isPressed && theme?._pressed?.style,
        isPressed && _pressed?.style,
        isDisabled && theme?._disabled?.style,
        isDisabled && _disabled?.style,
      ]}
    >
      {({ pressed: isPressed }) => (
        <>
          <View
            style={[
              defaultStyles.option,
              theme?.__thumb?.style,
              __thumb?.style,
              isChecked && theme?._checked?.__thumb?.style,
              isChecked && _checked?.__thumb?.style,
              isPressed && defaultStyles.pressedOption,
              isPressed && theme?._pressed?.__thumb?.style,
              isPressed && _pressed?.__thumb?.style,
              isDisabled && defaultStyles.disabledOption,
              isDisabled && theme?._disabled?.__thumb?.style,
              isDisabled && _disabled?.__thumb?.style,
            ]}
          >
            {isChecked &&
              createElement(__icon?.type || FontAwesome, {
                name: "circle",
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
        </>
      )}
    </Pressable>
  );
};

Radio.Option = Option;

const useStyles = createStyles(({ colors, fontSizes }) => ({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    width: wp("7%"),
    height: wp("7%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: wp("0.5%"),
    borderColor: colors.primary[500],
    backgroundColor: "transparent",
    borderRadius: maxBorderRadius(),
  },
  pressedOption: { opacity: 0.9 },
  disabledOption: { opacity: 0.5 },
  icon: {
    fontSize: wp("5%"),
    color: colors.primary[500],
  },
  label: {
    marginLeft: wp("2%"),
    fontWeight: "500",
    fontSize: fontSizes.sm,
  },
  disabledLabel: { opacity: 0.5 },
}));
