import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AccountsCard from "./AccountsCard";
import { dbFire } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { AppTracker } from "../../context/AppTracker";
import { Button, Text, useTheme } from "react-native-paper";
import BudgetPlanner from "../budget/BudgetPlanner";

export default function AccountsList({ navigation }) {
  const { state, dispatch } = useContext(AppTracker);
  const { accounts, balance, expenses } = state;
  const theme = useTheme();

  const handleDeleteAccount = async (accountId) => {
    await deleteDoc(doc(dbFire, "account", accountId))
      .then(() => {
        const newAccounts = accounts.filter(
          (account) => account.id !== accountId
        );
        dispatch({ type: "DELETE_ACCOUNT", payload: newAccounts });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    <>
      <View>
        <BudgetPlanner />
        <Text variant="headlineSmall" style={styles.title}>
          Total Balance: <Text style={styles.balance}>£{remainingBalance}</Text>
        </Text>
      </View>

      <FlatList
        contentContainerStyle={{ alignSelf: "flex-start", marginLeft: 20 }}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        data={accounts}
        renderItem={({ item }) => (
          <AccountsCard
            item={item}
            onDelete={() => handleDeleteAccount(item.id)}
            onEditBudget={() => handleEditBudget(item.id)}
            onEditBalance={() => handleEditBalance(item.id)}
            onAddIncome={() => handleAddIncome(item.id)}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => {
          return item.id;
        }}
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
      />
      <View style={styles.row}>
        <Button
          onPress={() => navigation.navigate("Accounts Adder")}
          title="Add new account"
          accessibilityLabel="Add a new account to the accounts list"
          style={{
            backgroundColor: theme.colors.primary,
            minWidth: 190,
            elevation: 8,
            borderRadius: 10,
            paddingVertical: 4,
            paddingHorizontal: 12,
            alignSelf: "center",
            marginTop: 5,
          }}
        >
          <Text style={{ color: theme.colors.onPrimary }}>Add New Account</Text>
        </Button>

        <Button
          onPress={() => navigation.navigate("Home")}
          title="Go back"
          accessibilityLabel="Button to navigate to Home page"
          style={{
            backgroundColor: theme.colors.primary,
            minWidth: 190,
            elevation: 8,
            borderRadius: 10,
            paddingVertical: 4,
            paddingHorizontal: 12,
            alignSelf: "center",
            marginTop: 0,
          }}
        >
          <Text style={{ color: theme.colors.onPrimary }}>Go Back</Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 50,
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 110,
    marginTop: 5,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  buttonContainer: {
    marginVertical: 5,
    width: "60%",
    marginLeft: 80,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderTopColor: "black ",
    borderTopWidth: 2,
  },
  balance: {
    fontSize: 24,
    fontWeight: "700",
    color: "green",
  },
});
