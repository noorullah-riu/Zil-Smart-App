import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, Alert } from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import AppText from "../components/AppText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pendingInvoicesDetailApi from "../api/pendingInvoicesDetail";
import PendingInvoicesDetailCard from "../components/PendingInvoicesDetailCard";

const PendingRecoveryDetail = ({ navigation,route }) => {
    const {cardCode, invoiceDate} = route.params;
  const [progressVisible, setprogressVisible] = useState(true);
  const [slp, setSlp] = useState({});
  const [date, setDate] = useState("");
  const [invoicesDetailList, setInvoicesDetailList] = useState([]);
  const [invoicesDetailListTotal, setInvoicesDetailListTotal] = useState("");

  const [customersList, setCustomersList] = useState([]);


  useEffect(() => {
    console.log("in PendingRecoveryDetail; cardCode, invoiceDate",cardCode, invoiceDate)
    getUserDetails()
  }, []);
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    console.log(JSON.parse(jsonValue).SapUserCode);
    setSlp(JSON.parse(jsonValue).SapUserCode);
    getPendingInvoicesDetail(JSON.parse(jsonValue).SapUserCode)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getPendingInvoicesDetail = async (userCode) => {
    console.log("in getPendingInvoicesDetail;userCode, cardCode, invoiceDate",userCode, cardCode, invoiceDate)
    
    const response = await pendingInvoicesDetailApi.getpendingInvoicesDetail(
        userCode,cardCode, invoiceDate,
    
    );

    console.log("getPendingInvoicesDetail api response:", response.data.CustomerTotal);
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the Invoices Detail List");
    if (response.data.Data) {
        setInvoicesDetailList(response.data.Data);
        setInvoicesDetailListTotal(response.data.CustomerTotal)
    }
    else {
      Alert.alert("No Invoices Detail found!");
    }
  };

 

  const renderInvoicesDetailList = () => {
    return (
      <FlatList
        data={invoicesDetailList}
        renderItem={({ item, index }) => {
          return <PendingInvoicesDetailCard item={item} navigation={navigation} />
        }}
        keyExtractor={(item) => item.DocEntry}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/menu.png")}
        navigation={navigation}
        headerTitle="Pending Recovery Detail"
      />
      {renderInvoicesDetailList()}
       <View style={styles.loginBtnStyle}>
       <AppText style={styles.p2}>Total : {invoicesDetailListTotal}</AppText>
      </View>
    </SafeAreaView>
  );
};

export default PendingRecoveryDetail;

const styles = StyleSheet.create({
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
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
