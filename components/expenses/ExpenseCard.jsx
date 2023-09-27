import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

export default function ExpenseCard({ item }) {
  const { id, amount, merchant, category, date, receipt } = item;

  return (
    <Card mode="contained">
      <View key={id}>
        <Card.Title title={`Amount Spent: £${(+amount).toFixed(2)}`} />
        {/* <Card.Cover source={{ uri: receipt }} /> */}
        <Card.Content>
          <Text variant="bodyMedoum">Merchant: {merchant}</Text>
          <Text variant="bodyMedoum">Category: {category}</Text>
          <Text variant="bodyMedoum">
            Bought on: {date ? date : "Date Missing!"}
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
