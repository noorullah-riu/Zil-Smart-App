import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, FlatList, StyleSheet, Alert } from "react-native";
import Card4 from "../components/ItemsListCard";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import colors from "../components/colors";
import allGroupItemsApi from "../api/allGroupItems";
import { ProgressDialog, Dialog } from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import SearchBar from "../components/SearchBar";
import ItemsListComponent from "../components/ItemsListComponent";

const Items = ({ navigation, route }) => {
  const [itemQty, setitemQty] = useState(1);
  const [progressVisible, setprogressVisible] = useState(true);

  const { itemCode: selectedItem } = route.params;
  const [itemList, setItemList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const { preCategoriesRouteVal } = useContext(preCategoriesRouteContext);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    getAllItems(selectedItem);
    getUserDetails();
    console.log("IN ITEMS::", selectedItem);
  }, []);

  getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    console.log(jsonValue);
    setUserDetails(jsonValue);
  };

  const settingitemQty = (value) => {
    setitemQty(value);
  };

  const nextPress = () => {
    setCartItems([]);
    itemList.forEach((element) => {
      if (element.Qty > 0) {
        cartItems.push(element);
      }
    });
    if (cartItems.length == 0) {
      Alert.alert("Please select an item to proceed!");
    } else {
      if (userDetails === "guest")
        navigation.navigate("PostInquiry", { items: cartItems });
      else {
        preCategoriesRouteVal === "ordersList"
          ? navigation.navigate("PostOrder", { items: cartItems })
          : preCategoriesRouteVal === "quotationsList"
          ? navigation.navigate("PostOrder", { items: cartItems })
          : preCategoriesRouteVal === "purchaseReq"
          ? navigation.navigate("PostPurchaseRequest", { items: cartItems })
          : null;
      }
    }
  };
  const viewDetail = () => {
    navigation.navigate("ViewItemDetail", {});
  };
  const getAllItems = async (selectedItem) => {
    const response = await allGroupItemsApi.getGroupItems(selectedItem);

    setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Item Group list");
    setItemList(response.data.data.filter((obj) => obj.Name !== "Select Item"));
  };

  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  const renderItemsList = () => {
    return (
      <FlatList
        numColumns={2}
        contentContainerStyle={{
          marginTop: 15,
        }}
        showsVerticalScrollIndicator={false}
        data={itemList}
        columnWrapperStyle={styles.row}
        renderItem={({ item, index }) => {
          return (
            <Card4
              name={item.name} //ItemName
              itemCode={item.itemCode} //ItemName
              imagePath={require("../assets/hiTechSq.png")}
              price={item.Price} // Price
              navigation={navigation}
              currentItem={item}
              availableQty={item.AvailableQty} //Quantity
              allItems={itemList}
              itemGroupCode={selectedItem}
            />
          );
        }}
        keyExtractor={(item) => item.id}
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
        headerTitle="All Items"
      />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      {!itemList ? (
        <ActivityIndicator size="large" />
      ) : (
        <ItemsListComponent
          searchPhrase={searchPhrase}
          data={itemList}
          selectedItem={selectedItem}
          setClicked={setClicked}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

export default Items;
const styles = StyleSheet.create({
  row: {
    marginVertical: 5,
    justifyContent: "center",
  },
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "center",
    height: Platform.OS === "android" ? 60 : 70,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: "10%",
    marginBottom: 0,
  },
});
