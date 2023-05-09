import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  Alert,
  Text,
  SafeAreaView,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import allWarehouseItemsStatusApi from "../api/allWarehouseItemsStatus";
import StockDetailCard from "../components/StockDetail";
const StockDetail = ({ navigation, route }) => {
  const { ItemCode } = route.params;
  const [searchPhrase, setSearchPhrase] = useState("");
  const [totalRecord, setTotalRecord] = useState(8);
  const [offset, setOffset] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [progressVisible, setprogressVisible] = useState(true);

const getAllWarehouseItemsStatusApi = async () => {
   
    const response = await allWarehouseItemsStatusApi.getAllWarehouseItemsStatus(ItemCode);
    setprogressVisible(false);
    if (!response.ok) return Alert.alert("Couldn't retrieve the stock detail list");
    setStockList(response.data.Data);
  };
useEffect(() => {
getAllWarehouseItemsStatusApi();
  },[ItemCode]);

  const renderStockDetail = (navigation) => {
    return (
      <FlatList
        data={stockList}
        contentContainerStyle={{
          marginTop: 5,
        }}
        renderItem={({ item, index }) => {
          return (
            <StockDetailCard
              item={item}
              navigation={navigation}
            />
          );
        }}
   
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
        headerTitle="Stock Detail"
      />
     {renderStockDetail()}
    </SafeAreaView>
  );
};

export default StockDetail;

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
    color: colors.secondary,
    fontWeight: "bold",

    paddingVertical: 4,
    borderRadius: 5,
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
});
