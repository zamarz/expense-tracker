import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

export default function ExpenseCard({ item }) {
  const { id, amount, merchant, category, date, receipt } = item;

  return (
    <Card key={id} mode="contained" style={styles.button}>
      <Card.Content>
        <Text style={styles.title}>{`Amount Spent: £${(+amount).toFixed(
          2
        )}`}</Text>
      </Card.Content>
      <Card.Content variant="bodyMedium">
        <Text style={styles.text}>Merchant: {merchant.label}</Text>
      </Card.Content>
      <Card.Content variant="bodyMedium">
        <Text style={styles.text}>Category: {category}</Text>
      </Card.Content>
      <Card.Content variant="bodyMedium">
        <Text style={styles.text}>
          Bought on:{" "}
          {date ? new Date(date).toLocaleDateString() : "Date Missing!"}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    marginVertical: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
});
