import React, { useState, useEffect, useContext,memo } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import colors from "../components/colors";
import { ProgressDialog, Dialog } from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import allItemsWithWareHouseApi from "../api/allItemsWithWareHouse";
import ItemsListDetailCard from "../components/ItemsListDetailCard";
import ItemListMinimalCard from "../components/ItemListMinimalCard";
import allGroupItemsApi from "../api/allGroupItems";
import AppInput from "../components/AppInput";

const ItemDetailList = ({ navigation, route }) => {
  const [itemQty, setitemQty] = useState(1);
  const [progressVisible, setprogressVisible] = useState(true);
//  const { itemGroupCode } = route.params;
//  const { itemGroupCode } = route.params;
var itemGroupCode=1; 
const [itemList, setItemList] = useState([]);
  const [allItemList, setAllItemList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const { preCategoriesRouteVal } = useContext(preCategoriesRouteContext);

  useEffect(() => {
    console.log("Hello", itemGroupCode);
   
    getItemDetailList(1);
    // getUserDetails();
    // console.log("IN ITEMS: preCategoriesRouteVal::", itemGroupCode, itemCode);
  }, []);

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    console.log(jsonValue);
    setUserDetails(jsonValue);
  };

  const settingitemQty = (value) => {
    setitemQty(value);
  };

  const nextPress = () => {
    if (userDetails === "guest") navigation.navigate("PostInquiry");
    else {
      preCategoriesRouteVal === "ordersList"
        ? navigation.navigate("PostOrder")
        : preCategoriesRouteVal === "quotationsList"
        ? navigation.navigate("PostOrder")
        : preCategoriesRouteVal === "purchaseReq"
        ? navigation.navigate("PostPurchaseRequest")
        : null;
    }
  };
  const viewDetail = () => {
    navigation.navigate("ViewItemDetail", {});
  };
  const getItemDetailList = async (itemGroupCode) => {
    setprogressVisible(true);
    console.log(itemGroupCode);
    const response = await allGroupItemsApi.getGroupItems(itemGroupCode);

    setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Item Group list");
    // console.log(response.data);
    var items = response.data.data.filter((obj) => obj.name !== "Select Item");
    console.log(items,"-----------------list--------->");
    setItemList(items.filter((obj)=>obj.name !== ""));
    setAllItemList(items.filter((obj)=>obj.name !== ""));

    setprogressVisible(false);
  };

  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });
  const handleSearch = text => {
    const formattedQuery = text.toUpperCase();
    var data = allItemList.filter(function(item){
      return item.name.toUpperCase().includes(formattedQuery);
    });
    setItemList(data);
  }
  const renderHeader = () => (
      <AppInput
          onChangeText={handleSearch}
          placeholder='Search'
          inputWrapperStyle={{
            borderRadius: 25,
            borderColor: '#333',
            height: 50,
            marginTop: -20,
            marginHorizontal: 10,
            backgroundColor: '#fff',
          }}
      />
  )
  const renderItemsList = () => {
    return (
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={itemList}
        renderItem={({ item, index }) => {
          return (
            <ItemListMinimalCard
              name={item.name} //ItemName
              imagePath={""}
              pricex={item.price} // Price
              navigation={navigation}
              currentItem={item}
              index={index}
              availableQty={item.availableQty} //Quantity
              allItems={itemList}
            />
          );
        }}
        keyExtractor={(item) => item.index}
      />
    );
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Item Detail List"
      />
      <ProgressDialog
        visible={progressVisible}
        title="Loading data"
        message="Please wait..."
      />
      {renderHeader()}
      {renderItemsList()}
      <View style={{ paddingTop: 0 }}>
        <TouchableOpacity onPress={() => nextPress()}>
          <AppButton
            text="VIEW CART"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default memo(ItemDetailList);
const styles = StyleSheet.create({
  row: {
    marginVertical: 5,
    justifyContent: "center",
  },
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "center",
    height: Platform.OS === "android" ? 50 : 60,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: "5%",
    marginBottom: 0,
  },
  contentContainerStyle: {
    marginTop: 15,
    paddingBottom: Platform.OS === "android" ? 100 : 20,
  },
});
