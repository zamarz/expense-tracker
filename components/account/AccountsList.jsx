import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import AccountsCard from "./AccountsCard";
import { dbFire } from "../../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { AppTracker } from "../../context/AppTracker";
import { Button, useTheme } from "react-native-paper";

export default function AccountsList({ navigation }) {
  const { state, dispatch } = useContext(AppTracker);
  const { accounts, balance, budget } = state;
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

  return (
    <>
      <View>
        <Text style={styles.title}>
          Total Accounts Balance:
          <Text style={{ color: "green" }}> £{balance.toFixed(2)}</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.title}>
          Total Budget:
          <Text style={{ color: "red" }}> £{budget}</Text>
        </Text>
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
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Accounts Adder")}
          title="Add new account"
          accessibilityLabel="Add a new account to the accounts list"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Text style={{ color: theme.colors.onPrimary }}>Add New Account</Text>
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => navigation.navigate("Home")}
          title="Go back"
          accessibilityLabel="Button to navigate to Home page"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Text style={{ color: theme.colors.onPrimary }}>Go Back</Text>
        </Button>
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
  buttonContainer: {
    marginBottom: 15,
    // marginLeft: 50,
    // marginRight: 50,
    width: "60%",
    marginLeft: 60,
  },
});
