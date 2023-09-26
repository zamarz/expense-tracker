import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, Text } from "react-native-paper";

const Remaining = () => {
  const { expenses, budget } = useContext(AppTracker);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + +item.amount);
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
