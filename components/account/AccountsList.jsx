import React, { useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import AccountsCard from "./AccountsCard";
import { dbFire } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { AppTracker } from "../../context/AppTracker";

export default function AccountsList({ navigation }) {
  const { state, dispatch } = useContext(AppTracker);
  const { accounts, balance, budget } = state;

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
