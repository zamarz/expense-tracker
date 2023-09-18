import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ExpenseCard from "./ExpenseCard";
import ExpenseAdder from "./ExpenseAdder";

const data = {
  expenses: [
    {
      id: 1,
      amount: 8.25,
      merchant: "Starbucks",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
    {
      id: 2,
      amount: 8.25,
      merchant: "Starbucks",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
    {
      id: 3,
      amount: 8.25,
      merchant: "Starbucks",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
    {
      id: 4,
      amount: 8.25,
      merchant: "Starbucks",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
    {
      id: 5,
      amount: 8.25,
      merchant: "Starbucks",
      category: "Food/Beverage",
      date: null,
      receipt: null,
      location: null,
      accountSelected: null,
    },
  ],
};

export default function ExpenseList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExpenseList</Text>
      {data.expenses.map((exp) => {
        return <ExpenseCard key={exp.id} exp={exp} />;
      })}
      {/* <ExpenseAdder /> */}
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
