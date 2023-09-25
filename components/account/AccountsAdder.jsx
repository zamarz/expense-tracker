import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
} from "react-native";
import { Loading } from "../loading/Loading";
import { addDoc, collection } from "firebase/firestore";
import { dbFire, authFire } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";

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
      const uid = user.uid;
      setUserId(uid);
    }
  });

  const newAccount = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    bank,
    balance,
    type,
    budget,
    userId,
  };

  const bankSchema = yup.object().shape({
    bank: yup.string().required(),
    balance: yup.number().required().typeError("Balance should be a number"),
    type: yup.string().required(),
    budget: yup.number().required().typeError("Budget should be a number"),
  });


  const handleSubmit = async (values) => {
    values.userId = newAccount.userId;
    values.id = newAccount.id;
    setIsLoading(true);
    try {
      const res = await addDoc(collection(dbFire, "account"), values);
      setIsLoading(false);
    } catch (err) {
      setIsError(err);
      setIsLoading(false);
    }
  };


  return (
    <Formik
      initialValues={{
        bank: "",
        balance: "",
        type: "",
        budget: "",
        id: "",
      }}
      validationSchema={bankSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        return (
          <View style={styles.container}>
            <View style={styles.inputRow}>
              <Text>Add a new account</Text>
              <TextInput
                aria-label="Bank"
                style={styles.input}
                placeholder="Bank name"
                value={values.bank}
                onChangeText={handleChange("bank")}
                onBlur={handleBlur("bank")}
              />
              {errors.bank && <Text>{errors.bank}</Text>}
            </View>
            <TextInput
              aria-label="Balance"
              placeholder="Balance"
              value={values.balance}
              onChangeText={handleChange("balance")}
              handleBlur={handleBlur("balance")}
              keyboardType="numeric"
              style={styles.input}
            />
            {errors.balance && <Text>{errors.balance}</Text>}
            <TextInput
              aria-label="Type"
              placeholder="Type"
              value={values.type}
              onChangeText={handleChange("type")}
              handleBlur={handleBlur("type")}
              style={styles.input}
            />
            {errors.type && <Text>{errors.type}</Text>}
            <TextInput
              aria-label="Budget"
              placeholder="Budget"
              value={values.budget}
              onChangeText={handleChange("budget")}
              handleBlur={handleBlur("budget")}
              keyboardType="numeric"
              style={styles.input}
            />
            {errors.budget && <Text>{errors.budget}</Text>}

            <Button
              // Add functionality for account adder button
              onPress={handleSubmit}
              title="Add account"
              accessibilityLabel="Add a new account to the accounts list"
            ></Button>
            <Button
              onPress={() => navigation.navigate("Account List")}
              title="Go back"
              accessibilityLabel="Button to navigate to Accounts page"
            ></Button>
          </View>
        );
      }}
    </Formik>
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
