import { forwardRef, Ref, useState } from "react";
import { TextInput as RNTextInput } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { mergeProps } from "../utils/mergeProps";
import { useTheme } from "../utils/useTheme";
import { TextInputProps, TextInputStyle } from "./types";

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    { isDisabled = false, isReadOnly = false, ...props }: TextInputProps,
    ref: Ref<RNTextInput>
  ) => {
    const { components } = useTheme();
    const defaultStyles = useStyles();
    const [isFocused, setIsFocused] = useState(false);

    const defualtProps = {
      style: defaultStyles.textInput,
      _focused: {
        style: defaultStyles.focusedTextInput,
      },
      _disabled: {
        style: defaultStyles.disabledTextInput,
      },
    };

    const { _disabled, _focused, _readOnly, ...remainingProps } = mergeProps(
      defualtProps,
      components.TextInput,
      props
    );

    const mergedProps = mergeProps(
      remainingProps,
      isFocused ? _focused : undefined,
      isReadOnly ? _readOnly : undefined,
      isDisabled ? _disabled : undefined
    );

    const { onFocus, onBlur, style, ...containerProps } = mergedProps;
    const { placeholderColor, ...remainingStyle } = style as TextInputStyle;

    return (
      <RNTextInput
        ref={ref}
        {...containerProps}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        editable={!isDisabled && !isReadOnly}
        placeholderTextColor={placeholderColor}
        style={remainingStyle}
      />
    );
  }
);

type Style = {
  textInput: TextInputStyle;
  disabledTextInput: TextInputStyle;
  focusedTextInput: TextInputStyle;
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
  disabledTextInput: { opacity: 0.5 },
  focusedTextInput: {
    borderColor: colors.primary[300],
  },
}));
