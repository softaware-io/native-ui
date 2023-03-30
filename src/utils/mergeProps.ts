import lodashMerge from "lodash.merge";
import { StyleSheet } from "react-native";

const isObject = (obj: any) =>
  typeof obj === "object" && !Array.isArray(obj) && obj !== null;

export const mergeProps = (...args: any[]) => {
  for (const arg of args) {
    if (!isObject(arg)) {
      continue;
    }

    if (arg.style) {
      arg.style = StyleSheet.flatten(arg.style);
    }

    for (const key in arg) {
      if (isObject(arg[key])) {
        mergeProps(arg[key]);
      }
    }
  }

  return lodashMerge({}, ...args);
};
