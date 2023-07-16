import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
} from "react-native";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import PostOrderCard from "../components/PostOrderEditCard";
import postOrderApi from "../api/postOrder";
import postQuotationApi from "../api/postQuotation";
import { sosqContext } from "../context/SoSq";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import RNPickerSelect from "react-native-picker-select";
import allCurrencyaApi from "../api/allCurrency";
import { ScrollView } from "react-native-gesture-handler";
import { addToCartContext } from "../context/addToCartContext";
import allVatGroupsApi from "../api/allVatGroups";
import { ProgressDialog, Dialog } from "react-native-simple-dialogs";
import currencyRateApi from "../api/currencyRate";
import * as Location from "expo-location";


const PostOrderEdit2 = ({ route, navigation }) => {
  const { draftTableDetail, itemx } = route.params;
 // console.log(draftTableDetail, "draftTableDetail");
  //console.log(itemx, "itemx");

  const [customer, setCustomerDetails] = useState({});
  const [user, setUserDetails] = useState({});
  const { setPreCategoriesRouteVal } = useContext(preCategoriesRouteContext);
  const { setCartItem, cartItem } = useContext(addToCartContext);
  console.log(cartItem, "cartItem ------->>");
  const [sosq, setSoSq] = useState({});
  const [saleOrder, setSaleOrder] = useState({});
  const [progressVisible, setprogressVisible] = useState(false);
  const [todaysdate, setTodaysdate] = useState("");
  const [todaysdate1, setTodaysdate1] = useState("");

  const [remarks, setRemarks] = useState();
  const [seriesNo, setSeriesNo] = useState("");
  const [type, setType] = useState("");
  const [subTotal, setSubTotal] = useState();
  const [grandTotal, setGrandTotal] = useState(0);
  const [grandTotal1, setGrandTotal1] = useState(0);

  const [dollarRate, setDollarRate] = useState(0);
  const [usdRate, setUsdRate] = useState(0);
  const [rmbRate, setRmbRate] = useState(0);

  const [discount, setDiscount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [vat, setVat] = useState("");
  const [rate, setRate] = useState("");
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [currencyRateList, setCurrencyRateList] = useState([]);

  // const [vatGroups, setVatGroups] = useState([]);

  const [allVatGroups, setAllVatGroups] = useState([]);

  const [show$Rate, setShow$Rate] = useState(false);

  const [currencyType, setCurrencyType] = useState("");
  const [vatGroup, setVatGroup] = useState("");
  const [location, setLocation] = useState("");

  const [show, setShow] = useState(false);

  const findSubTotal = () => {
    let res = 0;
    //  setCartItem
    draftTableDetail.forEach((element) => {
      // res += parseInt(element.lineTotal);
      //    res += parseInt(element.totalPcs * element.price);
      res += parseInt(element.cartons * element.pcsPerDzn * element.price);
    });
    setSubTotal(res);
    //  alert(res);
  };

  const [date, setDate] = useState(itemx.deliveryDate);

  useEffect(() => {
    // getAllVatGroups();
    findSubTotal();

    setCartItem(draftTableDetail);
    getCustomerDetails();
    getUserDetails();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      let text = "Waiting..";
      if (location) {
        text = location.coords.latitude + " , " + location.coords.longitude;
        console.log("location:", text);
        setLocation(text.toString());
      }
    })();
    // getAllCurrencies();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    // console.log("new Date():",date, month,year);
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }

    setTodaysdate(month + "/" + date + "/" + +year);
    // getCurrencyRate(date + "/" + month + "/" + year);

    setTodaysdate(year + "/" + month + "/" + +date);
    setTodaysdate1(date + "/" + month + "/" + year);
  }, []);

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };
  const onVatSelect = (value) => {
    setVatGroup(value);

    if (value) {
      setRate(vatGroups.filter((obj) => obj.Code === value)[0].Rate);
      let rate =
        (vatGroups.filter((obj) => obj.Code === value)[0].Rate / 100) *
        grandTotal;
      // console.log("gt", rate + grandTotal);
      setGrandTotal1((rate + grandTotal).toFixed(2));
    }
  };

  const onSelectSeries = (value) => {
    // console.log("in onSelectSeries:", value);
    setSeriesNo(value);
  };
  const { routeVal } = useContext(sosqContext);

  const postOrder = async () => {
    sosq["SapUserCode"] = user.sapUserCOde; //
    sosq["salePersonCode"] = user.salePersonCode; //
    sosq["customerCode"] = itemx.customerCode;
    sosq["customerName"] = itemx.customerName;
    sosq["deliveryDate"] = todaysdate,//"2023/05/24",//date;
      sosq["series"] = 181;
    sosq["remarks"] = remarks;
    sosq["docDueDate"] = todaysdate;
    sosq["docDate"] = todaysdate;
    sosq["vatGroup"] = vatGroup; //
    sosq["documentEntry"] = itemx.docNum;
    sosq["localORImport"] = type; //
    sosq["seriesString"] = seriesNo; //
    sosq["docCurrency"] = currencyType;
    sosq["docRate"] = dollarRate;
    sosq["discountPercent"] = discount; //
    sosq["U_location"] = location; //
    sosq["DocEntry"] = itemx.docEntry;

    (saleOrder["saleOrderAndSaleQutation"] = sosq),
      (saleOrder["masterItems"] = cartItem),// draftTableDetail), // ,// draftTableDetail;
      console.log(saleOrder, "--------saleOrder payload update:---------");
    setprogressVisible(true);
    const response = await postOrderApi.updateOrder(saleOrder);
    console.log("saleOrder response:", response.data);
    setprogressVisible(false);

    if (response.data.code === 0) {
      Alert.alert("Success", "Successfully Posted!", [{ text: "OK" }]);
      navigation.navigate("Home");
      setCartItem([]);
    } else {
      Alert.alert("Error", response.data.Message, [{ text: "OK" }]);
    }

    if (!response.ok) return Alert.alert("Unable to post Order");
  };

  const postQuotation = async () => {
    // console.log("postQuotation called");

    sosq["SapUserCode"] = user.sapUserCOde; //
    sosq["salePersonCode"] = user.salePersonCode; //
    sosq["customerCode"] = customer.CardCode;
    sosq["customerName"] = customer.CardName;
    sosq["deliveryDate"] = date;
    sosq["series"] = 89;
    sosq["remarks"] = remarks;
    sosq["docDueDate"] = todaysdate;
    sosq["docDate"] = todaysdate;
    sosq["vatGroup"] = vatGroup; //
    sosq["localORImport"] = type; //
    sosq["seriesString"] = seriesNo; //
    sosq["docCurrency"] = currencyType;
    sosq["docRate"] = dollarRate;
    sosq["discountPercent"] = discount; //
    saleOrder["saleOrderAndSaleQutation"] = sosq;
    saleOrder["masterItems"] = cartItem;

    console.log("saleQUOTATION", saleOrder);
    setprogressVisible(true);
    const response = await postQuotationApi.postQuotation(saleOrder);
    console.log("in postQuotation", response);
    setprogressVisible(false);
    if (response.data.code === 0) {
      Alert.alert("Success", "Successfully Posted!", [{ text: "OK" }]);
      navigation.navigate("Home");
      setCartItem([]);
    } else {
      Alert.alert("Error", response.data.Message, [{ text: "OK" }]);
    }

    if (!response.ok) return Alert.alert("Unable to post Quotation");
  };

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserDetails(JSON.parse(jsonValue));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getCustomerDetails = async () => {
    const customerJsonValue = await AsyncStorage.getItem("@customer_Details");
    setCustomerDetails(JSON.parse(customerJsonValue));
    const userJsonValue = await AsyncStorage.getItem("@user_Details");
    setUserDetails(JSON.parse(userJsonValue));
  };

  const onSelectCurrency = (value) => {
    setCurrencyType(value);
    value === "USD"
      ? setDollarRate(usdRate)
      : value === "RMB"
        ? setDollarRate(rmbRate)
        : null;
  };
  const footer = () => {
    const handleDiscountInput = (value) => {
      setDiscount(value);

      let discountamount = (value / 100) * subTotal;

      setDiscountAmount(discountamount);
      let gt = subTotal - (value / 100) * subTotal;
      setGrandTotal(gt);
    };
    const handleDiscountAmount = (value) => {
      setDiscountAmount(value);
      let discountpercentage = (value / subTotal) * 100;
      setDiscount(discountpercentage);
      let gt = subTotal - value;
      setGrandTotal(gt);
    };
    const handleRemarksInput = (value) => {
      setRemarks(value);
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bottomContainer}>
          <AppRow style={{ justifyContent: "space-between" }}>
            <AppText style={styles.h}>Sub Total</AppText>
            <AppText style={styles.num}>{subTotal}</AppText>
          </AppRow>
          <AppRow style={{ justifyContent: "space-between" }}>
            <AppText style={styles.h}>Discount</AppText>
            <View style={styles.discountView}>
              <TextInput
                onChangeText={(value) => handleDiscountInput(value)}
                placeholder="Percentage"
                placeholderTextColor={colors.light_grey}
                style={styles.txtInput}
                value={discount}
                keyboardType="numeric"
              />
            </View>
            {/*<View style={styles.discountView}>
              <TextInput
                onChangeText={(value) => handleDiscountAmount(value)}
                placeholder="Amount"
                placeholderTextColor={colors.light_grey}
                style={styles.txtInput}
                value={discountAmount}
                keyboardType="numeric"
              />
            </View>*/}
          </AppRow>
          <AppRow style={{ justifyContent: "space-between" }}></AppRow>
          {/*   <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
             <View style={{ width: "30%" }}>
              <AppText style={styles.p1}>VAT</AppText>
            </View>
          <View style={styles.vatView}>
              <RNPickerSelect
                style={{ inputAndroid: { color: "black" } }}
                placeholder={{
                  label: "Select VAT group",
                  value: null,
                  color: colors.primaryBlue,
                }}
                onValueChange={(value) => onVatSelect(value)}
                value={vatGroup}
                items={allVatGroups}
              />
            </View>

          </View>*/}
          <View
            style={{
              borderBottomColor: colors.light_grey,
              borderBottomWidth: 1,
              marginVertical: 10,
              // marginRight: 20,
            }}
          />
          <AppRow style={{ justifyContent: "space-between" }}>
            <AppText style={styles.h}>Grand Total</AppText>
            <AppText style={styles.total}>{grandTotal}</AppText>
          </AppRow>

          <View
            style={{
              borderBottomColor: colors.light_grey,
              borderBottomWidth: 1,
              marginVertical: 10,
              // marginRight: 20,
            }}
          />

          {/*      <View>
            <View style={{}}>
              <AppText style={styles.p1}>Delivery Date</AppText>
            </View>
            <DatePicker
              showIcon={false}
              style={{ width: "100%" }}
              date={date}
              mode="date"
              placeholder=" Select date"
              format="YYYY/MM/DD"
              minDate="2000-01-01"
              maxDate="2025-01-01"
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
                  marginTop: 35,
                  borderColor: colors.white,
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  height: 50,
                  alignItems: "flex-start",
                  paddingLeft: 10,
                  width: "100%",
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          </View> */}

          <View>
            <View style={{}}>
              <AppText style={styles.date}>Order Remarks</AppText>
            </View>
            <View style={styles.deliveryDateView}>
              <TextInput
                onChangeText={(value) => handleRemarksInput(value)}
                defaultValue={remarks}
                placeholder="Add your remarks here.."
              />
            </View>
          </View>
        </View>

        <View style={styles.postBtn}>
          <ProgressDialog
            visible={progressVisible}
            title="Posting Data"
            message="Please wait..."
          />

          <TouchableOpacity onPress={() => postOrder()}>
            <AppButton
              text="UPDATE ORDER"
              iconFreeButton
              loginBtnStyle={styles.loginBtnStyle}
              navigation={navigation}
              navigation1="Login"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  const header = () => {
    return (
      <AppRow style={styles.r1}>
        <AppText style={styles.p1_0}>Item Name</AppText>
        <AppText style={styles.p2}>Crts</AppText>
        <AppText style={styles.p3}>Price</AppText>
        <AppText style={styles.p4}>Total</AppText>
      </AppRow>
    );
  };

  /*   saleOrder: Object {
    "masterItems": Array [
      Object {
        "$id": "4413",
        "adjustmentPrice": 0,
        "availableQty": "0",
        "basePrice": 11,
        "cartons": 44,
        "discount": 0,
        "id": 0,
        "itemCode": "FG002284",
        "itemName": "Panda 23mm x 38yds 38mic Super Golden",
        "jobType": "Rewinding",
        "lineTotal": 5459.5199999999995,
        "name": "Panda 23mm x 38yds 38mic Super Golden",
        "pcsPerCartons": "2",
        "price": 11,
        "printedcost": 22,
        "qty": 44,
        "vatGourpSa": "S1",
      },
    ],
    "saleOrderAndSaleQutation": Object {
      "SapUserCode": "azmat",
      "U_location": "31.5011902 , 74.3182414",
      "customerCode": "C00025",
      "customerName": "Fazal-e-Rabi",
      "deliveryDate": "2022/11/16",
      "discountPercent": "2",
      "docCurrency": "",
      "docDate": "2022/11/15",
      "docDueDate": "2022/11/15",
      "docRate": 0,
      "localORImport": "",
      "remarks": "Ip",
      "salePersonCode": 1,
      "series": 162,
      "seriesString": "",
      "vatGroup": "",
    },
  } */

  const renderItemsList = (navigation) => {
    return (
      <FlatList
        scrollEnabled={false}
        data={cartItem}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          return (
            <PostOrderCard
              currentItem={item}
              name={item.itemName}
              quantity={item.totalPcs}
              price={item.price}
              index={index}
              findSubTotal={findSubTotal}
              navigation={navigation}
              cartons={item.cartons}
              pcsPerDzn={item.pcsPerDzn}
            />
          );
        }}
        keyExtractor={(item) => item.Id}
      />
    );
  };

  return (
    <SafeAreaView>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Edit Order 2"
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ItemDetailListEdit")
        }
        //  onPress={() => alert("go to items page")}
        style={{ marginTop: 10, alignItems: "flex-end", marginRight: 10 }}
      >
        <Text style={{ color: "green" }}>Add Items</Text>
      </TouchableOpacity>
      <AppRow style={styles.r1}>
        <AppText style={styles.p1_0}>Item Name</AppText>
        <AppText style={styles.p2}>Qty</AppText>
        <AppText style={styles.p3}>Price</AppText>
        <AppText style={styles.p4}>Total</AppText>
      </AppRow>

      <ScrollView style={{ paddingBottom: 0 }}>
        {renderItemsList()}
        {footer()}
      </ScrollView>
    </SafeAreaView>
  );
};
export default PostOrderEdit2;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },

  row1: {
    justifyContent: "space-between",
  },
  row2: {
    marginVertical: 2,
  },

  p5: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },

  p6: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    marginTop: 5,
  },
  p6b: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
  },
  p7: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
  p7b: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
  },
  img: {
    borderRadius: 10,
    width: 70,
    height: 70,
  },

  r1: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  dollarRate: {
    color: colors.secondary,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
    width: "64%",
  },
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  p1_0: {
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
  },
  p3: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
    textAlign: "center",
  },
  p4: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
    textAlign: "right",
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
  },
  total: {
    color: colors.tomato,
    fontWeight: "bold",
    fontSize: 18,
  },
  row: {
    paddingBottom: 100,
  },
  bottomContainer: {
    marginHorizontal: 10,
  },
  listContainer: {},
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
  label: {
    color: colors.BLACK,
    marginVertical: 5,
  },
  date: {
    marginTop: 35,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  currencyView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  vatView: {
    borderRadius: 10,

    marginBottom: 10,
    width: "70%",
  },
  deliveryDateView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
  },
  discountView: {},

  txtInput: {
    fontSize: Platform.OS === "ios" ? 16 : 14,
    color: colors.yellow,
    fontWeight: "bold",
  },
  postBtn: {
    marginBottom: Platform.OS === "ios" ? 100 : 250,
    marginTop: 40,
  },
});
