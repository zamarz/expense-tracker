import { View } from "react-native";
import React, { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";
import { Text, Card } from "react-native-paper";

const Budget = () => {
  const { budget } = useContext(BudgetContext);
  return (
    <Card>
      <Card.Title title="Your budget" />
      <Card.Content>
        <Text variant="titleLarge">Budget: £{+budget}</Text>
      </Card.Content>
    </Card>
  );
};

export default Budget;
