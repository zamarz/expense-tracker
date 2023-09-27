import { Text, View } from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, useTheme } from "react-native-paper";

const Budget = () => {
  const { budget } = useContext(AppTracker);

  const theme = useTheme();

  return (
    <Card
      style={{
        backgroundColor: theme.colors.primary,
        width: 150,
        height: 80,
        margin: 10,
      }}
    >
      <Card.Title
        title="Your Budget"
        titleStyle={{
          color: theme.colors.onPrimary,
          fontSize: 12,
        }}
      />
      <Card.Content>
        <Text
          variant="titleLarge"
          style={{
            color: theme.colors.onPrimary,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          £{(+budget).toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default Budget;
