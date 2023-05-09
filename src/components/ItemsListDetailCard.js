import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppButton from "./AppButton";
import NumericInput from "react-native-numeric-input";
import AppRow from "./AppRow";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { addToCartContext } from "../context/addToCartContext";
import { Colors } from "react-native/Libraries/NewAppScreen";
import RNPickerSelect from "react-native-picker-select";

const { width: screenWidth } = Dimensions.get("window");
// const imageWidthHeight = (screenWidth - 60) / 2 - 20;

const ItemsListDetailCard = ({
  navigation,
  name,
  imagePath,
  currentItem,
  availableQty,
  allItems,
  pricex,
  index,
  setVisible,
  visible,
}) => {
  const [showCartBtn, setShowCartBtn] = useState(true);
  const [allAddedItems, setallAddedItems] = useState([]);
  const [itemQty, setitemQty] = useState(1);
  const [quantity, setQuantity] = useState();
  const [pcs, setPcs] = useState();
  const [jobType, setJobType] = useState("");
  const [total, setTotal] = useState();
  const [lineTotal, setLineTotal] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [remarks, setRemarks] = useState("");
  const [price, setPrice] = useState();
  const [printedPrice, setPrintedPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [adjustmentPrice, setAdjustmentPrice] = useState();
  const { setCartItem, cartItem } = useContext(addToCartContext);

  const settingitemQty = (value) => {
    // console.log("in settingitemQty,remarks",remarks)
    setitemQty(value);
    currentItem.qty = value;
    allAddedItems.push(currentItem);
  };
  const handleRemarksInput = (text) => {
    setRemarks(text);
    currentItem.ItemRemarks = text;
  };
  const handleQuantityInput = (val) => {
    console.log("in handleQuantityInput, qty:", val);
    setQuantity(parseInt(val));
    currentItem.cartons = parseInt(val);
    currentItem.qty = parseInt(val);
    updateLineTotal();
  };

  const updateLineTotal = () => {
    // console.log(currentItem);
    var totalQty = currentItem.qty * currentItem.pcsPerCartons;
    var totalPrice =
      currentItem.basePrice +
      currentItem.printedcost +
      currentItem.adjustmentPrice;
    totalPrice = totalPrice - (totalPrice * currentItem.discount) / 100;
    setTotalPrice(totalPrice);
    // console.log(totalQty, totalPrice);
    setLineTotal(parseInt(totalQty) * totalPrice);
    currentItem.lineTotal = parseInt(totalQty) * totalPrice;
  };

  const handlePcsInput = (val) => {                                                                                 
    //   console.log("in handleQuantityInput, qty:", va
    setPcs(val);
    currentItem.pcsPerCartons = val;
    var totalQty = parseInt(val) * quantity;
    setTotal(totalQty);
    updateLineTotal();
  };

  const handlePriceInput = (text) => {
    if (!text) text = 0;
    //  console.log(currentItem);
    setPrice(parseInt(text));
    currentItem.basePrice = parseInt(text);
   // currentItem.price = parseInt(text);
    setLineTotal(parseInt(text) + printedPrice + adjustmentPrice);
    setTotalPrice(parseInt(text) + printedPrice + adjustmentPrice);
    updateLineTotal();
  };

  const handlePrintPriceInput = (text) => {
    if (!text) text = 0;
    setPrintedPrice(parseInt(text));
    currentItem.printedcost = parseInt(text);
    setLineTotal(parseInt(text) + price + adjustmentPrice);
    setTotalPrice(parseInt(text) + printedPrice + adjustmentPrice);
    updateLineTotal();
  };

  const handleAdjustInput = (text) => {
    if (!text) text = 0;
    setAdjustmentPrice(parseInt(text));
    currentItem.adjustmentPrice = parseInt(text);
    setLineTotal(parseInt(text) + price + printedPrice);
    setTotalPrice(parseInt(text) + printedPrice + adjustmentPrice);
    updateLineTotal();
  };

  const handleDiscountInput = (text) => {
    if (!text) text = 0;
    setDiscountPrice(parseInt(text));
    currentItem.discount = parseInt(text);
    var total = totalPrice - (totalPrice * parseInt(text)) / 100;
    // setTotalPrice(total);
    setLineTotal(total);
    updateLineTotal();
  };
  const handleJobType = (text) => {
    setJobType(text);
    currentItem.jobType = text;
  };

  const alterState = () => {
    if (!lineTotal > 0) {
      alert("All Fields Required");
    } else {
      currentItem.id = index;
      currentItem.jobType = "Rewinding";
      currentItem.discount = 0;
      currentItem.adjustmentPrice = 0;
      currentItem.vatGourpSa = "S1";
      currentItem.itemName = name;
      currentItem.totalPcs = currentItem.cartons * currentItem.qty;
      /*  "cartons": 2,
    "discount": 0,
    "id": 0,
    "itemCode": "WST000014",
    "jobType": "Rewinding",
    "lineTotal": 388.08000000000004,
    "name": "Rewinding Core Wastage",
    "pcsPerCartons": "3",
    "price": 11,
    "printedcost": 22,
    "qty": 2, */
      setCartItem([...cartItem, currentItem]);

      setVisible(!visible);
      Alert.alert("Success", "Item added to cart!", [{ text: "OK" }]);
    }
  };
  /*    Object {
        "$id": "4",
        "adV_IT": null,
        "bcdCode": null,
        "cardCode": null,
        "cardName": null,
        "cartons": "3",
        "catalog": null,
        "docDate": null,
        "docDueDate": null,
        "docNum": null,
        "dscription": null,
        "itemCode": "FG003399",
        "itemName": "Panda 46mm x 280yds 38mic Standard Golden",
        "itemRemarks": null,
        "lineNum": null,
        "lineTotal": "39812.99",
        "numAtCard": null,
        "pcsPerDzn": "36",
        "price": "368.6388",
        "priceBefDi": null,
        "quantity": null,
        "rowDiscPrcnt": null,
        "taxOnly": null,
        "tax_Amount": null,
        "tax_Rate": null,
        "totalPcs": "108",
        "u_Main_Category": null,
        "u_location": "",
        "uomCode": null,
        "wareHouseName": null,
      },
      Object {
        "$id": "4",
        "adjustmentPrice": 0,
        "availableQty": "355",
        "basePrice": 66,
        "cartons": 3,
        "discount": 0,
        "id": 2,
        "itemCode": "WST000012",
        "jobType": "Rewinding",
        "lineTotal": 11434.500000000002,
        "name": "Cutting Side Piece Core Wastage",
        "pcsPerCartons": "55",
        "price": 66,
        "printedcost": 77,
        "qty": 3,
        "vatGourpSa": "S1",
      }, */
  return (
    <View style={styles.card1}>
      <View style={styles.textContainer}>
        <AppText style={styles.p}>{currentItem.name}</AppText>
      </View>
      <AppRow style={{ justifyContent: "space-between" }}>
        <AppRow style={styles.textContainer}>
          <MaterialCommunityIcons
            name="warehouse"
            size={16}
            color={colors.tertiary}
          />
          <AppText style={styles.p6b}> {currentItem.WhsName}</AppText>
        </AppRow>
        <AppRow>
          <AntDesign name="database" size={16} color={colors.tertiary} />
          <AppText style={styles.p6b}> {currentItem.availableQty}</AppText>
        </AppRow>
        <AppText style={styles.p6b}>Sale Price:{currentItem.price}</AppText>
      </AppRow>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <View style={[styles.txtinputView, { width: "45%" }]}>
          <TextInput
            // multiline={true}
            onChangeText={(text) => handlePriceInput(text)}
            keyboardType={"numeric"}
            value={price}
            placeholder="Base Price"
            style={{ paddingHorizontal: 0, height: 25 }}
            //   placeholderTextColor={colors.tertiary}
          />
        </View>

        <View style={[styles.txtinputView, { width: "45%" }]}>
          <TextInput
            // multiline={true}
            onChangeText={(text) => handlePrintPriceInput(text)}
            keyboardType={"numeric"}
            value={printedPrice}
            placeholder="Printed Cost"
            style={{ paddingHorizontal: 0, height: 25 }}
            //   placeholderTextColor={colors.tertiary}
          />
        </View>
      </View>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <View style={[styles.txtinputView, { width: "45%" }]}>
          <TextInput
            // multiline={true}
            onChangeText={(value) => handleAdjustInput(value)}
            keyboardType={"numeric"}
            value={adjustmentPrice}
            placeholder="Adjustment Price"
            style={{ paddingHorizontal: 0, height: 25 }}
            //   placeholderTextColor={colors.tertiary}
          />
        </View>
        <View style={[styles.txtinputView, { width: "45%" }]}>
          <TextInput
            // multiline={true}
            onChangeText={(value) => handleQuantityInput(value)}
            keyboardType={"numeric"}
            value={quantity}
            placeholder="Cartons"
            style={{ paddingHorizontal: 0, height: 25 }}
            //   placeholderTextColor={colors.tertiary}
          />
        </View>
      </View>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <View style={[styles.txtinputView, { width: "45%" }]}>
          <TextInput
            // multiline={true}
            onChangeText={(text) => handlePcsInput(text)}
            keyboardType={"numeric"}
            value={pcs}
            placeholder="Pcs/Dzns Per Carton"
            style={{ paddingHorizontal: 0, height: 25 }}
            //   placeholderTextColor={colors.tertiary}
          />
        </View>
        <View style={[styles.txtinputView, { width: "45%" }]}>
          <TextInput
            // multiline={true}
            onChangeText={(text) => handleDiscountInput(text)}
            keyboardType={"numeric"}
            value={discountPrice}
            placeholder="Discount"
            style={{ paddingHorizontal: 0, height: 25 }}
            //   placeholderTextColor={colors.tertiary}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          alignContent: "center",
          alignItems: "center",
          marginTop: 15,
          width: "100%",
        }}
      >
        <View
          style={{
            width: "45%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText>Total Pcs/Dzns</AppText>
          <AppText style={{ height: 25 }}>{total}</AppText>
        </View>
        <View
          style={{
            width: "45%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText>Total Price</AppText>
          <AppText style={{ height: 25 }}>{lineTotal}</AppText>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 15,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "30%" }}>
          <AppText style={styles.p1}>Select Job Typ</AppText>
        </View>
        <View
          style={{ width: "40%", marginTop: Platform.OS == "ios" ? 0 : -15 }}
        >
          <RNPickerSelect
            style={{ inputAndroid: { color: "black" } }}
            placeholder={{
              label: "Select Job Type",
              value: null,
              color: colors.primaryBlue,
            }}
            onValueChange={(value) => handleJobType(value)}
            value={jobType}
            items={[
              { label: "Rewinding", value: "Rewinding" },
              { label: "Slitting", value: "Slitting" },
              { label: "In Stock", value: "In Stock" },
              { label: "Hold", value: "Hold" },
            ]}
          />
        </View>
      </View>
      {/* <View style={styles.txtinputView}>
                <TextInput
                    onChangeText={(text) => handleRemarksInput(text)}
                    value={remarks}
                    placeholder="Remarks"
                    style={{height: 25}}
                    multiline={true}

                    //   placeholderTextColor={colors.tertiary}
                />
            </View>*/}
      {/* {showCartBtn ? ( */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={() => setVisible(!visible)}
          >
            <AppButton
              //   cart
              newIconButton
              text="Cancel"
              iconName={require("../assets/cart.png")}
              containerStyle={styles.toppingsBtn}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.wrapper} onPress={() => alterState()}>
            <AppButton
              //    cart
              newIconButton
              text="ADD TO CART"
              iconName={require("../assets/cart.png")}
              containerStyle={styles.toppingsBtn}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ItemsListDetailCard);

const styles = StyleSheet.create({
  wrapper: {},
  card1: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 10,
    // height: Platform.OS === "android" ? 290 : 290,
    // width: Platform.OS === "android" ? 160 : 185,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imgContainer: {
    borderRadius: 40,
    paddingHorizontal: 0,
    // justifyContent: "center",
    // alignItems: "center",
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
    // height: 50,
  },
  p: {
    color: colors.tertiary,
    marginBottom: 5,
    marginTop: 5,
    fontSize: Platform.OS === "android" ? 14 : 16,
    // marginLeft: 10,
    // textAlign: "center",
    fontWeight: "bold",
  },
  p6: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 14 : 12,
    marginTop: 5,
    marginLeft: 10,
  },
  p6b: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 14 : 12,
    fontWeight: "normal",
  },
  toppingsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,

    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,

    marginTop: 10,
    marginBottom: 10,

    paddingHorizontal: Platform.OS === "android" ? 0 : 0,
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
  txtinputView: {
    borderColor: colors.light_grey,
    borderWidth: 1,
    //   borderRadius:5,
    marginHorizontal: 8,
    padding: 5,
    marginTop: 5,
  },
});
