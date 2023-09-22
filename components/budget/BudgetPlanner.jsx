import { View, Text } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";

const BudgetPlanner = () => {
  return (
    <View>
      <Text>BudgetPlanner</Text>
      <View>
        <Budget />
        <Remaining />
        <ExpenseTotal />
      </View>
    </View>
  );
};

export default BudgetPlanner;
