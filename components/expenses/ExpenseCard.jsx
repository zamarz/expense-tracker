import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

export default function ExpenseCard({ item }) {
  const { id, amount, merchant, category, date, receipt } = item;

  return (
    <Card mode="contained">
      <View key={id}>
        <Card.Title title={`Amount Spent: £${(+amount).toFixed(2)}`} />
        <Card.Content>
          {/* <Card.Cover source={{ uri: receipt }} /> */}
          <Text variant="bodyMedium">Merchant: {merchant.label}</Text>
          <Text variant="bodyMedium">Category: {category}</Text>
          <Text variant="bodyMedium">
            Bought on:{" "}
            {date ? new Date(date).toLocaleDateString() : "Date Missing!"}
          </Text>
        </Card.Content>
      </View>
    </Card>
  );
}

//Card.Cover needs to either show a placeholder image or be disabled if receipt is null

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
