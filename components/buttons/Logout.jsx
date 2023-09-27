import { View } from "react-native";
import React from "react";
import { authFire } from "../../firebaseConfig";
import { IconButton } from "react-native-paper";

const Logout = () => {
  const theme = useTheme();
  return (
    <View>
      <IconButton
        color="orange"
        onPress={() => {
          authFire.signOut();
        }}
        title="Logout"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default Logout;
