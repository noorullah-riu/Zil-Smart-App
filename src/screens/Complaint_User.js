import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, StyleSheet, Alert } from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import UserServiceCallStatusApi from "../api/userServiceCallStatus";
import UserServiceCallStatusCard from "../components/UserServiceCallStatusCard";

const Complaint = ({ navigation }) => {
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
    console.log("in getServiceCallStatus");
    const response = await UserServiceCallStatusApi.getServiceCallStatus(code);
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
          return <UserServiceCallStatusCard item={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item.DocNum}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
     <AppHeader
          backBtnOnly
          title="Back"
          bckBtnImg={require("../assets/back-button.png")}
          navigation={navigation}
          headerTitle="Complain History"
        />

      {renderOrderList()}
    </SafeAreaView>
  );
};

export default Complaint;

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
