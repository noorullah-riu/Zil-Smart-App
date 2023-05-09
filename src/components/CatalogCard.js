import React, { useContext, useEffect } from "react";
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

const CatalogCard = ({ navigation, name, imagePath, catalogCode }) => {
  const handlePress = () => {
    let fileSource = getPdfFile(catalogCode);
    fileSource = "http://110.38.56.6:44502/pdf/" + fileSource;
    console.log("in CatalogCard::", fileSource);
    navigation.navigate("CatalogView", fileSource.toString());
  };
  const getPdfFile = (id) => {
    let links = {
      0: "BSeriesCatalougeLeshan.pdf",
      1: "DemajiScrewBarrelCatalogue.pdf",
      2: "HENGDAcatalogue.pdf",
      3: "HUARECatalogue2021.pdf",
      4: "SCR.pdf",
      5: "KSeriesCatalougeleshan.pdf",
      6: "USeriesCatalougeleshan.pdf",
      7: "PlasticPipeAndProfileLineCatalogueJinhu.pdf",
      8: "PlasticSheetAndBoardLineCatalogueJinhu.pdf",
      9: "ScrewAndBarrelCatalogueJinhu.pdf",
      10: "MegaPetBlowMoldingCatalouge.pdf",
      11: "ShangairAirCompressorCatalogue.pdf",
      12: "Yangsen.pdf",
      13: "Jobo.pdf",
      14: "UWAlatestYH802880.pdf",
    };

    return links[id];
  };
  useEffect(() => {}, []);
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View style={styles.card1}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={imagePath} />
        </View>
        <View style={styles.textContainer}>
          <AppText style={styles.p}>{name}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CatalogCard;

const styles = StyleSheet.create({
  container: {
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 10,
    
    width: (screenWidth - 60) / 2,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
  imgContainer: {
    paddingHorizontal: 0,

    height: Platform.OS === "android" ? 105 : 110,
  },
  img: {
    alignSelf: "center",
    resizeMode: "contain",

    width: Platform.OS === "android" ? "100%" : "100%",
    height: Platform.OS === "android" ? "100%" : "100%",
  },
  textContainer: {
    height: 60,

    // alignSelf: "center",
    // paddingVertical: 20,
  },
  p: {
    color: colors.secondary,
    marginTop: 7,
    fontSize: Platform.OS === "android" ? 14 : 16,

    textAlign: "center",
  },
});
