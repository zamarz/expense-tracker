import { View, StyleSheet } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";
import { Divider, Text } from "react-native-paper";

const BudgetPlanner = ({ expenses, budget, balance }) => {
  console.log(budget, balance);
  return (
    <View>
      <Text variant="titleLarge">BudgetPlanner</Text>
      <Divider />
      <Budget budget={budget} />
      <Divider />
      <Remaining expenses={expenses} budget={budget} />
      <Divider />

      <ExpenseTotal expenses={expenses} />
      <Divider />
    </View>
  );
};

export default BudgetPlanner;
