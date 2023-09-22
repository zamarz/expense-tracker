import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import AccountsCard from "./AccountsCard";
import { doc, deleteDoc } from "firebase/firestore";
import { dbFire } from "../../firebaseConfig";

const accountsData = [
  {
    id: "1",
    bank: "Halifax",
    balance: 5.25,
    budget: "0",
    cardType: "debit",
    income: "0",
  },
  {
    id: "2",
    bank: "Santander",
    balance: 155,
    budget: "0",
    cardType: "debit",
    income: "0",
  },
  {
    id: "3",
    bank: "Natwest",
    balance: 56.5,
    budget: "0",
    cardType: "debit",
    income: "0",
  },
  {
    id: "4",
    bank: "Chase",
    balance: 750.85,
    budget: "0",
    cardType: "debit",
    income: "0",
  },
  {
    id: "5",
    bank: "Lloyds",
    balance: -50,
    budget: "0",
    cardType: "credit",
    income: "0",
  },
];

export default function AccountList({ navigation }) {
  const [accounts, setAccounts] = useState(accountsData);
  const calculateTotalBalance = () => {
    let totalBalance = 0;
    for (const account of accountsData) {
      totalBalance += account.balance;
    }
    return totalBalance;
  };

  const totalBalance = calculateTotalBalance();

  const handleEditBudget = (accountId, newBudget) => {
    const updatedAccounts = accounts.map((account) => {
      if (account.id === accountId) {
        account.budget = newBudget;
      }
      return account;
    });
    setAccounts(updatedAccounts);
  };

  const handleEditBalance = (accountId, newBalance) => {
    const updatedAccounts = accounts.map((account) => {
      if (account.id === accountId) {
        account.balance = newBalance;
      }
      return account;
    });
    setAccounts(updatedAccounts);
  };

  const handleAddIncome = (accountId, newIncome) => {
    const updatedAccounts = accounts.map((account) => {
      if (account.id === accountId) {
        account.income = newIncome;
      }
      return account;
    });
    setAccounts(updatedAccounts);
  };

  const handleDeleteAccount = async () => {
    await deleteDoc(doc(dbFire, "account", "accountId")).catch((err) => {
      console.log(err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Total Accounts Balance: £{totalBalance.toFixed(2)}
        </Text>
      </View>
      <View>
        <Text style={styles.title}>Total Budget: £0</Text>
      </View>
      <FlatList
        contentContainerStyle={{ alignSelf: "flex-start" }}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        data={accountsData}
        renderItem={({ item }) => (
          <AccountsCard
            item={item}
            onDelete={() => handleDeleteAccount(item.id)}
            onEditBudget={() => handleEditBudget(item.id)}
            onEditBalance={() => handleEditBalance(item.id)}
            onAddIncome={() => handleAddIncome(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View>
        <Button
          onPress={() =>
            navigation.navigate("Accounts List", {
              screen: "Accounts Adder",
            })
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
    </SafeAreaView>
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
