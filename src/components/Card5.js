import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import AppColumn from "../components/AppColumn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
const { width, height } = Dimensions.get("screen");

const Card5 = ({
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
  const onPress = () => {
    storeCustomerDetails(item);
    {
      route === "order" || route === "quotation" || route === "PurchaseReqList"
        ? navigation.navigate("ItemDetailList", { itemGroupCode: 101 })
        : route === "Ledger"
        ? navigation.navigate("Ledger", {
            customerName: name,
            customerCode: code,
            item: item,
          })
        : route === "CustomersList"
        ? navigation.navigate("Sales", {
            customerName: name,
            customerCode: code,
            item: item,
          })
        : route === "Sales Invoice"
        ? navigation.navigate("Sales", {
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
        <View style={styles.container}>
          <MapView style={styles.map} />
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <AppRow style={styles.card1}>
        <AppColumn style={{ marginRight: 15 }}>
          <Image style={styles.img} source={imagePath} />
        </AppColumn>

        <AppColumn>
          <AppRow style={styles.row1}>
            <AppText style={styles.p2}>{name}</AppText>
          </AppRow>

          <AppRow style={styles.row1}>
            <AppText style={styles.p4}>{code}</AppText>
          </AppRow>
          <AppText style={styles.p6}>
            Account Balance: <AppText style={styles.p6b}>{balance}</AppText>
          </AppText>
          <AppText style={styles.p7}>
            Credit Limit Used: <AppText style={styles.p7b}>{limit}</AppText>
          </AppText>
          <AppText style={styles.p7}>
            Remaining Credit Limit:{" "}
            <AppText style={styles.p7b}>{remaining}</AppText>
          </AppText>
        </AppColumn>
      </AppRow>
    </TouchableOpacity>
  );
};

export default Card5;
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
