import { Alert, StyleSheet, View } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import MerchantAutoComplete from "../merchants/MerchantAutoComplete";
import MerchantAdderModal from "../merchants/MerchantAdderModal";
import CategoryList from "../categories/CategoryList";
import CategoryAdderModal from "../categories/CategoryAdderModal";
import {
  addCategory,
  addExpense,
  addMerchant,
  getCategories,
  getMerchants,
} from "../../firebase/firestore";
import AccountListDropDown from "../account/AccountListDropDown";
import { AppTracker } from "../../context/AppTracker";
import { UserContext } from "../../context/UserContext";
import { DatePickerModal } from "react-native-paper-dates";
import { Loading } from "../loading/Loading";
import ErrorHandler from "../error/ErrorHandler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FIREBASE_API } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import { fetchGeoLocation } from "../../utils/helpers";

const ExpenseAdder = () => {
  const [toggleMerchantModal, setToggleMerchantModal] = useState(false);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState(undefined);
  const [location, setLocation] = useState();
  const [geolocation, setGeolocation] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [merchants, setMerchants] = useState([]);
  const [merchant, setMerchant] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const { state, dispatch } = useContext(AppTracker);
  const { accounts } = state;
  const { uid } = useContext(UserContext);

  const theme = useTheme();

  const formData = {
    userId: uid,
    account: account,
    amount: amount,
    date: date,
    merchant: merchant,
    category: category,
    location: location,
  };

  console.log(formData);

  useEffect(() => {
    setLoading(true);
    getCategories(uid)
      .then((categories) => {
        setCategories(categories);
      })
      .then(() => {
        getMerchants(uid).then((merchants) => {
          setMerchants(merchants);
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }, []);

  function handleAddMerchant(merchant) {
    if (!merchant.length) return;
    console.log("Merchant Adder");
    if (exists) {
      Alert.alert(`Error: this merchant already exists!`, [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
    addMerchant(merchant)
      .then(() => {
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
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error: Unable to add merchant", [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      });
    setToggleMerchantModal((prev) => !prev);
  }

  const handleAddCategory = (category) => {
    if (!category.length) return;
    const exists = categories.find((cat) => cat.label === category);
    if (exists) {
      Alert.alert("This category already exists!", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
    }
    addCategory(category)
      .then(() => {
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
      })
      .catch((err) => {
        Alert.alert(`Error: Unable to add ${category} to your categories`, [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      });
    setToggleCategoryModal((prev) => !prev);
  };

  const handleSubmit = async () => {
    console.log(formData);
    // const data = {
    //   ...values,
    //   userId: expenses.userId,
    //   id: expenses.id,
    //   date: expenses.date,
    // };
    setLoading(true);
    addExpense(formData)
      .then(() => {
        setLoading(false);
        alert(
          "Expense Added",
          `You have successfully added your expense for the amount of £${amount}`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
        dispatch({ type: "ADD_EXPENSE", payload: formData });
        navigation.navigate("Expenses List");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        // TODO: Check
        setLoading(false);
        // TODO: CHECK
        // console.error("Error: Unable to add expense");
        alert("Error: Unable to add expense", [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      });
  };

  function handleChange(type, payload) {
    console.log(type, "TYPE#########");
    console.log(payload, "PAYLOAD#########");
    switch (type) {
      case "account":
        {
          setAccount(payload);
        }
        break;
      case "category":
        {
          setCategory(payload);
        }
        break;
      case "merchant":
        {
          setMerchant(payload);
        }
        break;
      case "geoLocation": {
        setGeolocation(payload);
      }
      default:
        console.log("CHANGE");
    }
  }

  const onDismissSingle = () => {
    setOpen(false);
  };

  const onConfirmSingle = (params) => {
    setOpen(false);
    setDate(params.date.toString());
  };

  if (loading) return <Loading />;

  if (error) {
    console.log(error);
    return <ErrorHandler />;
  }

  // console.log(formData);

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Add a new Expense</Text>
          <TextInput
            mode="outlined"
            value={amount}
            onChangeText={setAmount}
            // onSubmitEditing={() => handleChange("amount", amount)}
          />
          <MerchantAutoComplete
            merchant={merchant}
            merchants={merchants}
            setMerchant={setMerchant}
            handleChange={handleChange}
          />
          <Button
            mode="outlined"
            onPress={() => setToggleMerchantModal((prev) => !prev)}
          >
            <Text>Add new Merchant</Text>
          </Button>
          <MerchantAdderModal
            isVisible={toggleMerchantModal}
            setIsVisible={setToggleMerchantModal}
            handleAddMerchant={handleAddMerchant}
          />
          <CategoryList
            category={"Default"}
            categories={categories}
            handleChange={handleChange}
          />
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
            accounts={accounts}
            handleChange={handleChange}
          />
          <Button
            onPress={() => setOpen(true)}
            uppercase={false}
            mode="outlined"
          >
            Select date for your expense
          </Button>
          <DatePickerModal
            locale="en-GB"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
          />
          <GooglePlacesAutocomplete
            placeholder="Search location"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // setLocation(data.description);
              fetchGeoLocation(data.description).then((res) => {
                console.log(res);
              });
              console.log(data, details);
            }}
            query={{
              key: FIREBASE_API,
              language: "en",
            }}
            textInputProps={{
              InputComp: TextInput,
            }}
            styles={{
              textInputContainer: {
                backgroundColor: theme.colors.primary,
              },
              container: {
                flex: 0,
              },
              textInput: {
                height: 38,
                color: "#5d5d5d",
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            onFail={(error) => console.log(error)}
            onNotFound={() => console.log("no results")}
          />
          <Button title="Submit" onPress={handleSubmit} mode="contained">
            Submit
          </Button>
          {/* <Button mode="contained" onPress={handleChange}>
            Hit me
          </Button> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "80%",
    marginHorizontal: "auto",
  },
  wrapper: {
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ExpenseAdder;

// import { Alert, View, StyleSheet } from "react-native";
// import { Button, Text, TextInput } from "react-native-paper";
// import React, { useState, useEffect, useContext } from "react";

// import ErrorHandler from "../error/ErrorHandler";
// import { Loading } from "../loading/Loading";
// import { Formik } from "formik";

// import * as yup from "yup";
// import {
//   getCategories,
//   getMerchants,
//   addCategory,
//   addMerchant,
//   addExpense,
//   addAccount,
// } from "../../firebase/firestore";
// import CategoryAdderModal from "../categories/CategoryAdderModal";
// import CategoryList from "../categories/CategoryList";
// import AccountAdderModal from "../account/AccountAdderModal";
// import AccountListDropDown from "../account/AccountListDropDown";
// import MerchantAutoComplete from "../merchants/MerchantAutoComplete";
// import MerchantAdderModal from "../merchants/MerchantAdderModal";
// import { AppTracker } from "../../context/AppTracker";
// import { UserContext } from "../../context/UserContext";
// import { DatePickerModal } from "react-native-paper-dates";

// export default function ExpenseAdder({ navigation }) {
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [merchant, setMerchant] = useState("");
//   const [date, setDate] = useState("");
//   const [receipt, setReceipt] = useState("");
//   const [account, setAccount] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({}); //change const initialC
//   const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
//   const [toggleAccountModal, setToggleAccountModal] = useState(false);
//   const [toggleMerchantModal, setToggleMerchantModal] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [merchants, setMerchants] = useState([]);
//   // const [accounts, setAccounts] = useState([]);
//   const { state, dispatch } = useContext(AppTracker);
//   const { accounts } = state;
//   const { uid } = useContext(UserContext);
//   const [open, setOpen] = useState(false);

//   // const auth = authFire;
//   // onAuthStateChanged(auth, (user) => {
//   //   if (user) {
//   //     const uid = user.uid;
//   //     setUserId(uid);
//   //   }
//   // });

//   useEffect(() => {
//     setLoading(true);
//     getCategories()
//       .then((categories) => {
//         setCategories(categories);
//       })
//       .then(() => {
//         getMerchants().then((merchants) => {
//           setMerchants(merchants);
//         });
//       })
//       .then(() => {
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setError(err);
//       });
//   }, []);

//   // useEffect(() => {
//   //   getAccounts().then((accounts) => {
//   //     setAccounts(accounts);
//   //   });
//   // }, [accounts]);

//   // useEffect(() => {

//   // }, []);

//   const onDismissSingle = () => {
//     setOpen(false);
//   };

//   const onConfirmSingle = (params) => {
//     setOpen(false);
//     setDate(params.date.toString());
//   };

//   const expenses = {
//     id: Date.now().toString(36) + Math.random().toString(36).substring(2),
//     amount,
//     category,
//     merchant,
//     date,
//     receipt,
//     account,
//     location,
//     userId: uid,
//   };

//   const expenseSchema = yup.object().shape({
//     amount: yup
//       .number("")
//       .typeError("Amount should be a number")
//       .required("Amount is required!")
//       .positive()
//       .test(
//         "maxDigitsAfterDecimal",
//         "number field must have 2 digits after decimal or less",
//         (number) => /^\d+(.\d{1,2})?$/.test(number)
//       ),
//     merchant: yup.string().required(),
//     account: yup.string().required(),
//     location: yup.string().required(),
//     category: yup.string().required(),
//     // date: yup.string().required(),
//   });

//   const handleSubmit = async (values) => {
//     const data = {
//       ...values,
//       userId: expenses.userId,
//       id: expenses.id,
//       date: expenses.date,
//     };

//     setLoading(true);
//     addExpense(data)
//       .then(() => {
//         setLoading(false);
//         alert(
//           "Expense Added",
//           `You have successfully added your expense for the amount of £${amount}`,
//           [
//             {
//               text: "OK",
//               style: "cancel",
//             },
//           ]
//         );
//         dispatch({ type: "ADD_EXPENSES", payload: data });
//         // navigation.navigate("Expenses List");
//       })
//       .catch((err) => {
//         console.log(err);
//         setError(err);
//         // TODO: Check
//         setLoading(false);
//         // TODO: CHECK
//         // console.error("Error: Unable to add expense");
//         alert("Error: Unable to add expense", [
//           {
//             text: "OK",
//             style: "cancel",
//           },
//         ]);
//       });
//   };

//   if (error) return <ErrorHandler error={error} />;

//   const handleAddCategory = (category) => {
//     if (!category.length) return;
//     const exists = categories.find((cat) => cat.label === category);
//     if (exists) {
//       // TODO: CHECK
//       Alert.alert("This category already exists!", [
//         {
//           text: "OK",
//           style: "cancel",
//         },
//       ]);
//       // console.error("Error: Category already exists");
//       // return;
//     }

//     addCategory(category)
//       .then(() => {
//         Alert.alert(
//           "Category Added",
//           `You have successfully added ${category} to your categories`,
//           [
//             {
//               text: "OK",
//               style: "cancel",
//             },
//           ]
//         );

//         setCategories((prev) => [
//           ...prev,
//           { label: category, value: category },
//         ]);
//       })
//       .catch((err) => {
//         //CHECK
//         Alert.alert(`Error: Unable to add ${category} to your categories`, [
//           {
//             text: "OK",
//             style: "cancel",
//           },
//         ]);
//       });
//     setToggleCategoryModal((prev) => !prev);
//   };

//   const handleAddMerchant = (merchant) => {
//     if (!merchant.length) return;
//     const exists = merchants.find((merch) => merch.label === merchant);
//     if (exists) {
//       Alert.alert(`Error: this merchant already exists!`, [
//         {
//           text: "OK",
//           style: "cancel",
//         },
//       ]);
//       //CHECK
//     }

//     addMerchant(merchant)
//       .then(() => {
//         Alert.alert(
//           "Merchant Added",
//           `You have successfully added ${merchant} to your merchant list`,
//           [
//             {
//               text: "OK",
//               style: "cancel",
//             },
//           ]
//         );

//         setMerchants((prev) => [...prev, { label: merchant, value: merchant }]);
//       })
//       .catch((err) => {
//         // TODO: - check working
//         //console.error("Error: Unable to add merchant");
//         Alert.alert("Error", "Unable to add merchant", [
//           {
//             text: "OK",
//             style: "cancel",
//           },
//         ]);
//       });
//     setToggleMerchantModal((prev) => !prev);
//   };

//   // const handleAddAccount = (account) => {
//   //   if (!account.length) return;
//   //   const exists = accounts.find((acc) => acc.label === account);
//   //   if (exists) {
//   //     // console.error("Error: Account already exists");
//   //     // return;
//   //     //CHECK
//   //     Alert.alert("Error", "This account already exists", [
//   //       {
//   //         text: "OK",
//   //         style: "cancel",
//   //       },
//   //     ]);
//   //   }

//   //   addAccount(account).then(
//   //     () => {
//   //       Alert.alert(
//   //         "Payment Method Added",
//   //         `You have successfully added ${account} to your accounts`,
//   //         [
//   //           {
//   //             text: "OK",
//   //             style: "cancel",
//   //           },
//   //         ]
//   //       );

//   //       setAccounts((prev) => [...prev, { label: account, value: account }]);
//   //     },
//   //     (error) => {
//   //       // TODO: CHECK
//   //       //console.error("Error: Unable to add account");
//   //       Alert.alert(
//   //         "Error",
//   //         "You have not been able to add this account card to your account",
//   //         [
//   //           {
//   //             text: "OK",
//   //             style: "cancel",
//   //           },
//   //         ]
//   //       );
//   //     }
//   //   );
//   //   setToggleAccountModal((prev) => !prev);
//   // };

//   return (
//     <Formik
//       initialValues={{
//         amount: "",
//         category: "",
//         merchant: "",
//         date: "",
//         receipt: "",
//         account: "",
//         location: "",
//         id: "",
//       }}
//       validationSchema={expenseSchema}
//       onSubmit={(values) => {
//         setFormData(
//           (formamount = values.amount),
//           (formcategory = values.category),
//           (formaccount = values.account),
//           (formdate = values.date),
//           (formmerchant = values.merchant),
//           (formreceipt = values.receipt),
//           (formlocation = values.location)
//         );
//         handleSubmit(formData);
//       }}
//     >
//       {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
//         return (
//           <View style={styles.container}>
//             {loading ? (
//               <Loading />
//             ) : (
//               <>
//                 <View style={styles.inputRow}>
//                   <Text variant="headlineMedium">Add a new Expense</Text>
//                   <TextInput
//                     mode="outlined"
//                     aria-label="Amount"
//                     style={styles.input}
//                     onChangeText={handleChange("amount")}
//                     // onBlur={handleBlur("amount")}

//                     value={values.amount}
//                     placeholder="Amount"
//                   />
//                   {errors.amount && <Text>{errors.amount}</Text>}
//                 </View>
//                 <View style={styles.inputRow}>
//                   <MerchantAutoComplete
//                     style={styles.input}
//                     merchant={values.merchant}
//                     merchants={merchants}
//                     handleChange={handleChange}
//                     // handleBlur={handleBlur}
//                   />
//                   <Button
//                     mode="outlined"
//                     title="Add New Merchant"
//                     onPress={() => setToggleMerchantModal((prev) => !prev)}
//                   >
//                     Add New Merchant
//                   </Button>
//                 </View>
//                 <MerchantAdderModal
//                   isVisible={toggleMerchantModal}
//                   setIsVisible={setToggleMerchantModal}
//                   handleAddMerchant={handleAddMerchant}
//                 />
//                 {errors.merchant && <Text>{errors.merchant}</Text>}
//                 {/* <CategoryList
//                   category={values.category}
//                   categories={categories}
//                   handleChange={handleChange}
//                   // handleBlur={handleBlur}
//                 />
//                 {errors.category && <Text>{errors.category}</Text>} */}
//                 {/* <Button
//                   mode="contained"
//                   title="Add New Category"
//                   onPress={() => setToggleCategoryModal((prev) => !prev)}
//                 >
//                   Add New Category
//                 </Button> */}
//                 {/* <CategoryAdderModal
//                   isVisible={toggleCategoryModal}
//                   setIsVisible={setToggleCategoryModal}
//                   handleAddCategory={handleAddCategory}
//                 /> */}
//                 <AccountListDropDown
//                   account={values.account}
//                   accounts={accounts}
//                   handleChange={handleChange}
//                   // handleBlur={handleBlur}
//                 />
//                 {errors.account && <Text>{errors.account}</Text>}
//                 {/* <Button
//                   mode="contained"
//                   title="Add New Account"
//                   onPress={() => setToggleAccountModal((prev) => !prev)}
//                 > */}
//                 {/* Add New Account
//                 </Button>
//                 <AccountAdderModal
//                   isVisible={toggleAccountModal}
//                   setIsVisible={setToggleAccountModal}
//                   handleAddAccount={handleAddAccount}
//                 /> */}
//                 {/* <TextInput
//                   mode="outlined"
//                   aria-label="Date"
//                   placeholder="Date"
//                   style={styles.input}
//                   onChangeText={handleChange("date")}
//                   onBlur={handleBlur("date")}
//                   value={values.date}
//                 /> */}
//                 {/* {errors.date && <Text>{errors.date}</Text>} */}
//                 <Button
//                   onPress={() => setOpen(true)}
//                   uppercase={false}
//                   mode="outlined"
//                 >
//                   Select date for your expense
//                 </Button>
//                 <DatePickerModal
//                   locale="en-GB"
//                   mode="single"
//                   visible={open}
//                   onDismiss={onDismissSingle}
//                   date={date}
//                   onConfirm={onConfirmSingle}
//                 />
//                 <TextInput
//                   mode="outlined"
//                   aria-label="Location"
//                   placeholder="Location"
//                   style={styles.input}
//                   onChangeText={handleChange("location")}
//                   // onBlur={handleBlur("location")}
//                   value={values.location}
//                 />
//                 {errors.location && <Text>{errors.location}</Text>}
//                 <Button title="Submit" onPress={handleSubmit} mode="contained">
//                   Submit
//                 </Button>
//               </>
//             )}
//           </View>
//         );
//       }}
//     </Formik>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: "20px",
//   },
//   inputContainer: {
//     width: "80%",
//   },
//   input: {
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   buttonContainer: {
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   button: {
//     backgroundColor: "#0782F9",
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonOutline: {
//     backgroundColor: "white",
//     marginTop: 5,
//     borderColor: "#0782F9",
//     borderWidth: 2,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   buttonOutlineText: {
//     color: "#0782F9",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });
