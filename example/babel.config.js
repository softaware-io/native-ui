module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "inline-dotenv",
      "@softaware/native-ui/react-native-reanimated/plugin",
    ],
  };
};
