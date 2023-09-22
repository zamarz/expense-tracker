import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import Layout from "../components/modules/Layout";
import { Loading } from "../components/loading/Loading";
import Logout from "../components/buttons/Logout";
import ExpenseList from "../components/expenses/ExpenseList";

// const Separator = () => <View style={styles.separator} />;

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [balance, setBalance] = useState(0);

  {
    /* Handle onPress App Demo */
  }
  // const handleAppDemo = () => {}

  if (isLoading) return <Loading />;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <Layout> */}
        <View>
          {/* Viewing current accounts balance */}
          <Text style={styles.title}>Balance: {balance}</Text>
        </View>
        <View>
          <Text style={styles.title}>Expenses List</Text>
          <Text style={styles.title}>Expenses Card</Text>
        </View>
        <View>
          <ExpenseList />
        </View>
        <View>
          <Button
            onPress={() => navigation.navigate("ExpenseAdder")}
            title="Add expense"
            accessibilityLabel="Add a new expense to an account manually"
          ></Button>
          <Button
            onPress={() => {}}
            title="Scan expense"
            accessibilityLabel="Add a new expense to an account by scanning a receipt"
          ></Button>
        </View>
        {/* Button to navigate to the app demo */}
        {/* <View>
          <Button onPress={handleAppDemo} title="App Demo" accessibilityLabel="Learn more about how to use the expense tracker app, through our app demo"></Button>

        </View> */}
        <View>
          {/* Button to navigate to viewing/adding account(s) */}
          <Button
            onPress={() => navigation.navigate("AccountsList")}
            title="View / Add Account"
            accessibilityLabel="View a list of accounts or add a new account"
          ></Button>
          <Logout />
        </View>
        {/* </Layout> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
