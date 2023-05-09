import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";

const ClosedActivityCard = ({
  item,
}) => {
  return (
    <TouchableOpacity>
      <View style={styles.card1}>
        <AppRow style={styles.row1}>
          <AppText style={styles.p2}>Customer: {item.name}</AppText>
        </AppRow>
        <AppRow style={styles.row1}>
          <AppText style={styles.p4}>Date: {item.activityDate.slice(0, 10)}</AppText>
          <View>
            <AppText style={styles.p5}>Starts at: {item.startTimeInString}</AppText>
            <AppText style={styles.p5}>Ends at:   {item.endTimeInString}</AppText>
          </View>
        </AppRow>
        <AppText style={styles.p6}>Remraks: {item.remarks}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default ClosedActivityCard;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 0,
  },

  row1: {
    justifyContent: "space-between",
    marginVertical: 2,
  },
  p2: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  p3: {
    color: colors.yellow,
  },
  p4: {
    color: colors.black,
  },
  p5: {
    color: colors.card_h2,
  },
  p6: {
    color: colors.black,
  },
});
