import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import AccountsCard from "./AccountsCard";
import { dbFire } from "../../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  doc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { AppTracker } from "../../context/AppTracker";
export default function AccountsList({ navigation }) {
  const user = useContext(UserContext);
  const { state, dispatch } = useContext(AppTracker);
  const { accounts, balance, budget } = state;
  const [accountList, setAccountList] = useState(accounts);
  console.log(accounts);

  const handleDeleteAccount = async (accountId) => {
    await deleteDoc(doc(dbFire, "account", accountId))
      .then(() => {
        setAccountList((previousAccounts) => {
          const newAccounts = previousAccounts.filter((account) => account.id !== accountId)
          dispatch({ type: "DELETE_ACCOUNT", payload: newAccounts })
        }
        );

      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
  }, []);

  return (
    <>
      <View>
        <Text style={styles.title}>
          Total Accounts Balance: £{balance.toFixed(2)}
        </Text>
      </View>
      <View>
        <Text style={styles.title}>Total Budget: £{budget}</Text>
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
          onPress={() => navigation.navigate("Accounts Adder")}
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
