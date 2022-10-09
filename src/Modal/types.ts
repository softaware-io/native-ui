import { ViewProps } from "react-native";
import { ModalProps as RNModalProps } from "react-native-modal";

export type ModalHeaderProps = ViewProps;

export type ModalContentProps = ViewProps;

export type ModalActionsProps = ViewProps;

export type ModalProps = Partial<RNModalProps>;
