import { View, Text } from "react-native";
import React, { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";

const Remaining = () => {
  const { expenses, budget } = useContext(BudgetContext);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.amount);
  }, 0);
  return (
    <View>
      <Text>Remaining: £{(+budget - +totalExpenses).toFixed(2)}</Text>
    </View>
  );
};

export default Remaining;
