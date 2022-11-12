import { PickerProps } from "@react-native-picker/picker";
import { ViewProps } from "react-native";
import { ButtonProps } from "../Button/types";
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

export type SelectButton = ButtonProps;

export type SelectProps = {
  isDisabled?: boolean;
  value: string;
  displayValue?: (value: string) => string;
  onValueChange: (itemValue: string) => void;
  placeholder?: string;
  _disabled?: NestedSelectProps;
  __textInput?: SelectTextInputProps;
  __picker?: SelectPickerProps;
  __modal?: SelectModalProps;
  __button?: SelectButton;
} & ViewProps;

export type NestedSelectProps = Partial<
  Omit<SelectProps, "isDisabled" | "_disabled">
>;
