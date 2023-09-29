import { View, StyleSheet, FlatList } from "react-native";
import ExpenseCard from "./ExpenseCard";
import { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Text, Button, Divider } from "react-native-paper";
import BudgetPlanner from "../budget/BudgetPlanner";

export default function ExpenseList({ navigation }) {
  const { state, dispatch } = useContext(AppTracker);
  const { expenses, balance } = state;

  const totalExpenses = (bal) => {
    let total = 0;
    const amounts = expenses.map((exp) => {
      return exp.amount;
    });
    amounts.forEach((amt) => {
      total += +amt;
    });
    return bal - total;
  };

  const remainingBalance = totalExpenses(balance);

  return (
    <View style={styles.container}>
      <BudgetPlanner navigation={navigation} />
      <Text variant="headlineSmall" style={styles.title}>
        Total Balance: <Text style={styles.balance}>£{remainingBalance}</Text>
      </Text>
      <FlatList
        data={expenses}
        extraData={expenses.id}
        renderItem={({ item }) => <ExpenseCard item={item} />}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 5,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              height: 5,
            }}
          />
        )}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
      <View style={styles.row}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Expense Adder")}
          title="Add new expense"
          accessibilityLabel="Add a new expense by filling in a form"
          style={styles.button}
        >
          Add new expense
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Home")}
          title="Go back home"
          accessibilityLabel="Go back home"
          style={styles.button}
        >
          Go back home{" "}
        </Button>
      </View>
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
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    minWidth: 190,
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "center",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    borderTopColor: "black ",
    borderTopWidth: 2,
  },
  balance: {
    fontSize: 24,
    fontWeight: "700",
    color: "green",
  },
});
