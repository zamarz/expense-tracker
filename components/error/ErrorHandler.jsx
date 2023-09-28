import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";

const ErrorHandlerModal = ({ error, navigation, visible, setVisible }) => {
  const toggleModal = () => {
    setVisible(!visible);
  };

  const theme = useTheme();

  error = { message: "This is an error we didn't think about!" };

  return (
    <Portal>
      <Modal
        animationType="fade"
        //You can change the animation type if needed
        // transparent={true}
        //Set to true for a transparent background
        visible={visible}
        onRequestClose={toggleModal}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Text style={styles.textStyle}>An error has occurred...</Text>
          {error && (
            <Text style={styles.textStyle}>
              {error.message ? error.message : "Sorry, you can't do that..."}
            </Text>
          )}
          <Button
            style={[styles.button, styles.buttonClose]}
            onPress={toggleModal}
          >
            <Text style={styles.buttonTextStyle}>Close</Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
// <Portal>
//   <Modal
//     animationType="slide" // You can change the animation type if needed
//     transparent={true} // Set to true for a transparent background
//     visible={visible}
//     onRequestClose={toggleModal}
//   >
//     <View style={styles.centeredView}>
//       <View style={styles.modalView}>
//         <Text style={styles.titleTextStyle}>
//           An error has occurred, please try again
//         </Text>
//         {error && <Text style={styles.textStyle}>{error.message}</Text>}
//         <Button
//           style={[styles.button, styles.buttonClose]}
//           onPress={toggleModal}
//         >
//           <Text style={styles.buttonTextStyle}>Close</Text>
//         </Button>
//       </View>
//     </View>
//   </Modal>
// </Portal>
//   );
// };

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // justifyContent: "space-around",
    // alignSelf: "center",
    position: "absolute",
    left: 50,
    right: 0,
    top: 300,
    bottom: 0,
    width: 300,
    height: 200,
    backgroundColor: "white",
    borderBlockColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  // input: {
  //   width: "100%",
  //   height: 42,
  //   marginVertical: 10,
  // },
  modalView: {
    margin: 0,
    backgroundColor: "white",

    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  button: {
    // elevation: 2,
  },
  buttonClose: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  // titleTextStyle: {
  //   color: "black",
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   fontSize: 18,
  //   marginBottom: 20,
  // },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center",
  // },
});

export default ErrorHandlerModal;
