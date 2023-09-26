import React, { useContext, useState } from "react";
import { StyleSheet, View, TextInput, Text, Button } from "react-native";
import { Loading } from "../loading/Loading";
import { addDoc, collection } from "firebase/firestore";
import { dbFire } from "../../firebaseConfig";
import { Formik } from "formik";
import * as yup from "yup";
import { AppTracker } from "../../context/AppTracker";
import { UserContext } from "../../context/UserContext";

export default function AccountsAdder({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { state, dispatch } = useContext(AppTracker);

  const [bank, setBank] = useState("");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  const { uid } = useContext(UserContext);

  if (isLoading) return <Loading />;
  if (isError) return <p>Something went wrong!</p>;

  const newAccount = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    bank,
    balance,
    type,
    budget,
    userId: uid,
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
      console.log(values);
      const res = await addDoc(collection(dbFire, "account"), values);
      if (res.type === "document") {
        dispatch({ type: "ADD_ACCOUNT", payload: values });
      }
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
