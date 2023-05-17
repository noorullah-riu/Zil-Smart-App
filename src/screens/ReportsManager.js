import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, FlatList, View } from "react-native";
import colors from "../components/colors";
import AppHeader from "../components/AppHeader";

import HorizontalItemCard from "../components/HorizontalItemCard";
import { sosqContext } from "../context/SoSq";

const ReportsManager = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [progressVisible, setprogressVisible] = useState(false);

  const [groups, setGroups] = useState([
/*     {
      id: "1",
      group: "Ledger",
      path: "CustomersList",
    }, */
    {
      id: "2",
      group: "Inventory",
      path: "InventoryItems",
    },
    {
      id: "2",
      group: "Sales Invoice",
      path: "CustomersList", //Sales",
    },
/*     {
      id: "4",
      group: "AgingReport",
      path: "AgingReport",
    }, */

 /*    {
      id: "5",
      group: "PendingOrderListReport",
      path: "PendngOrderListReport",
    }, */
    {
      id: "6",
      group: "DailyRecievableReport",
      path: "DailyRecievableReport",
    },
    {
      id: "7",
      group: "MonthalyCommissionReport",
      path: "MonthalyCommissionReport",
    },
    {
      id: "8",
      group: "JumboRollReport",
      path: "JumboRollReport",
    },
    {
      id: "9",
      group: "LogRollReport",
      path: "LogRollReport",
    },
    {
      id: "10",
      group: "FgInStockReport",
      path: "FgInStockReport",
    },
  ]);

  const { setRouteVal } = useContext(sosqContext);
  useEffect(() => {
    // setRouteVal("reports")
  }, []);

  const renderOrderList = () => {
    return (
      <FlatList
        data={groups}
        renderItem={({ item, index }) => {
          return (
            <HorizontalItemCard
              name={item.group}
              imagePath={item.image}
              navPath={item.path}
              navigation={navigation}
              id={item.id}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <View style={{ paddingTop: 0 }}>
        <AppHeader
          doubleBtn
          doubleBtnContainerStyle={{}}
          doubleBtnImg1={require("../assets/back-button.png")}
          titleImg1="Back"
          styleImg1={{
            width: Platform.OS === "ios" ? 35 : 30,
            height: Platform.OS === "ios" ? 35 : 30,
            marginLeft: 10,
          }}
          //      doubleBtnImg2={require("../assets/search.png")}
          doubleBtnImg2Style={{
            width: 20,
            height: 20,
            marginRight: 27,
          }}
          navigation={navigation}
          navigateTo="CustomersList"
          headerTitle="Reports"
        />
      </View>

      <View
        style={{
          backgroundColor: colors.background_new,
          marginTop: 0,
          paddingBottom:100,
          marginHorizontal: 10,
          justifyContent: "center",
        }}
      >
        {renderOrderList()}
      </View>
    </SafeAreaView>
  );
};

export default ReportsManager;

const styles = StyleSheet.create({
  container: {
    marginVertical: Platform.OS === "android" ? "13%" : "3%",
    marginHorizontal: Platform.OS === "android" ? 19 : 6,
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: "5%",
  },
  imgContainer: {
    backgroundColor: colors.primary,
    margin: "5%",
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: "10%",
  },
  img: {
    alignSelf: "center",
  },
  textContainer: {
    marginVertical: 8,
  },
  p: {
    color: colors.secondary,
    marginTop: 7,
    fontSize: 16,
    marginLeft: 20,
  },
  p1: {
    color: colors.yellow,
    fontSize: 18,
    marginLeft: 16,
  },
  toppingsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    height: 50,

    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",

    paddingVertical: 12,
  },
});
