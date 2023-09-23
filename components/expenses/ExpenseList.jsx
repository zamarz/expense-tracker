import { View, Text, StyleSheet, FlatList } from "react-native";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Expenses List - Full List of User Expenses
      </Text>
      {/* <FlatList
        data={expenses}
        renderItem={({ item }) => <ExpenseCard item={item} />}
      /> */}
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
