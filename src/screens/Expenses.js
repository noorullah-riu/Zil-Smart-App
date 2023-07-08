import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Pressable,
  Text,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import allExpenses from "../api/allExpenses";
import ExpenseListCard from "../components/ExpenseListCard";
import AppButton from "../components/AppButton";
import { ProgressDialog } from "react-native-simple-dialogs";
const Expenses = ({ navigation }) => {
  const [expenesList, setExpenesList] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [userId, setUserId] = useState({});
  const [progressVisible, setprogressVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  //const [isPickerShow, setIsPickerShow] = useState(false);
  //const [date, setDate] = useState(new Date(Date.now()));

  const [fromdate, setfromDate] = useState("");
  const [todate, settoDate] = useState("");

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

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

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserId(JSON.parse(jsonValue).salePersonCode);
  };
  const renderExpensesList = () => {
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 450 }}
        data={expenesList}
        renderItem={({ item, index }) => {
          return <ExpenseListCard itemObject={item} navigation={navigation} setExpenesList={setExpenesList} />;
        }}
        keyExtractor={(item) => item.docNum}
      />
    );
  };
  const getExpenseList = async () => {
    setprogressVisible(true);
    console.log("userId", userId);
    const response = await allExpenses.getAllExpenses(fromdate, userId);
    console.log("getExpenseList", response.data);
    if (response.data.data) {
      setExpenesList(response.data.data);
      setprogressVisible(false);
     // setVisible(false);
    } else {
      setprogressVisible(false);
      Alert.alert("No record found.");
      setExpenesList(response.data.data);

    }
  };
  const DocDateSelectionView = () => (
    <>
      <View style={{ marginBottom: 20 }}>
      </View>

      <Pressable
        onPress={() => setIsPickerShow(true)}
        style={{
          flexDirection: "row",
          marginTop: 20,
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
          <AppText style={styles.p1}>Select Date</AppText>
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

      <View style={{ marginVertical: 20 }}>
        <TouchableOpacity onPress={() => getExpenseList()}>
          <AppButton
            text="Get Incoming Payments"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity>
      </View>
    </>
  );
  return (
    <>
      <AppHeader
        home
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/menu.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/add.png")}
        doubleBtnImg2Style={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginRight: 25,
        }}
        navigateTo="CustomersList"
        headerTitle="Expenses List"
        myRoute="payment"
        navigation={navigation}
      />
      <ProgressDialog
        visible={progressVisible}
        title="Loading"
        message="Please wait..."
      />
      {DocDateSelectionView()}
      {renderExpensesList()}
    </>
  );
};

export default Expenses;
const styles = StyleSheet.create({
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
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
