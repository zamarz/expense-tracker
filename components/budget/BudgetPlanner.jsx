import { View, StyleSheet } from "react-native";
import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";
import { Divider, Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

const BudgetPlanner = () => {
  return (
    <View style={styles.container}>
      <View>
        <Budget />

        <ExpenseTotal />

        <Remaining />
      </View>
      {/* <View style={styles.container}> */}
      {/* <Text variant="titleLarge">BudgetPlanner</Text>
{/* 
      <Budget />

      <Remaining />

      <ExpenseTotal />
      <Divider /> */}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
});

export default BudgetPlanner;
