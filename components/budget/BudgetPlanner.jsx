import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";

const BudgetPlanner = () => {
  return (
    <View>
      <Text>BudgetPlanner</Text>

      <Budget />
      <Remaining />
      <ExpenseTotal />
    </View>
  );
};

export default BudgetPlanner;
