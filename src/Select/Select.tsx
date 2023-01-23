import { Picker } from "@react-native-picker/picker";
import { FC, useRef, useState } from "react";
import { Platform, Pressable, TextStyle, View, ViewStyle } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { TextInput } from "../TextInput/TextInput";
import { createStyles } from "../utils/createStyles";
import { merge } from "../utils/merge";
import { useTheme } from "../utils/useTheme";
import { SelectProps } from "./types";

export const Select: FC<SelectProps> & { Item: typeof Picker.Item } = ({
  children,
  isDisabled = false,
  value,
  ...props
}) => {
  const { components } = useTheme();
  const defaultStyles = useStyles();
  const [visible, setVisible] = useState(false);
  const pickerRef = useRef<Picker<string>>(null);

  const defualtProps = {
    __modal: {
      style: defaultStyles.modal,
    },
    __button: {
      title: "Done",
      style: defaultStyles.doneButton,
      __title: {
        style: defaultStyles.doneButtonTitle,
      },
      _pressed: {
        style: defaultStyles.pressedDoneButton,
      },
    },
  };

  const { _disabled, ...remainingProps } = merge(
    defualtProps,
    components.Select,
    props
  );

  const {
    __textInput,
    __modal,
    __picker,
    __button,
    onValueChange,
    displayValue,
    placeholder,
    ...containerProps
  } = merge(remainingProps, isDisabled ? _disabled : undefined);

  const { onPress: onButtonPress, ...buttonProps } = __button;

  if (Platform.OS === "ios") {
    return (
      <View {...containerProps}>
        <Pressable disabled={isDisabled} onPress={() => setVisible(true)}>
          <TextInput
            {...__textInput}
            isReadOnly
            pointerEvents="none"
            value={displayValue?.(value) || value}
            placeholder={placeholder}
            isDisabled={isDisabled}
          />
        </Pressable>
        <Modal
          {...__modal}
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          coverScreen
          backdropOpacity={0.2}
        >
          <Modal.Header>
            <Button
              {...buttonProps}
              onPress={(e) => {
                setVisible(false);
                onButtonPress?.(e);
              }}
            />
          </Modal.Header>
          <Modal.Content style={defaultStyles.modalContent}>
            <Picker
              {...__picker}
              ref={pickerRef}
              prompt={placeholder}
              placeholder={placeholder}
              selectedValue={value}
              onValueChange={(itemValue) => onValueChange(itemValue)}
              enabled={!isDisabled}
              style={[defaultStyles.iosPicker, __picker?.style]}
            >
              {children}
            </Picker>
          </Modal.Content>
        </Modal>
      </View>
    );
  }

  return (
    <View {...containerProps}>
      <Pressable onPress={() => pickerRef?.current?.focus()}>
        <TextInput
          {...__textInput}
          isReadOnly
          pointerEvents="none"
          value={displayValue?.(value) || value}
          placeholder={placeholder}
          isDisabled={isDisabled}
        />
      </Pressable>
      <Picker
        {...__picker}
        ref={pickerRef}
        prompt={placeholder}
        placeholder={placeholder}
        selectedValue={value}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        enabled={!isDisabled}
        style={[defaultStyles.picker, __picker?.style]}
      >
        {children}
      </Picker>
    </View>
  );
};

Select.Item = Picker.Item;

type Style = {
  modal: ViewStyle;
  modalContent: ViewStyle;
  iosPicker: TextStyle;
  picker: TextStyle;
  doneButton: ViewStyle;
  pressedDoneButton: ViewStyle;
  doneButtonTitle: TextStyle;
};

const useStyles = createStyles<Style>(({ colors }) => ({
  modal: {
    padding: 0,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  modalContent: { marginTop: 0 },
  iosPicker: { width: "100%" },
  picker: {
    display: "none",
    opacity: 0,
  },
  doneButton: {
    marginLeft: "auto",
    paddingTop: hp("2%"),
    paddingBottom: hp("1.5%"),
    backgroundColor: "transparent",
  },
  pressedDoneButton: {
    backgroundColor: "transparent",
  },
  doneButtonTitle: {
    color: colors.primary[700],
    fontWeight: "700",
  },
}));
