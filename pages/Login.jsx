import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import { authFire } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Loading } from "../components/loading/Loading";
import ErrorHandlerModal from "../components/error/ErrorHandler";
import { Image } from "react-native";
import logo from "../assets/x.png";

onAuthStateChanged(authFire, (user) => {
  if (user) {
    const uid = user.uid;
    if (uid) console.log("User has signed in");
  } else {
    console.log("User has signed out");
  }
});

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

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
    } catch (err) {
      setError(err);
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
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.row}>
          <Image
            source={logo}
            style={{
              resizeMode: "contain",
              height: 120,
              width: 120,
              marginBottom: 20,
              marginLeft: 0,
              position: "absolute",
              right: -38,
            }}
          />
          <Text variant="titleLarge" style={styles.heading}>
            pensio
          </Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text variant="titleLarge" style={styles.p}>
          Log in or create an account
        </Text>
        <TextInput
          mode="outlined"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputText}
        />
        <TextInput
          mode="outlined"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputText}
          secureTextEntry
        />
      </View>
      <ErrorHandlerModal
        error={error}
        navigation={navigation}
        visible={error}
        setVisible={setError}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    width: "85%",
    justifyContent: "center",
    marginTop: 150,
    alignItems: "center",
  },
  heading: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingRight: 70,
    fontStyle: "italic",
    fontSize: 50,
    position: "absolute",
  },
  p: {
    paddingBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 20,
  },
  inputText: {
    width: 300,
    marginTop: 5,
    alignSelf: "center",
  },
  buttonContainer: {
    width: 150,
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    marginRight: 90,
  },
});
export default LoginScreen;
