import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import AppHeader from "../components/AppHeader";
import OrderDetailCard from "../components/OrderDetailCard";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import AppText from "../components/AppText";
import saleOrderDetailsApi from "../api/saleOrderDetails";

const Orders = ({ route, navigation }) => {
  const { item } = route.params;
  const [progressVisible, setprogressVisible] = useState(true);
  const [slp, setSlp] = useState({});
  const [date, setDate] = useState("");
  const [deliveryDetail, setDeliveryDetail] = useState([]);
  const [subTotal, setSubTotal] = useState("");
  const [grandTotal, setGrandTotal] = useState("");

 

  const getOrderDetail = async (DocNum) => {
    console.log("getSaleorderDetail api called", DocNum);
    const response = await saleOrderDetailsApi.getSaleOrderDetails(DocNum);
    console.log("response from getOrderDetail api", response.data.Data);
    setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Order Detail");
    setDeliveryDetail(response.data.Data);
  };

  const getTotal = (item) => {
    const total = item.Quantity * item.Price;
    setSubTotal(total);
  };
  useEffect(() => {
    getOrderDetail(item.DocNum);
    console.log("itemdetail:", item);
  }, []);

  const [remarks, setRemarks] = useState("");

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };

  const footer = () => {
    return (
      <ScrollView>
        <View style={styles.bottomContainer}>
         
          <AppRow style={styles.deliveryDateView}>
            <AppText style={styles.date1}>Discount:</AppText>

            <AppText>
              {item.DocCurrency === "PKR" ? item.DiscSum : item.DiscSumFC}
            </AppText>
          </AppRow>
          
          <AppRow style={styles.deliveryDateView}>
            <AppText style={styles.date1}>Tax: </AppText>
            <AppText>
                {item.DocCurrency}{" "}
                <AppText>
                  {item.DocCurrency === "PKR" ? item.TaxSum : item.TaxSumFC}
                </AppText>
              </AppText>
          </AppRow>

          <AppRow style={styles.deliveryDateView}>
            <AppText style={styles.date1}>Total: </AppText>
            <AppText>
                {item.DocCurrency}{" "}
                <AppText>
                  {item.DocCurrency === "PKR" ? item.DocTotal : item.DocTotalFC}
                </AppText>
              </AppText>
          </AppRow>
          
          <AppRow style={styles.deliveryDateView}>
            <AppText multiline style={styles.date1}>Order Remarks: </AppText>
            <AppText>
            <AppText>{item.Remarks}</AppText>

              </AppText>
          </AppRow>

        
        </View>
      </ScrollView>
    );
  };

  const renderOrderDetail = () => {
    return (
      <FlatList
        data={deliveryDetail}
        ListFooterComponent={footer()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          return <OrderDetailCard item={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item.DocNum}
      />
    );
  };
  return (
    <SafeAreaView style={{}}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Order Detail"
      />
      <AppRow style={styles.r1}>
        <AppText style={styles.p1}>Item Name </AppText>
        <AppText style={styles.p3}>Qty</AppText>
        <AppText style={styles.p3}>Price</AppText>
        <AppText style={styles.p3}>Total</AppText>
      </AppRow>

      <View>{renderOrderDetail()}</View>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  
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
  r1: {
    justifyContent: "space-between",
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 10,
  },
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "50%",
  },
  p2: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
  },
  p3: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
  },
 
  image: {
    width: "100%",
    height: 75,
    justifyContent: "center",
  },
  bottomContainer: {
    marginTop: 5,
    marginLeft: 5,
    paddingBottom: 500,
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
    width: "22%",
  },
  total: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: 18,
    width: "20%",
  },
 
  date: {
    marginTop: 35,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  date1: {
    marginTop: 15,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 1,
  },

  deliveryDateView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 7,
    marginVertical:3
  },
  input: {
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  listContainer: {
    paddingBottom: 0,
  },
});
