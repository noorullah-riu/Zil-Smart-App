import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppButton from "../components/AppButton";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import AppText from "../components/AppText";
import draftOrderHeaderApi from "../api/draftOrderHeader";
import DraftOrderDetailCard from "../components/DraftOrderDetailCard";
import draftOrderTableApi from "../api/draftOrderTable";
import postOrderApi from "../api/postOrder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from "react-native-simple-dialogs";

const RTODetailScreen = ({ route, navigation }) => {
  const { item, docEntry } = route.params;
 // console.log(item, "Item prop here===>");
 console.log("<==== Details screen ===>");
  const [progressVisible, setprogressVisible] = useState(true);
  const [slp, setSlp] = useState({});
  const [date, setDate] = useState("");
  const [draftHeadDetail, setDraftHeadDetail] = useState([]);
  const [draftTableDetail, setDraftTableDetail] = useState([]);

  const [subTotal, setSubTotal] = useState("");
  const [grandTotal, setGrandTotal] = useState("");

  const [sosq, setSoSq] = useState({});
  const [saleOrder, setSaleOrder] = useState({});
  const [user, setUserDetails] = useState({});

  const getDrfatOrderHeader = async (docEntry) => {
    console.log("getDrfatOrderHeader api called", docEntry);
    const response = await draftOrderHeaderApi.getDrfatOrderHeadUP(docEntry);
    console.log("response from getDrfatOrderHead api", response.data.data);
    setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Order Detail");
    setDraftHeadDetail(response.data.data[0]);
  };


  const getDrfatOrderTable = async (docEntry) => {
    const response = await draftOrderTableApi.getDraftOrderTable(docEntry);
    //  console.log("Order detail object",response.data);
    setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Order Detail");
    setDraftTableDetail(response.data.data);
    console.log(response.data.data, "order detail obj ====>");
  };

  const getDrfatOrderItemsNew = async () => {
    const response = await draftOrderTableApi.getDraftOrderNew(item.docEntry);
    //  console.log("Order detail object",response.data);
    setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Order Detail");
    setDraftTableDetail(response.data.data);
   // console.log(response.data.data, "order detail obj ====>");
  };

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserDetails(JSON.parse(jsonValue));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getTotal = (item) => {
    const total = item.Quantity * item.Price;
    setSubTotal(total);
  };
  useEffect(() => {
    getUserDetails();
    //  getDrfatOrderHeader(docEntry);
    getDrfatOrderItemsNew();
    //  getDrfatOrderTable(docEntry);

    console.log("item:", item);
  }, []);

  const [remarks, setRemarks] = useState("");

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };
  const postOrder = async () => {
    sosq["SapUserCode"] = user.sapUserCOde; //
    sosq["salePersonCode"] = user.salePersonCode;
    sosq["customerCode"] =item.customerCode,// draftHeadDetail.CustomerCode;
    sosq["customerName"] = item.customerName,//draftHeadDetail.CustomerName;
    sosq["documentEntry"] = docEntry,//item.docNum;
    sosq["series"] = 181;
    sosq["deliveryDate"] = item.deliveryDate,//draftHeadDetail.DocDate;
    sosq["remarks"] =item.remarks,// draftHeadDetail.Remarks;
    sosq["docDate"] = item.docDate//,draftHeadDetail.DocDate;
    sosq["DocDueDate"] =item.docDueDate,// draftHeadDetail.DocDate;

    sosq["docCurrency"] = item.docCurrency,//draftHeadDetail.DocCurrency;
    sosq["docRate"] =item.docRate,// draftHeadDetail.DocRate;
    sosq["discountPercent"] =item.docDiscPrcnt,// draftHeadDetail.DiscountPer;
    sosq["saleOrderType"] = "A";
    sosq["DocEntry"] = docEntry;


  /*   sosq["SapUserCode"] = user.sapUserCOde; //
    sosq["salePersonCode"] = user.salePersonCode; //
    sosq["customerCode"] = itemx.customerCode;
    sosq["customerName"] = itemx.customerName;
    sosq["documentEntry"] = itemx.docNum;
    sosq["series"] = 181;
    sosq["deliveryDate"] = todaysdate,//"2023/05/24",//date;
    sosq["remarks"] = remarks;
    sosq["docDate"] = todaysdate;
    sosq["docDueDate"] = todaysdate;
    sosq["docCurrency"] = currencyType;
    sosq["docRate"] = dollarRate;
    sosq["discountPercent"] = discount; //
    sosq["saleOrderType"] = "A"; //
    sosq["DocEntry"] = itemx.docEntry; */

    sosq["vatGroup"] = item.vatGroup; //
    sosq["localORImport"] = null; //
    sosq["seriesString"] = null; 
    sosq["U_location"] = null; //
   


    saleOrder["saleOrderAndSaleQutation"] = sosq;
    saleOrder["masterItems"] = draftTableDetail;
  //

    console.log("approveOrder:", saleOrder);

     setprogressVisible(true);
    const response = await postOrderApi.approveOrder(saleOrder);
    console.log("approveOrder response 111222:", response.data);
    setprogressVisible(false);

    if (response.data.code === 0) {
        Alert.alert("Success", "Successfully Approved!", [{ text: "OK" }]);
        navigation.navigate("Home");
    //    setCartItem([]);
      } else {
        Alert.alert("Error", response.data.Message, [{ text: "OK" }]);
      }

      if (!response.ok) return Alert.alert("Unable to Approve Order");

  };
  const footer = () => {
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PostOrderEdit", {
              draftTableDetail: draftTableDetail,
              itemx: item,
            })
          }
        style={{ marginTop: 10, alignSelf: "flex-end",justifyContent:"center", borderRadius: 10, marginRight: 10, backgroundColor: colors.secondary, height: 30, width: "50%" }}
      >
        <Text style={{ color: "#fff", textAlign: "center",fontWeight:"bold" }}>Add Items</Text>
        {/*    <Text style={{ color: "green" }}>T{Total}--RT{subTotal}--Add Items</Text> */}
      </TouchableOpacity>


        <View style={styles.bottomContainer}>
          <AppRow style={styles.row1}>
            <AppText style={styles.p4}>{item.customerName}</AppText>
          </AppRow>
          <AppRow style={styles.deliveryDateView}>
            <AppRow>
              <AppText style={styles.date1}>Discount:</AppText>
              <AppText style={styles.remHeading}>{item.discSum}%</AppText>
            </AppRow>

            <AppRow>
              <AppText style={styles.date1}>Tax: </AppText>
              <AppText style={styles.remHeading}>
                {item.DocCurrency}{" "}
                <AppText style={styles.remHeading}>
                  {item.DocCurrency === "PKR" ? item.TaxSum : item.TaxSumFC}
                </AppText>
              </AppText>
            </AppRow>
            <AppRow>
              <AppText style={styles.date1}>Total: </AppText>
              <AppText style={styles.remHeading}>
                {item.docCurrency} {item.docTotal}
              </AppText>
            </AppRow>
          </AppRow>

          <AppRow>
            <AppText multiline style={styles.date1}>
              Order Remarks:
            </AppText>
            <AppText style={styles.remHeading}>
              <AppText multiline>{item.remarks}</AppText>
            </AppText>
          </AppRow>
        </View>
      </ScrollView>
    );
  };
  const onPost = () => {
    return (
      <View style={{ marginVertical: 20 }}>
        <TouchableOpacity onPress={() => postOrder()}>
          <AppButton
            text="POST ORDER"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderOrderDetail = () => {
    return (
      <FlatList
        data={draftTableDetail}
        // ListFooterComponent={onPost()}
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
        headerTitle="Order Detail -"
      />

      {footer()}

      <AppRow style={styles.r1}>
        <AppText style={styles.p1}>Item Name </AppText>
        <AppText style={styles.p2}>Cartons</AppText>
        <AppText style={styles.p3}>Price</AppText>
        <AppText style={styles.p3}>Total</AppText>
      </AppRow>

      <View>{renderOrderDetail()}</View>

      <ProgressDialog
        visible={progressVisible}
        title="Posting Data"
        message="Please wait..."
      />

      <TouchableOpacity
        style={{ marginTop: 40 }}
        onPress={() => postOrder()}>
        <AppButton
          text="ADD ORDER"
          iconFreeButton
          loginBtnStyle={styles.loginBtnStyle}
          navigation={navigation}
          navigation1="Login"
        />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default RTODetailScreen;

const styles = StyleSheet.create({
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 50 : 60,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginBottom: 100,
    marginHorizontal: 10,
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
    width: "40%",
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
    fontSize: 12,
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
