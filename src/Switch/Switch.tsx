import { createElement, FC, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
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
  style,
  isDisabled = false,
  onValueChange,
  isToggled = false,
  _disabled,
  _pressed,
  _toggled,
  __icon,
  __thumb,
  __track,
  ...props
}) => {
  const { components } = useTheme();
  const theme = components.Switch;

  const defaultStyles = useStyles();
  const [switchWidth, setSwitchWidth] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);

  const offset = useSharedValue(0);

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
      {...props}
      onLayout={(e) => setSwitchWidth(e.nativeEvent.layout.width)}
      style={({ pressed: isPressed }) => [
        defaultStyles.switch,
        theme?.style,
        style,
        isToggled && theme?._toggled?.style,
        isToggled && _toggled?.style,
        isPressed && theme?._pressed?.style,
        isPressed && _pressed?.style,
        isDisabled && defaultStyles.disabledSwitch,
        isDisabled && theme?._disabled?.style,
        isDisabled && _disabled?.style,
      ]}
      onPress={onValueChange}
      disabled={isDisabled}
    >
      {({ pressed: isPressed }) => (
        <>
          <View
            {...theme?.__track}
            {...__track}
            {...(isToggled && theme?._toggled?.__track)}
            {...(isToggled && _toggled?.__track)}
            {...(isPressed && theme?._pressed?.__track)}
            {...(isPressed && _pressed?.__track)}
            {...(isDisabled && theme?._disabled?.__track)}
            {...(isDisabled && _disabled?.__track)}
            style={[
              defaultStyles.track,
              theme?.__track?.style,
              __track?.style,
              isToggled && defaultStyles.checkedTrack,
              isToggled && theme?._toggled?.__track?.style,
              isToggled && _toggled?.__track?.style,
              isPressed && theme?._pressed?.__track?.style,
              isPressed && _pressed?.__track?.style,
              isDisabled && theme?._disabled?.__track?.style,
              isDisabled && _disabled?.__track?.style,
            ]}
          />
          <Animated.View
            onLayout={(e) => setThumbWidth(e.nativeEvent.layout.width)}
            {...theme?.__thumb}
            {...__thumb}
            {...(isToggled && theme?._toggled?.__thumb)}
            {...(isToggled && _toggled?.__thumb)}
            {...(isPressed && theme?._pressed?.__thumb)}
            {...(isPressed && _pressed?.__thumb)}
            {...(isDisabled && theme?._disabled?.__thumb)}
            {...(isDisabled && _disabled?.__thumb)}
            style={[
              animatedThumbStyles,
              defaultStyles.thumb,
              theme?.__thumb?.style,
              __thumb?.style,
              isToggled && theme?._toggled?.__thumb?.style,
              isToggled && _toggled?.__thumb?.style,
              isPressed && theme?._pressed?.__thumb?.style,
              isPressed && _pressed?.__thumb?.style,
              isDisabled && theme?._disabled?.__thumb?.style,
              isDisabled && _disabled?.__thumb?.style,
            ]}
          >
            {__icon &&
              createElement(__icon?.type, {
                allowFontScaling: false,
                ...theme?.__icon,
                ...__icon,
                ...(isToggled && theme?._toggled?.__icon),
                ...(isToggled && _toggled?.__icon),
                ...(isPressed && theme?._pressed?.__icon),
                ...(isPressed && _pressed?.__icon),
                ...(isDisabled && theme?._disabled?.__icon),
                ...(isDisabled && _disabled?.__icon),
                style: [
                  defaultStyles.icon,
                  theme?.__icon?.style,
                  __icon?.style,
                  isToggled && theme?._toggled?.__icon?.style,
                  isToggled && _toggled?.__icon?.style,
                  isPressed && theme?._pressed?.__icon?.style,
                  isPressed && _pressed?.__icon?.style,
                  isDisabled && theme?._disabled?.__icon?.style,
                  isDisabled && _disabled?.__icon?.style,
                ],
              })}
          </Animated.View>
        </>
      )}
    </Pressable>
  );
};

const useStyles = createStyles(({ colors, fn }) => ({
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
  checkedTrack: {
    backgroundColor: colors.primary[500],
  },
}));
