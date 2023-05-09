import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AppText from "./AppText";
import Constants from "expo-constants";
import colors from "./colors";
import AppRow from "./AppRow";
import AppColumn from "./AppColumn";

const QuotationDetailCard = ({
  navigation,
  imagePath,
  name,
  price,
  quantity,
  currentItem,
  item,
}) => {
  return (
    <View style={styles.container}>
      <AppRow style={styles.card1}>
        <AppColumn style={styles.c1}>
          <View style={styles.row1}>
            <AppText multiline style={styles.p2}>
              {name}
            </AppText>
          </View>
        </AppColumn>

        <AppColumn style={styles.c2}>
          <AppRow>
            <AppText style={styles.p6b}>{quantity}</AppText>
          </AppRow>
        </AppColumn>

        <AppColumn style={styles.c3}>
          <AppText style={styles.p7}>
            <AppText style={styles.p7b}>{price}</AppText>
          </AppText>
        </AppColumn>
      </AppRow>
      <AppRow>
        <AppText style={styles.remHeading}>Item Remarks: </AppText>
        <AppText multiline>{item.ItemRemarks}</AppText>
      </AppRow>
    </View>
  );
};

export default QuotationDetailCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 10,
    marginHorizontal: 20,
    // borderRadius:10,
    marginTop: 10,
  },
  card1: {
    backgroundColor: colors.white,
    // padding: 10,
    // marginHorizontal: 20,
    borderRadius: 10,
    // marginVertical: 10,
    // height: 85,
  },

  row1: {
    justifyContent: "space-between",
    // width: "100%",
  },
  row2: {
    marginVertical: 2,
  },
  p2: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 16 : 14,

    paddingVertical: 4,
    borderRadius: 5,
    // width: "80%",
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
    // width: "35%",
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  p7: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
  p7b: {
    // width: "20%",
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
  },
  img: {
    borderRadius: 10,
    width: 70,
    height: 70,
  },
  c1: {
    width: "60%",
  },
  c2: {
    width: "20%",
    flexDirection: "row",
  },
  c3: {
    width: "20%",
  },
  remHeading: {
    color: colors.tomato,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
});
