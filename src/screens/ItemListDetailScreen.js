import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import AppText from "../components/AppText";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import AppHeader from "../components/AppHeader";
import NumericInput from "react-native-numeric-input";
import AppRow from "../components/AppRow";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { addToCartContext } from "../context/addToCartContext";
import { Colors } from "react-native/Libraries/NewAppScreen";
import RNPickerSelect from "react-native-picker-select";
import DropDownPicker from "react-native-dropdown-picker";
import { string } from "yup";
import { set } from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");
// const imageWidthHeight = (screenWidth - 60) / 2 - 20;

const ItemsListDetailScreen = ({
  route,
  navigation,
  /* index,
  setVisible,
  visible, */
}) => {
  const { currentItem, name } = route.params;
  const { setCartItem, cartItem } = useContext(addToCartContext);

  const [showCartBtn, setShowCartBtn] = useState(true);
  const [allAddedItems, setallAddedItems] = useState([]);
  const [itemQty, setitemQty] = useState(1);

  const [jobType, setJobType] = useState("");
  const [Baseprice, setBasePrice] = useState("");
  const [YardsFNme, setYardsFNme] = useState();
  const [WidthFNme, setWidthFNme] = useState();
  const [TotalYards, setTotalYards] = useState();
  const [pcsPCarton, setpcsPCarton] = useState();
  const [Cartons, setCartons] = useState();

  const [PrntedCost, setPrntedCost] = useState(0);
  const [Prnted, setPrnted] = useState(false);

  const [lineTotal, setLineTotal] = useState();
  const [lineTotal2, setLineTotal2] = useState(0);
  const [remarks, setRemarks] = useState("");

  const [totalPrice, setTotalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState(0);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Rewinding", value: "Rewinding" },
    { label: "Slitting", value: "Slitting" },
    { label: "In Stock", value: "In Stock" },
    { label: "Hold", value: "Hold" },
  ]);

  /*   const settingitemQty = (value) => {
    // console.log("in settingitemQty,remarks",remarks)
    setitemQty(value);
    currentItem.qty = value;
    allAddedItems.push(currentItem);
  }; */

  const handleJobType = (text) => {
    //  console.log(text);
    setJobType(text?.value);
    currentItem.jobType = text?.value;
  };

  const handleBasePriceInput = (text) => {
    if (!text) text = 0;

    setBasePrice(parseInt(text));
    currentItem.basePrice = parseInt(text);
    //  currentItem.price = parseInt(text);
    // setLineTotal(parseInt(text) + printedPrice + adjustmentPrice);
    // setTotalPrice(parseInt(text) + printedPrice + adjustmentPrice);
    // updateLineTotal();
  };
  const handleYardsFNmeInput = (text) => {
    //  if (!text) text = 0;
    // setYardsFNme(text);
    // currentItem.printedcost = parseInt(text);
    // setLineTotal(parseInt(text) + price + adjustmentPrice);
    // setTotalPrice(parseInt(text) + printedPrice + adjustmentPrice);
    // updateLineTotal();
  };

  const handleWidthFNmeInput = (text) => {
    if (!text) text = 0;
    // setAdjustmentPrice(parseInt(text));
    // setWidthFNme(text);
    //   currentItem.adjustmentPrice = parseInt(text);
    //  setLineTotal(parseInt(text) + price + printedPrice);
    //  setTotalPrice(parseInt(text) + printedPrice + adjustmentPrice);
    //  updateLineTotal();
  };
  const handlepcsPCartonInput = (val) => {
    //   console.log("in handleQuantityInput, qty:", va
    setpcsPCarton(val);
    currentItem.pcsPerCartons = val;

    // var totalQty = parseInt(val) * quantity;
    // setTotal(totalQty);
    // updateLineTotal();
  };
  const handleCartonsInput = (val) => {
    //  console.log("in handleQuantityInput, qty:", val);
    setCartons(parseInt(val));
    currentItem.cartons = parseInt(val);
    //  currentItem.qty = parseInt(val);
    //  updateLineTotal();
  };

  const handleTotalYardsInput = (val) => {
    setPrntedCost(val);
    //  console.log("in handleQuantityInput, qty:", val);
    //  setTotalYards(parseInt(val));
    // updateLineTotal();
    //let a=Cartons*pcsPCarton*Baseprice;

    //  currentItem.cartons = parseInt(val);
    //  currentItem.qty = parseInt(val);
    //  updateLineTotal();
  };

  const handlelineTotalInput = (val) => {
    //  console.log("in handleQuantityInput, qty:", val);
    setLineTotal(parseInt(val));
    //  currentItem.cartons = parseInt(val);
    //  currentItem.qty = parseInt(val);
    //  updateLineTotal();
  };

  const handleRemarksInput = (text) => {
    setRemarks(text);
    currentItem.ItemRemarks = text;
  };

  const updateLineTotal1 = () => {
    var totalQty = currentItem.qty * currentItem.pcsPerCartons;
    var totalPrice =
      currentItem.basePrice +
      currentItem.printedcost +
      currentItem.adjustmentPrice;

    // totalPrice = totalPrice - (totalPrice * currentItem.discount) / 100;

    // setTotalPrice(totalPrice);
    // console.log(totalQty, totalPrice);
    //  setLineTotal(parseInt(totalQty) * totalPrice);
    currentItem.lineTotal = parseInt(totalQty) * totalPrice;
    console.log(totalPrice, totalQty, "-------------------");
  };

  const updateLineTotal = () => {
    var numb = WidthFNme.match(/\d/g);
    numb = numb.join("");
    setWidthFNme(numb);

    var numb1 = YardsFNme.match(/\d/g);
    numb1 = numb1.join("");
    setYardsFNme(numb1);

    var numb2 = TotalYards.match(/\d/g);
    numb2 = numb2.join("");
    setTotalYards(numb2);

    // console.log(currentItem,"curentitem");
    if (Baseprice > 0) {
      if (YardsFNme <= 89) {
        let a = ((((Baseprice - 7.5) / 60) * YardsFNme + 7.5) / 48) * WidthFNme;
        let c = a;

        if (Prnted) {
          //   let c = a;
          c = c + 16;
          setLineTotal(c.toFixed(4));
          setPrntedCost(16);
          let tot1 =
            parseInt(c) * parseInt(Cartons) * parseInt(pcsPCarton) +
            parseInt(PrntedCost);
          setLineTotal2(tot1.toFixed(4));
          currentItem.price = c.toFixed(4);
        } else {
          //     alert("upper");
          let totLine = a + parseInt(PrntedCost);
          setLineTotal(totLine.toFixed(4));
          let tot = totLine * Cartons * pcsPCarton;
          //   tot = tot + PrntedCost;
          setLineTotal2(tot.toFixed(4));
          currentItem.price = totLine.toFixed(4);
        }
      } else if (YardsFNme >= 90) {
        var a1 = ((((Baseprice - 7.5) / 60) * YardsFNme + 9) / 48) * WidthFNme;
        var c1 = a1;

        if (Prnted) {
          c1 = c1 + 32;
          setPrntedCost(32);
          setLineTotal(c1.toFixed(4));
          let tot21 = c1 * Cartons * pcsPCarton + parseInt(PrntedCost);
          setLineTotal2(tot21.toFixed(4));
          currentItem.price = c1.toFixed(4);
        } else {
          let totLine2 = a1 + parseInt(PrntedCost);
          setLineTotal(totLine2.toFixed(4));

          //   setLineTotal(totLine2.toFixed(4));
          //     alert("here");
          let tot2 = totLine2 * Cartons * pcsPCarton;
          setLineTotal2(tot2.toFixed(4));
          currentItem.price = totLine2.toFixed(4);
        }
      }

      currentItem.pcsPerCartons = pcsPCarton;
      currentItem.cartons = Cartons;
      // currentItem.price = lineTotal;

      /*      let a = lineTotal * Cartons * pcsPCarton + PrntedCost;
      setLineTotal2(a.toFixed(2)); */
    } else {
      Alert.alert("Numeric Fields Are Must");
    }

    // console.log(currentItem);
    /*      var totalQty = currentItem.qty * currentItem.pcsPerCartons;
    var totalPrice =
      currentItem.basePrice +
      currentItem.printedcost +
      currentItem.adjustmentPrice;
    totalPrice = totalPrice - (totalPrice * currentItem.discount) / 100;
    setTotalPrice(totalPrice);
    // console.log(totalQty, totalPrice);
    setLineTotal(parseInt(totalQty) * totalPrice);
    currentItem.lineTotal = parseInt(totalQty) * totalPrice;  */
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

  const findToatal = () => {
    let reqYardsFromName = 100;
    let requiredWdthFromName = 200;
    let yards = 8;
    let baserate = 88;

    let a = baserate - (750 / 60) * reqYardsFromName;
    let b = (7.5 / 48) * requiredWdthFromName;

    if (yards < 89) {
      let c = a + b + 16;
    } else if (yards > 89 && yards < 1000) {
      let c = a + b + 32;
    }
  };

  const alterState = () => {
    if (!lineTotal > 0) {
      alert("All Fields Required");
    } else if (value == null) {
      alert("Job Type Required");
    }
    else {
      currentItem.id = 1; // index;
      currentItem.jobType = "Rewinding"; //jobType;
      currentItem.$id = Math.floor(Math.random() * 1000);
      //  currentItem.discount = 0;
       currentItem.PrntedCost = PrntedCost;

      currentItem.vatGourpSa = "S1";
      currentItem.itemName = name;
      // currentItem.totalPcs = currentItem.cartons * currentItem.qty;
      currentItem.lineTotal = pcsPCarton * Cartons * lineTotal;
      currentItem.totalPcs = Cartons * pcsPCarton;
      setCartItem([...cartItem, currentItem]);

      //  setVisible(!visible);
      console.log("cart data ", cartItem);
      navigation.goBack();
      Alert.alert("Success", "Item added to cart!", [{ text: "OK" }]);
    }
  };

  useEffect(() => {
    const a = currentItem.name.includes("Printed");
    setPrnted(currentItem?.name?.includes("Printed"));
    console.log(a, "string operator");

    console.log(currentItem, "---->");
    console.log(name, "---->");

    var numb = currentItem?.mm.match(/\d/g);
    numb = numb.join("");
    setWidthFNme(numb);

    var numb1 = currentItem?.yds.match(/\d/g);
    numb1 = numb1.join("");
    setYardsFNme(numb1);

    var numb2 = currentItem?.mic.match(/\d/g);
    numb2 = numb2.join("");
    setTotalYards(numb2);
    /* 
    setYardsFNme(currentItem?.yds);
    setWidthFNme(currentItem?.mm);
    setTotalYards(currentItem?.mic); */
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Item Detail Post"
      />
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
          <AppText style={styles.p6b}>
            Sale Price{/*: {currentItem.price} */}
          </AppText>
        </AppRow>

        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 30,
            flexDirection: "row",
          }}
        >
          <View style={{ width: "40%" }}>
            <AppText style={styles.p1}>Select Job Type</AppText>
          </View>
          <View
            style={{ width: "60%", marginTop: Platform.OS == "ios" ? 0 : -15 }}
          >
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="MODAL"
              onSelectItem={item => {
                handleJobType(item)
              }}
            />
          </View>
        </View>

        {/*       <RNPickerSelect
          //     style={{ inputAndroid: { color: "black" } }}
          placeholder={{
            label: "Select Job Type",
            value: null,
          }}
          onValueChange={(value) => handleJobType(value)}
          value={jobType}
          items={[
            { label: "Rewinding", value: "Rewinding" },
            { label: "Slitting", value: "Slitting" },
            { label: "In Stock", value: "In Stock" },
            { label: "Hold", value: "Hold" },
          ]}
        /> */}

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 5,
          }}
        >
          <View style={[styles.txtinputView, { width: "45%" }]}>
            <TextInput
              onChangeText={(text) => handleBasePriceInput(text)}
              keyboardType={"numeric"}
              value={Baseprice}
              placeholder="Base Price"
              style={{ paddingHorizontal: 0, height: 25 }}
            />
          </View>
          <View style={[styles.txtinputView, { width: "45%" }]}>
            <TextInput
              // multiline={true}
              onChangeText={(text) => handlepcsPCartonInput(text)}
              keyboardType={"numeric"}
              value={pcsPCarton}
              placeholder="Pcs/DznsPerCarton"
              style={{ paddingHorizontal: 0, height: 25 }}
            //   placeholderTextColor={colors.tertiary}
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 5,
          }}
        >
          <View style={[styles.txtinputView, { width: "45%" }]}>
            <TextInput
              // multiline={true}
              onChangeText={(value) => handleCartonsInput(value)}
              keyboardType={"numeric"}
              value={Cartons}
              placeholder="Cartons"
              style={{ paddingHorizontal: 0, height: 25 }}
            //   placeholderTextColor={colors.tertiary}
            />
          </View>

          <View style={[styles.txtinputView, { width: "45%" }]}>
            <TextInput
              //    editable={false}
              // multiline={true}
              onChangeText={(text) => handleTotalYardsInput(text)}
              keyboardType={"numeric"}
              value={PrntedCost}
              placeholder={PrntedCost?.toString()}
              style={{ paddingHorizontal: 0, height: 25 }}
            //   placeholderTextColor={colors.tertiary}
            />
          </View>
        </View>

        <View style={{ width: "95%", marginVertical: 5, marginHorizontal: 10 }}>
          <Text>Unit Price = Rs.{lineTotal}</Text>
        </View>

        <View style={{ width: "95%", marginVertical: 5, marginHorizontal: 10 }}>
          <Text>Line Total = Rs.{lineTotal2}</Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 50 }}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <TouchableOpacity
              style={styles.wrapper}
              //  onPress={() => navigation.goBack()}
              onPress={() => updateLineTotal()}
            >
              <AppButton
                //   cart
                newIconButton
                text="Calculate"
                iconName={require("../assets/cart.png")}
                containerStyle={styles.toppingsBtn}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.wrapper}
              onPress={() => alterState()}
            >
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
    </SafeAreaView>
  );
};

export default React.memo(ItemsListDetailScreen);

const styles = StyleSheet.create({
  wrapper: {},
  card1: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 10,
    // height: Platform.OS === "android" ? 290 : 290,
    // width: Platform.OS === "android" ? 160 : 185,
    marginBottom: 10,
    paddingHorizontal: 10,
    // justifyContent: "center",
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
