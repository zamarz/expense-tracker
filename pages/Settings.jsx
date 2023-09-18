import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Layout>
          <View>
            <Text style={styles.title}>Set Budget</Text>
          </View>
          <View>
            <Text style={styles.title}>Set Reminders</Text>
          </View>
          <View>
            <Text style={styles.title}>Take a look at your spending map</Text>
          </View>
          <View>
            <Text style={styles.title}>Set your currency</Text>
          </View>
          <View>
            <Text style={styles.title}>Delete your account</Text>
          </View>
        </Layout>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Settings;
