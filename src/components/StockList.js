import React, { useEffect, useState } from "react";
import { StyleSheet, View,TouchableWithoutFeedback } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

const StockList = ({ Stock, ItemCode, ItemName, Description, Price ,item, navigation}) => {
  useEffect(() => {}, []);
// console.log("in stock",item)
  return (
    <TouchableWithoutFeedback  onPress={() => navigation.navigate("StockDetail", { ItemCode })}>
 <View style={styles.card1}>
         <AppRow style={styles.row1}>
        <AppText style={styles.p0}>
          {ItemName}
        </AppText>
      </AppRow>
      <AppRow style={{ justifyContent: "space-between" }}>
       
        <AppRow>
          <FontAwesome5 name="file-invoice" size={15} color={colors.tertiary} />
          <AppText style={styles.p6}> {ItemCode}</AppText>
        </AppRow>
        <AppRow>
          <FontAwesome5 name="layer-group" size={15} color={colors.tertiary} />
          <AppText style={styles.p6}>{item.MainStock}</AppText>
        </AppRow>
      </AppRow>
   
      <AppRow style={{ justifyContent: "space-between", marginVertical: 2 }}>
        {/* <AppRow>
          <AppText style={styles.p0}></AppText>
          <AppText style={styles.p4}></AppText>
        </AppRow> */}
        {/* <AppRow style={{justifyContent:"space-between"}}>
          <AppText style={styles.p0}>{item.WarehouseDetails[0].WhsCode}:</AppText>
          <AppText style={styles.p4}>{item.WarehouseDetails[0].StockInWarehouse} |</AppText>
          <AppText style={styles.p0}> {item.WarehouseDetails[1].WhsCode}:</AppText>
          <AppText style={styles.p4}>{item.WarehouseDetails[1].StockInWarehouse} |</AppText>
          <AppText style={styles.p0}> {item.WarehouseDetails[2].WhsCode}:</AppText>
          <AppText style={styles.p4}> {item.WarehouseDetails[2].StockInWarehouse} |</AppText>
          <AppText style={styles.p0}> {item.WarehouseDetails[3].WhsCode}:</AppText>
          <AppText style={styles.p4}>{item.WarehouseDetails[3].StockInWarehouse}</AppText>
        </AppRow> */}
      </AppRow>
      {/* <AppRow style={styles.row2}>
        <AppRow>
          <AppText style={styles.p0}>Debit: </AppText>
          <AppText style={styles.p4}>{debit}</AppText>
        </AppRow>
        <AppRow>
          <AppText style={styles.p0}>Credit: </AppText>
          <AppText style={styles.p4}>{credit}</AppText>
        </AppRow>
        <AppRow>
          <AppText style={styles.p0}>Balance: </AppText>
          <AppText style={styles.p4}>{total}</AppText>
        </AppRow>
      </AppRow> */}
    </View>
    </TouchableWithoutFeedback>
   
  );
};

export default StockList;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 15,
    marginHorizontal: 8,
    borderRadius: 10,
    marginVertical: 8,
    marginBottom: 0,
  },

  row1: {
    //    justifyContent:"space-between",
    marginVertical: 2,
  },
  row2: {
    marginVertical: 2,
    justifyContent: "space-between",
  },
  p2: {
    color: colors.card_h2,
    // fontWeight: "bold",
    fontWeight: "normal",
  },
  p0: {
    color: colors.tertiary,
    fontWeight: "bold",

    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 14 : 12,
  },
  heading: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  p3: {
    color: colors.yellow,
  },
  p4: {
    color: colors.card_h2,
    fontWeight: "normal",
  },
  p5: {
    color: colors.tertiary,
  },
  p6: {
    color: colors.card_h2,
    fontWeight: "normal",
    marginLeft:3,
  },
});
