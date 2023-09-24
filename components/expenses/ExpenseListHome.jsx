import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import ExpenseCard from "./ExpenseCard";
import { AppTracker } from "../../context/AppTracker";

const ExpenseListHome = ({ expenses }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Recent Expenses </Text>
      <FlatList
        data={
          expenses.length > 0 && expenses.length < 4
            ? expenses
            : expenses.slice(0, 3)
        }
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
