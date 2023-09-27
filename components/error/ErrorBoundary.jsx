import { Link } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ErrorFallbackComponent = (props) => (
  <View>
    <View>
      <Text>Oops!</Text>
      <Text>Désolé... Une erreur est survenue</Text>
      <Text>
        Nous allons recevoir ce bug et ferons le nécessaire pour le corriger
      </Text>
      <TouchableOpacity onPress={props.resetError}>
        <Text>
          Sorry, we didn't think about this bug... please go back{" "}
          <Link to={"/"}>home</Link>
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
export default ErrorFallbackComponent;
