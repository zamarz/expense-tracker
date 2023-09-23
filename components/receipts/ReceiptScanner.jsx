import { Text, View, Button, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { storageFire } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const ReceiptScanner = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitDisabled(true);
    try {
      setUploading(true);

      const uploadUrl = await uploadImageAsync(image);
      setImage(uploadUrl);
      alert("Upload successful!");
      //   navigation.navigate("Receipt Navigator", {
      //     screen: "Receipt Adder",
      //     params: { imageRef: image },
      //   });
      setNextDisabled(false);
    } catch (error) {
      console.log(error);
      alert("Sorry, upload failed");
      setSubmitDisabled(false);
    } finally {
      setUploading(false);
    }
    // need params here of
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageRef = ref(storageFire, "images");
    const fileRef = ref(imageRef, uuidv4());
    const result = await uploadBytes(fileRef, blob);

    blob.close();

    return await getDownloadURL(fileRef);
  }

  console.log(image, "image console");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Upload or take an image of your receipt</Text>
      {/* <Button title="Take a photo of your receipt" onPress={handleCamera} /> */}
      <Button
        title="Choose an image from your library"
        onPress={pickImage}
        color="green"
      />
      <Button title="Take a photo" onPress={takeImage} color="blue" />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button
        title="Submit Image"
        onPress={handleSubmit}
        color="orange"
        disabled={submitDisabled}
      />
      <Button
        title="Next"
        onPress={() => {
          setNextDisabled(true);
          setSubmitDisabled(false);
          navigation.navigate("Receipt Navigator", {
            screen: "Receipt Adder",
            params: { imageRef: image },
          });
        }}
        color="orange"
        disabled={nextDisabled}
      />
    </View>
  );
};

export default ReceiptScanner;
