import { PickerProps } from "@react-native-picker/picker";
import { ReactNode } from "react";
import { ViewProps } from "react-native";
import { ModalProps } from "../Modal/types";
import { TextInputProps } from "../TextInput/types";

export type SelectTextInputProps = Omit<
  TextInputProps,
  | "isDisabled"
  | "isReadOnly"
  | "_readOnly"
  | "_focused"
  | "placeholder"
  | "placeholderTextColor"
>;

export type SelectPickerProps = Omit<
  PickerProps,
  | "enabled"
  | "children"
  | "selectedValue"
  | "onValueChange"
  | "placeholder"
  | "prompt"
>;

export type SelectModalProps = ModalProps;

export type SelectProps = {
  style?: ViewProps["style"];
  isDisabled?: boolean;
  value: string;
  displayValue?: (value: string) => string;
  onValueChange: (itemValue: string) => void;
  placeholder?: string;
  children: ReactNode;
  _disabled?: {
    style?: ViewProps["style"];
  };
  __textInput?: SelectTextInputProps;
  __picker?: SelectPickerProps;
  __modal?: SelectModalProps;
};
