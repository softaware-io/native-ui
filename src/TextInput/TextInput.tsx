import { FC, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { TextInputProps } from "./types";

export const TextInput: FC<TextInputProps> = ({
  style,
  isDisabled = false,
  isReadOnly = false,
  _disabled,
  _readOnly,
  _focused,
  onFocus,
  onBlur,
  placeholderTextColor,
  ...props
}) => {
  const { colors, components } = useTheme();
  const theme = components.TextInput;

  const defaultStyles = useStyles();

  const [isFocused, setIsFocused] = useState(false);

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
      placeholderTextColor={[
        colors.gray[400],
        theme?.placeholderTextColor,
        placeholderTextColor,
        isFocused ? theme?._focused?.placeholderTextColor : undefined,
        isFocused ? _focused?.placeholderTextColor : undefined,
        isDisabled ? theme?._disabled?.placeholderTextColor : undefined,
        isDisabled ? _disabled?.placeholderTextColor : undefined,
        isReadOnly ? theme?._readOnly?.placeholderTextColor : undefined,
        isReadOnly ? _readOnly?.placeholderTextColor : undefined,
      ]
        .filter(Boolean)
        .pop()}
      style={[
        defaultStyles.textInput,
        theme?.style,
        style,
        isFocused && defaultStyles.focusedTextInput,
        isFocused && theme?._focused?.style,
        isFocused && _focused?.style,
        isDisabled && defaultStyles.disabledTextInput,
        isDisabled && theme?._disabled?.style,
        isDisabled && _disabled?.style,
        isReadOnly && theme?._readOnly?.style,
        isReadOnly && _readOnly?.style,
      ]}
    />
  );
};

const useStyles = createStyles(({ colors, fontSizes }) => ({
  textInput: {
    fontSize: fontSizes.normal,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
    borderWidth: 1,
    borderColor: colors.gray[300],
    color: colors.black,
  },
  disabledTextInput: { opacity: 0.5 },
  focusedTextInput: {
    borderColor: colors.primary[300],
  },
}));
