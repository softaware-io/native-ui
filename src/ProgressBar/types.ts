import { BarPropTypes } from "react-native-progress";

export type ProgressBarProps = {
  isDisabled?: boolean;
  _disabled?: {
    style?: BarPropTypes["style"];
    color?: string;
    unfilledColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
  };
} & BarPropTypes;
