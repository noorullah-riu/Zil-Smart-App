import React from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";

const ServiceCallStatusCard = ({
  navigation,

  item,
}) => {
  return (
    <View style={styles.card1}>
      <TouchableOpacity
        onPress={() => navigation.navigate("OrderDetail", { item })}
      >
        <AppRow style={styles.row1}>
          <AppText style={styles.p2}>{item.CardName}</AppText>
          <AppText style={styles.p3}>{item.Status}</AppText>
        </AppRow>
        <AppRow style={styles.row1}>
          <AppText style={styles.p4}>{item.Subject}</AppText>
        </AppRow>
        <AppText style={styles.p6}>
          Name: <AppText style={styles.p6b}>{item.ItemName}</AppText>
        </AppText>
        <AppText style={styles.p7}>
          Remarks: <AppText style={styles.p7b}>{item.remarks}</AppText>
        </AppText>

        {/* <AppText style={styles.p7}>
          Total: <AppText style={styles.p7b}>{item.DocTotal}</AppText>
        </AppText> */}
      </TouchableOpacity>
    </View>
  );
};
export default ServiceCallStatusCard;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  row1: {
    justifyContent: "space-between",
    marginVertical: 2,
  },
  row2: {
    marginVertical: 2,
  },
  p2: {
    color: colors.white,
    fontWeight: "bold",
    backgroundColor: colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
  p3: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 18 : 16,
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
    color: colors.blue,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
  p7: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
  p7b: {
    color: colors.blue,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
});
