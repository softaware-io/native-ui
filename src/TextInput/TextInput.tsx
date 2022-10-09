import { FC, useState } from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { TextInputProps, TextInputStyle } from "./types";

export const TextInput: FC<TextInputProps> = ({
  style,
  isDisabled = false,
  isReadOnly = false,
  _disabled,
  _readOnly,
  _focused,
  onFocus,
  onBlur,
  ...props
}) => {
  const { components } = useTheme();
  const theme = components.TextInput;

  const defaultStyles = useStyles();

  const [isFocused, setIsFocused] = useState(false);

  const {
    placeholderColor: defaultPlaceholderColor,
    ...defaultStylesTextInput
  } = defaultStyles.textInput;

  const { placeholderColor: themePlaceholderColor, ...themeStylesTextInput } =
    StyleSheet.flatten(theme?.style) || {};

  const { placeholderColor, ...stylesTextInput } =
    StyleSheet.flatten(style) || {};

  const {
    placeholderColor: defaultDisabledPlaceholderColor,
    ...defaultStylesDisabledTextInput
  } = defaultStyles.disabledTextInput || {};

  const {
    placeholderColor: themeDisabledPlaceholderColor,
    ...themeStylesDisabledTextInput
  } = StyleSheet.flatten(theme?._disabled?.style) || {};

  const {
    placeholderColor: disabledPlaceholderColor,
    ...stylesDisabledTextInput
  } = StyleSheet.flatten(_disabled?.style) || {};

  const {
    placeholderColor: defaultFocusedPlaceholderColor,
    ...defaultStylesFocusedTextInput
  } = defaultStyles.focusedTextInput || {};

  const {
    placeholderColor: themeFocusedPlaceholderColor,
    ...themeStylesFocusedTextInput
  } = StyleSheet.flatten(theme?._focused?.style) || {};

  const {
    placeholderColor: focusedPlaceholderColor,
    ...stylesFocusedTextInput
  } = StyleSheet.flatten(_focused?.style) || {};

  const {
    placeholderColor: defaultReadOnlyPlaceholderColor,
    ...defaultStylesReadOnlyTextInput
  } = defaultStyles.readOnlyTextInput || {};

  const {
    placeholderColor: themeReadOnlyPlaceholderColor,
    ...themeStylesReadOnlyTextInput
  } = StyleSheet.flatten(theme?._readOnly?.style) || {};

  const {
    placeholderColor: readOnlyPlaceholderColor,
    ...stylesReadOnlyTextInput
  } = StyleSheet.flatten(_readOnly?.style) || {};

  return (
    <RNTextInput
      {...props}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}
      editable={!isDisabled && !isReadOnly}
      placeholderTextColor={
        (isReadOnly && readOnlyPlaceholderColor) ||
        (isReadOnly && themeReadOnlyPlaceholderColor) ||
        (isReadOnly && defaultReadOnlyPlaceholderColor) ||
        (isDisabled && disabledPlaceholderColor) ||
        (isDisabled && themeDisabledPlaceholderColor) ||
        (isDisabled && defaultDisabledPlaceholderColor) ||
        (isFocused && focusedPlaceholderColor) ||
        (isFocused && themeFocusedPlaceholderColor) ||
        (isFocused && defaultFocusedPlaceholderColor) ||
        placeholderColor ||
        themePlaceholderColor ||
        defaultPlaceholderColor
      }
      style={[
        defaultStylesTextInput,
        themeStylesTextInput,
        stylesTextInput,
        isFocused && defaultStylesFocusedTextInput,
        isFocused && themeStylesFocusedTextInput,
        isFocused && stylesFocusedTextInput,
        isDisabled && defaultStylesDisabledTextInput,
        isDisabled && themeStylesDisabledTextInput,
        isDisabled && stylesDisabledTextInput,
        isReadOnly && defaultStylesReadOnlyTextInput,
        isReadOnly && themeStylesReadOnlyTextInput,
        isReadOnly && stylesReadOnlyTextInput,
      ]}
    />
  );
};

type Style = {
  textInput: TextInputStyle;
  disabledTextInput: TextInputStyle;
  focusedTextInput: TextInputStyle;
  readOnlyTextInput: TextInputStyle;
};

const useStyles = createStyles<Style>(({ colors, fontSizes }) => ({
  textInput: {
    fontSize: fontSizes.normal,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    borderWidth: 1,
    borderColor: colors.gray[300],
    color: colors.black,
    placeholderColor: colors.gray[400],
  },
  disabledTextInput: { opacity: 0.5, placeholderColor: undefined },
  readOnlyTextInput: { placeholderColor: undefined },
  focusedTextInput: {
    borderColor: colors.primary[300],
    placeholderColor: undefined,
  },
}));
