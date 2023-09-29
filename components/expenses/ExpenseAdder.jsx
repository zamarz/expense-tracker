import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
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
import ErrorHandlerModal from "../error/ErrorHandler";

const ExpenseAdder = ({ navigation }) => {
  const [toggleMerchantModal, setToggleMerchantModal] = useState(false);
  const [toggleCategoryModal, setToggleCategoryModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [geolocation, setGeolocation] = useState(undefined);
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
    geolocation: geolocation,
  };

  useEffect(() => {
    setLoading(true);
    // if (!categories) {
    getCategories(uid)
      .then((categories) => {
        setCategories(categories);
      })
      .then(() => {
        getMerchants(uid).then((merchants) => {
          setMerchants(merchants);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
    // } else {
    //   setLoading(false);
    // }
  }, []);

  function handleAddMerchant(merchant) {
    if (!merchant.length) return;
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
    if (location !== undefined && geolocation !== undefined) {
      addExpense(formData)
        .then(() => {
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
          setLoading(false);
          dispatch({ type: "ADD_EXPENSE", payload: formData });
        })
        .then(() => {
          setAccount("");
          setAmount("");
          setCategory("");
          setDate(undefined);
          setGeolocation(undefined);
          setLocation(undefined);
          setMerchant("");
          navigation.navigate("Expense List", { screen: "Expenses List" });
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
          alert("Error: Unable to add expense", [
            {
              text: "OK",
              style: "cancel",
            },
          ]);
        });
    }
  };

  function handleChange(type, payload) {
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
      case "location":
        {
          setLocation(payload);
        }
        break;
      case "geolocation":
        {
          setGeolocation(payload);
        }
        break;
      default:
        break;
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

  return (
    <SafeAreaView style={styles.container}>
      <ErrorHandlerModal
        error={error}
        navigation={navigation}
        visible={error}
        setVisible={setError}
      />
      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />
      <View style={styles.wrapper}>
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <Text style={styles.title}>Add a new Expense</Text>
          <Text style={styles.subhead}>Amount</Text>
          <TextInput mode="outlined" value={amount} onChangeText={setAmount} />
          <Text style={styles.subhead}>Merchant</Text>
          <View style={styles.location}>
            <MerchantAutoComplete
              merchant={merchant}
              merchants={merchants}
              handleChange={handleChange}
              setMerchants={setMerchants}
            />
          </View>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => setToggleMerchantModal((prev) => !prev)}
          >
            Add Merchant
          </Button>
          <MerchantAdderModal
            isVisible={toggleMerchantModal}
            setIsVisible={setToggleMerchantModal}
            handleAddMerchant={handleAddMerchant}
          />
          <Text style={styles.subhead}>Category</Text>
          <View>
            <CategoryList
              category={"Default"}
              categories={categories}
              handleChange={handleChange}
            />
            <Button
              mode="contained"
              style={styles.button}
              title="Add New Category"
              onPress={() => setToggleCategoryModal((prev) => !prev)}
            >
              Add Category
            </Button>
          </View>
          <CategoryAdderModal
            isVisible={toggleCategoryModal}
            setIsVisible={setToggleCategoryModal}
            handleAddCategory={handleAddCategory}
          />
          <Text style={styles.subhead}>Bank Account</Text>
          <AccountListDropDown
            accounts={accounts}
            handleChange={handleChange}
          />
          <Text style={styles.subhead}>Date</Text>
          <View style={styles.dateInput}>
            <Text style={styles.dateText} selectable={false}>
              {date !== undefined
                ? new Date(date).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </Text>
            <IconButton
              icon="calendar-month"
              onPress={() => setOpen(true)}
              uppercase={false}
              mode="contained"
            >
              Select date for your expense
            </IconButton>
          </View>
          <Text style={styles.subhead}>Location</Text>
          <View style={styles.location}>
            <GooglePlacesAutocomplete
              placeholder="Search location"
              onPress={({ description }) => {
                handleChange("location", description);
                fetchGeoLocation(description).then((res) => {
                  handleChange("geolocation", res);
                });
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
                  flex: 1,
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
          </View>
          <Button
            disabled={!geolocation ? true : false}
            title="Submit"
            onPress={handleSubmit}
            mode="contained"
            style={styles.button}
          >
            Submit
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Home")}
            title="Go back home"
            accessibilityLabel="Go back home"
            style={styles.button}
          >
            Go back home{" "}
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    maxWidth: "80%",
    marginHorizontal: "auto",
  },
  wrapper: {
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  location: {
    borderBlockColor: "black",
    borderWidth: 1,
    borderRadius: 5,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 12,
  },
  dateText: {
    fontWeight: "700",
    justifyContent: "flex-start",
    fontSize: 16,
    alignSelf: "center",
  },
  subhead: {
    fontSize: 18,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    minWidth: 190,
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: "center",
    marginTop: 2,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default ExpenseAdder;
