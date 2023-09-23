import { View } from "react-native";
import React, { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { Text, Card } from "react-native-paper";

const ExpenseTotal = () => {
  const { expenses } = useContext(BudgetContext);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.amount);
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
