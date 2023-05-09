import React from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";

const { width, height } = Dimensions.get("screen");
import { MaterialIcons } from "@expo/vector-icons";

const HorizontalItemCard = ({ navigation, imagePath, name, id, navPath }) => {
  const onPress = () => {
    // let route = "reports";
    console.log("navPath",navPath)
    {
      navigation.navigate(navPath, { myroute: name });
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <AppRow style={styles.card1}>
        <AppRow>
          <View style={styles.imgContainer}>{imagePath}</View>

          <AppText style={styles.p2}>{name}</AppText>
        </AppRow>

        <View style={{}}>
          <MaterialIcons
            name="arrow-forward-ios"
            size={24}
            color={colors.secondary}
          />
        </View>
      </AppRow>
    </TouchableOpacity>
  );
};

export default HorizontalItemCard;
const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: "space-between",
   padding:"3%"
  },

  row1: {
    justifyContent: "space-between",
    width: "68%",
  },
  row2: {
    marginVertical: 2,
  },
  p2: {
    color: colors.secondary,
    fontWeight: "bold",
marginLeft:5,
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
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
  },
  p7: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
  p7b: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
  },
  img: {
    borderRadius: 10,
    width: 70,
    height: 70,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: width,
    height: height,
  },
  imgContainer: {
    // margin: "5%",
    // marginHorizontal:5,
    borderRadius: 10,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
