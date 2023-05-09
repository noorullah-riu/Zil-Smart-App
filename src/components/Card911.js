import React from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import AppColumn from "../components/AppColumn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
import MapView from "react-native-maps";

const Card911 = ({
  navigation,
  imagePath,
  name,
  code,
  balance,
  limit,
  remaining,
  item,
  route,
}) => {
  // console.log("updated route",route)
  const onPress = () => {
    console.log(route);
    storeCustomerDetails(item);
    {
      route === "order" || route === "quotation" || route === "PurchaseReqList"
        ? navigation.navigate("ItemDetailList", { itemGroupCode: 101 })
        : route === "reports"
        ? navigation.navigate("Ledger", {
            customerName: name,
            customerCode: code,
            item: item,
          })
        : route === "AddActivity"
        ? navigation.navigate("AddActivity", {
            customerName: name,
            customerCode: code,
          })
        : navigation.navigate("PostExpense", {
            customerName: name,
            customerCode: code,
            item: item,
          });
    }
  };

  const storeCustomerDetails = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@customer_Details", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const renderMaps = () => {
    return (
      <>
        console.log("here");
        <View style={styles.container}>
          <MapView style={styles.map} />
        </View>
      </>
    );
  };

  const nav = (msg) => {
    // alert(msg);
    if (msg) navigation.navigate("Inventory", { code: msg });
  };

  return (
    <TouchableOpacity onPress={() => nav(code)} style={styles.card1}>
      <AppText style={styles.p4}>{code}</AppText>
      <AppText style={styles.p2}>{name}</AppText>
    </TouchableOpacity>
  );
};

export default Card911;
const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
  },

  row1: {
    justifyContent: "space-between",
    width: "68%",
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
    width: 270,
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: width,
    height: height,
  },
});
