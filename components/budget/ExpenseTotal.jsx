import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";

const ExpenseTotal = () => {
  const { expenses } = useContext(AppTracker);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += +item.amount);
  }, 0);
  return (
    <View>
      <Text>Total spent so far: £{(+totalExpenses).toFixed(2)}</Text>
    </View>
  );
};

export default ExpenseTotal;
