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
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Loading } from "../components/loading/Loading";
import { FIREBASE_GUEST_PWD } from "@env";

const auth = authFire;
const userAuth = getAuth();
const guestUser = {
  name: "Guest",
  email: "guest@email.com",
  password: FIREBASE_GUEST_PWD,
};

onAuthStateChanged(userAuth, (user) => {
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
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          if (user) {
            setLoading(false);
          }
        }
      );
    } catch (error) {
      navigation.navigate("Error", { error: error });
      setLoading(false);
    }
  };

  const signInAsGuest = async (auth, email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          if (user) {
            setLoading(false);
          }
        }
      );
    } catch (error) {
      navigation.navigate("Error", { error: error });
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
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
      <Text variant="titleLarge">
        Welcome! Please sign in, or register your email!
      </Text>
      <Divider />
      <Divider />

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
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
          <TouchableOpacity onPress={signIn} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={register}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              signInAsGuest(auth, guestUser.email, guestUser.password);
            }}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Guest Sign-in</Text>
          </TouchableOpacity>
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
