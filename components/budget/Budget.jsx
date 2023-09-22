import { View, Text } from "react-native";
import React, { useContext } from "react";
import { BudgetContext } from "../../context/BudgetContext";

const Budget = () => {
  const budget = useContext(BudgetContext);
  return (
    <View>
      <Text>Budget: £{(+budget).toFixed(2)}</Text>
    </View>
  );
};

export default Budget;
