import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";

export default function ExpenseCard({ item }) {
  const { id, amount, merchant, category, date, receipt, location } = item;

  return (
    <Card key={id} mode="outlined" style={styles.button}>
      <Card.Content>
        <Text style={styles.title}>{`£${(+amount).toFixed(2)}`}</Text>
      </Card.Content>
      <Card.Content variant="bodyMedium">
        <Text style={styles.text}>
          {" "}
          {merchant.label} - {category}
        </Text>
      </Card.Content>
      <Card.Content variant="bodyMedium">
        <Text style={styles.text}>
          {location} -
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
  },
  text: {
    textAlign: "center",
    marginVertical: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 700,
  },
});
