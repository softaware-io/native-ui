import { useContext } from "react";
import { UiContext } from "../context";

export const useTheme = () => useContext(UiContext);
