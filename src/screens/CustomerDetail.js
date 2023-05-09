import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, Alert } from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import cardCodeCustomerApi from "../api/cardCodeCustomer";
import CustomerDetailCard from "../components/CustomerDetail";
const CustomerDetail = ({ navigation,route }) => {
let {cardcode} = route.params;
  const [progressVisible, setprogressVisible] = useState(true);
  const [slp, setSlp] = useState({});
  const [date, setDate] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const { preCategoriesRouteVal, setPreCategoriesRouteVal } = useContext(
    preCategoriesRouteContext
  );


  const getCustomerDetail = async (code) => {
    console.log("in getCustomerDetail");
    const response = await cardCodeCustomerApi.getCustomerDetails(code);
    console.log("response from getCustomerDetail api", response);
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customer detail List");
    if (response.data.Data) setOrdersList(response.data.Data);
    else {
      Alert.alert("No customer detail found!");
      setOrdersList([]);
    }
  };

  useEffect(() => {
    // console.log("cardcode",cardcode);
    getCustomerDetail(cardcode)
  }, []);

  const renderOrderList = () => {
    return (
      <FlatList
        data={ordersList}
        renderItem={({ item, index }) => {
          return <CustomerDetailCard item={item} navigation={navigation} />;
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
          headerTitle="Customer Detail"
        />

      {renderOrderList()}
    </SafeAreaView>
  );
};

export default CustomerDetail;

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
