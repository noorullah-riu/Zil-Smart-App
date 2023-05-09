import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, Alert, useWindowDimensions, } from "react-native";
import AppHeader from "../components/AppHeader";
import OrderListCard from "../components/OrderListCard";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import draftOrdersListApi from "../api/draftOrdersList";
import DraftOrdersListCard from "../components/DraftOrdersList";
import approvedSaleOrdersApi from "../api/approvedSaleOrders";
import {ProgressDialog} from "react-native-simple-dialogs";

const Orders = ({ navigation }) => {
  const [progressVisible, setprogressVisible] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [slp, setSlp] = useState("");
  const [userCode, setUserCode] = useState("");
  const [date, setDate] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const [draftOrdersList, setDraftOrdersList] = useState([]);

  const { preCategoriesRouteVal, setPreCategoriesRouteVal } = useContext(
    preCategoriesRouteContext
  );

  const [isPickerShow, setIsPickerShow] = useState(false);
  //const [date, setDate] = useState(new Date(Date.now()));
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

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).SalePersonCode);
   // console.log("getUserDetails ---->",JSON.parse(jsonValue))
    getDraftOrdersList(JSON.parse(jsonValue).salePersonCode)
    getApprovedSaleOrders(JSON.parse(jsonValue).salePersonCode)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };


  const getApprovedSaleOrders = async (slp) => {
  //  alert(slp);
    setprogressVisible(true);
    const response = await approvedSaleOrdersApi.getApprovedSaleOrders(slp);
    console.log("response from approved sale orders api1", response.data.data);
    setprogressVisible(false);
    setIsFetching(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customers pendng List");
    if (response.data.data) setOrdersList(response.data.data);
    else {
      Alert.alert("No approved sale orders found!");
      setOrdersList([]);
    }
  };

  const getDraftOrdersList = async (slp) => {
    setprogressVisible(true);
    const response = await draftOrdersListApi.getDrfatOrdersList(slp);
    console.log("response from draft Orders List api", response.data.data);
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the draftOrders List");
    if (response.data.data) setDraftOrdersList(response.data.data);
    else {
      Alert.alert("No sale orders found!");
      // setOrdersList([]);
    }
  };

  useEffect(() => {
    console.log("preCategoriesRouteVal in orders List", preCategoriesRouteVal);
    getUserDetails();
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
    <View style={{ marginBottom: 20 }}>
      <View style={{ marginHorizontal: sizes.base_margin, marginVertical: 14 }}>
        <AppText style={styles.p1}>Select Document Date</AppText>
      </View>


{/*       <AppRow
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ marginTop: 0, flex: 1 }}>
              <AppText style={styles.p1}>Delivery Date</AppText>
            </View>
            <View style={{ marginTop: 0, flex: 1}}>
              <View style={{ backgroundColor: "#fff",padding:10 }}>
                <View style={styles.pickedDateContainer}>
                  <Pressable onPress={showPicker} style={styles.dateDiv}>
                    <Text style={{color:"#555",textAlign:"center"}}>{display()}</Text>
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
            </View>
          </AppRow> */}

{/*       <View>
        <DatePicker
          showIcon={false}
          style={{ width: "100%" }}
          date={date}
          mode="date"
          placeholder=" Select date"
          format="DD/MM/yyyy"
          minDate="01-01-2000"
          maxDate="01-01-2025"
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
              marginTop: 15,
              borderColor: colors.white,
              backgroundColor: colors.white,
              borderRadius: 10,
              height: 60,
              alignItems: "flex-start",
              paddingLeft: 10,
              width: "100%",
              marginHorizontal: 10,
            },
          }}
          onDateChange={(date) => {
            handleDateChange(date);
          }}
        />
      </View> */}
    </View>
  );

  const renderDraftOrderList = () => {
    return (
      <FlatList
        data={draftOrdersList}
        renderItem={({ item, index }) => {
          return (
            <DraftOrdersListCard
              id={item.docNum}
              value={item.docTotal}
              name={item.cardName}
              item={item}
              orderDate={item.docDate}
              deliveryDate={item.docDueDate}
              docEntry={item.docNum}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item) => item.DocNum}
      />
    );
  };
  const renderOrderList = () => {
    return (
      <FlatList
        data={ordersList}
        onRefresh={() => onRefresh()}
        refreshing={isFetching}
        renderItem={({ item, index }) => {
          return (
            <OrderListCard
              id={item.docNum}
              value={item.docTotal}
              name={item.customerName}
              item={item}
              orderDate={item.docDate}
              deliveryDate={item.deliveryDate}
              navigation={navigation}
              docEntry={item.docNum}

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


      {renderOrderList()}
      </View>
    );
  };
  const SecondRoute = () => {
    return (
      <View style={styles.routetwo}>

        {renderDraftOrderList()}
      </View>
    );
  };
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "all", title: "Approved" },
    { key: "today", title: "PENDING" },
  ]);

  const renderScene = SceneMap({
    all: FirstRoute,
    today: SecondRoute,
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
