import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import allCustomersApi from "../api/allCustomers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../components/SearchBar";
import ItemCardNew from "../components/ItemCardNew";
import { customersList } from "../context/customresList";
import { ProgressDialog } from "react-native-simple-dialogs";
const InventoryItems = ({ navigation, route }) => {
  //  const {myroute} = route.params;

  // const [customersList, setCustomersList] = useState([]);
  const [progressVisible, setprogressVisible] = useState(false);
  const [spc, setSpc] = useState({});

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const { setCustomers, customers } = useContext(customersList);

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSpc(JSON.parse(jsonValue).salePersonCode);
    console.log("Customers", JSON.parse(jsonValue));
    // if (customers.length === 0)
    getAllCustomers(JSON.parse(jsonValue).salePersonCode);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };
  const getAllCustomers = async (code) => {
    setprogressVisible(true);
    const response = await allCustomersApi.GetItemsForInventoryReport();

   //  console.log("list", response.data);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customers List");
      setCustomers(response.data.data);
      setprogressVisible(false);
  };

  const nav = (msg) => {
    if (msg) navigation.navigate("Inventory", { code: msg });
  };

  return (
    <SafeAreaView>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Items List report"
      />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      <ItemCardNew
        searchPhrase={searchPhrase}
        data={customers}
        //   route={myroute}
        setClicked={setClicked}
        navigation={navigation}
      />
      <ProgressDialog
        visible={progressVisible}
        title="Loading Items" //"Posting Data"
        message="Please wait..."
      />
    </SafeAreaView>
  );
};

export default InventoryItems;

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
