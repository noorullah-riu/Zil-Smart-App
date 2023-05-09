import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Alert } from "react-native";
import colors from "../components/colors";
import Card3 from "../components/Card3";
import AppHeader from "../components/AppHeader";
import allCategoriesApi from "../api/groupOfItems";
import { ProgressDialog } from "react-native-simple-dialogs";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import { sosqContext } from "../context/SoSq";

const Categories = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [progressVisible, setprogressVisible] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const { preCategoriesRouteVal, setPreCategoriesRouteVal } = useContext(
    preCategoriesRouteContext
  );

  useEffect(() => {
    console.log("Categories", preCategoriesRouteVal);
    getAllCategories();
  }, []);
  const settingPreCategoriesRouteVal = () => {};
  const { setRouteVal } = useContext(sosqContext);
  const handleFilterButtonPress = () => {
    setBtnPressed((btnPressed) => !btnPressed);
  };
  const getAllCategories = async (code) => {
    setprogressVisible(true);

    const response = await allCategoriesApi.getGroupOfItems();
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the Categories list");
    if (response.data.data) {
      setCategoryList(
        response.data.data.filter((obj) => obj.Name !== "Select Item Group")
      );
    }
  };

  const renderCategoryList = () => {
    return (
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={categoryList}
        contentContainerStyle={{
          marginTop: 20,
          paddingBottom: 70,
        }}
        columnWrapperStyle={styles.row}
        renderItem={({ item, index }) => {
          return (
            <Card3
              name={item.name}
              imagePath={require("../assets/hiTechSq.png")}
              navigation={navigation}
              itemCode={item.code}
            />
          );
        }}
        keyExtractor={(item) => item.code}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="All Categories"
      />
      <ProgressDialog
        visible={progressVisible}
        title="Loading Data"
        message="Please wait..."
      />
      <View style={{ alignItems: "center" }}>{renderCategoryList()}</View>
    </SafeAreaView>
  );
};

export default Categories;
const styles = StyleSheet.create({
  container: {
    marginVertical: Platform.OS === "android" ? "13%" : "3%",
    marginHorizontal: Platform.OS === "android" ? 19 : 6,
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: "5%",
  },
  imgContainer: {
    backgroundColor: colors.primary,
    margin: "5%",
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: "10%",
  },
  img: {
    alignSelf: "center",
  },
  textContainer: {
    marginVertical: 8,
  },
  p: {
    color: colors.secondary,
    marginTop: 7,
    fontSize: 16,
    marginLeft: 20,
  },
  p1: {
    color: colors.yellow,
    fontSize: 18,
    marginLeft: 16,
  },
  toppingsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    height: 50,

    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 20,
  },
  row: {},
});
