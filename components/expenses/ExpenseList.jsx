import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import ExpenseCard from "./ExpenseCard";
import { BudgetContext } from "../../context/BudgetContext";

export default function ExpenseList() {
  const { expenses } = useContext(BudgetContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Recent Expenses</Text>
      <FlatList
        data={expenses.slice(0, 3)}
        renderItem={({ item }) => <ExpenseCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginTop: "20px",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
