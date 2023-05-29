import React from "react";
import { StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";

const DailyRecCard = ({ item }) => {
  return (
    <AppRow style={styles.card1}>
      <AppText style={styles.p2}>{item.cardName}</AppText>
      <AppText style={styles.p4}>{item.invoiceTotal}</AppText>
      <AppText style={styles.p4}>{item.paidTotal}</AppText>
      <AppText style={styles.p4}>{item.totalBalance}</AppText>
    </AppRow>
  );
};

export default DailyRecCard;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
    marginBottom: 0,
  },
  p2: {
    color: colors.card_h2,
    fontWeight: "bold",
    fontSize: 12,
    width: "30%",
  },
  p3: {
    color: colors.card_h2,
    fontWeight: "bold",
    fontSize: 12,
    width: "24%",
  },
  p4: {
    color: colors.card_h2,
    fontWeight: "bold",
    fontSize: 12,
    width: "22%",
  },
});
