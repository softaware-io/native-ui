import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import { AppContext, appReducer, defaultAppState } from "./lib/state";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();

  const [state, dispatch] = useReducer(appReducer, defaultAppState);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider
        value={{
          ...state,
          dispatch,
        }}
      >
        <SafeAreaProvider>
          <Navigation />
          <StatusBar
            translucent
            {...(Platform.OS === "ios" ? { style: "dark" } : {})}
          />
        </SafeAreaProvider>
      </AppContext.Provider>
    );
  }
}
