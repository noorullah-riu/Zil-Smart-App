import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

const StockDetail = ({ item, navigation }) => {
  useEffect(() => {}, []);
  console.log("in stock",item)
  return (
    <View style={styles.card1}>
      <View style={{  marginVertical: 2 }}>
          <AppText style={styles.p0}>Warehouse:
          <AppText style={styles.p2}>
            {item.WhsName}
          </AppText>
          </AppText>
      
          <AppRow>
              <View style={{}}>
              {/* <FontAwesome5 name="layer-group" size={15} color={colors.tertiary} /> */}

              </View>
              <AppText style={styles.p0}>Stock:
          <AppText style={styles.p4}>
             {item.StockInWarehouse} 
          </AppText>
          </AppText>
        </AppRow>
      </View>
      

    </View>
  );
};

export default StockDetail;

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
// marginLeft:5,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 14 : 12,
    // width:"50%"
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
    marginLeft: 3,
  },
});
