import React, { useContext, useEffect, useState } from "react";
import AppText from "../components/AppText";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppButton from "../components/AppButton";
import RNPickerSelect from "react-native-picker-select";
import { ProgressDialog } from "react-native-simple-dialogs";
import postOrder from "../api/postOrder";

const AddBusinessPartner = ({ navigation, route }) => {
  const [progressVisible, setprogressVisible] = useState(false);
  const [approvedCreditLimit, setApprovedCreditLimit] = useState(0);
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [paymentTerms, setPaymentTerms] = useState(0);
  const [entity1, setEntity1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [cardForeignName, setCardForeignName] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");

  const createobj = () => {
    let obj = {
      email: email,
      fax: fax,
      paymentTerm: paymentTerms,
      approvedCreditLimit: approvedCreditLimit,
      phone1: phone1,
      phone2: phone2,
      cardForeignName: cardForeignName,
      customerLegalEntity: entity1,
      cardType: cardType,
      cardName: cardName,
      series: 78,
      slpCodeForBP: 10,
    };
    postPartner(obj);
  };

  const postPartner = async (obj) => {
    setprogressVisible(true);
    const response = await postOrder.PostPartner(obj);
    setprogressVisible(false);
    if (response.data.code === 0) {
      Alert.alert("Success", "Successfully Posted Partner!", [{ text: "OK" }]);
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", response.data.Message, [{ text: "OK" }]);
    }

    if (!response.ok) return Alert.alert("Unable to post");
  };

  const pickerStyle = {
    inputAndroid: {
      color: "black",
      padding: 0,
      margin: 0,
    },
  };
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={{ paddingBottom: 10 }}>
        <AppHeader
          backBtnOnly
          title="Back"
          bckBtnImg={require("../assets/back-button.png")}
          navigation={navigation}
          headerTitle="Business Partner"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 10 }}
        >
          <AppText style={styles.label}>Card Type*</AppText>
          <View style={styles.picker}>
            <RNPickerSelect
              name={"Card Type"}
              onValueChange={(value, indx) => setCardType(value)}
              items={[
                { label: "Vendor", value: "S" },
                { label: "Customer", value: "C" },
                { label: "Lead", value: "L" },
              ]}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>Card Name*</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter Card Name"
            value={cardName}
            onChangeText={(value) => setCardName(value)}
          />
        </View>
        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 10 }}
        >
          <AppText style={styles.label}>Customer Legal Entity*</AppText>
          <View style={styles.picker}>
            <RNPickerSelect
              name={"Legal Entity"}
              onValueChange={(value, indx) => setEntity1(value)}
              items={[
                { label: "Company", value: "C" },
                { label: "Private", value: "P" },
                { label: "Government", value: "G" },
                { label: "Employee", value: "E" },
              ]}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>Card Foreign Name</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter Card Foreign Name"
            value={cardForeignName}
            onChangeText={(value) => setCardForeignName(value)}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.childView}>
            <AppText style={styles.label}>E-mail</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter E-mail"
              value={email}
              keyboardType={"email"}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View style={styles.childView}>
            <AppText style={styles.label}>Fax</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Fax no."
              value={fax}
              onChangeText={(value) => setFax(value)}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.childView}>
            <AppText style={styles.label}>Mobile Number</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              value={phone1}
              onChangeText={(value) => setPhone1(value)}
            />
          </View>
          <View style={styles.childView}>
            <AppText style={styles.label}>Office Phone #</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Office Ph #"
              value={phone2}
              onChangeText={(value) => setPhone2(value)}
            />
          </View>
        </View>

        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>Approved Credit Limit</AppText>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter Credit Limit"
            value={approvedCreditLimit}
            onChangeText={(value) => setApprovedCreditLimit(Number(value))}
          />
        </View>
        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 10 }}
        >
          <AppText style={styles.label}>Payment Terms</AppText>
          <View style={styles.picker}>
            <RNPickerSelect
              onValueChange={(value, indx) => setPaymentTerms(value)}
              items={[
                { label: "02 Days", value: 11 },
                { label: "03 Days", value: 9 },
                { label: "04 Days", value: 10 },
                { label: "07 Days", value: 5 },
                { label: "10 Days", value: 7 },
                { label: "100% Advance", value: 14 },
                { label: "15 Days", value: 1 },
                { label: "20 Days", value: 2 },
                { label: "25 Days", value: 6 },
                { label: "30 Days", value: 3 },
                { label: "40 Days", value: 8 },
                { label: "45 Days", value: 4 },
                { label: "60 Days", value: 1 },
                { label: "Advance", value: 1 },
              ]}
              placeholder={{
                label: "Select Payment Terms",
                value: null,
              }}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
            />
          </View>
        </View>
      </ScrollView>
      <ProgressDialog
        visible={progressVisible}
        title="Adding Business Partner"
        message="Please wait..."
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={createobj} style={styles.loginBtnStyle}>
          <AppButton text="Next" iconFreeButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddBusinessPartner;
const styles = StyleSheet.create({
  label: {
    color: colors.secondary,
    fontSize: sizes.normal_font,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  row: {
    marginHorizontal: sizes.base_margin,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  picker: {
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
  childView: {
    marginTop: 1,
    width: "48%",
  },
  input: {
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryPickerContainer: {
    paddingHorizontal: sizes.base_margin,
    paddingVertical: 10,
    marginHorizontal: 15,
    borderRadius: 4,
    height: 39,
    backgroundColor: colors.white,
  },
  bPartnerPickerContainer: {
    paddingHorizontal: sizes.base_margin,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 4,
    height: 39,
    backgroundColor: colors.white,
  },

  loginBtnStyle: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    height: 50,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    width: "100%",
  },
  buttonContainer: {
    right: 10,
    left: 10,
    position: "absolute",
    bottom: 40,
    flex: 1,
  },
});
