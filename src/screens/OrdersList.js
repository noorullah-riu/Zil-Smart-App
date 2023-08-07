import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, Alert, useWindowDimensions, Pressable, TouchableOpacity } from "react-native";
import AppHeader from "../components/AppHeader";
import OrderListCard from "../components/OrderListCard";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import draftOrdersListApi from "../api/draftOrdersList";
import DraftOrdersListCard from "../components/DraftOrdersList";
import RTOrderListCard from "../components/RTOrderListCard";
import approvedSaleOrdersApi from "../api/approvedSaleOrders";
import { ProgressDialog } from "react-native-simple-dialogs";

const Orders = ({ navigation }) => {
  const [progressVisible, setprogressVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [slp, setSlp] = useState("");
  const [userCode, setUserCode] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const [draftOrdersList, setDraftOrdersList] = useState([]);
  const [ReadyToOrderL, setReadyToOrderL] = useState([]);

  const { preCategoriesRouteVal, setPreCategoriesRouteVal } = useContext(
    preCategoriesRouteContext
  );


  const [fromdate, setfromDate] = useState("");
  const [todate, settoDate] = useState("");

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const [isPickerShow2, setIsPickerShow2] = useState(false);
  const [date2, setDate2] = useState(new Date(Date.now()));

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
    console.log("------------", value.getFullYear());
    console.log("------------", value.getMonth());
    console.log("------------", value.getDate());

    var date = value.getDate(); //Current Date
    var month = value.getMonth() + 1; //Current Month
    var year = value.getFullYear(); //Current Year,.
    var today =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (date < 10 ? "0" + date : date);
    console.log("today", today);
    setfromDate(today);
    // handleDateChange(today);
  };

  const onChange2 = (event, value) => {
    setDate2(value);
    if (Platform.OS === "android") {
      setIsPickerShow2(false);
    }
    console.log("------------", value.getFullYear());
    console.log("------------", value.getMonth());
    console.log("------------", value.getDate());

    var date = value.getDate(); //Current Date
    var month = value.getMonth() + 1; //Current Month
    var year = value.getFullYear(); //Current Year,.
    var today =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (date < 10 ? "0" + date : date);
    console.log("today", today);
    settoDate(today);
    //handleDateChange(today);
  };


  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).SalePersonCode);
    // console.log("getUserDetails ---->",JSON.parse(jsonValue))
    getDraftOrdersList(JSON.parse(jsonValue).salePersonCode)
    getApprovedSaleOrders(JSON.parse(jsonValue).salePersonCode)
    getReadyToOrderList(JSON.parse(jsonValue).salePersonCode)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };


  const getApprovedSaleOrders = async (slp) => {
    //  alert(slp);
    if (fromdate == "") {
      alert("From Date is Required");
    } else if (todate == "") {
      alert("To Date is Required");
    } else {
      setprogressVisible(true);
      const response = await approvedSaleOrdersApi.getApprovedSaleOrderDate(slp, fromdate, todate);
      console.log("response from approved sale orders api1", response.data.data);
      setprogressVisible(false);
      setIsFetching(false);
      if (!response.ok)
        return Alert.alert("Couldn't retrieve the customers List");
      if (response.data.data) setOrdersList(response.data.data);
      else {
        Alert.alert("No approved sale orders found!");
        setOrdersList([]);
      }
    }
  };

  const getDraftOrdersList = async (slp) => {
    setprogressVisible(true);
    const response = await draftOrdersListApi.getDrfatOrdersListDate(slp, fromdate, todate);
    console.log("response from pending sale Orders List api", response.data.data);
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the pending sale List");
    if (response.data.data) setDraftOrdersList(response.data.data);
    else {
      Alert.alert("No pending sale orders found!");
      // setOrdersList([]);
    }
  };

  const getReadyToOrderList = async (slp) => {
    setprogressVisible(true);
    const response = await draftOrdersListApi.getReadyToOrderOrdersListDate(slp, fromdate, todate);
    console.log("response from draft Orders List api", response.data.data);
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the ReadyToOrder List");
    if (response.data.data) setReadyToOrderL(response.data.data);
    else {
      Alert.alert("No Ready To orders found!");
      // setOrdersList([]);
    }
  };
/*   React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setfromDate("");
      settoDate("");
      setDraftOrdersList([]);
      setOrdersList([]);
      setReadyToOrderL([]);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]); */


  useEffect(() => {
    console.log("preCategoriesRouteVal in orders List", preCategoriesRouteVal);
    // getUserDetails();
    setPreCategoriesRouteVal("ordersList");
  }, []);
  const onRefresh = () => {
    setIsFetching(true);
    getUserDetails();
  }
  const handleDateChange = (date) => {
    console.log("in handleDateChange", date);
    setDate(date);
    getAllOrders(date, slp);
  };
  const DocDateSelectionView = () => (
    <>
      <View style={{}}>
        <Pressable
          onPress={() => setIsPickerShow(true)}
          style={{
            flexDirection: "row",
            marginTop: 0,
            borderColor: "#aaa",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              marginHorizontal: sizes.base_margin,
              marginVertical: 0,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <AppText style={styles.p1}>From Date</AppText>
          </View>

          <View
            style={{
              marginTop: 0,
              flex: 1,
              backgroundColor: "#fff",
              height: 40,
              justifyContent: "center",
            }}
          >
            <View style={{}}>
              <AppText style={{ colors: "#555" }}>
                {/* {display()} */} {fromdate}
              </AppText>
            </View>
          </View>
        </Pressable>

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

        <View style={{ marginBottom: 10 }}>
          <Pressable
            onPress={() => setIsPickerShow2(true)}
            style={{
              flexDirection: "row",
              marginTop: 10,
              borderColor: "#aaa",
              borderWidth: 1,
            }}
          >
            <View
              style={{
                marginHorizontal: sizes.base_margin,
                marginVertical: 0,
                flex: 1,
                justifyContent: "center",
              }}
            >
              <AppText style={styles.p1}>To Date</AppText>
            </View>

            <View
              style={{
                marginTop: 0,
                flex: 1,
                backgroundColor: "#fff",
                height: 40,
                justifyContent: "center",
              }}
            >
              <AppText style={{ colors: "#555" }}>
                {/* {display()} */} {todate}
              </AppText>
            </View>
          </Pressable>

          {isPickerShow2 && (
            <DateTimePicker
              value={date2}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={false}
              onChange={onChange2}
              style={styles.datePicker}
            />
          )}
        </View>
      </View>

      <View
        style={{
          marginVertical: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignContent: "center",
        }}
      >
        <View style={{ width: "100%", marginHorizontal: 5 }}>
          <TouchableOpacity
            onPress={() => getUserDetails()}
          >
            <AppButton
              text="Get Orders"
              iconFreeButton
              loginBtnStyle={styles.loginBtnStyle}
              navigation={navigation}
              navigation1="Login"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  const renderDraftOrderList = () => {
    return (
      <FlatList
        data={draftOrdersList}
        renderItem={({ item, index }) => {
          return (
            <DraftOrdersListCard
              id={item.docEntry}
              value={item.docTotal}
              name={item.customerName}
              item={item}
              orderDate={item.docDate}
              deliveryDate={item.docDueDate}
              docEntry={item.docEntry}
              navigation={navigation}
              Pendining={true}
            />
          );
        }}
        keyExtractor={(item) => item.DocNum}
      />
    );
  };

  const render3rdList = () => {
    return (
      <FlatList
        data={ordersList}
        renderItem={({ item, index }) => {
          return (
            <OrderListCard
              id={item.docNum}
              value={item.docTotal}
              name={item.customerName}
              item={item}
              orderDate={item.docDate}
              deliveryDate={item.docDueDate}
              docEntry={item.docNum}
              navigation={navigation}
              Pendining={true}
            />
          );
        }}
        keyExtractor={(item) => item.DocNum}
      />
    );
  };

  const renderOrderList2 = () => {
    return (
      <FlatList
        data={ReadyToOrderL}
        //  onRefresh={() => onRefresh()}
        //  refreshing={isFetching}
        renderItem={({ item, index }) => {
          return (
            <RTOrderListCard
              id={item.docNum}
              value={item.docTotal}
              name={item.customerName}
              item={item}
              orderDate={item.docDate}
              deliveryDate={item.deliveryDate}
              navigation={navigation}
              docEntry={item.docEntry}

            />
          );
        }}
        keyExtractor={(item) => item.docNum}
      />
    );
  };
  const FirstRoute = () => {
    return (
      <View style={styles.routetwo}>
        {renderDraftOrderList()}
      </View>
    );
  };
  const SecondRoute = () => {
    return (
      <View style={styles.routetwo}>
        {renderOrderList2()}
      </View>
    );
  };
  const ThirdRoute = () => {
    return (
      <View style={styles.routetwo}>
        {render3rdList()}
      </View>
    );
  };
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "one", title: "PENDING" },
    { key: "two", title: "Ready to Order" },
    { key: "three", title: "Approved" },
  ]);

  const renderScene = SceneMap({
    one: FirstRoute,
    two: SecondRoute,
    three: ThirdRoute,
  });

  const renderTabBar = (props) => (
    <View style={styles.tabview}>
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: colors.primaryBlue }}
        style={{ backgroundColor: colors.WHITE, color: colors.blue }}
        inactiveColor={colors.default_grey}
        activeColor={colors.primaryBlue}
      />
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        home
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/menu.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/add.png")}
        doubleBtnImg2Style={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginRight: 25,
        }}
        navigation={navigation}
        navigateTo="CustomersList"
        headerTitle="Orders List"
        myRoute="order"
      />
      {DocDateSelectionView()}

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        navigation={navigation}
      />
      <ProgressDialog
        visible={progressVisible}
        title="Loading Data"
        message="Please wait..."
      />
    </SafeAreaView>
  );
};

export default Orders;
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
