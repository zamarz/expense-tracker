import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

// import { auth } from "../firebase/config"; // Replace with Firebase setup
// import { useAuthContext } from "./useAuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

 //signup func
 const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false); 
  const { dispatch } = useAuthContext();
 
  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
 
    try {
      // Sign up using Firebase authentication
      const res = await auth.createUserWithEmailAndPassword(email, password);
 
      if (!res) {
        throw new Error("Could not complete sign-up process!");
      }
 
      // Update display name in user profile
      await res.user.updateProfile({ displayName });
 
      // Dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });
 
      // Update state if the operation is not cancelled
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      console.log(err.message);
 
      // Update error and loading state if the operation is not cancelled
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
 
  useEffect(() => {
    // Cleanup effect to handle unmounting
    return () => setIsCancelled(true);
  }, []);
 
  return { signup, error, isPending };
};

//button clicked - signup with x 3 args 
  const handleSubmit = () => {
    signup(email, password, displayName);
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Enter a password"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Display Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
          placeholder="Enter your display name"
        />
      </View>
      {!isPending ? (
        <Button title="Sign Up" onPress={handleSubmit} />
      ) : (
        <Button title="Loading" disabled />
      )}
      {error && <Text>{error}</Text>}
    </View>
  );
}