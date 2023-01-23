import { Octicons } from "@expo/vector-icons";
import { createElement, FC, useState } from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
import Animated, { Easing, ZoomIn, ZoomOut } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { merge } from "../utils/merge";
import { useTheme } from "../utils/useTheme";
import { CheckboxProps } from "./types";

export const Checkbox: FC<CheckboxProps> = ({
  isDisabled = false,
  isChecked = false,
  ...props
}) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();
  const [isPressed, setIsPressed] = useState(false);

  const defualtProps = {
    style: defaultStyles.checkbox,
    __thumb: {
      style: defaultStyles.thumb,
    },
    __icon: {
      style: defaultStyles.icon,
      name: "check",
      allowFontScaling: false,
    },
    __label: {
      style: defaultStyles.label,
    },
    _pressed: {
      __thumb: {
        style: defaultStyles.pressedThumb,
      },
    },
    _checked: {
      __thumb: {
        style: defaultStyles.checkedThumb,
      },
    },
    _disabled: {
      __thumb: {
        style: defaultStyles.disabledThumb,
      },
      __label: {
        style: defaultStyles.disabledLabel,
      },
    },
  };

  const { _disabled, _pressed, _checked, ...remainingProps } = merge(
    defualtProps,
    components.Checkbox,
    props
  );

  const { label, __label, __icon, __thumb, onValueChange, ...mergedProps } =
    merge(
      remainingProps,
      isChecked ? _checked : undefined,
      isPressed ? _pressed : undefined,
      isDisabled ? _disabled : undefined
    );

  const { onPressIn, onPressOut, ...containerProps } = mergedProps;

  return (
    <Pressable
      {...containerProps}
      onPressIn={(e) => {
        setIsPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setIsPressed(false);
        onPressOut?.(e);
      }}
      onPress={onValueChange}
      disabled={isDisabled}
    >
      <View {...__thumb}>
        {isChecked && (
          <Animated.View
            entering={ZoomIn.duration(200).easing(Easing.elastic(1.2))}
            exiting={ZoomOut.duration(100)}
          >
            {createElement(__icon?.type || Octicons, __icon)}
          </Animated.View>
        )}
      </View>
      {!!label && <Text {...__label}>{label}</Text>}
    </Pressable>
  );
};

type Style = {
  checkbox: ViewStyle;
  thumb: ViewStyle;
  pressedThumb: ViewStyle;
  checkedThumb: ViewStyle;
  disabledThumb: ViewStyle;
  icon: TextStyle;
  label: TextStyle;
  disabledLabel: TextStyle;
};

const useStyles = createStyles<Style>(({ colors, fontSizes }) => ({
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  thumb: {
    width: wp("7%"),
    height: wp("7%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: wp("0.5%"),
    borderColor: colors.primary[500],
    backgroundColor: "transparent",
  },
  pressedThumb: { opacity: 0.9 },
  checkedThumb: {
    backgroundColor: colors.primary[500],
  },
  disabledThumb: { opacity: 0.5 },
  icon: {
    fontSize: wp("5%"),
  },
  label: {
    marginLeft: wp("2%"),
    fontWeight: "500",
    fontSize: fontSizes.sm,
  },
  disabledLabel: { opacity: 0.5 },
}));
