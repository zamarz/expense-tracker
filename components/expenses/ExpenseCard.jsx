import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ExpenseCard({ item }) {
  const { id, amount, merchant, category, date } = item;

  return (
    <View style={styles.container} key={id}>
      <Text>Amount Spent: £{(+amount).toFixed(2)}</Text>
      <Text>Merchant: {merchant}</Text>
      <Text>Category: {category}</Text>
      <Text>Bought on: {date ? date : "Date Missing!"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
