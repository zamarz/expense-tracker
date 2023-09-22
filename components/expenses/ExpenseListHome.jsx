import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import ExpenseCard from "./ExpenseCard";
import { ExpensesContext } from "../../context/ExpensesContext";

const ExpenseListHome = () => {
  const expenses = useContext(ExpensesContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Recent Expenses </Text>
      <FlatList
        data={expenses.slice(0, 3)}
        renderItem={({ item }) => <ExpenseCard item={item} />}
      />
    </View>
  );
};

export default ExpenseListHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 20,
  },
});
