import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import allStockApi from "../api/allStock";
import SearchBar from "../components/SearchBar";
import StockListComponent from "../components/StockListComponent";

const Stock = ({ navigation, route }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [totalRecord, setTotalRecord] = useState(8);
  const [offset, setOffset] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [progressVisible, setprogressVisible] = useState(true);

  useEffect(() => {
    getAllStock();
  }, [totalRecord]);

  const getAllStock = async () => {
    console.log("getAllStock called")
    // console.log("totalRecord,offSet:", totalRecord, offset);
    const response = await allStockApi.getAllStock();
    setprogressVisible(false);
    console.log('stock list',response.data.Data);
    if (!response.ok) return Alert.alert("Couldn't retrieve the stock list");
    setStockList([...stockList, ...response.data.Data]);
  };

  const loadMoreItems = () => {
    console.log("loadMoreItems called")
    setOffset(totalRecord);
    setTotalRecord(totalRecord + 8);
  };

 
  return (
    <SafeAreaView>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Stock List"
      />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      {!stockList ? (
        <ActivityIndicator size="large" />
      ) : (
        <StockListComponent
          searchPhrase={searchPhrase}
          data={stockList}
          setClicked={setClicked}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

export default Stock;

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
