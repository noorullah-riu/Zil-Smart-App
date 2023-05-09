import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AppColumn from "./AppColumn";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const UserServiceCallStatusCard = ({ item, navigation }) => {
  useEffect(() => {
    // findLineTotal();
    console.log("in UserServiceCallStatusCard", item);
  }, []);

  //   const [initBal, setInitBal] = useState(parseInt(OpeningBalance));

  //   const findLineTotal = () => {
  //     // console.log("findLineTotal::",parseInt(debit),parseInt(credit),parseInt(OpeningBalance));
  //     const lineTotal =
  //       parseInt(debit) !== 0
  //         ? parseInt(OpeningBalance) + parseInt(debit)
  //         : parseInt(OpeningBalance) - parseInt(credit);
  //     setInitBal(lineTotal);
  //     console.log("lineTotal is", lineTotal);
  //     return lineTotal;
  //   };
const showCustomerDetails = () => {
    let cardcode = item.CardCode;
    navigation.navigate("CustomerDetail", {cardcode})
}
  return (
    <View style={styles.card1}>
      <AppRow style={{ justifyContent: "space-between" }}>
        <AppRow>
          <FontAwesome5 name="file-invoice" size={15} color={colors.tertiary} />

          {/* <FontAwesome5 name="calendar-day" size={15} color={colors.tertiary} /> */}
          <AppText style={styles.p6}> {item.CardCode}</AppText>
        </AppRow>
        {/* <FontAwesome name="flag" size={15} color={colors.tertiary} /> */}
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => showCustomerDetails()}>
          <Ionicons name="person" size={15} color={colors.tertiary} />

          <AppText style={styles.p6}> {item.CardName}</AppText>
        </TouchableOpacity>
      </AppRow>

      {/* <AppRow style={styles.row1} onPress={() => console.log("here")}>
        <AppText style={styles.p0}>
          Customer: <AppText style={styles.p2}>{item.ItemName}</AppText>
        </AppText>
      </AppRow> */}

      <AppRow style={styles.row1}>
        <AppText style={styles.p0}>
          Item: <AppText style={styles.p2}>{item.ItemName}</AppText>
        </AppText>
      </AppRow>

      {/* <AppRow style={styles.row1}> */}
      {/* <AppText style={styles.p0}>
        Item Code: <AppText style={styles.p6}>{item.ItemCode}</AppText>
        </AppText> */}
      {/* </AppRow> */}
      <AppRow style={{ justifyContent: "space-between" }}>
        <AppRow style={styles.row1}>
          {/* <AppText style={styles.p0}>Call Type: </AppText> */}
          <MaterialCommunityIcons
            name="comment-question-outline"
            size={17}
            color={colors.tertiary}
          />
          <AppText style={styles.p4}> {item.ServiceCallType}</AppText>
        </AppRow>
        <AppRow>
          {/* <Ionicons name="person" size={15} color={colors.tertiary} /> */}
          <FontAwesome name="flag" size={15} color={colors.tertiary} />
          <AppText style={styles.p6}> {item.Status}</AppText>
        </AppRow>
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
  );
};

export default UserServiceCallStatusCard;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 15,
    // marginHorizontal: 8,
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
