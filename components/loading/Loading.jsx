import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const Loading = () => (
  <View style={[styles.container]}>
    <Text style={[styles.title]}>Please wait while we load your data...</Text>
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: { fontSize: 18, textAlign: "center", marginTop: 100 },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
