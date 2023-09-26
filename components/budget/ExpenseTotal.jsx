import {} from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, Text, useTheme } from "react-native-paper";

const ExpenseTotal = () => {
  const { expenses } = useContext(AppTracker);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += +item.amount);
  }, 0);
  return (
    <Card>
      <Card.Title title="Your total spend" />
      <Card.Content>
        <Text variant="titleLarge">
          Total spent so far: £{(+totalExpenses).toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default ExpenseTotal;
