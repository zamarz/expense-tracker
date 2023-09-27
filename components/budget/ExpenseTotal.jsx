import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, Text, useTheme } from "react-native-paper";

const ExpenseTotal = () => {
  const { state } = useContext(AppTracker);
  const { expenses } = state;
  const theme = useTheme();

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += +item.amount);
  }, 0);
  return (
    <Card
      style={{
        backgroundColor: theme.colors.secondary,
        width: 150,
        height: 80,
        margin: 10,
        marginLeft: 250,
      }}
    >
      <Card.Title
        title="Total Spent"
        titleStyle={{
          color: theme.colors.onSecondary,
          fontSize: 12,
        }}
      />
      <Card.Content>
        <Text
          variant="titleLarge"
          style={{
            color: theme.colors.onSecondary,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          £{(+totalExpenses).toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontWeight: "bold",
  },
  amount: {
    color: "red",
  },
});

export default ExpenseTotal;
