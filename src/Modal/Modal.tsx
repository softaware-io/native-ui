import { FC } from "react";
import { View } from "react-native";
import RNModal from "react-native-modal";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useTheme } from "../utils/useTheme";
import { ActionsProps, ContentProps, HeaderProps, ModalProps } from "./types";

export const Modal: FC<ModalProps> & { Header: typeof Header } & {
  Content: typeof Content;
} & { Actions: typeof Actions } = ({ style, children, ...props }) => {
  const { colors, components } = useTheme();
  const theme = components.Modal;

  return (
    <RNModal
      useNativeDriverForBackdrop
      coverScreen={false}
      backdropOpacity={0.4}
      style={[
        {
          padding: wp("4%"),
          alignSelf: "center",
          marginTop: "auto",
          marginBottom: "auto",
          flex: 0,
          borderRadius: wp("4%"),
          backgroundColor: colors.white,
        },
        theme?.style,
        style,
      ]}
      {...props}
    >
      {children}
    </RNModal>
  );
};

const Header: FC<HeaderProps> = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal?.Header;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        theme?.style,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const Content: FC<ContentProps> = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal?.Content;

  return (
    <View style={[{ marginTop: hp("3%") }, theme?.style, style]} {...props}>
      {children}
    </View>
  );
};

const Actions: FC<ActionsProps> = ({ style, children, ...props }) => {
  const { components } = useTheme();
  const theme = components.Modal?.Actions;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: hp("5%"),
        },
        theme?.style,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Actions = Actions;
