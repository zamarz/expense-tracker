import { Text } from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card } from "react-native-paper";

const Budget = () => {
  const { budget } = useContext(AppTracker);

  return (
    <Card>
      <Card.Title title="Your budget" />
      <Card.Content>
        <Text variant="titleLarge">Budget: £{(+budget).toFixed(2)}</Text>
      </Card.Content>
    </Card>
  );
};

export default Budget;
