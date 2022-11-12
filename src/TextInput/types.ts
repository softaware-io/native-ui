import {
  ColorValue,
  StyleProp,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from "react-native";

export type TextInputStyle = TextStyle & {
  placeholderColor?: string | ColorValue;
};

export type TextInputProps = {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  style?: StyleProp<TextInputStyle>;
  _disabled?: NestedTextInputProps;
  _readOnly?: NestedTextInputProps;
  _focused?: NestedTextInputProps;
} & Omit<RNTextInputProps, "editable" | "style" | "placeholderTextColor">;

export type NestedTextInputProps = Partial<
  Omit<
    TextInputProps,
    "isDisabled" | "_disabled" | "isReadOnly" | "_readOnly" | "_focused"
  >
>;
