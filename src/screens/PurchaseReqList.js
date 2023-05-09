import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, Alert } from "react-native";
import AppHeader from "../components/AppHeader";
import OrderListCard from "../components/OrderListCard";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import saleOrdersApi from "../api/saleOrders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";

const PurchaseReqList = ({ navigation }) => {
  const [progressVisible, setprogressVisible] = useState(true);
  const [slp, setSlp] = useState({});
  // const [date, setDate] = useState("");
  const [ordersList, setOrdersList] = useState([]);
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
  const { preCategoriesRouteVal, setPreCategoriesRouteVal } = useContext(
    preCategoriesRouteContext
  );

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).SalePersonCode);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getAllOrders = async (date, slp) => {
    console.log("in getAllOrders", date, slp);
    const response = await saleOrdersApi.getSaleOrders(slp, date);
    console.log("response from orders list api", response);
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customers List");
    if (response.data.Data) setOrdersList(response.data.Data);
    else {
      Alert.alert("No orders found!");
      setOrdersList([]);
    }
  };

  useEffect(() => {
    console.log("preCategoriesRouteVal in orders List", preCategoriesRouteVal);
    getUserDetails();
    setPreCategoriesRouteVal("purchaseReq");
  }, []);

  const handleDateChange = (date) => {
    console.log("in handleDateChange", date);
    setDate(date);
    getAllOrders(date, slp);
  };
  const DocDateSelectionView = () => (
    <View style={{ marginBottom: 20 }}>
      <View style={{ marginHorizontal: sizes.base_margin, marginVertical: 14 }}>
        <AppText style={styles.p1}>Select Document Date</AppText>
      </View>

      {/* <View>
        <DatePicker
          showIcon={false}
          style={{ width: "100%" }}
          date={date}
          mode="date"
          placeholder=" Select date"
          format="DD/MM/yyyy"
          minDate="01-01-2000"
          maxDate="01-01-2025"
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
  );

  const renderOrderList = () => {
    return (
      <FlatList
        data={ordersList}
        renderItem={({ item, index }) => {
          return (
            <OrderListCard
              id={item.DocNum}
              value={item.DocTotal}
              name={item.CustomerName}
              item={item}
              orderDate={item.DocDate}
              deliveryDate={item.DeliveryDate}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item) => item.DocNum}
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
          width: Platform.OS === "ios" ? 35 : 25,
          height: Platform.OS === "ios" ? 35 : 25,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/add.png")}
        doubleBtnImg2Style={{
          width: Platform.OS === "ios" ? 35 : 25,
          height: Platform.OS === "ios" ? 35 : 25,
          marginRight: 25,
        }}
        navigation={navigation}
        navigateTo="Categories"
        headerTitle="Purchase Request List"
        myRoute="PurchaseReqList"
        dblBtnHeaderStyle={{
          fontWeight: "600",
          fontSize: 20,
          color: colors.white,
        }}
      />

      {DocDateSelectionView()}
      {renderOrderList()}
    </SafeAreaView>
  );
};

export default PurchaseReqList;
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
