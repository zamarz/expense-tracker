import { View } from "react-native";
import React, { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { Text, Card } from "react-native-paper";

const Remaining = () => {
  const { expenses, budget } = useContext(BudgetContext);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.amount);
  }, 0);
  return (
    <Card>
      <Card.Title title="Your remaining budget" />
      <Card.Content>
        <Text variant="titleLarge">
          Remaining: £{(+budget - +totalExpenses).toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default Remaining;
