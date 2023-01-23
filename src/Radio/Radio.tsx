import { FontAwesome } from "@expo/vector-icons";
import { createElement, FC, ReactElement, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, { Easing, ZoomIn, ZoomOut } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { mergeProps } from "../utils/mergeProps";
import { useTheme } from "../utils/useTheme";
import { RadioOptionProps, RadioProps } from "./types";

export const Radio: FC<RadioProps> & { Option: typeof Option } = ({
  children,
  onValueChange,
  value,
  ...props
}) => {
  const { components } = useTheme();

  const containerProps = mergeProps(components.Radio, props);

  const createRadioOptions = (
    options: ReactElement<RadioOptionProps> | ReactElement<RadioOptionProps>[]
  ) => {
    const elements = Array.isArray(options) ? options : [options];

    return elements.map((element, index) =>
      createElement(element.type, {
        ...element.props,
        key: index,
        isChecked: element.props.isChecked || element.props.value === value,
        onPress: (e: GestureResponderEvent) => {
          onValueChange(element.props.value);
          element.props.onPress?.(e);
        },
      })
    );
  };

  return <View {...containerProps}>{createRadioOptions(children)}</View>;
};

const Option: FC<RadioOptionProps> = ({
  isDisabled = false,
  isChecked = false,
  ...props
}) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();
  const [isPressed, setIsPressed] = useState(false);

  const defualtProps = {
    style: defaultStyles.option,
    __thumb: {
      style: defaultStyles.thumb,
    },
    __icon: {
      style: defaultStyles.icon,
      name: "circle",
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
    _disabled: {
      __thumb: {
        style: defaultStyles.disabledThumb,
      },
      __label: {
        style: defaultStyles.disabledLabel,
      },
    },
  };

  const { _disabled, _pressed, _checked, ...remainingProps } = mergeProps(
    defualtProps,
    components.Radio?.Option,
    props
  );

  const { label, __label, __icon, __thumb, ...mergedProps } = mergeProps(
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
      disabled={isDisabled}
    >
      <View {...__thumb}>
        {isChecked && (
          <Animated.View
            entering={ZoomIn.easing(Easing.elastic(1.2))}
            exiting={ZoomOut.duration(100)}
          >
            {createElement(__icon?.type || FontAwesome, __icon)}
          </Animated.View>
        )}
      </View>
      <Text {...__label}>{label}</Text>
    </Pressable>
  );
};

Radio.Option = Option;

type Style = {
  option: ViewStyle;
  thumb: ViewStyle;
  pressedThumb: ViewStyle;
  disabledThumb: ViewStyle;
  icon: TextStyle;
  label: TextStyle;
  disabledLabel: TextStyle;
};

const useStyles = createStyles<Style>(({ colors, fontSizes, fn }) => ({
  option: {
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
    borderRadius: fn.maxBorderRadius(),
  },
  pressedThumb: { opacity: 0.9 },
  disabledThumb: { opacity: 0.5 },
  icon: {
    fontSize: wp("5%"),
    color: colors.primary[500],
  },
  label: {
    marginLeft: wp("2%"),
    fontWeight: "500",
    fontSize: fontSizes.sm,
  },
  disabledLabel: { opacity: 0.5 },
}));
