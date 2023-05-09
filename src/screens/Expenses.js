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
const Expenses = ({ navigation }) => {
  const [expenesList, setExpenesList] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [userId, setUserId] = useState({});
  const [progressVisible, setprogressVisible] = useState(true);
  const [visible, setVisible] = useState(true);
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
          return <ExpenseListCard itemObject={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item.docNum}
      />
    );
  };
  const getExpenseList = async () => {
    setprogressVisible(true);
    console.log("userId", userId);
    const response = await allExpenses.getAllExpenses(dateFrom, userId);
    console.log("getExpenseList", response.data);
    if (response.data.data) {
      setExpenesList(response.data.data);

      setVisible(false);
    } else Alert.alert("No record found.");
    setprogressVisible(false);
    if (response.data.code === 3)
      return Alert.alert("Couldn't retrieve the expense List");
  };
  const DocDateSelectionView = () => (
    <>
      <View style={{ marginBottom: 20 }}>
        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 14 }}
        >
          <AppText style={styles.p1}>Select Date</AppText>
        </View>

        {/* <View>
          <DatePicker
            showIcon={false}
            style={{ width: "100%" }}
            date={dateFrom}
            mode="date"
            placeholder="Select date"
            format="yyyy/MM/DD"
            minDate="2000/01/01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
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
                height: 60,
                alignItems: "flex-start",
                paddingLeft: 10,
                width: "100%",
                marginHorizontal: 10,
              },
            }}
            onDateChange={(date) => {
              setDateFrom(date);
            }}
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
