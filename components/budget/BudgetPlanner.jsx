import { View, StyleSheet } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";
import { Text, Divider, Card } from "react-native-paper";

const BudgetPlanner = () => {
  return (
    <View>
      <Text variant="titleLarge">BudgetPlanner</Text>
      <Divider />
      <Budget />
      <Divider />
      <Remaining />
      <Divider />

      <ExpenseTotal />
      <Divider />
    </View>
  );
};

export default BudgetPlanner;
