import merge from "lodash.merge";
import { createElement, FC, useEffect, useState } from "react";
import { Pressable, TextStyle, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { createStyles } from "../utils/createStyles";
import { useTheme } from "../utils/useTheme";
import { SwitchProps } from "./types";

export const Switch: FC<SwitchProps> = ({
  isDisabled = false,
  isToggled = false,
  ...props
}) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();
  const [isPressed, setIsPressed] = useState(false);

  const [switchWidth, setSwitchWidth] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);

  const offset = useSharedValue(0);

  const defualtProps = {
    style: defaultStyles.switch,
    __thumb: {
      style: defaultStyles.thumb,
    },
    __icon: {
      style: defaultStyles.icon,
      allowFontScaling: false,
    },
    __track: {
      style: defaultStyles.track,
    },
    _toggled: {
      __track: {
        style: defaultStyles.toggledTrack,
      },
    },
    _disabled: {
      style: defaultStyles.disabledSwitch,
    },
  };

  const { _disabled, _pressed, _toggled, ...remainingProps } = merge(
    defualtProps,
    components.Switch,
    props
  );

  const { __track, __icon, __thumb, onValueChange, ...mergedProps } = merge(
    remainingProps,
    isToggled ? _toggled : undefined,
    isPressed ? _pressed : undefined,
    isDisabled ? _disabled : undefined
  );

  const { onPressIn, onPressOut, onLayout, ...containerProps } = mergedProps;

  const { style: thumbStyle, onLayout: onThumbLayout, ...thumbProps } = __thumb;

  const animatedThumbStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value, {
            damping: 9,
            stiffness: 120,
            mass: 0.5,
          }),
        },
      ],
    };
  });

  useEffect(() => {
    offset.value =
      (switchWidth / 2 - wp("1%") - thumbWidth / 2) * (isToggled ? 1 : -1);
  }, [switchWidth, thumbWidth, isToggled, offset]);

  return (
    <Pressable
      {...containerProps}
      onLayout={(e) => {
        setSwitchWidth(e.nativeEvent.layout.width);
        onLayout?.(e);
      }}
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
      <View {...__track} />
      <Animated.View
        {...thumbProps}
        style={[thumbStyle, animatedThumbStyles]}
        onLayout={(e) => {
          setThumbWidth(e.nativeEvent.layout.width);
          onThumbLayout?.(e);
        }}
      >
        {!!__icon?.type && createElement(__icon?.type, __icon)}
      </Animated.View>
    </Pressable>
  );
};

type Style = {
  switch: ViewStyle;
  disabledSwitch: ViewStyle;
  track: ViewStyle;
  toggledTrack: ViewStyle;
  thumb: ViewStyle;
  icon: TextStyle;
};

const useStyles = createStyles<Style>(({ colors, fn }) => ({
  switch: {
    width: wp("15%"),
    paddingVertical: wp("1%"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  disabledSwitch: { opacity: 0.5 },
  thumb: {
    width: wp("6.5%"),
    height: wp("6.5%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: fn.maxBorderRadius(),
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  icon: {
    fontSize: wp("4.6%"),
  },
  track: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.gray[300],
    borderRadius: fn.maxBorderRadius(),
  },
  toggledTrack: {
    backgroundColor: colors.primary[500],
  },
}));
