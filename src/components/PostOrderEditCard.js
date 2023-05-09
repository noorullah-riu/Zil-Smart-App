import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import AppColumn from "./AppColumn";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { addToCartContext } from "../context/addToCartContext";
const PostOrderEditCard = ({
  navigation,
  index,
  name,
  price,
  quantity,
  currentItem,
  findSubTotal,
  cartons,
  pcsPerDzn,
}) => {
  // console.log("selected item",currentItem)
  const [updatedQty, setUpdatedQty] = useState(quantity);

  const [updatedcartons, setUpdatedcartons] = useState(cartons);
  const [updatedpcsPerDzn, setUpdatedpcsPerDzn] = useState(pcsPerDzn);

  const [itemprice, setItemprice] = useState(price);
  const {cartItem, setCartItem} = useContext(addToCartContext);
  const [visible, setVisible] = useState(false);

  const handleAddQty = () => {
    let qty = updatedQty;
    qty = qty + 1;
    setUpdatedQty(qty);
  };

  const handleSubtractQty = () => {
    let qty = updatedQty;
    if (qty > 0) qty = qty - 1;
    setUpdatedQty(qty);
  };
  const onRemoveItem2 = (name) => {
    console.log("onRemoveItem called ::", currentItem);
    alert("Delete item ", name);
    // cartItem.splice(index, 1);
    // cartItem.filter((item) => item.ItemCode !== currentItem.ItemCode);
    // setCartItem(cartItem.filter((item) => item.ItemCode !== currentItem.ItemCode));
  };
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
             {
                text: "Update Quantity", onPress: () => {
                    setVisible(true)
                }
            }, 
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
            <AppText numberOfLines={1} style={styles.p2}>
              {currentItem.itemName}
            </AppText>
          </AppColumn>

          <AppColumn style={styles.c2}>
            <AppRow>
              <AppText style={styles.p6b}>{currentItem.pcsPerDzn*currentItem.cartons}</AppText>
            </AppRow>
          </AppColumn>

          <AppColumn style={styles.c4}>
            <AppText style={styles.p7b}>{currentItem.price}</AppText>
          </AppColumn>
          <AppColumn style={styles.c3}>
            <AppText style={styles.p8b}>{currentItem.pcsPerDzn*currentItem.cartons* currentItem.price}</AppText>
          </AppColumn>
          <AppColumn></AppColumn>
        </AppRow>
        {/*
      <AppRow>
        <AppText style={styles.remHeading}>Item Remarks: </AppText>
        <AppText multiline>{currentItem.ItemRemarks}</AppText>
      </AppRow> */}
      </TouchableWithoutFeedback>

      <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <AppText style={styles.modalheader}>UPDATE QUANTITY</AppText>
                        </View>
                        <View style={{marginHorizontal: 10, height: 80, justifyContent: 'center'}}>
                            <AppText>Enter Carton</AppText>
                            <TextInput placeholder={'Carton'} value={updatedcartons}
                                       onChangeText={(text) => setUpdatedcartons(text)} keyboardType={'numeric'}
                                       style={{
                                           marginTop: 10,
                                           width: '100%',
                                           borderRadius: 20,
                                           height: 30,
                                           borderWidth: 0.5,
                                           paddingHorizontal: 10,
                                           borderColor: colors.new_black,
                                           justifyContent: 'center'
                                       }}/>
                        </View>

                        <View style={{marginHorizontal: 10, height: 80, justifyContent: 'center'}}>
                            <AppText>Enter Pieces Per Carton</AppText>
                            <TextInput placeholder={'Pieces Per Carton'} value={updatedpcsPerDzn}
                                       onChangeText={(text) => setUpdatedpcsPerDzn(text)} keyboardType={'numeric'}
                                       style={{
                                           marginTop: 10,
                                           width: '100%',
                                           borderRadius: 20,
                                           height: 30,
                                           borderWidth: 0.5,
                                           paddingHorizontal: 10,
                                           borderColor: colors.new_black,
                                           justifyContent: 'center'
                                       }}/>
                        </View>
                        <View style={styles.footer}>
                            {/*<Pressable*/}
                            {/*    style={[styles.button, styles.buttonClose]}*/}
                            {/*    onPress={() => setVisible(!visible)}>*/}
                            {/*    <AppText style={styles.textStyle}>Cancel</AppText>*/}
                            {/*</Pressable>*/}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => updateItem(currentItem)}>
                                <AppText style={styles.textStyle}>Confirm</AppText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
    </View>
  );
};

export default PostOrderEditCard;
const styles = StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
content: {
    padding: 10,
},
footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
},
textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
},
modalText: {
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'white',
},
header: {
    height: 30,
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
},
modalheader: {
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
},

  container: {
    // flex:1,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginVertical: 2,
    // marginTop: 10,
    padding: 10,
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
    fontSize: Platform.OS === "ios" ? 12 : 12,
  },
  p3: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 18 : 14,
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
    // width: "20%",
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
    // textAlign: "center",
  },
  p7: {
    color: colors.tomato,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
  p7b: {
    // width: "40%",
    color: colors.tomato,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  p8b: {
    // width: "40%",
    color: colors.tomato,
    fontSize: Platform.OS === "ios" ? 16 : 14,
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
    width: "20%",
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
