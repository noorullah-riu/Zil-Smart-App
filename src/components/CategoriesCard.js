import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";


const CategoriesCard = ({ navigation, name, imagePath, id }) => {
  

  const handlePress = () => {
   
      id === "1"
      ? navigation.navigate("Company")
      : null;
      id === "3"
      ? navigation.navigate("Videos")
      : null;
      id === "4"
      ? navigation.navigate("Categories")
      : null;

      id === "2"
      ? navigation.navigate("Catalog")
      : null;
  };
  useEffect(() => {
  }, []);
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View style={styles.card1}>
        <View style={styles.imgContainer}>{imagePath}</View>
        <View style={styles.textContainer}>
          <AppText style={styles.p}>{name}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({
  container: {
    
  
  },
  card1: {
    backgroundColor: colors.white,
    borderWidth:1,
    borderColor:colors.primary,
    height: Platform.OS === "android" ? 185 : "100%",
    width: Platform.OS === "android" ? 160 : 175,
   

  },
  imgContainer: {
   
    paddingHorizontal: 0,
    paddingTop:0,
    marginTop:0,
    justifyContent: "center",
    alignItems: "center",
    height: Platform.OS === "android" ? 105 : 110,

  },
  img: {
    alignSelf: "center",
    width: Platform.OS === "android" ? 21 : 35,
    height: Platform.OS === "android" ? 45 : 75,
  },
  textContainer: {
    alignSelf: "center",
  },
  p: {
    color: colors.secondary,
    marginVertical: 7,
    fontSize: Platform.OS === "android" ? 14 : 16,
    fontWeight:"bold",
  
    textAlign: "center",
  },
});
