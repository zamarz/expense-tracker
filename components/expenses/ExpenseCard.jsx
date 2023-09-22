import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ExpenseCard({ item }) {
  const { id, amount, merchant, category, date } = item;
  return (
    <View style={styles.container}>
      <Text>{id}.</Text>
      <Text>£{amount}</Text>
      <Text>Merchant: {merchant}</Text>
      <Text>Category: {category}</Text>
      {/* <Text>Bought on: {date}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "grid",
    gridTemplate: "75px / auto auto auto auto",
    justifyContent: "center",
    alignItems: "center",
  },
});
