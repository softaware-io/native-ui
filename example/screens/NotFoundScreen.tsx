import * as React from "react";

import { StyleSheet, Text, View } from "react-native";

import { RootStackScreenProps } from "../types";

const NotFoundScreen = ({}: RootStackScreenProps<"NotFound">) => {
  return (
    <View style={styles.container}>
      <Text>Screen not found</Text>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
