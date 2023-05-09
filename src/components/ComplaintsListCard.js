import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AppColumn from "./AppColumn";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ComplaintsListCard = ({ item }) => {
 
  return (
    <View style={styles.card1}>
      <AppRow style={{ justifyContent: "space-between" }}>
        <AppRow>
          <FontAwesome5 name="file-invoice" size={15} color={colors.tertiary} />
          <AppText style={styles.p6}> {item.complaint_ID}</AppText>
        </AppRow>
        <AppRow>
          <MaterialCommunityIcons
            name="book-information-variant"
            size={16}
            color={colors.tertiary}
          />
          <AppText style={styles.p6}> {item.status}</AppText>
        </AppRow>
      </AppRow>
      <AppRow style={styles.row1}>
        <AppText style={styles.p0}>
          Technician Assigned:{" "}
          <AppText style={styles.p2}>{item.technician}</AppText>
        </AppText>
      </AppRow>
      <AppRow style={styles.row1}>
        <AppText style={styles.p0}>Machine_ID: </AppText>
        <AppText style={styles.p4}>{item.technician}</AppText>
      </AppRow>
      <AppRow style={styles.row1}>
        <AppText style={styles.p0}>
          Remarks: <AppText style={styles.p6}>{item.remarks}</AppText>
        </AppText>
      </AppRow>
    </View>
  );
};

export default ComplaintsListCard;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 15,
    marginHorizontal: 8,
    borderRadius: 10,
    marginVertical: 8,
    marginBottom: 0,
  },

  row1: {
    marginVertical: 2,
  },
  row2: {
    marginVertical: 2,
    justifyContent: "space-between",
  },
  p2: {
    color: colors.card_h2,
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
  p7: {
    color: colors.tertiary,
    fontWeight: "bold",
  },
});
