import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";

const Remaining = () => {
  const { expenses, budget } = useContext(AppTracker);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + +item.amount);
  }, 0);
  return (
    <View>
      <Text>Remaining: £{(+budget - +totalExpenses).toFixed(2)}</Text>
    </View>
  );
};

export default Remaining;
