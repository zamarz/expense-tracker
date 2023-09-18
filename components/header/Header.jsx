import { View, Text, StyleSheet } from "react-native";
import React from "react";
import NavMenu from "../navigation/NavMenu";

export default function Header() {
  return (
    <View styles={styles.container}>
      <Text>Header</Text>
      <NavMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
