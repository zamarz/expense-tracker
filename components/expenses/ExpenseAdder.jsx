import { Alert, View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import React, { useState, useEffect, useContext } from "react";

import ErrorHandler from "../error/ErrorHandler";
import { Loading } from "../loading/Loading";
import { Formik } from "formik";

import * as yup from "yup";
import {
  getCategories,
  getMerchants,
  addCategory,
  addMerchant,
  addExpense,
  addAccount,
} from "../../firebase/firestore";
import CategoryAdderModal from "../categories/CategoryAdderModal";
import CategoryList from "../categories/CategoryList";
import AccountAdderModal from "../account/AccountAdderModal";
import AccountListDropDown from "../account/AccountListDropDown";
import MerchantAutoComplete from "../merchants/MerchantAutoComplete";
import MerchantAdderModal from "../merchants/MerchantAdderModal";
import { AppTracker } from "../../context/AppTracker";
import { UserContext } from "../../context/UserContext";

export default function ExpenseAdder({ navigation }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [merchant, setMerchant] = useState("");
  const [date, setDate] = useState("");
  const [receipt, setReceipt] = useState("");
  const [account, setAccount] = useState("");
  const [location, setLocation] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({}); //change const initialC
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
  const [toggleAccountModal, setToggleAccountModal] = useState(false);
  const [toggleMerchantModal, setToggleMerchantModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [accountList, setAccounts] = useState([]);
  const { state, dispatch } = useContext(AppTracker);
  const { accounts } = state;
  const { uid } = useContext(UserContext);
  // const auth = authFire;
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     setUserId(uid);
  //   }
  // });

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .then(() => {
        getMerchants().then((merchants) => {
          setMerchants(merchants);
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  // useEffect(() => {
  //   getAccounts().then((accounts) => {
  //     setAccounts(accounts);
  //   });
  // }, [accounts]);

  // useEffect(() => {

  // }, []);

  const expenses = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    amount,
    category,
    merchant,
    date,
    receipt,
    account,
    location,
    userId: uid,
  };

  const expenseSchema = yup.object().shape({
    amount: yup
      .number("")
      .typeError("Amount should be a number")
      .required("Amount is required!")
      .positive()
      .test(
        "maxDigitsAfterDecimal",
        "number field must have 2 digits after decimal or less",
        (number) => /^\d+(.\d{1,2})?$/.test(number)
      ),
    merchant: yup.string().required(),
    account: yup.string().required(),
    location: yup.string().required(),
    category: yup.string().required(),
    date: yup.string().required(),
  });

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      userId: expenses.userId,
      id: expenses.id,
    };

    setLoading(true);
    addExpense(data)
      .then(() => {
        setLoading(false);
        alert(
          "Expense Added",
          `You have successfully added your expense for the amount of £${data.amount}`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
        dispatch({ type: "ADD_EXPENSES", payload: data });
        // navigation.navigate("Expenses List");
      })
      .catch((error) => {
        setError(error);
        // TODO: Check
        setLoading(false);
        // TODO: CHECK
        // console.error("Error: Unable to add expense");
        alert("Error", "Unable to add expense", [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      });
  };

  if (error) return <ErrorHandler error={error} />;

  const handleAddCategory = (category) => {
    if (!category.length) return;
    const exists = categories.find((cat) => cat.label === category);
    if (exists) {
      // TODO: CHECK
      Alert.alert("This category already exists!", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
      // console.error("Error: Category already exists");
      // return;
    }

    addCategory(category).then(
      () => {
        Alert.alert(
          "Category Added",
          `You have successfully added ${category} to your categories`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );

        setCategories((prev) => [
          ...prev,
          { label: category, value: category },
        ]);
      },
      (error) => {
        //CHECK
        Alert.alert(`Error: Unable to add ${category} to your categories`, [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      }
    );
    setToggleCategoryModal((prev) => !prev);
  };

  const handleAddMerchant = (merchant) => {
    if (!merchant.length) return;
    const exists = merchants.find((merch) => merch.label === merchant);
    if (exists) {
      Alert.alert(`Error: this merchant already exists!`, [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
      //CHECK
    }

    addMerchant(merchant).then(
      () => {
        Alert.alert(
          "Merchant Added",
          `You have successfully added ${merchant} to your merchant list`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );

        setMerchants((prev) => [...prev, { label: merchant, value: merchant }]);
      },
      (error) => {
        // TODO: - check working
        //console.error("Error: Unable to add merchant");
        Alert.alert("Error", "Unable to add merchant", [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      }
    );
    setToggleMerchantModal((prev) => !prev);
  };

  const handleAddAccount = (account) => {
    if (!account.length) return;
    const exists = accounts.find((acc) => acc.label === account);
    if (exists) {
      // console.error("Error: Account already exists");
      // return;
      //CHECK
      Alert.alert("Error", "This account already exists", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }

    addAccount(account).then(
      () => {
        Alert.alert(
          "Payment Method Added",
          `You have successfully added ${account} to your accounts`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );

        setAccounts((prev) => [...prev, { label: account, value: account }]);
      },
      (error) => {
        // TODO: CHECK
        //console.error("Error: Unable to add account");
        Alert.alert(
          "Error",
          "You have not been able to add this account card to your account",
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
      }
    );
    setToggleAccountModal((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{
        amount: "",
        category: "",
        merchant: "",
        date: "",
        receipt: "",
        account: "",
        location: "",
        id: "",
      }}
      validationSchema={expenseSchema}
      onSubmit={(values) => {
        setFormData(
          (formData.amount = values.amount),
          (formData.category = values.category),
          (formData.account = values.account),
          (formData.date = values.date),
          (formData.merchant = values.merchant),
          (formData.receipt = values.receipt),
          (formData.location = values.location)
        );
        handleSubmit(formData);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        return (
          <View style={styles.container}>
            {loading ? (
              <Loading />
            ) : (
              <>
                <View style={styles.inputRow}>
                  <Text variant="headlineMedium">Add a new Expense</Text>
                  <TextInput
                    mode="outlined"
                    aria-label="Amount"
                    style={styles.input}
                    onChangeText={handleChange("amount")}
                    onBlur={handleBlur("amount")}
                    value={values.amount}
                    placeholder="Amount"
                  />
                  {errors.amount && <Text>{errors.amount}</Text>}
                </View>
                <View style={styles.inputRow}>
                  <MerchantAutoComplete
                    style={styles.input}
                    merchant={values.merchant}
                    merchants={merchants}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <Button
                    mode="outlined"
                    title="Add New Merchant"
                    onPress={() => setToggleMerchantModal((prev) => !prev)}
                  >
                    Add New Merchant
                  </Button>
                </View>
                <MerchantAdderModal
                  isVisible={toggleMerchantModal}
                  setIsVisible={setToggleMerchantModal}
                  handleAddMerchant={handleAddMerchant}
                />
                {errors.merchant && <Text>{errors.merchant}</Text>}
                <CategoryList
                  category={values.category}
                  categories={categories}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                {errors.category && <Text>{errors.category}</Text>}
                <Button
                  mode="contained"
                  title="Add New Category"
                  onPress={() => setToggleCategoryModal((prev) => !prev)}
                >
                  Add New Category
                </Button>
                <CategoryAdderModal
                  isVisible={toggleCategoryModal}
                  setIsVisible={setToggleCategoryModal}
                  handleAddCategory={handleAddCategory}
                />
                <AccountListDropDown
                  account={values.account}
                  accounts={accounts}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                {errors.account && <Text>{errors.account}</Text>}
                <Button
                  mode="contained"
                  title="Add New Account"
                  onPress={() => setToggleAccountModal((prev) => !prev)}
                >
                  Add New Account
                </Button>
                <AccountAdderModal
                  isVisible={toggleAccountModal}
                  setIsVisible={setToggleAccountModal}
                  handleAddAccount={handleAddAccount}
                />
                <TextInput
                  mode="outlined"
                  aria-label="Date"
                  placeholder="Date"
                  style={styles.input}
                  onChangeText={handleChange("date")}
                  onBlur={handleBlur("date")}
                  value={values.date}
                />
                {errors.date && <Text>{errors.date}</Text>}
                <TextInput
                  mode="outlined"
                  aria-label="Location"
                  placeholder="Location"
                  style={styles.input}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  value={values.location}
                />
                {errors.location && <Text>{errors.location}</Text>}
                <Button title="Submit" onPress={handleSubmit} mode="contained">
                  Submit
                </Button>
              </>
            )}
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
    alignItems: "center",
    marginVertical: "20px",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
