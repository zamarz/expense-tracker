import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FIREBASE_API } from "@env";
import { TextInput, useTheme } from "react-native-paper";

const GooglePlacesInput = () => {
  //   const theme = useTheme();
  //   return (
  //     <GooglePlacesAutocomplete
  //       placeholder="Search location"
  //       onPress={(data, details = null) => {
  //         // 'details' is provided when fetchDetails = true
  //         console.log(data, details);
  //       }}
  //       query={{
  //         key: FIREBASE_API,
  //         language: "en",
  //       }}
  //       textInputProps={{
  //         InputComp: TextInput,
  //       }}
  //       styles={{
  //         textInputContainer: {
  //           backgroundColor: theme.colors.primary,
  //         },
  //         textInput: {
  //           height: 38,
  //           color: "#5d5d5d",
  //           fontSize: 16,
  //         },
  //         predefinedPlacesDescription: {
  //           color: "#1faadb",
  //         },
  //       }}
  //       onFail={(error) => console.log(error)}
  //       onNotFound={() => console.log("no results")}
  //     />
  //   );
};

export default GooglePlacesInput;
