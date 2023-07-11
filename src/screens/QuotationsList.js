import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Alert,
  Pressable, TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppButton from "../components/AppButton";
import AppHeader from "../components/AppHeader";
import QuotationListCard from "../components/QuotationListCard";
import colors from "../components/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import saleQuotationsApi from "../api/saleQuotations";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import { ProgressDialog } from "react-native-simple-dialogs";

const Quotations = ({ navigation }) => {
  // const [date, setDate] = useState("");
  const [slp, setSlp] = useState({});
  const [quotationsList, setQuotationsList] = useState([]);
  const [progressVisible, setprogressVisible] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const { preCategoriesRouteVal, setPreCategoriesRouteVal } = useContext(
    preCategoriesRouteContext
  );

  const [fromdate, setfromDate] = useState("");
  const [todate, settoDate] = useState("");

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


  useEffect(() => {
    console.log(
      "preCategoriesRouteVal in quotations List",
      preCategoriesRouteVal
    );
    // getUserDetails();
    setPreCategoriesRouteVal("quotationsList");
  }, []);

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).salePersonCode);
    getAllQuotations(JSON.parse(jsonValue).salePersonCode);
    console.log(JSON.parse(jsonValue).salePersonCode);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getAllQuotations = async (slp) => {
    if (fromdate == "") {
      alert("From Date is Required");
    } else if (todate == "") {
      alert("To Date is Required");
    } else {
      setprogressVisible(true);
      const response = await saleQuotationsApi.getSaleQuotationsDate(slp,fromdate,todate);
      setprogressVisible(false);
      if (!response.ok)
        return Alert.alert("Couldn't retrieve the quotations List");

      // console.log(response.data.data)
      if (response.data.data) setQuotationsList(response.data.data);
      else {
        Alert.alert("No quotations found!");
      }
    }
  };

  const DocDateSelectionView = () => (
    <>
      <View style={{}}>
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

        <View style={{ marginBottom: 10 }}>
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
      </View>

      <View
        style={{
          marginVertical: 5,
          width: "100%",
        }}
      >
        <View style={{
          width: "100%", marginHorizontal: 5,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.secondary,
            }}
            onPress={() => getUserDetails()}
          >
            <Text style={{ color: "#fff", padding: 10, paddingHorizontal: 40 }}>Get Orders</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  const renderQuotationList = () => {
    return (
      <FlatList
        data={quotationsList}
        //   onRefresh={() => onRefresh()}
        refreshing={isFetching}
        renderItem={({ item, index }) => {
          return (
            <QuotationListCard
              id={item.docNum}
              item={item}
              value={item.docTotal}
              name={item.customerName}
              orderDate={item.docDate}
              deliveryDate={item.deliveryDate}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item) => item.docNum}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        navigation={navigation}
        navigateTo="CustomersList"
        headerTitle="Quotations List"
        myRoute="quotation"
      />

      {DocDateSelectionView()}
      {renderQuotationList()}
      <ProgressDialog
        visible={progressVisible}
        title="Loading Data"
        message="Please wait..."
      />
    </SafeAreaView>
  );
};

export default Quotations;
const styles = StyleSheet.create({
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
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
