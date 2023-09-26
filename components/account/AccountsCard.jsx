import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function AccountsCard({ item, onDelete, navigation }) {

    return (
            <View>
                <Text style={styles.item}>{item.bank}: £{item.balance}{'\n'}Budget: £{item.budget}{'\n'}Card type: {item.type}</Text>
                <Button title="Edit budget"
                    aria-label="Edit budget for the account" onPress={() => {}}></Button>
                <Button title="Add income"
                    aria-label="Add an income for the account" onPress={() => navigation.navigate("Income Adder", { item: item })}></Button>
                <Button title="Delete account"
                    aria-label="Delete this account from the list" color={"red"} onPress={() => onDelete(item.id)}></Button>
            </View>
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
