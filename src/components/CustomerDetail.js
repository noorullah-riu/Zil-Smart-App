import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  Entypo
} from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AppColumn from "./AppColumn";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomerDetailCard = ({ item, navigation }) => {
  useEffect(() => {
    console.log("in CustomerDetailCard", item);
  }, []);

 
const showCustomerDetails = () => {
    let cardcode = item.CardCode;
    navigation.navigate("CustomerDetail", {cardcode})
}
  return (
    <View style={styles.card1}>
      <AppRow style={{ justifyContent: "space-between" }}>
        <AppRow>
          <Ionicons name="person" size={15} color={colors.tertiary} />

          <AppText style={styles.p6}> {item.CardName}</AppText>
        </AppRow>
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => showCustomerDetails()}>
          <AntDesign name="mobile1" size={15} color={colors.tertiary}/>
          <AppText style={styles.p6}> {item.Cellular}</AppText>
        </TouchableOpacity>
      </AppRow>

     
    
      <AppRow style={{ justifyContent: "space-between" }}>
        <AppRow style={styles.row1}>
         
            <Entypo name="location"  size={17}
            color={colors.tertiary} />
          <AppText style={styles.p4}> {item.Email}</AppText>
        </AppRow>
        
      </AppRow>
      <AppRow>
          <FontAwesome name="flag" size={15} color={colors.tertiary} />
          <AppText style={styles.p6} multiline> {item.Street + "," + item.City} </AppText>
        </AppRow>

    
    </View>
  );
};

export default CustomerDetailCard;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    marginBottom: 0,
  },

  row1: {
    marginVertical: 2,
  },
  row2: {
    marginVertical: 2,
    justifyContent: "space-between",
  },
  p2: {
    color: colors.card_h2,
    fontWeight: "normal",
  },
  p0: {
    color: colors.tertiary,
    fontWeight: "bold",
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
  },
  p66: {
    color: colors.primaryBlue,
    fontWeight: "bold",
  },
});
