import { TextInputProps as RNTextInputProps } from "react-native";

export type TextInputProps = {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  _disabled?: {
    style?: RNTextInputProps["style"];
    placeholderTextColor?: string;
  };
  _readOnly?: {
    style?: RNTextInputProps["style"];
    placeholderTextColor?: string;
  };
  _focused?: {
    style?: RNTextInputProps["style"];
    placeholderTextColor?: string;
  };
} & Omit<RNTextInputProps, "editable">;
