import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, Alert } from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import serviceCallStatusApi from "../api/ServiceCallStatus";
import ServiceCallStatusCard from "../components/ServiceCallStatusCard";

const ServiceCallStatus = ({ navigation }) => {
  const [progressVisible, setprogressVisible] = useState(true);
  const [slp, setSlp] = useState({});
  const [date, setDate] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const { preCategoriesRouteVal, setPreCategoriesRouteVal } = useContext(
    preCategoriesRouteContext
  );

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).SapUserCode);
    getServiceCallStatus(JSON.parse(jsonValue).SapUserCode);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getServiceCallStatus = async (code) => {
    console.log("in getAllOrders", date, slp);
    const response = await serviceCallStatusApi.getServiceCallStatus(code);
    console.log("response from getServiceCallStatus api", response);
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
  }, []);

  const renderOrderList = () => {
    return (
      <FlatList
        data={ordersList}
        renderItem={({ item, index }) => {
          return <ServiceCallStatusCard item={item} navigation={navigation} />;
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
        navigateTo="Deliveries_Customer"
        headerTitle="Service Call Status"
        myRoute="order"
      />

      {renderOrderList()}
    </SafeAreaView>
  );
};

export default ServiceCallStatus;

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
});
