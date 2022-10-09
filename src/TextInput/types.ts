import {
  ColorValue,
  StyleProp,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from "react-native";

export type TextInputStyle = TextStyle & {
  placeholderColor?: ColorValue;
};

export type TextInputProps = {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  style?: StyleProp<TextInputStyle>;
  _disabled?: {
    style?: StyleProp<TextInputStyle>;
  };
  _readOnly?: {
    style?: StyleProp<TextInputStyle>;
  };
  _focused?: {
    style?: StyleProp<TextInputStyle>;
  };
} & Omit<RNTextInputProps, "editable" | "style">;
