import React from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";

const { width: screenWidth } = Dimensions.get("window");
const imageWidthHeight = (screenWidth - 60) / 2 - 20;

const card1 = ({ navigation, name, imagePath, itemCode }) => {
  // console.log("in card3", itemCode);
  return (
    <TouchableOpacity
      // navigation.navigate("ItemDetailList", { itemGroupCode, itemCode });
      onPress={() =>
        navigation.navigate("ItemDetailList", { itemGroupCode: itemCode })
      }
    >
      <View style={styles.card1}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={imagePath} resizeMode="contain" />
        </View>
        <View style={styles.textContainer}>
          <AppText style={styles.p} multiline={true}>
            {name}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default card1;

const styles = StyleSheet.create({
  container: {},

  card1: {
    backgroundColor: colors.white,
    width: (screenWidth - 60) / 2,

    marginBottom: 20,
    marginHorizontal: 10,
    // marginVertical:10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  imgContainer: {
    borderRadius: 40,
    paddingHorizontal: 0,

    height: Platform.OS === "android" ? 105 : 110,
  },
  img: {
    resizeMode: "contain",
    alignSelf: "center",

    width: Platform.OS === "android" ? "100%" : "100%",
    height: Platform.OS === "android" ? "100%" : "100%",
  },
  textContainer: {
    height: 60,
  },
  p: {
    color: colors.black,
    marginTop: 5,
    marginBottom: 5,
    fontSize: Platform.OS === "android" ? 14 : 16,
    textAlign: "center",
  },
});
