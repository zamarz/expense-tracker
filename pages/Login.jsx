import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import { Divider, Text, TextInput } from "react-native-paper";
import { authFire } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Loading } from "../components/loading/Loading";

onAuthStateChanged(authFire, (user) => {
  if (user) {
    const uid = user.uid;
    if (uid) console.log("User has signed in");
  } else {
    console.log("User has signed out");
  }
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        authFire,
        email,
        password
      ).then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setLoading(false);
        }
      });
    } catch (error) {
      navigation.navigate("Error", { error: error });
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        authFire,
        email,
        password
      );
      const { user } = res;
      if (user) setLoading(false);
    } catch (error) {
      navigation.navigate("Error", { error: error });
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text variant="titleLarge" style={{ paddingBottom: 50 }}>
          Welcome!
        </Text>
        <Text variant="titleLarge" style={{ paddingBottom: 10 }}>
          Log in or create an account.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <TouchableOpacity onPress={signIn} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={register}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "85%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 2,
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
    marginRight: 10,
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
    alignContent: "center",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
