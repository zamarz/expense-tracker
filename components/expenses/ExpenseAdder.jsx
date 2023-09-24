// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Button,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { authFire, dbFire } from "../../firebaseConfig";
// import { addDoc, collection } from "@firebase/firestore";
// import { onAuthStateChanged } from "@firebase/auth";
// import ErrorHandler from "../error/ErrorHandler";
// import { Loading } from "../loading/Loading";
// import { Formik } from "formik";
// import { stringifyValueWithProperty } from "react-native-web/dist/cjs/exports/StyleSheet/compiler";
// import { object, string, number } from "yup";
// import * as yup from "yup";

// export default function ExpenseAdder({ navigation }) {
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [merchant, setMerchant] = useState("");
//   const [date, setDate] = useState("");
//   const [receipt, setReceipt] = useState("");
//   const [account, setAccount] = useState("");
//   const [location, setLocation] = useState("");
//   const [userId, setUserId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({});

//   const auth = authFire;
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       setUserId(uid);
//     }
//   });

//   const expenses = {
//     amount,
//     category,
//     merchant,
//     date,
//     receipt,
//     account,
//     location,
//     userId,
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
//     date: yup.string().required(),
//   });
//   //Need to change location, category and date

//   const handleSubmit = async (values) => {
//     values.userId = expenses.userId;
//     //preventDefault();
//     console.log(values);
//     setLoading(true);
//     try {
//       const res = await addDoc(collection(dbFire, "expenses"), values);
//       setLoading(false);
//       //To add submission message state
//     } catch (error) {
//       setError(error);
//       setLoading(false);
//     }
//     // setLoading(true);
//     // try {
//     //   setDate("Today");
//     //   setLocation("Here");
//     //   const res = await addDoc(collection(dbFire, "expenses"), expenses);
//     //   console.log(res, "#####response#####");
//     //   setLoading(false);
//     //   console.log("here!!");
//     // } catch {
//     //   setError(error);
//     //   setLoading(false);
//     // }
//   };

//   if (error) return <ErrorHandler error={error} />;

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
//       }}
//       validationSchema={expenseSchema}
//       onSubmit={(values) => {
//         //?mutating state?? Refactor this
//         setFormData(
//           (formData.amount = values.amount),
//           (formData.category = values.category),
//           (formData.account = values.account),
//           (formData.date = values.date),
//           (formData.merchant = values.merchant),
//           (formData.receipt = values.receipt),
//           (formData.location = values.location)
//         );
//         console.log(formData);
//         handleSubmit(formData);
//       }}
//     >
//       {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
//         return (
//           <View style={styles.container}>
//             <View style={styles.inputRow}>
//               <Text>Add a new Expense</Text>
//               <TextInput
//                 aria-label="Amount"
//                 style={styles.input}
//                 onChangeText={handleChange("amount")}
//                 onBlur={handleBlur("amount")}
//                 value={values.amount}
//                 placeholder="Amount"
//               />
//               {errors.amount && <Text>{errors.amount}</Text>}
//             </View>
//             <TextInput
//               aria-label="Merchant"
//               style={styles.input}
//               onChangeText={handleChange("merchant")}
//               onBlur={handleBlur("merchant")}
//               value={values.merchant}
//               placeholder="Merchant"
//             />
//             {errors.merchant && <Text>{errors.merchant}</Text>}
//             <TextInput
//               aria-label="Category"
//               placeholder="Category"
//               style={styles.input}
//               onChangeText={handleChange("category")}
//               onBlur={handleBlur("category")}
//               value={values.category}
//             />
//             {errors.category && <Text>{errors.category}</Text>}
//             <TextInput
//               aria-label="Account"
//               placeholder="Account"
//               style={styles.input}
//               onChangeText={handleChange("account")}
//               onBlur={handleBlur("account")}
//               value={values.account}
//             />
//             {errors.account && <Text>{errors.account}</Text>}
//             <TextInput
//               aria-label="Date"
//               placeholder="Date"
//               style={styles.input}
//               onChangeText={handleChange("date")}
//               onBlur={handleBlur("date")}
//               value={values.date}
//             />
//             {errors.date && <Text>{errors.date}</Text>}
//             <TextInput
//               aria-label="Location"
//               placeholder="Location"
//               style={styles.input}
//               onChangeText={handleChange("location")}
//               onBlur={handleBlur("location")}
//               value={values.location}
//             />
//             {errors.location && <Text>{errors.location}</Text>}
//             <Button title="Submit" onPress={handleSubmit} />
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

// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Button,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { authFire, dbFire } from "../../firebaseConfig";
// import { addDoc, collection } from "@firebase/firestore";
// import { onAuthStateChanged } from "@firebase/auth";
// import ErrorHandler from "../error/ErrorHandler";
// import { Loading } from "../loading/Loading";
// import { Formik } from "formik";
// import DropDownPicker from "react-native-dropdown-picker";
// import { stringifyValueWithProperty } from "react-native-web/dist/cjs/exports/StyleSheet/compiler";
// import { object, string, number } from "yup";
// import * as yup from "yup";
// import { getCategories } from "../../firebase/firestore";

// export default function ExpenseAdder({ navigation }) {
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [merchant, setMerchant] = useState("");
//   const [date, setDate] = useState("");
//   const [receipt, setReceipt] = useState("");
//   const [account, setAccount] = useState("");
//   const [location, setLocation] = useState("");
//   const [userId, setUserId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({});

//   const auth = authFire;
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       setUserId(uid);
//     }
//   });

//   const expenses = {
//     amount,
//     category,
//     merchant,
//     date,
//     receipt,
//     account,
//     location,
//     userId,
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
//     date: yup.string().required(),
//   });
//   //Need to change location, category and date

//   const handleSubmit = async (values) => {
//     values.userId = expenses.userId;
//     //preventDefault();
//     console.log(values);
//     setLoading(true);
//     try {
//       const res = await addDoc(collection(dbFire, "expenses"), values);
//       setLoading(false);
//       //To add submission message state
//     } catch (error) {
//       setError(error);
//       setLoading(false);
//     }
//     // setLoading(true);
//     // try {
//     //   setDate("Today");
//     //   setLocation("Here");
//     //   const res = await addDoc(collection(dbFire, "expenses"), expenses);
//     //   console.log(res, "#####response#####");
//     //   setLoading(false);
//     //   console.log("here!!");
//     // } catch {
//     //   setError(error);
//     //   setLoading(false);
//     // }
//   };

//   if (error) return <ErrorHandler error={error} />;

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
//       }}
//       validationSchema={expenseSchema}
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
//         console.log(formData);
//         handleSubmit(formData);
//       }}
//     >
//       {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
//         return (
//           <View style={styles.container}>
//             <View style={styles.inputRow}>
//               <Text>{JSON.stringify(values, null, 2)}</Text>
//               <Text>Add a new Expense</Text>
//               <TextInput
//                 aria-label="Amount"
//                 style={styles.input}
//                 onChangeText={handleChange("amount")}
//                 onBlur={handleBlur("amount")}
//                 value={values.amount}
//                 placeholder="Amount"
//               />
//               {errors.amount && <Text>{errors.amount}</Text>}
//             </View>
//             <TextInput
//               aria-label="Merchant"
//               style={styles.input}
//               onChangeText={handleChange("merchant")}
//               onBlur={handleBlur("merchant")}
//               value={values.merchant}
//               placeholder="Merchant"
//             />
//             {errors.merchant && <Text>{errors.merchant}</Text>}
//             <CategoryList
//               values={values}
//               handleChange={handleChange}
//               handleBlur={handleBlur}
//             />
//             {errors.category && <Text>{errors.category}</Text>}
//             <TextInput
//               aria-label="Account"
//               placeholder="Account"
//               style={styles.input}
//               onChangeText={handleChange("account")}
//               onBlur={handleBlur("account")}
//               value={values.account}
//             />
//             {errors.account && <Text>{errors.account}</Text>}
//             <TextInput
//               aria-label="Date"
//               placeholder="Date"
//               style={styles.input}
//               onChangeText={handleChange("date")}
//               onBlur={handleBlur("date")}
//               value={values.date}
//             />
//             {errors.date && <Text>{errors.date}</Text>}
//             <TextInput
//               aria-label="Location"
//               placeholder="Location"
//               style={styles.input}
//               onChangeText={handleChange("location")}
//               onBlur={handleBlur("location")}
//               value={values.location}
//             />
//             {errors.location && <Text>{errors.location}</Text>}
//             <Button title="Submit" type="submit" />
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

// function CategoryList({ values, handleChange, handleBlur }) {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(values.category);
//   const [items, setItems] = useState([
//     { label: "Pounds", value: "pounds" },
//     { label: "Euros", value: "euros" },
//     { label: "Dollars", value: "dollars" },
//   ]);

//   useEffect(() => {
//     if (values.category !== value) {
//       handleChange("category")(value);
//     }
//   }, [value]);

//   useEffect(() => {
//     getCategories().then((categories) => {
//       setItems(categories);
//     });
//   }, []);

//   return (
//     <DropDownPicker
//       open={open}
//       value={value}
//       items={items}
//       setOpen={setOpen}
//       setValue={setValue}
//       setItems={setItems}
//       placeholder={"Select a category"}
//     />
//   );
// }

//Me and Ben

import {
  Alert,
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { authFire, dbFire } from "../../firebaseConfig";
import { addDoc, collection } from "@firebase/firestore";
import { onAuthStateChanged } from "@firebase/auth";
import ErrorHandler from "../error/ErrorHandler";
import { Loading } from "../loading/Loading";
import { Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";
import { stringifyValueWithProperty } from "react-native-web/dist/cjs/exports/StyleSheet/compiler";
import { object, string, number } from "yup";
import * as yup from "yup";
import {
  getCategories,
  addCategory,
  addExpense,
} from "../../firebase/firestore";
import CategoryAdderModal from "../categories/CategoryAdderModal";
import CategoryList from "../categories/CategoryList";

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
  const [categories, setCategories] = useState([]);

  const auth = authFire;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserId(uid);
    }
  });

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const expenses = {
    amount,
    category,
    merchant,
    date,
    receipt,
    account,
    location,
    userId,
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
  //Need to change location, category and date

  const handleSubmit = async (values) => {
    const data = {
      ...values,
      userId: expenses.userId,
    };
    // TODO: Check this...
    setLoading(true);
    addExpense(data).then(
      () => {
        // TODO: Check this...
        setLoading(false);
        Alert.alert(
          "Expense Added",
          `You have successfully added your expense for the amount of £${data.amount}`,
          [
            {
              text: "OK",
              style: "cancel",
            },
          ]
        );
        // TODO: Redirect to home?
      },
      (error) => {
        // TODO: Check this...
        setError(error);
        // TODO: Check this...
        setLoading(false);
        // TODO: Handle error
        console.error("Error: Unable to add expense");
      }
    );

    // try {
    //   const res = await addDoc(collection(dbFire, "expenses"), values);
    //   // TODO: Call function in firestore
    //   // createExpense
    //   setLoading(false);
    //   //To add submission message state
    // } catch (error) {
    //   setError(error);
    //   setLoading(false);
    // }

    // setLoading(true);
    // try {
    //   setDate("Today");
    //   setLocation("Here");
    //   const res = await addDoc(collection(dbFire, "expenses"), expenses);
    //   console.log(res, "#####response#####");
    //   setLoading(false);
    //   console.log("here!!");
    // } catch {
    //   setError(error);
    //   setLoading(false);
    // }
  };

  if (error) return <ErrorHandler error={error} />;

  const handleAddCategory = (category) => {
    if (!category.length) return;
    const exists = categories.find((cat) => cat.label === category);
    if (exists) {
      // TODO: Inform user in a modal maybe?
      console.error("Error: Category already exists");
      return;
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
        // Optimistic update
        setCategories((prev) => [
          ...prev,
          { label: category, value: category },
        ]);
      },
      (error) => {
        // TODO: Handle error
        console.error("Error: Unable to add category");
      }
    );
    setToggleCategoryModal((prev) => !prev);
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
      }}
      validationSchema={expenseSchema}
      onSubmit={(values) => {
        //?mutating state?? Refactor this
        setFormData(
          (formData.amount = values.amount),
          (formData.category = values.category),
          (formData.account = values.account),
          (formData.date = values.date),
          (formData.merchant = values.merchant),
          (formData.receipt = values.receipt),
          (formData.location = values.location)
        );
        // console.log(formData);
        handleSubmit(formData);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        return (
          <View style={styles.container}>
            <View style={styles.inputRow}>
              <Text>{JSON.stringify(values, null, 2)}</Text>
              <Text>Add a new Expense</Text>
              <TextInput
                aria-label="Amount"
                style={styles.input}
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                value={values.amount}
                placeholder="Amount"
              />
              {errors.amount && <Text>{errors.amount}</Text>}
            </View>
            <TextInput
              aria-label="Merchant"
              style={styles.input}
              onChangeText={handleChange("merchant")}
              onBlur={handleBlur("merchant")}
              value={values.merchant}
              placeholder="Merchant"
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
              title="Add New Item"
              onPress={() => setToggleCategoryModal((prev) => !prev)}
            />

            <CategoryAdderModal
              isVisible={toggleCategoryModal}
              setIsVisible={setToggleCategoryModal}
              handleAddCategory={handleAddCategory}
            />
            <TextInput
              aria-label="Account"
              placeholder="Account"
              style={styles.input}
              onChangeText={handleChange("account")}
              onBlur={handleBlur("account")}
              value={values.account}
            />
            {errors.account && <Text>{errors.account}</Text>}
            <TextInput
              aria-label="Date"
              placeholder="Date"
              style={styles.input}
              onChangeText={handleChange("date")}
              onBlur={handleBlur("date")}
              value={values.date}
            />
            {errors.date && <Text>{errors.date}</Text>}
            <TextInput
              aria-label="Location"
              placeholder="Location"
              style={styles.input}
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              value={values.location}
            />
            {errors.location && <Text>{errors.location}</Text>}
            <Button title="Submit" onPress={handleSubmit} />
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

// function CategoryList({ values, handleChange, handleBlur }) {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(values.category);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     if (values.category !== value) {
//       handleChange("category")(value);
//     }
//   }, [value]);

//   useEffect(() => {
//     getCategories().then((categories) => {
//       setItems(
//         categories.map((category, index) => {
//           label: category;
//           value: category;
//           key: index;
//         })
//       );
//     });
//   }, []);

//   return (
//     <DropDownPicker
//       open={open}
//       value={value}
//       items={items}
//       setOpen={setOpen}
//       setValue={setValue}
//       setItems={setItems}
//       placeholder={"Choose a category"}
//     />
//   );
// }
