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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import postExpenseApi from "../api/postExpense";
import AppRow from "../components/AppRow";
import DropDownPicker from "react-native-dropdown-picker";

const PostExpense = ({ navigation }) => {
  const [remarks, setRemarks] = useState("");
  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");
  const [progressVisible, setprogressVisible] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [customer, setCustomer] = useState({});
  const [expenseObj, setExpenseObj] = useState({});
  const [paymentType, setPaymentType] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Cheque", value: "Cheque" },
    { label: "Cash", value: "Cash" },
  ]);

  const [fromdate, setfromDate] = useState("");
  const [isPickerShow2, setIsPickerShow2] = useState(false);
  const [date2, setDate2] = useState(new Date(Date.now()));

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
    console.log("------------", value.getFullYear());
    console.log("------------", value.getMonth());
    console.log("------------", value.getDate());

    var date = value.getDate(); //Current Date
    var month = value.getMonth() + 1; //Current Month
    var year = value.getFullYear(); //Current Year,.
    var today =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (date < 10 ? "0" + date : date);
    console.log("today", today);
    setfromDate(today);
    // handleDateChange(today);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserCode(JSON.parse(jsonValue).salePersonCode);
    setUserName(JSON.parse(jsonValue).name);
    const jsonValue1 = await AsyncStorage.getItem("@customer_Details");
    setCustomer(JSON.parse(jsonValue1));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };
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
/*   const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  }; */
  const handlePostExpense = async () => {
    setprogressVisible(true);
    expenseObj["userCode"] = userCode;
    expenseObj["userName"] = userName;
    expenseObj["date"] = fromdate;
    expenseObj["customerCode"] = customer.CardCode;
    expenseObj["customerName"] = customer.CardName;
    expenseObj["paymentType"] = paymentType;
    expenseObj["checqueNumber"] = chequeNumber;
    expenseObj["amount"] = totalAmount;
    expenseObj["remarks"] = remarks;
    console.log(expenseObj,"----------expenseObj");
    const response = await postExpenseApi.postExpense(expenseObj);
 

    if (response.ok) {
      Alert.alert("Success!", response.data.Message, [
        { text: "OK", onPress: () => setprogressVisible(false) },
      ]);
      setprogressVisible(false);
    }
    if (!response.ok) {
      Alert.alert("Error!", response.data.Message, [
        { text: "OK", onPress: () => setprogressVisible(false) },
      ]);
      setprogressVisible(false);
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
      <ScrollView style={{marginBottom:100}}>
        <AppRow>
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
                textAlign: "center",
                justifyContent: "center",
              }}
            >
       {/*        <RNPickerSelect
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
              /> */}
                    <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="MODAL"
              onSelectItem={item => {
                setPaymentType(item.value)
              }}
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
            />
          </View>
        </AppRow>
        <AppRow>
          <View style={styles.rowsTotal}>
            <View style={{ marginTop: 0, marginBottom: 5 }}>
              <AppText style={styles.label}>Total Amount</AppText>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Total"
              keyboardType="numeric"
              onChangeText={(value) => {
                console.log("Amount", typeof value);
                setTotalAmount(value);
              }}
            />
          </View>
        </AppRow>
  {/*       <AppRow>
          <View style={styles.rowItem1}>
            <View
              style={{ marginHorizontal: sizes.base_margin, marginVertical: 5 }}
            >
              <AppText style={styles.label}>Date</AppText>
            </View>

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
        </AppRow> */}
           <Pressable
          onPress={() => setIsPickerShow(true)}
          style={{
            flexDirection: "row",
            marginVertical: 20,
            borderColor: "#aaa",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              marginHorizontal: sizes.base_margin,
              marginVertical: 0,
              flex: 1,
              justifyContent: "center",
            }}
          >
             <AppText style={styles.label}>Date</AppText>
          </View>

          <View
            style={{
              marginTop: 0,
              flex: 1,
              backgroundColor: "#fff",
              height: 40,
              justifyContent: "center",
            }}
          >
            <View style={{}}>
              <AppText style={{ colors: "#555" }}>
                {/* {display()} */} {fromdate}
              </AppText>
            </View>
          </View>
        </Pressable>

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
  rowItem: {
    paddingHorizontal: sizes.base_margin,
    marginVertical: 5,
    width: "100%",
  },
  rowItem1: {
    marginVertical: 5,
    width: "100%",
    marginBottom: 20,
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
