import { useContext } from "react";
import { NativeUiContext } from "../context";

export const useTheme = () => useContext(NativeUiContext);
