import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Loading } from "../loading/Loading";

export default function AccountsAdder() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [bank, setBank] = useState("");
    const [balance, setBalance] = useState(0);

    if (isLoading) return <Loading />;
    if (isError) return <p>Something went wrong!</p>;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Layout>
                    <View>
                        <TextInput
                            placeholder="Account bank"
                            value={password}
                            onChangeText={text => setBank(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Account balance"
                            value={password}
                            onChangeText={text => setBalance(text)}
                            style={styles.input}
                        />
                        <Button
                        // Add functionality for account adder button
                            onPress={() => { }}
                            title="Add account"
                            accessibilityLabel="Add a new account to the accounts list"
                        ></Button>
                    </View>
                </Layout>
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
