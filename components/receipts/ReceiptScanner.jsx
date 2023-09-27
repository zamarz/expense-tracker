import { View, Image, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { storageFire } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Button, Divider, Text } from "react-native-paper";

const ReceiptScanner = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [imageURL, setImageURL] = useState(null);

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
      setImageURL(uploadUrl);
      alert("Upload successful!");

      setNextDisabled(false);
    } catch (error) {
      console.log(error);
      alert("Sorry, upload failed");
      setSubmitDisabled(false);
    } finally {
      setUploading(false);
    }
  };

  //Need a timer on the next button - will implement after styling!

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text variant="titleMedium">Upload or take an image of your receipt</Text>
      <View style={{ flexDirection: "row", padding: 5, justifyContent: "space-between"}}>
        <Button
          mode="contained"
          title="Choose an image from your library"
          onPress={pickImage}
        >
          Choose from library
        </Button>
        <Divider />
        <Divider />

        <Button
          title="Take a photo"
          onPress={takeImage}
          mode="contained"
          icon="camera"
        >
          Take a photo
        </Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <Divider />
      <Divider />
      <View style={{ flexDirection: "column", padding: 5, marginVertical: 5 }}>
        <Button
          title="Submit Image"
          onPress={handleSubmit}
          disabled={submitDisabled}
          mode="contained"
          style={{ marginBottom: 10 }}
        >
          Submit Image
        </Button>

        <Divider />
        <Divider />
        <Button
          mode="contained"
          title="Next"
          onPress={() => {
            setNextDisabled(true);
            setSubmitDisabled(false);
            navigation.navigate("Receipt Navigator", {
              screen: "Receipt Adder",
              params: { imageURL: imageURL, imageURI: image },
            });
          }}
          disabled={nextDisabled}
        >
          Next{" "}
        </Button>
      </View>
    </View>
  );
};

export default ReceiptScanner;
