import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppButton from "./AppButton";
import NumericInput from "react-native-numeric-input";

const { width: screenWidth } = Dimensions.get("window");
const imageWidthHeight = (screenWidth - 60) / 2 - 20;

const ItemsListCard = ({
  itemCode,
  itemGroupCode,
  navigation,
  name,
  imagePath,
  currentItem,
  availableQty,
}) => {
  const [showCartBtn, setShowCartBtn] = useState(true);
  const [allAddedItems, setallAddedItems] = useState([]);
  const [itemQty, setitemQty] = useState(1);
  const [remarks, setRemarks] = useState("");
  const [price, setPrice] = useState("");

  const settingitemQty = (value) => {
    // console.log("in settingitemQty,remarks",remarks)
    let qty = value;
    setitemQty(value);
    currentItem.Qty = value;
    allAddedItems.push(currentItem);
  };
  const handleRemarksInput = (text) => {
    setRemarks(text);
    currentItem.ItemRemarks = text;
  };
  const handlePriceInput = (text) => {
    setPrice(text);
    currentItem.Price = text;
  };
  const alterState = () => {
    setShowCartBtn((showCartBtn) => !showCartBtn);
    currentItem.Qty++;
    allAddedItems.push(currentItem);
  };
  const viewDetail = () => {
    console.log("in viewDetail");
    navigation.navigate("ItemDetailList", { itemGroupCode, itemCode });
  };

  return (
    <View style={styles.card1}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: imagePath }} />
      </View>

      <View style={styles.textContainer}>
        <AppText style={styles.p}>{name}</AppText>
      </View>
      <View>
        <AppText style={styles.p6}>
          Available Qty: <AppText style={styles.p6b}>{availableQty}</AppText>
        </AppText>
      </View>

     

      <TouchableOpacity style={styles.wrapper} onPress={() => viewDetail()}>
        <AppButton
          // eye
          newIconButton
          text="WAREHOUSE"
          containerStyle={styles.toppingsBtn}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ItemsListCard;

const styles = StyleSheet.create({
  wrapper: {},
  card1: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 10,

    width: (screenWidth - 60) / 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imgContainer: {
    borderRadius: 40,
    paddingHorizontal: 0,
   
    height: Platform.OS === "android" ? 105 : 110,
  },
  img: {
    resizeMode: "contain",

    alignSelf: "center",
    width: Platform.OS === "android" ? "100%" : "100%",
    height: Platform.OS === "android" ? "100%" : "100%",
  },
  textContainer: {
    borderRadius: 10,
    height: 50,
  },
  p: {
    color: colors.secondary,
    marginBottom: 5,
    marginTop: 5,
    fontSize: Platform.OS === "android" ? 12 : 14,
    // marginLeft: 10,
    textAlign: "center",
  },
  p6: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 14 : 12,
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 10,
  },
  p6b: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 14 : 12,
    fontWeight: "bold",
  },
  toppingsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 10,

    marginBottom: 10,

    paddingHorizontal: Platform.OS === "android" ? 5 : 0,
    paddingVertical: Platform.OS === "android" ? 10 : 10,
  },
  numericIpBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 10,

    marginTop: 15,
    marginBottom: 10,

    marginHorizontal: 10,
    paddingHorizontal: Platform.OS === "android" ? 0 : 10,
    paddingVertical: Platform.OS === "android" ? 10 : 10,
  },
});
