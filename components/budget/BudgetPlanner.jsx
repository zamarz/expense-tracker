import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";
import { DataTable } from "react-native-paper";

const BudgetPlanner = () => {
  return (
    <View style={styles.container}>
      <DataTable style={styles.wrapper}>
        <Pressable style={styles.button}>
          <Budget />
        </Pressable>
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
    marginTop: 5,
  },
  content: {
    width: "auto",
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    width: "33%",
  },
});

export default BudgetPlanner;
