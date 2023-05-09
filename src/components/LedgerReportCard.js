import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AppColumn from "./AppColumn";
import { Ionicons } from "@expo/vector-icons";

const card1 = ({
  customer,
  salePerson,
  inv,
  date,
  itemCode,
  description,
  debit,
  credit,
  total,
  OpeningBalance,
}) => {
  useEffect(() => {
    // findLineTotal();
  }, []);

  const [initBal, setInitBal] = useState(parseInt(OpeningBalance));

  const findLineTotal = () => {
    const lineTotal =
      parseInt(debit) !== 0
        ? parseInt(OpeningBalance) + parseInt(debit)
        : parseInt(OpeningBalance) - parseInt(credit);
    setInitBal(lineTotal);
    console.log("lineTotal is", lineTotal);
    return lineTotal;
  };

  return (
    <AppRow style={styles.card1}>
          <AppText style={styles.p4}>{date.split("T")[0]}</AppText>
          <AppText style={styles.p4}>{inv}</AppText>
          <AppText style={styles.p4}>{debit}</AppText>
          <AppText style={styles.p4}>{credit}</AppText>
          <AppText style={styles.p4}>{total.toFixed(2)}</AppText>
    </AppRow>
  );
};

export default card1;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    paddingVertical:10,
    
    // marginHorizontal: 8,
    borderRadius: 10,
    marginVertical: 8,
    marginBottom: 0,
  },
  p4: {
    color: colors.card_h2,
    fontWeight: "normal",
    width:"20%",
    fontSize:12,
  },
});
