import { View, StyleSheet } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";

const BudgetPlanner = () => {
  return (
    <View style={styles.container}>
      <Budget />
      <ExpenseTotal />
      <Remaining />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },
  buttonContainer: {
    flex: 1,
  },
});

export default BudgetPlanner;
