import { View, Text, Button } from "react-native";
import React from "react";

const ErrorHandler = ({ error }) => {
  console.log(error);
  if (error.message.includes("in-use")) {
    return (
      <View>
        <Text>Error: 400 - Bad Request</Text>
        <Text>
          Message: This email address is already in use, please use another one
          or sign in / forgot your password
        </Text>
      </View>
    );
  } else if (error.message.includes("user-not-found")) {
    return (
      <View>
        <Text>Error: 400 - Bad Request</Text>
        <Text>Message: This user does not exist. Please sign up!</Text>
      </View>
    );
  } else if (error.message.includes("password")) {
    return (
      <View>
        <Text>Error: 400 - Bad Request</Text>
        <Text>Message: You have entered an incorrect password</Text>
      </View>
    );
  } else if (error.message.includes("email")) {
    return (
      <View>
        <Text>Error: 400 - Bad Request</Text>
        <Text>Message: You have entered an incorrect email address</Text>
        <Button
          onPress={() => alert("add navigation to login page")}
          title="Go back"
          accessibilityLabel="Go back to Login/Register Page"
        />
      </View>
    );
  }
};

export default ErrorHandler;
