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
import DropDownPicker from "react-native-dropdown-picker";
import allCustomersApi from "../api/allCustomers";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [slp, setSlp] = useState(0);
  const [Name, setName] = useState("");

  const [CNIC, setCNIC] = useState("");
  const [STRN, setSTRN] = useState("");
  const [NTN, setNTN] = useState("");
  const [Address, setAddress] = useState("");


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    /*     { label: "Vendor", value: "S" }, */
    /*  { label: "Customer", value: "C" }, */
    { label: "Lead", value: "L" },
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Company", value: "C" },
    { label: "Private", value: "P" },
    { label: "Government", value: "G" },
    /*    { label: "Employee", value: "E" }, */
  ]);
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
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
  ]);

  const [openS, setOpenS] = useState(false);
  const [valueS, setValueS] = useState(null);
  const [Customers, setCustomers] = useState([]);
  const [Customer, setCustomer] = useState("");


  const [openR, setOpenR] = useState(false);
  const [valueR, setValueR] = useState(null);
  const [Regions, setRegions] = useState([]);
  const [Region, setRegion] = useState("");


  const createobj = () => {
    let obj = {
      email: email,
      cnic: CNIC,
      ntn: NTN,
      strn: STRN,
      fax: fax,
      paymentTerm: paymentTerms,
      approvedCreditLimit: approvedCreditLimit,
      phone1: phone1,
      phone2: phone2,
      cardForeignName: cardForeignName,
      ContactPersonName: cardForeignName,
      customerLegalEntity: entity1,
      cardType: "L",
      AddressID: Address,
      cardName: cardName,
      series: 78,
      slpCodeForBP: Customer,
      GroupCode: Region,
      CreatedBy: Name

    };
    postPartner(obj);
  };

  const postPartner = async (obj) => {
    console.log(obj, "-------> BP");
    if (cardName == "") {
      Alert.alert("Error", "Name is required", [{ text: "OK" }]);
    } else if (paymentTerms == 0) {
      Alert.alert("Error", "Payment Term is required", [{ text: "OK" }]);
    } else if (phone1 == "") {
      Alert.alert("Error", "Mobile Number is required", [{ text: "OK" }]);
    } else if (approvedCreditLimit == 0) {
      Alert.alert("Error", "Approved Credit Limit is required", [{ text: "OK" }]);
    } else if (CNIC == "") {
      Alert.alert("Error", "CNIC is required", [{ text: "OK" }]);
    } else if (Address == "") {
      Alert.alert("Error", "Address is required", [{ text: "OK" }]);
    } else if (Region == "") {
      Alert.alert("Error", "Region is required", [{ text: "OK" }]);
    }
    else {
      setprogressVisible(true);
      const response = await postOrder.PostPartner(obj);
      setprogressVisible(false);
      if (response.data.code === 0) {
        Alert.alert("Success", "Successfully Posted Partner!", [{ text: "OK" }]);

        setEmail("");
        setCNIC("");
        setFax("");
        setNTN("");
        setPaymentTerms(0);
        setApprovedCreditLimit(0);
        setPhone1("");
        setPhone2("");
        setCardForeignName("");
        setEntity1("");
        setAddress("");
        setCardName("");
        setName("");
        setRegion("");
        setCustomer("");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", response.data.Message, [{ text: "OK" }]);
      }

      if (!response.ok) return Alert.alert("Unable to post");
    }
  };


  const getAllCustomers = async (code) => {
    //  setprogressVisible(true);
    // alert(code)
    const response = await allCustomersApi.getAllEmploess();
    console.log("customer", response);
    // setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customers List");
    setCustomers(response.data.data);
  };


  const getRegions = async (code) => {
    //  setprogressVisible(true);
    // alert(code)
    const response = await allCustomersApi.getRegionsAll();
    console.log("regions", response);
    // setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the Regions List");
    setRegions(response.data.Data);
  };

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    console.log(jsonValue, "=====>");
    getAllCustomers(JSON.parse(jsonValue).salePersonCode);
    getRegions();
    setName(JSON.parse(jsonValue).name);
    setSlp(JSON.parse(jsonValue).salePersonCode);

    // getPOHeaderData(JSON.parse(jsonValue).salePersonCode);
  };

  const pickerStyle = {
    inputAndroid: {
      color: "black",
      padding: 0,
      margin: 0,
    },
  };

  useEffect(() => {
    getUserDetails();
  }, []);

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
        {/*        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 10 }}
        >
          <AppText style={styles.label}>Card Type*</AppText>
          <View style={styles.picker}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="MODAL"
              onSelectItem={item => {
                setCardType(item.value)
              }}
            />
          </View>
        </View> */}

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
            {/*     <RNPickerSelect
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
            /> */}
            <DropDownPicker
              open={open2}
              value={value2}
              items={items2}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setItems2}
              listMode="MODAL"
              onSelectItem={item => {
                setEntity1(item.value)
              }}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>Contact Person</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter Contact Person Name"
            value={cardForeignName}
            onChangeText={(value) => setCardForeignName(value)}
          />
        </View>
        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 10 }}
        >
          <AppText style={styles.label}>Sales Employee*</AppText>
          <View style={styles.picker}>
            <DropDownPicker
              open={openS}
              value={valueS}
              // items={items}
              items={Customers?.map(option => ({
                label: option.slpName,
                value: option.slpCode,
              }))}
              setOpen={setOpenS}
              setValue={setValueS}
              setItems={setCustomers}
              listMode="MODAL"
              onSelectItem={item => {
                setCustomer(item.value)
              }}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>CNIC</AppText>
          <TextInput
            keyboardType={'phone-pad'}
            style={styles.input}
            placeholder="Enter CNIC NUMBER"
            value={CNIC}
            onChangeText={(value) => setCNIC(value)}
          />
        </View>

        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>STRN</AppText>
          <TextInput
            keyboardType={'phone-pad'}
            style={styles.input}
            placeholder="Enter STRN NUMBER"
            value={STRN}
            onChangeText={(value) => setSTRN(value)}
          />
        </View>

        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>NTN</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter NTN NUMBER"
            value={NTN}
            onChangeText={(value) => setNTN(value)}
          />
        </View>

        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>Address *</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            value={Address}
            onChangeText={(value) => setAddress(value)}
          />
        </View>

        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 10 }}
        >
          <AppText style={styles.label}>Region</AppText>
          <View style={styles.picker}>
            <DropDownPicker
              open={openR}
              value={valueR}
              // items={items}
              items={Regions?.map(option => ({
                label: option.Name,
                value: option.Code,
              }))}
              setOpen={setOpenR}
              setValue={setValueR}
              setItems={setRegions}
              listMode="MODAL"
              onSelectItem={item => {
                setRegion(item.value)
              }}
            />
          </View>
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
              keyboardType={'phone-pad'}
              style={styles.input}
              placeholder="Enter Fax no."
              value={fax}
              onChangeText={(value) => setFax(value)}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.childView}>
            <AppText style={styles.label}>Mobile Number *</AppText>
            <TextInput
              keyboardType={'phone-pad'}
              style={styles.input}
              placeholder="Enter Mobile Number"
              value={phone1}
              onChangeText={(value) => setPhone1(value)}
            />
          </View>
          <View style={styles.childView}>
            <AppText style={styles.label}>Office Phone #</AppText>
            <TextInput
              keyboardType={'phone-pad'}
              style={styles.input}
              placeholder="Enter Office Ph #"
              value={phone2}
              onChangeText={(value) => setPhone2(value)}
            />
          </View>
        </View>

        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>Approved Credit Limit*</AppText>
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
          <AppText style={styles.label}>Payment Terms *</AppText>
          <View style={styles.picker}>
            <DropDownPicker
              open={open3}
              value={value3}
              items={items3}
              setOpen={setOpen3}
              setValue={setValue3}
              setItems={setItems3}
              listMode="MODAL"
              onSelectItem={item => {
                setPaymentTerms(item.value)
              }}
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
          <AppButton text="Add BP" iconFreeButton />
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
    // borderWidth: 1,
    marginTop: 10,
    //  borderColor: colors.white,
    // backgroundColor: colors.white,
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
