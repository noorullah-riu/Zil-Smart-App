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

const { width, height } = Dimensions.get("screen");


const HorizontalItemListCard = ({
  navigation,
  imagePath,
  name,
  id,
  client,
  url
}) => {
  const onPress = () => {
      console.log("in HorizontalItemListCard, url:",url,name)
   
    navigation.navigate("VideoView", {url, name}) 
  };

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.card1}>
        <Image style={styles.img} source={imagePath} />
        <AppText style={styles.p2}>{name}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalItemListCard;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 10,
    width: "100%",
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
  },

  row1: {
    justifyContent: "space-between",
   
  },
  row2: {
    marginVertical: 2,
  },
  p2: {
    color: colors.secondary,
    fontWeight: "bold",
  
    marginLeft: 10,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    flex: 1,
    flexWrap: "wrap",
    marginTop:5,
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
    margin: "5%",
    borderRadius: 10,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",

  },
  img: {
    width: 100,
    height: 70,
    resizeMode: "contain",
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
});
