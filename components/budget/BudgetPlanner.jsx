import { View, StyleSheet } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";
import { DataTable } from "react-native-paper";

const BudgetPlanner = () => {
  return (
    <View style={styles.container}>
      <DataTable style={styles.wrapper}>
        <Budget />
        <ExpenseTotal />
        <Remaining />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 8,
  },
  content: {
    width: "auto",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default BudgetPlanner;
