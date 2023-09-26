import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, Text } from "react-native-paper";

const Budget = () => {
  const { state } = useContext(AppTracker);
  const { budget } = state;
  return (
    <Card>
      {/* <Card.Title title="Your budget" /> */}
      <Card.Content>
        <Text variant="titleMedium">Total Budget: £{(+budget).toFixed(2)}</Text>
      </Card.Content>
    </Card>
  );
};

export default Budget;
