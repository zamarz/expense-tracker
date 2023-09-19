import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, Button } from "react-native";

const accountsData = [
    {
        id: "1",
        bank: "Halifax",
        balance: 5.25,
    },
    {
        id: "2",
        bank: "Santander",
        balance: 155,
    },
    {
        id: "3",
        bank: "Natwest",
        balance: 56.50,
    },
    {
        id: "4",
        bank: "Chase",
        balance: 750.85,
    },
];

export default function AccountList() {
    const calculateTotalBalance = () => {
        let totalBalance = 0;
        for (const account of accountsData) {
            totalBalance += account.balance;
        }
        return totalBalance;
    };

    const totalBalance = calculateTotalBalance();

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Total Accounts Balance: £{totalBalance.toFixed(2)}</Text>
            </View>
            <FlatList
                data={accountsData}
                renderItem={({ item }) => <Text style={styles.item}>{item.bank}: £{item.balance}</Text>}
                keyExtractor={(item) => item.id}
            />
            <View>
                <Button onPress={() => navigation.navigate('AccountsAdder')}
                    title="Add account"
                    accessibilityLabel="Add a new account to the accounts list"></Button>
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