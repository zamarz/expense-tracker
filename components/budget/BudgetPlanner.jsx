import { View, StyleSheet } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";

const BudgetPlanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Budget />
        <ExpenseTotal />
        <Remaining />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  buttonContainer: {
    flex: 1,
  },
});

export default BudgetPlanner;
