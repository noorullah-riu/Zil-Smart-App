import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pendingInvoicesApi from "../api/pendingInvoice";
import PendingInvoicesCard from "../components/PendingInvoicesCard";
import AppButton from "../components/AppButton";

const PendingRecovery = ({ navigation }) => {
  const [progressVisible, setprogressVisible] = useState(true);
  const [slp, setSlp] = useState({});
  const [pendingInvoicesList, setPendingInvoicesList] = useState([]);
  const [recoveryTotal, setRecoveryTotal] = useState("");

  const [cardCode, setCardCode] = useState("");
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
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).SapUserCode);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getpendingInvoices = async (date) => {
    // console.log("response from getpendingInvoices api, date", date);

    const response = await pendingInvoicesApi.getpendingInvoices(date, slp);
    console.log("getpendingInvoices api response:", response.data.Data);

    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the Pending Invoices List");
    if (response.data.Data) setPendingInvoicesList(response.data.Data);
    else {
      Alert.alert("No Pending Invoices found!");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
    getpendingInvoices(date);
  };

  const headerView = () => (
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
        data={pendingInvoicesList}
        renderItem={({ item, index }) => {
          return (
            <PendingInvoicesCard
              item={item}
              cardCode={item.CardCode}
              invoiceDate={date}
              navigation={navigation}
              total={recoveryTotal}
            />
          );
        }}
        keyExtractor={(item) => item.index}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        doubleBtn
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
        headerTitle="Pending Recovery"
      />
      {headerView()}
      {renderOrderList()}
    </SafeAreaView>
  );
};

export default PendingRecovery;
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
  p2: {
    color: colors.white,
    fontWeight: "bold",
    backgroundColor: colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: Platform.OS === "ios" ? 18 : 16,
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
