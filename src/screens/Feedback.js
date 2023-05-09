import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
const Feedback = ({ navigation }) => {
  const [remarks, setRemarks] = useState("");
  const [name, setName] = useState("");

  const handlRemarksInput = (value) => setRemarks(value);
  const handlNameInput = (value) => setName(value);
  const handleFeedback = () => console.log("handleFeedback called");

  return (
    <SafeAreaView>
      <View style={{ paddingBottom: 10 }}>
        <AppHeader
          backBtnOnly
          title="Back"
          bckBtnImg={require("../assets/back-button.png")}
          navigation={navigation}
          headerTitle="Feedback"
        />
      </View>

      <View style={{ paddingHorizontal: sizes.base_margin }}>
        <View style={{ marginTop: 14, marginBottom: 10 }}>
          <AppText style={styles.label}>Customer Name</AppText>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Customer Name"
          onChangeText={(value) => handlNameInput(value)}
          multiline   
        />
      </View>
      <View style={{ paddingHorizontal: sizes.base_margin }}>
        <View style={{ marginTop: 14, marginBottom: 10 }}>
          <AppText style={styles.label}>Remarks</AppText>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Remarks"
          onChangeText={(value) => handlRemarksInput(value)}
          multiline
        />
      </View>
      <TouchableOpacity onPress={() => handleFeedback()}>
        <AppButton
          text="SEND"
          iconFreeButton
          loginBtnStyle={styles.loginBtnStyle}
          navigation={navigation}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Feedback;
const styles = StyleSheet.create({
  label: {
    color: colors.secondary,
    fontSize: sizes.normal_font,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input1: {
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 60 : 70,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: "10%",
    marginVertical: 15,
  },
});


