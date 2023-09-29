import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import ExpenseCard from "./ExpenseCard";
import { AppTracker } from "../../context/AppTracker";
import { ScrollView } from "react-native-gesture-handler";

const ExpenseListHome = () => {
  const { state, dispatch } = useContext(AppTracker);
  const { expenses } = state;
  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <FlatList
          data={expenses.length > 0 ? expenses : expenses.sort().slice(0, 5)}
          renderItem={({ item }) => <ExpenseCard item={item} />}
        />
      </View>
    </View>
  );
};

export default ExpenseListHome;

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  listWrapper: {
    maxWidth: "100%",
    maxHeight: "100%",
    display: "flex",
    justifyContent: "space-around",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },

  title: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
  },
});
