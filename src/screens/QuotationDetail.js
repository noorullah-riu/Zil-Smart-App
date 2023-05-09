import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Alert,
  TextInput, ScrollView,
} from "react-native";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import QuotationDetailCard from "../components/QuotationDetailCard";
import postOrderApi from "../api/postOrder";
import saleQuotationDetailsApi from "../api/saleQuotationDetails";
import { sosqContext } from "../context/SoSq";
import DraftOrderDetailCard from "../components/DraftOrderDetailCard";
import draftOrderTableApi from "../api/draftOrderTable";

const QuotationDetail = ({ route, navigation }) => {
  const { id, item } = route.params;
  const [quotationDetail, setQuotationDetail] = useState({});

  const getQuotationDetail = async (DocNum) => {
    const response = await saleQuotationDetailsApi.getSaleQuotationDetails(
      DocNum
    );
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the SaleorderDetail");
    setQuotationDetail(response.data.Data);
  };

  const { items } = route.params;
  const [cartItems, setItems] = useState(items);
  const [customer, setCustomerDetails] = useState({});
  const [user, setUserDetails] = useState({});
  const [sosq, setSoSq] = useState({});
  const [saleOrder, setSaleOrder] = useState({});

  const [progressVisible, setprogressVisible] = useState(false);
  const [todaysdate, setTodaysdate] = useState("");

  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [draftTableDetail, setDraftTableDetail] = useState([]);

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };

  const { routeVal } = useContext(sosqContext);

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserDetails(JSON.parse(jsonValue));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  useEffect(() => {
    getCustomerDetails();
    getUserDetails();
    getDrfatOrderTable(id);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    setTodaysdate(date + "/" + month + "/" + year);
  }, []);

  const getDrfatOrderTable = async (docEntry) => {
    console.log(docEntry);
    const response = await saleQuotationDetailsApi.getSaleQuotationDetails(
        docEntry
    ); setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Order Detail");
    setDraftTableDetail(response.data.data);
  };
  const getCustomerDetails = async () => {
    const customerJsonValue = await AsyncStorage.getItem("@customer_Details");
    setCustomerDetails(JSON.parse(customerJsonValue));
    const userJsonValue = await AsyncStorage.getItem("@user_Details");
    setUserDetails(JSON.parse(userJsonValue));
  };

  const footer = () => {
    return (
        <ScrollView>
          <View style={styles.bottomContainer}>
            <AppRow style={styles.row1}>
              <AppText style={styles.p4}>{item.customerName}</AppText>
            </AppRow>
            <AppRow style={styles.deliveryDateView}>

              <AppRow>
                <AppText style={styles.date1}>Discount:</AppText>
                <AppText style={styles.remHeading}>
                  {item.discSum}%
                </AppText>
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
                  { item.docCurrency } {item.docTotal}
                </AppText>
              </AppRow>
            </AppRow>

            <AppRow>
              <AppText multiline style={styles.date1}>
                Order Remarks:{" "}
              </AppText>
              <AppText style={styles.remHeading}>
                <AppText multiline>{item.remarks}</AppText>
              </AppText>
            </AppRow>

          </View>
        </ScrollView>
    );
  };
  const renderOrderDetail = () => {
    return (
        <FlatList
            data={draftTableDetail}
            // ListFooterComponent={onPost()}
            contentContainerStyle={styles.listContainer}
            renderItem={({item, index}) => {
              return <DraftOrderDetailCard item={item} navigation={navigation}/>;
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
            headerTitle="Quotation Detail"
        />

        {footer()}

        <AppRow style={styles.r1}>
          <AppText style={styles.p1}>Item Name </AppText>
          <AppText style={styles.p2}>Cartons</AppText>
          <AppText style={styles.p3}>Price</AppText>
          <AppText style={styles.p3}>Total</AppText>
        </AppRow>

        <View>{renderOrderDetail()}</View>

      </SafeAreaView>
  );

};

export default QuotationDetail;

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
    textAlign: "center"
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

    justifyContent: "space-between"
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
