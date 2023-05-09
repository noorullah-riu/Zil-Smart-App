import React, { useState } from "react";
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import CatalogCard from "../components/CatalogCard";
import colors from "../components/colors";

const Catalog = ({ navigation }) => {
  const [catalog, setCatalog] = useState([
    {
      id: 0,
      name: "B-Series Catalouge Leshan",
      imagePath: require("../assets/B_Leshan.png"),
    },
    {
      id: 1,
      name: "Demaji Screw Barrel Catalogue",
      imagePath: require("../assets/DemajiScrewBarre.png"),
    },
    {
      id: 2,
      name: "HENGDA",
      imagePath: require("../assets/HENGDA.jpg"),
    },
    {
      id: 3,
      name: "HUARE",
      imagePath: require("../assets/HUARE.jpg"),
    },
    {
      id: 4,
      name: "SCR",
      imagePath: require("../assets/SCR.jpg"),
    },
    {
      id: 5,
      name: "K Series Leshan",
      imagePath: require("../assets/K_Series_leshan.jpg"),
    },
    {
      id: 6,
      name: "U Series Leshan",
      imagePath: require("../assets/U-Series.jpg"),
    },
    {
      id: 7,
      name: "Plastic Pipe and Profile Line Jinhu",
      imagePath: require("../assets/PPAPL.jpg"),
    },

    {
      id: 8,
      name: "Plastic Sheet and Board Line Jinhu",
      imagePath: require("../assets/Plastic_sheet_and_board_line_jinhu.jpg"),
    },

    {
      id: 9,
      name: "Screw and Barrel Jinhu",
      imagePath: require("../assets/Screw_and_barrel_jinhu.jpg"),
    },
    // {
    //   id: 10,
    //   name: "Latest YH80-2880",
    //   imagePath: require("../assets/YH802880.png"),
    // },
    {
      id: 10,
      name: "Mega Pet Blow Molding",
      imagePath: require("../assets/MegaPetBlowMoldingCatalouge-min.png"),
    },
    {
      id: 11,
      name: "Shangair Air Compressor",
      imagePath: require("../assets/ShangairAirCompressorCatalogue-min.png"),
    },
    {
      id: 12,
      name: "Yangsen",
      imagePath: require("../assets/Yangsen-min.png"),
    },
    {
      id: 13,
      name: "JOBO",
      imagePath: require("../assets/JOBO-min.png"),
    },
    {
      id: 14,
      name: "UWA Injection Molding Machines",
      imagePath: require("../assets/UWA-min.png"),
    },
  ]);
  const renderCatalogList = () => {
    return (
      <FlatList
        numColumns={2}
        data={catalog}
        columnWrapperStyle={styles.row}
        renderItem={({ item, index }) => {
          return (
            <CatalogCard
              name={item.name}
              imagePath={item.imagePath}
              navigation={navigation}
              catalogCode={item.id}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/back-button.png")}
        titleImg1="Back"
        styleImg1={{
          width: 45,
          height: 45,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/search.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}
        navigation={navigation}
        navigateTo="CustomersList"
        headerTitle="Catalog"
      />
      <View
        style={{
          alignItems: "center",
          marginLeft: 5,
          marginTop: 0,
          marginBottom: 80,
        }}
      >
        {renderCatalogList()}
      </View>
    </SafeAreaView>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    marginBottom: 25,
  },
  row: {
  },
});
