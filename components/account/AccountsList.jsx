import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  FlatList,
} from "react-native";
import AccountsCard from "./AccountsCard";
import { authFire, dbFire } from "../../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../../context/UserContext";

export default function AccountList({ navigation }) {
  const [accounts, setAccounts] = useState([]);
  // const [user, setUser] = useState(UserContext);
  const [user, setUser] = useContext(UserContext);

  const fetchData = async (userId) => {
    const q = query(
      collection(dbFire, "account"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const accountData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAccounts(accountData);
  };

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

  // const handleEditBudget = (accountId, newBudget) => {
  //     const updatedAccounts = accounts.map((account) => {
  //         if (account.id === accountId) {
  //             account.budget = newBudget;
  //         }
  //         return account;
  //     })
  //     setAccounts(updatedAccounts)
  // };

  // const handleEditBalance = (accountId, newBalance) => {
  //     const updatedAccounts = accounts.map((account) => {
  //         if (account.id === accountId) {
  //             account.balance = newBalance;
  //         }
  //         return account;
  //     })
  //     setAccounts(updatedAccounts);
  // };

  // const handleAddIncome = (accountId, newIncome) => {
  //     const updatedAccounts = accounts.map((account) => {
  //         if (account.id === accountId) {
  //             account.income = newIncome;
  //         }
  //         return account;
  //     })
  //     setAccounts(updatedAccounts)
  // };

  const handleDeleteAccount = async (accountId) => {
    await deleteDoc(doc(dbFire, "account", accountId)).catch((error) => {
      console.log(error);
    });
    setAccounts((previousAccounts) =>
      previousAccounts.filter((account) => account.id !== accountId)
    );
  };

  useEffect(() => {
    onAuthStateChanged(authFire, (user) => {
      setUser(user);
      if (user) fetchData(user.uid);
    });
    // handleDeleteAccount();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
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
          />
        )}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
      <View>
        <Button
          onPress={() =>
            navigation.navigate("Accounts List", { screen: "Accounts Adder" })
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
