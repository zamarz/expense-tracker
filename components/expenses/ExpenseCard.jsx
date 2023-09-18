import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ExpenseCard({ exp }) {
  const { id, amount, merchant, category, date } = exp;
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
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    border: "5px",
  },
});
