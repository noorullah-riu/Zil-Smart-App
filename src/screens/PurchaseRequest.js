import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import PostOrderCard from "../components/PostOrderCard";
import { ProgressDialog, Dialog } from "react-native-simple-dialogs";
import { sosqContext } from "../context/SoSq";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import purchaseRequestApi from "../api/purchaseRequest";
import { addToCartContext } from "../context/addToCartContext";
import RNPickerSelect from "react-native-picker-select";
import allCurrencyaApi from "../api/allCurrency";

const PurchaseRequest = ({ route, navigation }) => {
  const { setCartItem, cartItem } = useContext(addToCartContext);

  const [allCurrencies, setAllCurrencies] = useState([]);

  const [addedItems, setAddedItems] = useState({});
  const [seriesNo, setSeriesNo] = useState("");

  const [customer, setCustomerDetails] = useState({});
  const [user, setUserDetails] = useState({});

  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");

  const [purchaseReq, setPurchaseReq] = useState({});
  const [purchaseReq1, setPurchaseReq1] = useState({});

  const [progressVisible, setprogressVisible] = useState(false);
  const [todaysdate, setTodaysdate] = useState("");

  const [show, setShow] = useState(false);
  const [remarks, setRemarks] = useState("");

  // const [date, setDate] = useState("");
  const [currencyType, setCurrencyType] = useState("");
  const [dollarRate, setDollarRate] = useState(0);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const display = () => {
    if (Date == null) {
      return <Text>{title}</Text>;
    } else if (isPickerShow == false) {
      return <Text>{date.toLocaleDateString()}</Text>;
    } else if (isPickerShow == true) {
      return <Text>{date.toLocaleDateString()}</Text>;
    }
  };
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };

  const { routeVal } = useContext(sosqContext);

  const postPurchaseReq = async () => {
    console.log("in Purchase Req, cartItem:", cartItem);

    purchaseReq["requesterCode"] = userCode;
    purchaseReq["requesterName"] = userName;
    purchaseReq["requiredDate"] = date;
    purchaseReq["remarks"] = remarks;
    purchaseReq["docCurrency"] = currencyType;
    purchaseReq["docRate"] = dollarRate;
    purchaseReq["seriesString"] = seriesNo;

    purchaseReq["SapUserCode"] = userCode;

    purchaseReq1["saleOrderAndSaleQutation"] = purchaseReq;
    purchaseReq1["masterItems"] = cartItem;

    console.log("purchaseReq", purchaseReq1);
    setprogressVisible(true);
    const response = await purchaseRequestApi.purchaseRequest(purchaseReq1);
    console.log("in postPurchaseReq", response.data.Message);
    setprogressVisible(false);
    if (response.ok) {
      Alert.alert(response.data.Message);
      setCartItem([]);
      navigation.navigate("Home");
    }
    if (!response.ok) return Alert.alert("Unable to post Purchase Request");
  };

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserDetails(JSON.parse(jsonValue));
    setUserCode(JSON.parse(jsonValue).SapUserCode);
    setUserName(JSON.parse(jsonValue).Name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const onSelectSeries = (value) => {
    console.log("in onSelectSeries:", value);
    setSeriesNo(value);
  };
  const getAllCurrencies = async () => {
    const response = await allCurrencyaApi.getAllCurrencies();

    if (!response.ok) return alert("Couldn't retrieve the AllCurrencies list");
    const currenciesList = response.data.Data.map((obj) => ({
      label: obj.CurrName,
      value: obj.CurrCode,
    }));
    setAllCurrencies(currenciesList);
  };
  useEffect(() => {
    console.log("cart items in purchase req:", cartItem);
    getCustomerDetails();
    getUserDetails();
    getAllCurrencies();

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    setTodaysdate(month + "/" + date + "/" + +year);
  }, []);

  const getCustomerDetails = async () => {
    const customerJsonValue = await AsyncStorage.getItem("@customer_Details");
    setCustomerDetails(JSON.parse(customerJsonValue));
    const userJsonValue = await AsyncStorage.getItem("@user_Details");
    setUserDetails(JSON.parse(userJsonValue));
  };

  const footer = () => {
    return (
      <>
        <View style={styles.bottomContainer}>
          <View>
            <View style={{}}>
              <AppText style={styles.p1}>Currency</AppText>
            </View>
            <View style={styles.currencyView}>
              <RNPickerSelect
                style={{ inputAndroid: { color: "black" } }}
                onValueChange={(value) => setCurrencyType(value)}
                value={currencyType}
                items={allCurrencies}
              />
            </View>
          </View>
          {currencyType === "USD" || currencyType === "RMB" ? (
            <View>
              <View style={{}}>
                <AppText style={styles.dollarRate}>Doc Rate</AppText>
              </View>
              <View style={styles.deliveryDateView}>
                <TextInput
                  autoFocus={true}
                  onChangeText={(value) => setDollarRate(value)}
                  value={dollarRate}
                  placeholder="Add doc rate here.."
                />
              </View>
            </View>
          ) : null}
          {/* <View>
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
                  marginRight: 20,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          </View> */}
          <View>
            <View style={styles.pickedDateContainer}>
              <Pressable onPress={showPicker} style={styles.dateDiv}>
                <Text style={styles.txtDate}>{display()}</Text>
              </Pressable>
            </View>

            {isPickerShow && (
              <DateTimePicker
                value={date}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={false}
                onChange={onChange}
                style={styles.datePicker}
              />
            )}
          </View>

          <View style={{ marginTop: 35 }}>
            <View style={{}}>
              <AppText style={styles.p1}>Series No.</AppText>
            </View>
            <View style={styles.currencyView}>
              <RNPickerSelect
                style={{ inputAndroid: { color: "black" } }}
                items={[
                  { label: "Lahore", value: "LHR" },
                  { label: "Karachi", value: "KHI" },
                ]}
                onValueChange={(value) => setSeriesNo(value)}
              />
            </View>
          </View>

          <View>
            <View style={{}}>
              <AppText style={styles.date}>Remarks</AppText>
            </View>
            <View style={styles.deliveryDateView}>
              <TextInput
                multiline={true}
                onChangeText={setRemarks}
                autoFocus={true}
                value={remarks}
                placeholder="Add your remarks here.."
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <ProgressDialog
            visible={progressVisible}
            title="Posting Data"
            message="Please wait..."
          />

          <TouchableOpacity onPress={() => postPurchaseReq()}>
            <AppButton
              text="POST PURCHASE RUEQUEST"
              iconFreeButton
              loginBtnStyle={styles.loginBtnStyle}
              navigation={navigation}
              navigation1="Login"
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderItemsList = (navigation) => {
    return (
      <FlatList
        data={cartItem}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          return (
            <PostOrderCard
              item={item}
              remarks={item.ItemRemarks}
              name={item.ItemName}
              quantity={item.Qty}
              price={item.Price}
              imagePath={""}
              navigation={navigation}
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
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/back-button.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 38,
          height: Platform.OS === "ios" ? 35 : 38,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/search.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}
        navigation={navigation}
        navigateTo="CustomersList"
        headerTitle="Purchase Request"
      />
      <AppRow style={styles.r1}>
        <AppText style={styles.p1}>Item Name</AppText>
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

export default PurchaseRequest;

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
  p2: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
  p3: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 18 : 16,
    fontWeight: "bold",
  },
  p4: {
    color: colors.card_h2,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 18 : 16,
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
    justifyContent: "space-between",
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 30,
    marginBottom: 10,
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
  },
  p3: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
    textAlign: "center",
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
    width: "20%",
  },
  total: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: 18,
    width: "20%",
  },
  row: {
    paddingBottom: 100,
  },
  bottomContainer: {
    marginTop: 15,
    marginLeft: 25,
  },
  listContainer: {},
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 60 : 70,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: "10%",
  },
  label: {
    color: colors.BLACK,
    marginVertical: 5,
  },
  date: {
    marginTop: 5,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  deliveryDateView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginRight: 20,
    marginBottom: 10,
  },
  currencyView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },

  p4: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
    textAlign: "right",
  },
  dollarRate: {
    color: colors.secondary,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
    width: "64%",
  },

  pickedDateContainer: {
    flexDirection: "row",

    marginHorizontal: 10,
  },

  datePicker: {
    width: 320,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dateDiv: {
    height: 50,
    width: "100%",

    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
  },

  txtDate: {
    color: colors.grey,
    textAlign: "center",
  },
});
