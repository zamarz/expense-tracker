import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';

export default function AccountsCard({ item, onEditBudget, onEditBalance, onAddIncome, onDelete }) {
    const [accountId, setAccountId] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    const [accountBudget, setAccountBudget] = useState("");
    const [accountType, setAccountType] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.item}>{item.bank}: £{item.balance}{'\n'}Budget: {item.budget}{'\n'}Card type: {item.type}</Text>
                <Button title="Edit budget"
                    aria-label="Edit budget for the account" onPress={() => onEditBudget(item.id)}></Button>
                <Button title="Edit balance"
                    aria-label="Edit balance for the account" onPress={() => onEditBalance(item.id)}></Button>
                <Button title="Add income"
                    aria-label="Ad an income for the account" onPress={() => onAddIncome(item.id)}></Button>
                <Button title="Delete account"
                    aria-label="Delete this account from the list" color={"red"} onPress={() => onDelete(item.id)}></Button>
            </View>
        </SafeAreaView>
    )
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
    }
});
