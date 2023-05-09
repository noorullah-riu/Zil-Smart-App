import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import AppText from "../components/AppText";
import saleOrderDetailsApi from "../api/saleOrderDetails";
import DraftOrderDetailCard from "../components/DraftOrderDetailCard";
import saleOrderInvoiceHeaderApi from "../api/saleOrderInvoiceHeader";

const SaleInvoiceDetail = ({ route, navigation }) => {
  const { item, id, docNum } = route.params;
  const [progressVisible, setprogressVisible] = useState(true);
  const [slp, setSlp] = useState({});
  const [date, setDate] = useState("");

  

  const [subTotal, setSubTotal] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [draftHeadDetail, setDraftHeadDetail] = useState([]);
  const [draftTableDetail, setDraftTableDetail] = useState([]);

  const getDrfatOrderHeader = async (docNum) => {
    const response = await saleOrderInvoiceHeaderApi.getSaleOrderInvoiceHeader(
      docNum
    );
    setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Order Detail");
    setDraftHeadDetail(response.data.Data[0]);
  };
  const getOrderDetail = async (docNum) => {
    console.log("getdraftorderDetail api called", docNum);
    const response = await saleOrderDetailsApi.getSaleOrderDetails(docNum);
    console.log("response from getOrderDetail api", response.data.Data);
    setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Order Detail");
    setDraftTableDetail(response.data.Data);
  };

  const getTotal = (item) => {
    const total = item.Quantity * item.Price;
    setSubTotal(total);
  };
  useEffect(() => {
    console.log("docNum", docNum);
    getDrfatOrderHeader(docNum);
    getOrderDetail(docNum);

    console.log("itemdetail:", item);
  }, []);

  const [remarks, setRemarks] = useState("");

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };

  const footer = () => {
    console.log("draftHeadDetail.CustomerName", draftHeadDetail.CustomerName);
    return (
      <ScrollView>
        <View style={styles.bottomContainer}>
          <AppRow style={styles.row1}>
            <AppText style={styles.p4}>{draftHeadDetail.CustomerName}</AppText>
          </AppRow>
          <AppRow style={styles.deliveryDateView}>
            <AppRow>
              <AppText style={styles.date1}>Discount:</AppText>
              <AppText style={styles.remHeading}>
                {draftHeadDetail.DocCurrency === "PKR"
                  ? draftHeadDetail.DiscSum
                  : draftHeadDetail.DiscSumFC}
              </AppText>
            </AppRow>

            <AppRow>
              <AppText style={styles.date1}>Tax: </AppText>
              <AppText style={styles.remHeading}>
                {draftHeadDetail.DocCurrency}{" "}
                <AppText style={styles.remHeading}>
                  {draftHeadDetail.DocCurrency === "PKR"
                    ? draftHeadDetail.TaxSum
                    : draftHeadDetail.TaxSumFC}
                </AppText>
              </AppText>
            </AppRow>
            <AppRow>
              <AppText style={styles.date1}>Total: </AppText>
              <AppText style={styles.remHeading}>
                {draftHeadDetail.DocCurrency}{" "}
                <AppText style={styles.remHeading}>
                  {draftHeadDetail.DocCurrency === "PKR"
                    ? draftHeadDetail.DocTotal
                    : draftHeadDetail.DocTotalFC}
                </AppText>
              </AppText>
            </AppRow>
          </AppRow>

          <AppRow>
            <AppText multiline style={styles.date1}>
              Order Remarks:{" "}
            </AppText>
            {/* <AppText style={styles.remHeading}> */}
              <AppText style={styles.remHeading} multiline={true}>{draftHeadDetail.Remarks}</AppText>
            {/* </AppText> */}
          </AppRow>
        </View>
      </ScrollView>
    );
  };

  const renderOrderDetail = () => {
    return (
      <FlatList
        data={draftTableDetail}
        // ListFooterComponent={footer()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          return <DraftOrderDetailCard item={item} navigation={navigation} />;
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
        headerTitle="Sales Invoice Detail"
      />
      {footer()}

      <AppRow style={styles.r1}>
        <AppText style={styles.p1}>Item Name </AppText>
        <AppText style={styles.p2}>Qty</AppText>
        <AppText style={styles.p3}>Price</AppText>
        <AppText style={styles.p3}>Total</AppText>
      </AppRow>

      <View>{renderOrderDetail()}</View>
    </SafeAreaView>
  );
};

export default SaleInvoiceDetail;

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
    marginVertical: 5,
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
    width: "10%",
    textAlign: "center",
  },
  p3: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
    textAlign: "center",
  },
 
  image: {
    width: "100%",
    height: 75,
    justifyContent: "center",
  },
  bottomContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 10,
    padding: 10,
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
  
    marginVertical: 1,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 1,
  },

  deliveryDateView: {

    justifyContent: "space-between",
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
  remHeading: {
    color: colors.card_h1,
  
    fontSize: 14,

  },
  row1: {
    justifyContent: "space-between",
    marginVertical: 2,
  },
  p4: {
    color: colors.card_h2,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
});
