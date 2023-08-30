import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  useWindowDimensions,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../components/colors";
import AppHeader from "../components/AppHeader";
import AppText from "../components/AppText";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sizes from "../components/sizes";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-datepicker";
import SaleReportCard from "../components/SaleReportCard";
import AppButton from "../components/AppButton";
import { customersList } from "../context/customresList";
import saleReportApi from "../api/saleReport";
import allCustomersApi from "../api/allCustomers";
import { ProgressDialog } from "react-native-simple-dialogs";
import DateTimePicker from "@react-native-community/datetimepicker";

const Sales = ({ navigation, route }) => {
  const { customerCode, customerName, } = route.params;
  const [userId, setUserId] = useState({});
  const [allActivities, setAllActivities] = useState([]);
  const [progressVisible, setprogressVisible] = useState(false);
  const [docDateSelectionView, setdocDateSelectionView] = useState(true);

  const [fromdate, setfromDate] = useState("");
  const [todate, settoDate] = useState("");
  const [salesTotal, setSalesTotal] = useState("");
  const [visible, setVisible] = useState(true);
  const [reports1, setReports1] = useState([]);
  const { customers } = useContext(customersList);
  const [customerList, setCustomers] = useState([]);
  const [coBusinessPartner, setCoBusinessPartner] = useState('');

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

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

  const onChange2 = (event, value) => {
    setDate2(value);
    if (Platform.OS === "android") {
      setIsPickerShow2(false);
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
    settoDate(today);
    //handleDateChange(today);
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
    getUserDetails2();
  }, []);

  const getUserDetails2 = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    console.log("------------jsonValue", jsonValue);
    /*    if (!customers.length > 0)
           getAllCustomers(
               JSON.parse(jsonValue).salePersonCode,
               JSON.parse(jsonValue).territory
           );
       else {
           let cust = [];
           customers.map((item) => {
               cust.push({label: item.CardName, value: item.CardCode})
           })
           setCustomers(cust)
       } */
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };
  const getAllCustomers = async (code, territory) => {
    console.log("------------code", code);
    console.log("------------territory", territory);
    setprogressVisible(true);
    const response = await allCustomersApi.getAllCustomers(code, territory);
    setprogressVisible(false);
    console.log("customersList", response.data);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customers List");
    var cust = [];
    response.data.Data.map((item) => {
      cust.push({ label: item.CardName, value: item.CardCode })
    })
    setCustomers(cust);
  };

  const [remarks, setRemarks] = useState("");

  const handleDateChange = (date) => {
    console.log("in handleDateChange", date);
    setfromDate(date);
  };
  const handleDateChange1 = (date) => {
    console.log("in handleDateChange", date);
    settoDate(date);
  };
  const getSaleReport = async () => {
    console.log({ fromdate, todate, customerCode });
    setprogressVisible(true);
    const response = await saleReportApi.getSalesReport(
      fromdate,
      todate,
      customerCode
    );
    console.log("getSaleReport", response.data);
    if (response.data.data) {
      const initialValue = 0;

      setReports1(response.data.data);
    } else Alert.alert("No record found.");
    setprogressVisible(false);
    if (!response.ok) return Alert.alert("Couldn't retrieve the Sales Report");
  };
  const renderMonthlySales = () => {
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={reports1}
        renderItem={({ item, index }) => {
          return <SaleReportCard item={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item.docNum}
      />
    );
  };
  //const [date, setDate] = useState("");

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserId(JSON.parse(jsonValue).salePersonCode);
    console.log("getUserDetails", JSON.parse(jsonValue).salePersonCode);
  };

  const FirstRoute = () => {
    return (
      <View style={styles.routetwo}>
        <View style={styles.headingView}>
          {DocDateSelectionView()}
          {renderMonthlySales()}
        </View>
      </View>
    );
  };

  const DocDateSelectionView = () => (
    <>
        <Pressable
          onPress={() => setIsPickerShow(true)}
          style={{
            flexDirection: "row",
            marginTop: 0,
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
            <AppText style={styles.p1}>From Date</AppText>
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

        <View style={{ marginBottom:0 }}>
          <Pressable
            onPress={() => setIsPickerShow2(true)}
            style={{
              flexDirection: "row",
              marginTop: 10,
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
              <AppText style={styles.p1}>To Date</AppText>
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
              <AppText style={{ colors: "#555" }}>
                {/* {display()} */} {todate}
              </AppText>
            </View>
          </Pressable>

          {isPickerShow2 && (
            <DateTimePicker
              value={date2}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={false}
              onChange={onChange2}
              style={styles.datePicker}
            />
          )}
        </View>


      <View style={{ marginTop: 20, }}>
        <TouchableOpacity onPress={() => getSaleReport()}>
          <AppButton
            text="Get Data"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity>
      </View>
    </>
  );

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "all", title: "Monthly Sales" },
    { key: "today", title: "Yearly Sales" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <AppHeader
          doubleBtn
          doubleBtnContainerStyle={{}}
          doubleBtnImg1={require("../assets/back-button.png")}
          titleImg1="Back"
          styleImg1={{
            width: Platform.OS === "ios" ? 35 : 38,
            height: Platform.OS === "ios" ? 35 : 38,
            marginLeft: 10,
          }}
          /*      doubleBtnImg2={require("../assets/search.png")} */
          doubleBtnImg2Style={{
            width: 20,
            height: 20,
            marginRight: 27,
          }}
          navigation={navigation}
          navigateTo="CustomersList"
          headerTitle="Sales Report"
        />
      </View>
      <ProgressDialog
        visible={progressVisible}
        title="Getting Invoices"
        message="Please wait..."
      />
      {/*                <ProgressDialog
        visible={loading}
        title="Exportng pdf" //"Posting Data"
        message="Please wait..."
      /> */}
      {FirstRoute()}
    </SafeAreaView>
  );
};
export default Sales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  welcome: {
    marginLeft: 37,
    marginVertical: 10,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
  },
  tabview: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  header: {
    marginHorizontal: 20,
    marginTop: 15,
  },

  routeone: {
    backgroundColor: "#F1F1F1",
    flex: 1,
  },
  btngrp: {
    marginVertical: 15,
  },

  loginBtnStyle1: {
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.BLACK,
    borderRadius: 5,
    marginVertical: 0,
    marginBottom: 0,
    marginHorizontal: 5,
  },
  customTxtStyle: {
    color: "#fff",
    fontSize: Platform.OS === "android" ? 16 : 20,
    alignSelf: "center",
    textAlign: "center",
    padding: 8,
  },
  picker: {
    padding: 15,
    borderWidth: 1,
    marginTop: 10,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },

  customTxtStyle1: {
    color: colors.BLACK,
    fontSize: Platform.OS === "android" ? 16 : 20,
    alignSelf: "center",
    textAlign: "center",
    padding: 8,
  },
  filterView: {
    backgroundColor: colors.WHITE,
    borderColor: colors.BLACK,
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cartcontainer2: {
    marginTop: 15,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#ADB5BD",
    borderRadius: 7,
    marginHorizontal: 15,
    backgroundColor: colors.WHITE,
  },
  transactionsView: {
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#ADB5BD",
    borderRadius: 7,
    marginHorizontal: 15,
    backgroundColor: colors.WHITE,
  },
  cartcontainer3: {
    marginTop: 15,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#ADB5BD",
    borderRadius: 7,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  baseText: {
    fontSize: 14,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 5,
    textAlign: "center",
  },
  transactionText: {
    fontSize: 16,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 5,
    textAlign: "center",
  },
  totalPayments: {
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  paymentName: {
    color: colors.ptext_grey,
    fontSize: 16,
  },
  paymentValue: {
    color: colors.BLACK,
    fontSize: 14,
  },
  key: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.ptext_grey,
    textAlign: "center",
    width: 150,
  },
  value: {
    fontSize: 18,
    color: "#ADB5BD",
    textAlign: "center",
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ADB5BD",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 0,
    height: 100,
    marginVertical: 15,
  },

  container1: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#F1F1F1",
  },

  heading: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  header1: {
    height: 50,
    backgroundColor: colors.WHITE,
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 50,
    backgroundColor: colors.WHITE,
  },
  text: {
    textAlign: "center",
    fontWeight: "100",
    color: "black",
    fontSize: 16,
  },
  headingView: {
    marginTop: 25,
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  routetwo: {
    backgroundColor: "#F1F1F1",
    flex: 1,
    // marginBottom:100,
  },

  p3: {
    color: colors.ptext_grey,
    fontWeight: "bold",
    fontSize: 16,
    width: "25%",
    alignSelf: "flex-start",
  },

  r1: {
    backgroundColor: colors.WHITE,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ADB5BD",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  listContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ADB5BD",
    marginHorizontal: 20,
  },
  group: {},
  label: {
    color: colors.BLACK,
    marginVertical: 5,
  },
  label1: {
    color: colors.BLACK,
    marginTop: 37,
    marginVertical: 5,
  },
  inputfield: {
    backgroundColor: colors.light_grey,
    borderColor: colors.light_grey,
    borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    height: Platform.OS === "android" ? 50 : 55,
    borderRadius: 5,
    alignItems: "center",
  },
  bottomContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  image: {
    width: "100%",
    height: 75,
    justifyContent: "center",
  },

  h: {
    color: colors.secondary,
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  num: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
    width: "20%",
  },
  total: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: 18,
    width: "20%",
  },
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  date: {
    marginTop: 35,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  deliveryDateView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginRight: 20,
  },
  t1: {
    color: colors.default_grey,
  },
  t2: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  h1: {
    color: colors.new_black,
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
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
  p2: {
    color: colors.white,
    fontWeight: "bold",
    backgroundColor: colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
});
