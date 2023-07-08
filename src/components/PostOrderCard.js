import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import AppColumn from "./AppColumn";
import { addToCartContext } from "../context/addToCartContext";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const OrderDetailCard = ({
  navigation,
  index,
  name,
  findSubTotal,
  price,
  quantity,
  currentItem,
  item,
}) => {
  // console.log("selected item",currentItem)
  const [updatedQty, setUpdatedQty] = useState(quantity);
  const [itemprice, setItemprice] = useState(price);
  const {cartItem, setCartItem} = useContext(addToCartContext);

  const updateItem = (a) => {
    console.log(a,"--------------------------->")
    a.pcsPerDzn = updatedpcsPerDzn;
    a.cartons = updatedcartons;
   // cartItem[index].Qty = updatedQty;
   findSubTotal();
    setVisible(false);
    // setUpdatedQty(quantity);
    // currentItem.Qty = quantity;
    // currentItem.LineTotal = quantity * price;
};

  const onRemoveItem = (currentItem) => {
    //  console.log("onRemoveItem called ::", currentItem)
      Alert.alert(
          "Update Order Items",
          "",
          [
               {
                  text: "Delete Item", onPress: () => {
                      Alert.alert(
                          "Delete",
                          "Are you sure you want to delete this Item?",
                          [
                              {
                                  text: "Yes", onPress: () => {
                                      setCartItem(cartItem.filter((item) => item.itemName !== currentItem));
                                      findSubTotal();
                                  }
                              },
                              {text: "No"},
                          ]);
                  }
              },
              {text: "Cancle"},
           /*     {
                  text: "Update Quantity", onPress: () => {
                      setVisible(true)
                  }
              }, */ 
          ]);
  }


  useEffect(() => {
    // console.log("post order card:", cartItem);
  }, []);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onRemoveItem(name)}>
        <AppRow>
          <AppColumn style={styles.c1}>
            <AppText style={styles.p2}>
              {name}
            </AppText>
          </AppColumn>

          <AppColumn style={styles.c2}>
            <AppRow>
              <AppText style={styles.p6b}>{updatedQty}</AppText>
            </AppRow>
          </AppColumn>

          <AppColumn style={styles.c4}>
            <AppText style={styles.p7b}>{price}</AppText>
          </AppColumn>
          <AppColumn style={styles.c3}>
            <AppText style={styles.p8b}>{currentItem.lineTotal.toFixed(4)}</AppText>
          </AppColumn>
          <AppColumn></AppColumn>
        </AppRow>
        {/*
      <AppRow>
        <AppText style={styles.remHeading}>Item Remarks: </AppText>
        <AppText multiline>{currentItem.ItemRemarks}</AppText>
      </AppRow> */}
      </TouchableWithoutFeedback>
    </View>
  );
};

export default OrderDetailCard;
const styles = StyleSheet.create({
  container: {
    // flex:1,
   // borderRadius: 10,
    backgroundColor: colors.white,
  //  marginHorizontal: 5,
    marginVertical: 2,
    // marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal:5,
    // paddingBottom:10,p
  },
  card1: {
    // backgroundColor: colors.white,
    // padding: 10,
    // marginHorizontal: 20,
    // borderRadius: 10,
    // marginTop: 10,
    // height: 55,
  },
  card2: {
    // backgroundColor: colors.backgroundColor,
    // padding: 10,
    // marginHorizontal: 20,
    // borderRadius: 10,
    // marginVertical: 10,
    // height: 85,
  },

  row1: {
    justifyContent: "space-between",
    width: "100%",
  },
  row2: {
    marginVertical: 2,
  },
  p2: {
    color: colors.secondary,
    fontWeight: "bold",

    paddingVertical: 4,
    borderRadius: 5,
    // width: "80%",
    fontSize: Platform.OS === "ios" ? 14 : 12,
  },
  p3: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 14 : 12,
    fontWeight: "bold",
  },
  p4: {
    color: colors.card_h2,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 14 : 12,
  },
  p5: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 14 : 12,
  },

  p6: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 14 : 12,
    marginTop: 5,
  },
  p6b: {
    color: colors.yellow,
    // width: "20%",
    fontSize: Platform.OS === "ios" ? 14 : 12,
    fontWeight: "bold",
    // textAlign: "center",
  },
  p7: {
    color: colors.tomato,
    fontSize: Platform.OS === "ios" ? 14 : 12,
  },
  p7b: {
    // width: "40%",
    color: colors.tomato,
    fontSize: Platform.OS === "ios" ? 14 : 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  p8b: {
    // width: "40%",
    color: colors.tomato,
    fontSize: Platform.OS === "ios" ? 14 : 12,
    fontWeight: "bold",
   textAlign: "right",
  },

  img: {
    borderRadius: 10,
    width: 70,
    height: 70,
  },
  c1: {
    width: "50%",
    // borderWidth:1
  },
  c2: {
    width: "10%",
    flexDirection: "row",
    marginLeft: 3,
    // borderWidth:1
  },
  c3: {
  //  width: "20%",
    // borderWidth:1
  },
  c4: {
    width: "20%",
    // borderWidth:1
  },
  deliveryDateView: {
    // backgroundColor: colors.white,
    paddingVertical: 15,
    // marginRight: 20,
  },
  remHeading: {
    color: colors.primaryBlue,
    // fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 12 : 12,
    fontWeight: "bold",
  },
  p2: {
    color: colors.primaryBlue,
    fontWeight: "bold",

    paddingVertical: 4,
    borderRadius: 5,
    // width: "80%",
    fontSize: Platform.OS === "ios" ? 12 : 12,
  },
});
