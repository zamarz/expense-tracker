import { View, StyleSheet, Image, Alert } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";

import { authFire, dbFire } from "../../firebaseConfig";
import ErrorHandler from "../error/ErrorHandler";
import { useContext, useEffect, useState } from "react";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "@firebase/firestore";
import {
  addCategory,
  addExpense,
  addMerchant,
  getCategories,
  getMerchants,
} from "../../firebase/firestore";
import CategoryList from "../categories/CategoryList";
import CategoryAdderModal from "../categories/CategoryAdderModal";
import { ScrollView } from "react-native-gesture-handler";
import { DatePickerModal } from "react-native-paper-dates";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Loading } from "../loading/Loading";
import { FIREBASE_API } from "@env";
import { AppTracker } from "../../context/AppTracker";
import { UserContext } from "../../context/UserContext";
import MerchantAdderModal from "../merchants/MerchantAdderModal";
import MerchantAutoComplete from "../merchants/MerchantAutoComplete";
import AccountListDropDown from "../account/AccountListDropDown";

const ReceiptAdder = ({ route, navigation }) => {
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [merchants, setMerchants] = useState("");

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(undefined);
  const [location, setLocation] = useState();

  const { imageURL, imageURI } = route.params;
  const [image, setImage] = useState(imageURI);
  const [categories, setCategories] = useState([]);

  const { state, dispatch } = useContext(AppTracker);
  const { accounts } = state;
  const { uid } = useContext(UserContext);
  const theme = useTheme();

  const [toggleMerchantModal, setToggleMerchantModal] = useState(false);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
  const [open, setOpen] = useState(false);

  const formData = {
    userId: uid,
    account: account,
    amount: amount,
    date: date,
    merchant: merchant,
    category: category,
    location: location,
    receipt: imageURL,
  };

  console.log(formData);

  useEffect(() => {
    downloadText();
  }, [image]);

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
        navigation.navigate("Expense List", { screen: "ExpenseList" });
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

  const captureGroup = /(?<=images%2F)(.*)(?=\?)/g;
  const matchedURL = imageURL.match(captureGroup);
  const stringifiedMatch = matchedURL.toString();

  const searchTerm = "gs://test2-c87e5.appspot.com/images/" + stringifiedMatch;

  const downloadText = async () => {
    const q = query(
      collection(dbFire, "extractedText"),
      where("file", "==", searchTerm)
    );

    const querySnapshot = await getDocs(q);

    const expenseData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    const expenseText = expenseData[0].text;
    const captureAmount = expenseText
      .match(/(?<=\bTOTAL\b).\w..\d..../g)
      .toString();
    setAmount(captureAmount);

    const captureMerchant = expenseText.match(/^.SDA/g).toString();
    setMerchant(captureMerchant);

    const captureAccount = expenseText.match(/AMERICAN.EXPRESS/g).toString();
    setAccount(captureAccount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text variant="headlineMedium">Add a new Expense</Text>
        <Text variant="titleMedium">Amount:</Text>
        <TextInput
          placeholder={amount}
          mode="outlined"
          value={amount}
          onChangeText={setAmount}
          // onSubmitEditing={() => handleChange("amount", amount)}
        />
        <Text variant="titleMedium">Merchant:</Text>
        <MerchantAutoComplete
          merchant={merchant}
          merchants={merchants}
          setMerchants={setMerchants}
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
        <AccountListDropDown accounts={accounts} handleChange={handleChange} />
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
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
        <Text variant="titleMedium">Location:</Text>
        <GooglePlacesAutocomplete
          placeholder="Search location"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setLocation(data.description);
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
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Button title="Submit" onPress={handleSubmit} mode="contained">
          Submit
        </Button>
      </View>
    </View>
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

export default ReceiptAdder;

// import { View, StyleSheet, Image, Alert } from "react-native";
// import { Button, Divider, Text, TextInput } from "react-native-paper";

// import { authFire, dbFire } from "../../firebaseConfig";
// import { onAuthStateChanged } from "@firebase/auth";
// import { Formik } from "formik";
// import * as yup from "yup";
// import ErrorHandler from "../error/ErrorHandler";
// import { useEffect, useState } from "react";
// import {
//   doc,
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
// } from "@firebase/firestore";
// import { addCategory, getCategories } from "../../firebase/firestore";
// import CategoryList from "../categories/CategoryList";
// import CategoryAdderModal from "../categories/CategoryAdderModal";
// import { ScrollView } from "react-native-gesture-handler";

// const ReceiptAdder = ({ route, navigation }) => {
//   const [userId, setUserId] = useState("");
//   const [error, setError] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [merchant, setMerchant] = useState("");
//   const [account, setAccount] = useState("");
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [category, setCategory] = useState("");

//   const { imageURL, imageURI } = route.params;
//   const [image, setImage] = useState(imageURI);
//   const [categories, setCategories] = useState([]);
//   const [toggleCategoryModal, setToggleCategoryModal] = useState(false);

//   const auth = authFire;
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       setUserId(uid);
//     }
//   });

//   const expenses = {
//     category,
//     userId,
//   };

//   useEffect(() => {
//     downloadText();
//   }, [image]);

//   useEffect(() => {
//     getCategories().then((categories) => {
//       setCategories(categories);
//     });
//   }, []);

//   const handleSubmit = async (values) => {
//     values.userId = expenses.userId;
//     //preventDefault();
//     setLoading(true);
//     try {
//       const res = await addDoc(collection(dbFire, "expenses"), values);
//       setLoading(false);
//       Alert.alert(
//         "Expense Added",
//         `You have successfully added your expense for the amount of £${values.amount}`,
//         [
//           {
//             text: "OK",
//             style: "cancel",
//           },
//         ]
//       );
//       // TODO: Redirect to home?
//     } catch (error) {
//       setError(error);
//       setLoading(false);
//       Alert.alert("Error: Your expense couldn't be added.", [
//         {
//           text: "OK",
//           style: "cancel",
//         },
//       ]);
//     }
//   };

//   const captureGroup = /(?<=images%2F)(.*)(?=\?)/g;
//   const matchedURL = imageURL.match(captureGroup);
//   const stringifiedMatch = matchedURL.toString();

//   const searchTerm = "gs://test2-c87e5.appspot.com/images/" + stringifiedMatch;

//   const receiptExpenseSchema = yup.object().shape({
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
//     date: yup.string().required(),
//   });

//   const handleAddCategory = (category) => {
//     if (!category.length) return;
//     const exists = categories.find((cat) => cat.label === category);
//     if (exists) {
//       // TODO: Inform user in a modal maybe?
//       console.error("Error: Category already exists");
//       return;
//     }

//     addCategory(category).then(
//       () => {
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
//         // Optimistic update
//         setCategories((prev) => [
//           ...prev,
//           { label: category, value: category },
//         ]);
//       },
//       (error) => {
//         // TODO: Handle error
//         console.error("Error: Unable to add category");
//       }
//     );
//     setToggleCategoryModal((prev) => !prev);
//   };

//   const downloadText = async () => {
//     const q = query(
//       collection(dbFire, "extractedText"),
//       where("file", "==", searchTerm)
//     );

//     const querySnapshot = await getDocs(q);

//     const expenseData = querySnapshot.docs.map((doc) => ({
//       ...doc.data(),
//     }));

//     const expenseText = expenseData[0].text;
//     const captureAmount = expenseText
//       .match(/(?<=\bTOTAL\b).\w..\d..../g)
//       .toString();
//     setAmount(captureAmount);

//     const captureMerchant = expenseText.match(/^.SDA/g).toString();
//     setMerchant(captureMerchant);

//     const captureAccount = expenseText.match(/AMERICAN.EXPRESS/g).toString();
//     setAccount(captureAccount);
//   };

//   // will eventually need to re-render the image in expenses cards so be aware of how it is stored
//   //Need to set some kind of loading screeen of around 10 seconds before this page is rendered
//   //might need to include URI in fields in the collection to see if the receipt image can be generated easily
//   //may need to update Yup fields once date picker etc are implemented

//   return (
//     <Formik
//       enableReinitialize
//       initialValues={{
//         amount: amount,
//         category: "",
//         merchant: merchant,
//         date: "",
//         receipt: imageURL,
//         account: account,
//         location: "",
//       }}
//       validationSchema={receiptExpenseSchema}
//       onSubmit={(values) => {
//         setFormData(
//           (formData.amount = values.amount),
//           (formData.category = values.category),
//           (formData.account = values.account),
//           (formData.date = values.date),
//           (formData.merchant = values.merchant),
//           (formData.receipt = values.receipt),
//           (formData.location = values.location)
//         );
//         handleSubmit(formData);
//       }}
//     >
//       {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
//         return (
//           <ScrollView>
//             <View style={styles.container}>
//               <View style={styles.inputRow}>
//                 <Text variant="headlineMedium">Add a new Expense</Text>
//                 <Text variant="titleMedium">Amount:</Text>
//                 <TextInput
//                   mode="outlined"
//                   aria-label="Amount"
//                   style={styles.input}
//                   onChangeText={handleChange("amount")}
//                   onBlur={handleBlur("amount")}
//                   value={values.amount}
//                   placeholder={amount}
//                 />
//                 {errors.amount && <Text>{errors.amount}</Text>}
//               </View>
//               <Text variant="titleMedium">Merchant:</Text>
//               <TextInput
//                 mode="outlined"
//                 aria-label="Merchant"
//                 style={styles.input}
//                 onChangeText={handleChange("merchant")}
//                 onBlur={handleBlur("merchant")}
//                 value={values.merchant}
//                 placeholder={merchant}
//               />
//               {errors.merchant && <Text>{errors.merchant}</Text>}
//               <CategoryList
//                 category={values.category}
//                 categories={categories}
//                 handleChange={handleChange}
//                 handleBlur={handleBlur}
//               />
//               {errors.category && <Text>{errors.category} </Text>}
//               <Button
//                 mode="contained"
//                 title="Add a new category"
//                 onPress={() => setToggleCategoryModal((prev) => !prev)}
//               >
//                 Add a new category
//               </Button>
//               <CategoryAdderModal
//                 isVisible={toggleCategoryModal}
//                 setIsVisible={setToggleCategoryModal}
//                 handleAddCategory={handleAddCategory}
//               />
//               <TextInput
//                 mode="outlined"
//                 aria-label="Account"
//                 placeholder={account}
//                 style={styles.input}
//                 onChangeText={handleChange("account")}
//                 onBlur={handleBlur("account")}
//                 value={values.account}
//               />
//               {errors.account && <Text>{errors.account}</Text>}
//               <Text variant="titleMedium">Date:</Text>
//               <TextInput
//                 mode="outlined"
//                 aria-label="Date"
//                 placeholder="Date"
//                 style={styles.input}
//                 onChangeText={handleChange("date")}
//                 onBlur={handleBlur("date")}
//                 value={values.date}
//               />
//               {errors.date && <Text>{errors.date}</Text>}
//               <Text variant="titleMedium">Location:</Text>
//               <TextInput
//                 mode="outlined"
//                 aria-label="Location"
//                 placeholder="Location"
//                 style={styles.input}
//                 onChangeText={handleChange("location")}
//                 onBlur={handleBlur("location")}
//                 value={values.location}
//               />
//               {errors.location && <Text>{errors.location}</Text>}
//               {image && (
//                 <Image
//                   source={{ uri: image }}
//                   style={{ width: 200, height: 200 }}
//                 />
//               )}
//               <Button mode="contained" title="Submit" onPress={handleSubmit}>
//                 {" "}
//                 Submit{" "}
//               </Button>
//               <Divider />
//             </View>
//           </ScrollView>
//         );
//       }}
//     </Formik>
//   );
// };

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

// export default ReceiptAdder;
