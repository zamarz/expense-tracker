import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
} from "react-native";
import AccountsCard from "./AccountsCard";
import { dbFire } from "../../firebaseConfig";
import { collection, query, getDocs, doc, where, deleteDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { AppTracker } from "../../context/AppTracker";
export default function AccountsList({ navigation }) {
  const user = useContext(UserContext);
  const { accounts } = useContext(AppTracker);

  const calculateTotalBalance = () => {
    let totalBalance = 0;
    for (const account of accounts) {
      const amount = parseFloat(account.balance);
      totalBalance += amount;
    }
    return totalBalance;
  };

  const totalBalance = calculateTotalBalance();

  const calculateTotalBudget = () => {
    let totalBudget = 0;
    for (const account of accounts) {
      if (
        account.budget !== null &&
        account.budget !== undefined &&
        account.budget !== ""
      ) {
        const amount = parseFloat(account.budget);
        totalBudget += amount;
      }
    }
    return totalBudget;
  };

  const totalBudget = calculateTotalBudget();

  const handleDeleteAccount = async (accountId) => {
    await deleteDoc(doc(dbFire, "account", accountId)).catch((error) => {
      console.log(error);
    });
    // setAccounts((previousAccounts) =>
    //   previousAccounts.filter((account) => account.id !== accountId)
    // );
  };

  useEffect(() => {
    handleDeleteAccount();
  }, []);

  return (
    <>
      <View>
        <Text style={styles.title}>
          Total Accounts Balance: £{totalBalance.toFixed(2)}
        </Text>
      </View>
      <View>
        <Text style={styles.title}>Total Budget: £{totalBudget}</Text>
      </View>
      <FlatList
        contentContainerStyle={{ alignSelf: "flex-start" }}
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
      />
      <View>
        <Button
          onPress={() =>
            navigation.navigate("Accounts Adder")
          }
          title="Add new account"
          accessibilityLabel="Add a new account to the accounts list"
        ></Button>
      </View>
      <View>
        <Button
          onPress={() => navigation.navigate("Home")}
          title="Go back"
          accessibilityLabel="Button to navigate to Home page"
        ></Button>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
