import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button, FlatList } from "react-native";
import AccountsCard from "./AccountsCard";
import { dbFire } from "../../firebaseConfig";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
// import { doc, deleteDoc } from "firebase/firestore";

// const q = query(collection(dbFire, "account"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const accounts = [];
//         querySnapshot.forEach((doc) => {
//             accounts.push(doc.data());
//         });
//         console.log("Accounts: ", accounts);
//     });

export default function AccountList({ navigation }) {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(dbFire, "account"));
            const querySnapshot = await getDocs(q);
            const accountData = querySnapshot.docs.map((doc) => doc.data());
            setAccounts(accountData);
        };
        fetchData();
    }, []);

    const calculateTotalBalance = () => {
        let totalBalance = 0;
        for (const account of accounts) {
            totalBalance += account.balance;
        }
        return totalBalance;
    };

    const totalBalance = calculateTotalBalance();

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

    // const handleDeleteAccount = async () => {
    //     await deleteDoc(doc(dbFire, "account", "accountId"))
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    // {totalBalance.toFixed(2)}

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Total Accounts Balance: £{totalBalance}</Text>
            </View>
            <View>
                <Text style={styles.title}>Total Budget: £0</Text>
            </View>
            <FlatList
                contentContainerStyle={{ alignSelf: 'flex-start' }}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={true}
                data={accounts}
                renderItem={({ item }) => <AccountsCard item={item} onDelete={() => handleDeleteAccount(item.id)} onEditBudget={() => handleEditBudget(item.id)} onEditBalance={() => handleEditBalance(item.id)} onAddIncome={() => handleAddIncome(item.id)} />}
                keyExtractor={(item) => {return item.id}}
            />
            <View>
                <Button onPress={() => navigation.navigate('AccountsAdder')}
                    title="Add new account"
                    accessibilityLabel="Add a new account to the accounts list"></Button>
            </View>
            <View>
                <Button onPress={() => navigation.navigate('Home')}
                    title="Go back"
                    accessibilityLabel="Button to navigate to Home page"></Button>
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
    }
});