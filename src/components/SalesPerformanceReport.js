import React from "react";
import { StyleSheet } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";

const SalesPerformanceReportCard = ({ item }) => {
  return (
    <AppRow style={styles.card1}>
      <AppText style={styles.p1}>{item.slpName}</AppText>
      <AppText style={styles.p3}>{item.totalCartons}</AppText>
      <AppText style={styles.p3}>{item.totalSales}</AppText>
      <AppText style={styles.p3}>{item.totalRecoveries}</AppText>
    </AppRow>
  );
};

export default SalesPerformanceReportCard;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
    marginBottom: 0,
  },
  p1: {
    color: colors.card_h2,
    fontWeight: "normal",
    width: "30%",
    fontSize: 12,
  },
  p3: {
    color: colors.card_h2,
    fontWeight: "normal",
    width: "23.3%",
    fontSize: 12,
  },
});
