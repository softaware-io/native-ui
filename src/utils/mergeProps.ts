import lodashMerge from "lodash.merge";
import StyleSheet from "react-native-extended-stylesheet";

export const mergeProps = (...args: any[]) => {
  for (const arg of args) {
    if (arg.style) {
      arg.style = StyleSheet.flatten(arg.style);
    }
  }

  return lodashMerge({}, ...args);
};
