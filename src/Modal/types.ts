import { ViewProps } from "react-native";
import { ModalProps as RNModalProps } from "react-native-modal";

export type HeaderProps = {} & ViewProps;

export type ContentProps = {} & ViewProps;

export type ActionsProps = {} & ViewProps;

export type ModalProps = Partial<RNModalProps>;
