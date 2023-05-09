import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Pressable,
  Text,
  Image,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from "react-native-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/AppButton";
import postExpenseApi from "../api/postExpense";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AppRow from "../components/AppRow";
import * as FileSystem from "expo-file-system";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

const PostExpense = ({ navigation }) => {
  const [remarks, setRemarks] = useState("");
  const [fuelOrBusFare, setFuelOrBusFare] = useState(0);
  const [localFare, setLocalFare] = useState(0);
  const [food, setFood] = useState(0);
  const [DA, setDA] = useState(0);
  const [misc, setMisc] = useState(0);
  const [total, setTotal] = useState("");

  // const [date, setDate] = useState("");
  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");
  const [progressVisible, setprogressVisible] = useState(false);

  const [dateFrom, setDateFrom] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [base64Images, setBase64Images] = useState("");
  const [customer, setCustomer] = useState({});
  const [expenseObj, setExpenseObj] = useState({});
  const [paymentType, setPaymentType] = useState("");
  const [chequeNumber, setChequeNumber] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const display = () => {
    if (Date == null) {
      return <Text>{title}</Text>;
    } else if (isPickerShow == false) {
      return <Text>{date.toLocaleDateString()}</Text>;
    } else if (isPickerShow == true) {
      return <Text>{date.toLocaleDateString()}</Text>;
    }
  };
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  useEffect(() => {
    getUserDetails();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    // setPostingDate(year + "-" + month + "-" + date);
  }, []);

  const handlDetailInput = (value) => setRemarks(value);

  const handleTotal = (value) => setTotal(value);

  const onFuelOrBusFareInput = (value) => {
    setFuelOrBusFare(parseInt(value));
    console.log("onFuelOrBusFareInput1", value);
    var total = parseInt(value) + localFare + food + DA + misc;
    setTotal(total + "");
  };
  const onLocalFareInput = (value) => {
    setLocalFare(parseInt(value));
    var total = parseInt(value) + fuelOrBusFare + food + DA + misc;
    setTotal(total + "");
  };
  const handlFoodInput = (value) => {
    setFood(parseInt(value));
    var total = parseInt(value) + localFare + fuelOrBusFare + DA + misc;
    setTotal(total + "");
  };
  const handlDAInput = (value) => {
    setDA(parseInt(value));
    var total = parseInt(value) + localFare + food + fuelOrBusFare + misc;
    setTotal(total + "");
  };
  const handlMiscInput = (value) => {
    setMisc(parseInt(value));
    var total = parseInt(value) + localFare + food + DA + fuelOrBusFare;
    setTotal(total + "");
  };

  const handlePaymentType = (value) => {
    setPaymentType(value);
  };

  const handlePostExpense = async () => {
    setprogressVisible(true);
    expenseObj["userCode"] = userCode;
    expenseObj["userName"] = userName;
    expenseObj["date"] = dateFrom;
    expenseObj["customerCode"] = customer.CardCode;
    expenseObj["customerName"] = customer.CardName;
    expenseObj["paymentType"] = paymentType;
    expenseObj["checqueNumber"] = chequeNumber;
    expenseObj["amount"] = total;
    expenseObj["remarks"] = remarks;

    const response = await postExpenseApi.postExpense(expenseObj);
    setprogressVisible(false);
    console.log(
      "handlePostExpense",
      response.data.Message,
      response.data,
      response
    );

    if (response.ok) {
      Alert.alert("Success!", response.data.Message, [
        { text: "OK", onPress: () => setprogressVisible(false) },
      ]);
    }
    if (!response.ok) {
      Alert.alert("Error!", response.data.Message, [
        { text: "OK", onPress: () => setprogressVisible(false) },
      ]);
    }
  };

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    console.log(JSON.parse(jsonValue).SapUserCode, JSON.parse(jsonValue).Name);
    setUserCode(JSON.parse(jsonValue).salePersonCode);
    setUserName(JSON.parse(jsonValue).name);

    const jsonValue1 = await AsyncStorage.getItem("@customer_Details");
    setCustomer(JSON.parse(jsonValue1));

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const handleDateChange = (date) => {
    // console.log("in handleDateChange", date);
    setDate(date);
    // getAllDeliveries(date);
  };
  const handleRemove = (uri) => {
    setImageUri(imageUris.filter((imageUri) => imageUri !== uri));
  };
  const handlePress = () => {
    console.log("in handlePress", imageUri);
    if (imageUri === null) selectImage();
  };
  const selectImage = async () => {
    console.log("in selectImage");

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 0.5,
      });
      console.log(result.uri);

      if (!result.cancelled) {
        const base64 = await FileSystem.readAsStringAsync(result.uri, {
          encoding: "base64",
        });
        setBase64Images(base64);
        //console.log("result.uri",result.uri)
        setImageUri(result.uri);
        // base64Uri = base64Uri.replaceAll(" ","+")
        // setBase64Images(base64Uri);
      }
    } catch (error) {
      console.log("error in img picker", error);
    }
  };
  return (
    <SafeAreaView>
      <View style={{ paddingBottom: 10 }}>
        <AppHeader
          backBtnOnly
          title="Back"
          bckBtnImg={require("../assets/back-button.png")}
          navigation={navigation}
          headerTitle="Post Incoming Payment"
        />
      </View>
      <ScrollView>
        <AppRow style={styles.rowStyle}>
          <View style={styles.rowItem}>
            <View style={{ marginTop: 0, marginBottom: 5 }}>
              <AppText style={styles.label}>Payment Type</AppText>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                borderRadius: 5,
                paddingHorizontal: 10,
                height: 40,
                textAlign:"center",justifyContent:'center'
              }}
            >
              <RNPickerSelect
                style={{ inputAndroid: { color: "black" } }}
                placeholder={{
                  label: "Select Payment Type",
                  value: null,
                  color: colors.primaryBlue,
                }}
                onValueChange={(value) => setPaymentType(value)}
                value={paymentType}
                items={[
                  { label: "Cheque", value: "Cheque" },
                  { label: "Cash", value: "Cash" },
                ]}
              />
            </View>
          </View>
        </AppRow>
        <AppRow>
          <View style={styles.rowItem}>
            <View style={{ marginTop: 0, marginBottom: 5 }}>
              <AppText style={styles.label}>Cheque Number</AppText>
            </View>

            <TextInput
              style={styles.input}
              placeholder="1001002233456"
              keyboardType="numeric"
              onChangeText={(value) => setChequeNumber(value)}
              // multiline
            />
          </View>
        </AppRow>
        <AppRow style={styles.rowStyle}>
          <View style={styles.rowsTotal}>
            <View style={{ marginTop: 0, marginBottom: 5 }}>
              <AppText style={styles.label}>Total Amount</AppText>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Total"
              keyboardType="numeric"
              onChangeText={(value) => setTotalAmount(value)}
              // multiline
            />
          </View>
        </AppRow>
        <AppRow>
          <View style={styles.rowItem1}>
            <View
              style={{ marginHorizontal: sizes.base_margin, marginVertical: 5 }}
            >
              <AppText style={styles.label}>Date</AppText>
            </View>
            {/* <View>
                            <DatePicker
                                showIcon={false}
                                style={{width: "100%"}}
                                date={dateFrom}
                                mode="date"
                                placeholder=" Date From"
                                format="YYYY-MM-DD"
                                minDate="2000-01-01"
                                // maxDate="01.01.2025"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                useNativeDriver="true"
                                customStyles={{
                                    dateIcon: {
                                        position: "relative",
                                        left: 0,
                                        top: 0,
                                        marginLeft: 10,
                                    },
                                    dateInput: {
                                        marginTop: 15,
                                        borderColor: colors.white,
                                        backgroundColor: colors.white,
                                        borderRadius: 10,
                                        height: 50,
                                        alignItems: "flex-start",
                                        paddingLeft: 10,
                                        width: "100%",
                                        marginHorizontal: 10,
                                    },
                                }}
                                onDateChange={(date) => setDateFrom(date)}
                            />
                        </View> */}

            <View>
              <View style={styles.pickedDateContainer}>
                <Pressable onPress={showPicker} style={styles.dateDiv}>
                  <Text style={styles.txtDate}>{display()}</Text>
                </Pressable>
              </View>

              {isPickerShow && (
                <DateTimePicker
                  value={date}
                  mode={"date"}
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={false}
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}
            </View>
          </View>
        </AppRow>
        <View style={{ paddingHorizontal: sizes.base_margin }}>
          <View style={{ marginBottom: 10 }}>
            <AppText style={styles.label}>Remarks</AppText>
          </View>

          <TextInput
            style={styles.input0}
            placeholder="Enter Remarks"
            onChangeText={(value) => setRemarks(value)}
            multiline={true}
          />
        </View>

        {/*    <>
                    <View style={{paddingHorizontal: sizes.base_margin, marginTop: 15}}>
                        <AppText style={styles.label}>Attachment</AppText>
                    </View>

                    <TouchableWithoutFeedback onPress={handlePress}>
                        <View style={styles.container1}>
                            {!imageUri && (
                                <View style={{marginLeft: 10}}>
                                    <MaterialCommunityIcons
                                        name="camera-plus"
                                        size={60}
                                        color={colors.secondary}
                                    />
                                </View>
                            )}
                            {imageUri && (
                                <Image source={{uri: imageUri}} style={styles.image}/>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </>*/}
        <TouchableOpacity onPress={() => handlePostExpense()}>
          <AppButton
            text="POST PAYMENT"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostExpense;
const styles = StyleSheet.create({
  label: {
    color: colors.secondary,
    fontSize: sizes.normal_font,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  input0: {
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: 80,
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
    justifyContent: "center",
    height: 60,
    width: "95%",
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  rowStyle: {},
  rowItem: {
    paddingHorizontal: sizes.base_margin,
    marginVertical: 5,
    width: "100%",
  },
  rowItem2: {
    paddingHorizontal: sizes.base_margin,
    marginVertical: 5,
    width: "50%",
  },

  rowItem1: {
    marginVertical: 5,
    width: "100%",
    marginBottom: 20,
  },
  container1: {
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
  },
  image: {
    width: Platform.OS === "android" ? 55 : 95,
    height: Platform.OS === "android" ? 55 : 95,
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 12,
    marginLeft: 10,
  },
  rowsTotal: {
    paddingHorizontal: sizes.base_margin,
    marginVertical: 5,
    width: "100%",
  },
  pickedDateContainer: {
    flexDirection: "row",

    marginHorizontal: 10,
  },

  datePicker: {
    width: 320,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dateDiv: {
    height: 50,
    width: "100%",

    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
  },

  txtDate: {
    color: colors.grey,
    textAlign: "center",
  },
});
