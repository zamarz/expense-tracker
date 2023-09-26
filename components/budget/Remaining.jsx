import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, Text } from "react-native-paper";

const Remaining = () => {
  const { state, dispatch } = useContext(AppTracker);
  const totalExpenses = state.expenses.reduce((total, item) => {
    return (total = total + +item.amount);
  }, 0);
  return (
    <Card>
      <Card.Title title="Your remaining budget" />
      <Card.Content>
        <Text variant="titleLarge">
          Remaining: £{(+state.budget - +totalExpenses).toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default Remaining;
