import React, { useState, useEffect, useContext } from "react";
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
import allGroupItemsApi from "../api/allGroupItems";
import AppInput from "../components/AppInput";

const ItemDetailListEdit = ({ navigation, route }) => {
  const { draftTableDetail, itemx } = route.params;
  const [itemQty, setitemQty] = useState(1);
  const [progressVisible, setprogressVisible] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [allItemList, setAllItemList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const { preCategoriesRouteVal } = useContext(preCategoriesRouteContext);

  useEffect(() => {
    const itemGroupCode="something";
    getItemDetailList(itemGroupCode);
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
    navigation.navigate("PostOrderEdit", {
      draftTableDetail: draftTableDetail,
      itemx:itemx,
    })
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
            <ItemsListDetailCard
              name={item.name} //ItemName
              imagePath={""}
              price={item.price} // Price
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
/* 
  Object {
    "$id": "4",
    "adV_IT": null,
    "bcdCode": null,
    "cardCode": null,
    "cardName": null,
    "cartons": "3",
    "catalog": null,
    "docDate": null,
    "docDueDate": null,
    "docNum": null,
    "dscription": null,
    "itemCode": "FG003399",
    "itemName": "Panda 46mm x 280yds 38mic Standard Golden",
    "itemRemarks": null,
    "lineNum": null,
    "lineTotal": "39812.99",
    "numAtCard": null,
    "pcsPerDzn": "36",
    "price": "368.6388",
    "priceBefDi": null,
    "quantity": null,
    "rowDiscPrcnt": null,
    "taxOnly": null,
    "tax_Amount": null,
    "tax_Rate": null,
    "totalPcs": "108",
    "u_Main_Category": null,
    "u_location": "",
    "uomCode": null,
    "wareHouseName": null,
  },
  Object {
    "$id": "2",
    "adjustmentPrice": 0,
    "availableQty": "0",
    "basePrice": 11,
    "cartons": 2,
    "discount": 0,
    "id": 0,
    "itemCode": "WST000014",
    "jobType": "Rewinding",
    "lineTotal": 388.08000000000004,
    "name": "Rewinding Core Wastage",
    "pcsPerCartons": "3",
    "price": 11,
    "printedcost": 22,
    "qty": 2,
    "vatGourpSa": "S1",
  }, */

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

export default ItemDetailListEdit;
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
