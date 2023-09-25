import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import ExpenseCard from "./ExpenseCard";
import { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";

export default function ExpenseList({ navigation }) {
  const { expenses } = useContext(AppTracker);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Expenses List - Full List of User Expenses
      </Text>
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ExpenseCard item={item} />}
      />
      <Button
        onPress={() => navigation.navigate("Expense Adder")}
        title="Add a new expense"
        accessibilityLabel="Add a new expense by filling in a form"
      />
      <Button
        onPress={() => navigation.navigate("Home")}
        title="Go back home"
        accessibilityLabel="Go back home"
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
    marginTop: 20,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
