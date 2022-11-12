import merge from "lodash.merge";
import { FC } from "react";
import { View, ViewStyle } from "react-native";
import RNModal from "react-native-modal";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import {
  ModalActionsProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalProps,
} from "./types";

export const Modal: FC<ModalProps> & {
  Header: typeof Header;
  Content: typeof Content;
  Actions: typeof Actions;
} = ({ children, ...props }) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();

  const defualtProps = {
    coverScreen: false,
    backdropOpacity: 0.4,
    useNativeDriverForBackdrop: true,
    style: defaultStyles.modal,
  };

  const containerProps = merge(defualtProps, components.Modal, props);

  return <RNModal {...containerProps}>{children}</RNModal>;
};

const Header: FC<ModalHeaderProps> = ({ children, ...props }) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();

  const defualtProps = {
    style: defaultStyles.modalHeader,
  };

  const containerProps = merge(defualtProps, components.Modal?.Header, props);

  return <View {...containerProps}>{children}</View>;
};

const Content: FC<ModalContentProps> = ({ children, ...props }) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();

  const defualtProps = {
    style: defaultStyles.modalContent,
  };

  const containerProps = merge(defualtProps, components.Modal?.Content, props);

  return <View {...containerProps}>{children}</View>;
};

const Actions: FC<ModalActionsProps> = ({ children, ...props }) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();

  const defualtProps = {
    style: defaultStyles.modalActions,
  };

  const containerProps = merge(defualtProps, components.Modal?.Actions, props);

  return <View {...containerProps}>{children}</View>;
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Actions = Actions;

type Style = {
  modal: ViewStyle;
  modalHeader: ViewStyle;
  modalContent: ViewStyle;
  modalActions: ViewStyle;
};

const useStyles = createStyles<Style>(({ colors }) => ({
  modal: {
    padding: wp("4%"),
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    flex: 0,
    borderRadius: wp("4%"),
    backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalContent: { marginTop: hp("3%") },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("5%"),
  },
}));
