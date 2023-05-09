import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, Alert } from "react-native";
import AppHeader from "../components/AppHeader";
import DeliveriesListCard from "../components/DeliveriesListCard";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from "react-native-datepicker";
import allDeliveriesApi from "../api/allDeliveries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import allCustomersApi from "../api/allCustomers";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

const Deliveries = ({ navigation }) => {
  const [progressVisible, setprogressVisible] = useState(true);
  const [slp, setSlp] = useState({});
  // const [date, setDate] = useState("");
  const [deliveriesList, setDeliveriesList] = useState([]);
  const [cardCode, setCardCode] = useState("");
  const [customersList, setCustomersList] = useState([]);
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

  const pickerStyle = {
    inputAndroid: {
      color: "black",
      padding: 0,
      margin: 0,
    },
  };
  const onSelectVal = (value, label) => {
    console.log("in onSelectVal,CardCode:", value);
    setCardCode(value);
  };
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    console.log(JSON.parse(jsonValue).SapUserCode);
    setSlp(JSON.parse(jsonValue).SapUserCode);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getAllDeliveries = async (date) => {
    console.log(
      "response from getAllDeliveries api, date, slp:",
      date,
      slp,
      cardCode
    );

    const response = await allDeliveriesApi.getAllDeliveries(
      date,
      slp,
      cardCode
    );
    console.log("orders list api response:", response.data.Data);
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customers List");
    if (response.data.Data) setDeliveriesList(response.data.Data);
    else {
      Alert.alert("No Deliveries found!");
    }
  };

  const getAllCustomers = async (code) => {
    const response = await allCustomersApi.getAllCustomers();
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customers List");

    const customerList = response.data.Data.map((obj) => ({
      label: obj.Name,
      value: obj.SAPCardCode,
    }));
    setCustomersList(customerList);
  };

  const customerList = (allCustomersObj) => {
    allCustomersObj.map((obj) => ({
      label: obj.Name,
      value: obj.SAPCardCode,
    }));
  };

  useEffect(() => {
    getUserDetails();
    getAllCustomers();
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
    getAllDeliveries(date);
  };

  const deliveries = [{}];

  const headerView = () => (
    <>
      <View style={{ marginBottom: 0 }}>
        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 14 }}
        >
          <AppText style={styles.p1}>Select Customer</AppText>
        </View>

        <View
          style={{
            padding: 15,
            marginHorizontal: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: colors.white,
            backgroundColor: colors.white,
          }}
        >
          <RNPickerSelect
            name="customer"
            onValueChange={(value, indx) => onSelectVal(value, indx)}
            items={customersList}
            placeholder={{
              label: "Select a Customer",
              value: null,
            }}
            useNativeAndroidPickerStyle={false}
            style={pickerStyle}
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 14 }}
        >
          <AppText style={styles.p1}>Select Document Date</AppText>
        </View>

        {/* <View>
        <DatePicker
          showIcon={false}
          style={{ width: "100%" }}
          date={date}
          mode="date"
          placeholder=" Select date"
          format="YYYY-MM-DD"
          minDate="2000-01-01"
          maxDate="2025-01-01"
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
              height: 50,
              alignItems: "flex-start",
              paddingLeft: 10,
              width: "100%",
              marginHorizontal: 10,
            },
          }}
          onDateChange={(date) => {
            handleDateChange(date);
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
    </>
  );
  const renderOrderList = () => {
    return (
      <FlatList
        data={deliveriesList}
        renderItem={({ item, index }) => {
          return <DeliveriesListCard item={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item.DocNum}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        doubleBtn
        home
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/back-button.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/search.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}
        navigation={navigation}
        navigateTo="CustomersList"
        headerTitle="Deliveries"
      />
      {headerView()}
      {renderOrderList()}
    </SafeAreaView>
  );
};

export default Deliveries;
const styles = StyleSheet.create({
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
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
    marginHorizontal: "20%",
    marginBottom: 0,
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
