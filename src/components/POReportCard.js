import React from "react";
import { StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";

const POReportCard = ({ item }) => {
  return (
    <AppRow style={styles.card1}>
      <AppText style={styles.p2}>{item.$id}</AppText>
      <AppText style={styles.p3}>{item.docNum}</AppText>
      <AppText style={styles.p4}>{item.cardName}</AppText>
      <AppText style={styles.p4}>{item.docDate}</AppText>
      <AppText style={styles.p4}>{item.docDueDate}</AppText>
    </AppRow>
  );
};

export default POReportCard;

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
    width: "10%",
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
