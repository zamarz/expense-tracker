import { View, StyleSheet, FlatList } from "react-native";
import ExpenseCard from "./ExpenseCard";
import { useContext } from "react";
import { AppTracker } from "../../context/AppTracker";
import { Text, Button, Divider } from "react-native-paper";

export default function ExpenseList({ navigation }) {
  const { expenses } = useContext(AppTracker);
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Expenses List - Full List of User Expenses
      </Text>
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ExpenseCard item={item} />}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Expense Adder")}
        title="Add a new expense"
        accessibilityLabel="Add a new expense by filling in a form"
      >
        Add a new expense
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Home")}
        title="Go back home"
        accessibilityLabel="Go back home"
      >
        Go back home{" "}
      </Button>
      <Divider />
      <Divider />
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
