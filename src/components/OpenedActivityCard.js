import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";

const OpenedActivityCard = ({
  category,
  priority,
  time,
  company,
  type,
  itemObject,
  navigation,
  remarks,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UpdateActivity", { openedActivity: itemObject })
      }
    >
      <View style={styles.card1}>
        <AppRow style={styles.row1}>
          <AppText style={styles.p2}>Customer: {company}</AppText>
        </AppRow>
        <AppRow style={styles.row1}>
          <AppText style={styles.p4}>
            Date: {itemObject.activityDate.slice(0,10)}
          </AppText>
          <AppText style={styles.p5}>{time}</AppText>
        </AppRow>
        <AppText style={styles.p6} multiline>
          Remarks: {remarks}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default OpenedActivityCard;

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
    color: colors.card_h1,
  },
  p6: {
    color: colors.tertiary,
    width: "80%",
  },
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 60 : 70,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: "10%",
  },
});
