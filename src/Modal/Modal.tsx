import { FC } from "react";
import { View } from "react-native";
import RNModal from "react-native-modal";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { ActionsProps, ContentProps, HeaderProps, ModalProps } from "./types";

export const Modal: FC<ModalProps> & { Header: typeof Header } & {
  Content: typeof Content;
} & { Actions: typeof Actions } = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal;

  const defaultStyles = useStyles();

  return (
    <RNModal
      useNativeDriverForBackdrop
      coverScreen={false}
      backdropOpacity={0.4}
      {...props}
      style={[defaultStyles.modal, theme?.style, style]}
    >
      {children}
    </RNModal>
  );
};

const Header: FC<HeaderProps> = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal?.Header;

  const defaultStyles = useStyles();

  return (
    <View style={[defaultStyles.modalHeader, theme?.style, style]} {...props}>
      {children}
    </View>
  );
};

const Content: FC<ContentProps> = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal?.Content;

  const defaultStyles = useStyles();

  return (
    <View style={[defaultStyles.modalContent, theme?.style, style]} {...props}>
      {children}
    </View>
  );
};

const Actions: FC<ActionsProps> = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal?.Actions;

  const defaultStyles = useStyles();

  return (
    <View style={[defaultStyles.modalActions, theme?.style, style]} {...props}>
      {children}
    </View>
  );
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Actions = Actions;

const useStyles = createStyles(({ colors }) => ({
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
