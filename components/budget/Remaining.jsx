import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Card, Text, useTheme, Divider } from "react-native-paper";

const Remaining = () => {
  const { state } = useContext(AppTracker);
  const { expenses, budget } = state;
  const theme = useTheme();
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + +item.amount);
  }, 0);

  const remainingBalance = (+budget - +totalExpenses).toFixed(2);

  const textStyle = {
    color: remainingBalance > 0 ? "green" : "red",
  };

  return (
    <Card
    // style={{
    //   backgroundColor: theme.colors.primaryContainer,
    //   width: 150,
    //   height: 80,
    //   margin: 10,
    //   marginLeft: 130,
    // }}
    >
      <Card.Title
        title="Remaining Budget"
        // titleStyle={{
        //   color: theme.colors.onPrimaryContainer,
        //   fontSize: 12,
        // }}
      />
      <Card.Content>
        <Text
          variant="titleLarge"
          // style={{ color: theme.colors.onS, fontSize: 18, fontWeight: "bold" }}
        >
          £{(+budget - +totalExpenses).toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default Remaining;
