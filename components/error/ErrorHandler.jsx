import { View, Text, Button } from "react-native";
import React from "react";

const ErrorHandler = ({ route, navigation }) => {
  const { error } = route.params;
  alert(
    "Change this to a modal instead of a new screeen - should fix Android bug"
  );
  console.log(error);
  if (error.message.includes("in-use")) {
    return (
      <View>
        <Text>Error: 400 - Bad Request</Text>
        <Text>
          Message: This email address is already in use, please use another one
          or sign in / forgot your password
        </Text>
        <Button
          title="Go back"
          accessibilityLabel="Go back to Login/Register Page"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    );
  } else if (error.message.includes("user-not-found")) {
    return (
      <View>
        <Text>Error: 400 - Bad Request</Text>
        <Text>Message: This user does not exist. Please sign up!</Text>
        <Button
          title="Go back"
          accessibilityLabel="Go back to Login/Register Page"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    );
  } else if (error.message.includes("password")) {
    return (
      <View>
        <Text>Error: 400 - Bad Request</Text>
        <Text>Message: You have entered an incorrect password</Text>
        <Button
          title="Go back"
          accessibilityLabel="Go back to Login/Register Page"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    );
  } else if (error.message.includes("email")) {
    return (
      <View>
        <Text>Error: 400 - Bad Request</Text>
        <Text>Message: You have entered an incorrect email address</Text>
        <Button
          onPress={() => navigation.navigate("Login")}
          title="Go back"
          accessibilityLabel="Go back to Login/Register Page"
        />
      </View>
    );
  }
};

export default ErrorHandler;
