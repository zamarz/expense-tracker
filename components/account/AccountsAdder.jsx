import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, TextInput, Button } from "react-native";
import { Loading } from "../loading/Loading";
import { addDoc, collection } from "firebase/firestore";
import { dbFire, authFire } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function AccountsAdder({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [bank, setBank] = useState("");
    const [balance, setBalance] = useState("");
    const [type, setType] = useState("");
    const [budget, setBudget] = useState("");
    const [userId, setUserId] = useState("");

    if (isLoading) return <Loading />;
    if (isError) return <p>Something went wrong!</p>;

    const auth = authFire;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid
            setUserId(uid)
        }
    })

    const handleAddAccount = async () => {
        const newAccount = {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2),
            bank: bank,
            balance: balance,
            type: type,
            budget: budget,
            userId: userId,
        };

        await addDoc(collection(dbFire, "account"), newAccount)
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput
                    placeholder="Bank name"
                    value={bank}
                    onChangeText={text => setBank(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Balance"
                    value={balance}
                    onChangeText={text => setBalance(text)}
                    inputMode="numeric"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Type"
                    value={type}
                    onChangeText={text => setType(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Budget"
                    value={budget}
                    onChangeText={text => setBudget(text)}
                    inputMode="numeric"
                    style={styles.input}
                />
                <Button
                    // Add functionality for account adder button
                    onPress={() => { handleAddAccount() }}
                    title="Add account"
                    accessibilityLabel="Add a new account to the accounts list"
                ></Button>
                <Button onPress={() => navigation.navigate('Home')}
                    title="Go back"
                    accessibilityLabel="Button to navigate to Home page"></Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 16,
    },
    title: {
        textAlign: "center",
        marginVertical: 8,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: "#737373",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
