import { Picker } from "@react-native-picker/picker";
import { FC, useRef, useState } from "react";
import { Platform, Pressable, TextStyle, View, ViewStyle } from "react-native";
import { Modal } from "../Modal/Modal";
import { TextInput } from "../TextInput/TextInput";
import { SelectProps } from "./types";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Button } from "../Button/Button";
import { useTheme } from "../utils/useTheme";
import { createStyles } from "../utils/createStyles";

export const Select: FC<SelectProps> & { Item: typeof Picker.Item } = ({
  children,
  style,
  isDisabled = false,
  placeholder,
  value,
  onValueChange,
  displayValue,
  _disabled,
  __textInput,
  __picker,
  __modal,
  ...props
}) => {
  const { components } = useTheme();
  const theme = components.Select;

  const defaultStyles = useStyles();

  const [visible, setVisible] = useState(false);
  const pickerRef = useRef<Picker<string>>(null);

  if (Platform.OS === "ios") {
    return (
      <View
        {...props}
        style={[
          theme?.style,
          style,
          isDisabled && theme?._disabled?.style,
          isDisabled && _disabled?.style,
        ]}
      >
        <Pressable disabled={isDisabled} onPress={() => setVisible(true)}>
          <TextInput
            {...theme?.__textInput}
            {...__textInput}
            isReadOnly
            pointerEvents="none"
            value={displayValue?.(value) || value}
            placeholder={placeholder}
            isDisabled={isDisabled}
          />
        </Pressable>
        <Modal
          {...theme?.__modal}
          {...__modal}
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          coverScreen
          backdropOpacity={0.2}
          style={[defaultStyles.modal, theme?.__modal?.style, __modal?.style]}
        >
          <Modal.Header>
            <Button
              title="Done"
              onPress={() => setVisible(false)}
              style={defaultStyles.doneButton}
              _pressed={{
                style: defaultStyles.pressedDoneButton,
              }}
              __title={{
                style: defaultStyles.doneButtonTitle,
              }}
            />
          </Modal.Header>
          <Modal.Content style={defaultStyles.modalContent}>
            <Picker
              {...theme?.__picker}
              {...__picker}
              ref={pickerRef}
              prompt={placeholder}
              placeholder={placeholder}
              selectedValue={value}
              onValueChange={(itemValue) => onValueChange(itemValue)}
              enabled={!isDisabled}
              style={defaultStyles.iosPicker}
            >
              {children}
            </Picker>
          </Modal.Content>
        </Modal>
      </View>
    );
  }

  return (
    <View
      {...props}
      style={[
        theme?.style,
        style,
        isDisabled && theme?._disabled?.style,
        isDisabled && _disabled?.style,
      ]}
    >
      <Pressable onPress={() => pickerRef?.current?.focus()}>
        <TextInput
          {...theme?.__textInput}
          {...__textInput}
          isReadOnly
          pointerEvents="none"
          value={displayValue?.(value) || value}
          placeholder={placeholder}
          isDisabled={isDisabled}
        />
      </Pressable>
      <Picker
        {...theme?.__picker}
        {...__picker}
        ref={pickerRef}
        prompt={placeholder}
        placeholder={placeholder}
        selectedValue={value}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        enabled={!isDisabled}
        style={defaultStyles.picker}
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
