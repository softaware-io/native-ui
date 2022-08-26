import "dotenv/config";

const appName = "Example App";

export default {
  name: appName,
  slug: "example",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "org.exmaple.app",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "org.exmaple.app",
    supportsTablet: false,
    usesAppleSignIn: true,
    googleServicesFile: "",
  },
  android: {
    package: "org.exmaple.app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  description: "",
  extra: {},
};
