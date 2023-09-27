import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, Text, useTheme } from "react-native-paper";

const ExpenseTotal = () => {
  const { state } = useContext(AppTracker);
  const { expenses } = state;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += +item.amount);
  }, 0);
  return (
    <Card>
      {/* <Card.Title title="Your total spend" /> */}
      <Card.Content>
        <Text variant="titleMedium">
          Total spent so far: <Text style={styles.amount}>£{(+totalExpenses).toFixed(2)}</Text>
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
  },
  amount: {
    color: 'red',
  },
});

export default ExpenseTotal;
