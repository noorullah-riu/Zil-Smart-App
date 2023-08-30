import React, { useState, useEffect, useContext, useRef } from "react";
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

const PostOrderEdit = ({ route, navigation }) => {
  const { draftTableDetail, itemx } = route.params;
  const { setCartItem, cartItem, isApproved, setisApproved, Total, setTotal } = useContext(addToCartContext);
  // console.log(draftTableDetail, "draftTableDetail ------->>");
  // console.log(cartItem, "cartItem ------->>");
  // console.log(itemx, "itemx");
  const [customer, setCustomerDetails] = useState({});

  const [localCart, setlocalCart] = useState([]);
  const [user, setUserDetails] = useState({});
  const { setPreCategoriesRouteVal } = useContext(preCategoriesRouteContext);

  // console.log(cartItem, "cartItem ------->>");
  const [sosq, setSoSq] = useState({});
  const [saleOrder, setSaleOrder] = useState({});
  const [progressVisible, setprogressVisible] = useState(false);
  const [todaysdate, setTodaysdate] = useState("");
  const [todaysdate1, setTodaysdate1] = useState("");

  const [remarks, setRemarks] = useState(itemx.remarks);
  const [seriesNo, setSeriesNo] = useState("");
  const [type, setType] = useState("");
  //const [subTotal, setSubTotal] = useState(itemx.docTotal);
  const [subTotal, setSubTotal] = useState();
  const [grandTotal, setGrandTotal] = useState(0);
  const count = useRef(itemx.docTotal);

  const [grandTotaloc, setGrandTotalloc] = useState(grandTotal);

  const [dollarRate, setDollarRate] = useState(0);
  const [usdRate, setUsdRate] = useState(0);
  const [rmbRate, setRmbRate] = useState(0);

  const [discount, setDiscount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const { routeVal } = useContext(sosqContext);

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

  const [date, setDate] = useState(itemx.deliveryDate);

  const [show, setShow] = useState(false);


  const objectsEqual = (o1, o2) =>
    Object.keys(o1).length === Object.keys(o2).length
    && Object.keys(o1).every(p => o1[p] === o2[p]);

  const postOrder = async () => {
  /*   if (cartItem.length == localCart.length) {
      alert("No Change in item List");
    }  */  if (subTotal == Total.toFixed(0)) {
      alert("No Change in item, Please Modify your order list", Total);
    } else {
      alert("Update Order Now");
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
      if (isApproved) {
        sosq["saleOrderType"] = "A"; //
      } else {
        sosq["saleOrderType"] = "P"; //
      }
      sosq["DocEntry"] = itemx.docEntry;
      (saleOrder["saleOrderAndSaleQutation"] = sosq),
        (saleOrder["masterItems"] = cartItem),

        console.log(Total, "--------saleOrder payload update:---------");
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

    }
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

  const footer = () => {
    const handleDiscountInput = (value) => {
      setDiscount(value);

      let discountamount = (value / 100) * subTotal;

      setDiscountAmount(discountamount);
      let gt = subTotal - (value / 100) * subTotal;
      setGrandTotal(gt);
      //  findSubTotal();
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
          {/*           <View style={{ flexDirection: "row", marginHorizontal: 10 }}>

            <TouchableOpacity
              style={{ flex: 1, backgroundColor: colors.secondary }}
              onPress={() => findSubTotal()}>
              <Text style={{ padding: 10, color: "#fff", textAlign: "center" }}>Calculate Total</Text>
            </TouchableOpacity>
            <View style={{ flex: 0.2 }}></View>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: colors.secondary }}
              onPress={() => postOrder()}>
              <Text style={{ padding: 10, color: "#fff", textAlign: "center" }}>UPDATE ORDER</Text>
            </TouchableOpacity>

          </View> */}


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
              total={item.pcsPerDzn * item.cartons * item.price}
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

  /*      React.useEffect(() => {
  
        const timeoutID = window.setTimeout(() => {
          findSubTotal();
          alert("timeout");
        }, 4000);
    
        return () => window.clearTimeout(timeoutID );
    }, []);  */

  const findSubTotal = () => {
    let res = 0;
    // var c=cartItem
    cartItem.forEach((element) => {
      res += parseInt(element.cartons * element.pcsPerDzn * element.price);
      //  res += parseInt(element.price);
      //  alert(" item")
      //  console.log(element, "cart items ---<<<")
    });
    // count.current = res;
    //   setTotal(res);
    setSubTotal(res);
    //  alert(res);
  };


  const findCartTotal = () => {
    let res1 = 0;
    // var c=cartItem
    cartItem.forEach((element) => {
      res1 += parseInt(element.cartons * element.pcsPerDzn * element.price);
      //  res += parseInt(element.price);
      //  alert(" item")
      //  console.log(element, "cart items ---<<<")
    });
    count.current = res1;
    setTotal(res1);
    //  alert(res);
  };

  /*   
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // The screen is focused
        // Call any action
       findSubTotalandcart();
      ///   setTotal(itemx.docTotal);
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]); */


  useEffect(() => {
    findSubTotal();
    // alert("cartitem effect");
  }, [cartItem]);


  useEffect(() => {
    if (Total == subTotal) {
      findCartTotal();
      //  alert("subtotal effect");
    }
  }, [subTotal]);

  useEffect(() => {
    setCartItem(draftTableDetail);
    setlocalCart(draftTableDetail);
    findSubTotal();
    findCartTotal();
    getCustomerDetails();
    //  count.current = subTotal;

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
    setTodaysdate(year + "/" + month + "/" + +date);
    setTodaysdate1(date + "/" + month + "/" + year);
  }, []);

  return (
    <SafeAreaView>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Edit Order-"
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ItemDetailListEdit", {
            draftTableDetail: draftTableDetail,
            itemx: itemx,
          })
        }
        style={{ marginTop: 10, alignSelf: "flex-end",justifyContent:"center", borderRadius: 10, marginRight: 10, backgroundColor: colors.secondary, height: 30, width: "50%" }}
      >
        <Text style={{ color: "#fff", textAlign: "center",fontWeight:"bold" }}>Add Items</Text>
        {/*    <Text style={{ color: "green" }}>T{Total}--RT{subTotal}--Add Items</Text> */}
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
export default PostOrderEdit;

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
