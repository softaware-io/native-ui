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

export const Modal: FC<ModalProps> & { Header: typeof Header } & {
  Content: typeof Content;
} & { Actions: typeof Actions } = ({
  style,
  children,
  coverScreen = false,
  backdropOpacity = 0.4,
  useNativeDriverForBackdrop = true,
  ...props
}) => {
  const { components } = useTheme();
  const theme = components.Modal;

  const defaultStyles = useStyles();

  return (
    <RNModal
      {...props}
      useNativeDriverForBackdrop={useNativeDriverForBackdrop}
      coverScreen={coverScreen}
      backdropOpacity={backdropOpacity}
      style={[defaultStyles.modal, theme?.style, style]}
    >
      {children}
    </RNModal>
  );
};

const Header: FC<ModalHeaderProps> = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal?.Header;

  const defaultStyles = useStyles();

  return (
    <View {...props} style={[defaultStyles.modalHeader, theme?.style, style]}>
      {children}
    </View>
  );
};

const Content: FC<ModalContentProps> = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal?.Content;

  const defaultStyles = useStyles();

  return (
    <View {...props} style={[defaultStyles.modalContent, theme?.style, style]}>
      {children}
    </View>
  );
};

const Actions: FC<ModalActionsProps> = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal?.Actions;

  const defaultStyles = useStyles();

  return (
    <View {...props} style={[defaultStyles.modalActions, theme?.style, style]}>
      {children}
    </View>
  );
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
