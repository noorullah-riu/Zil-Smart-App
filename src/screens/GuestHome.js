import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Image } from "react-native";
import colors from "../components/colors";
import AppHeader from "../components/AppHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CategoriesCard from "../components/CategoriesCard";

const GuestHome = ({ navigation }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [progressVisible, setprogressVisible] = useState(false);

  const [groups, setGroups] = useState([
    {
      id: "1",
      group: "Company",
      image: (
        <FontAwesome5 name="building" size={54} color={colors.secondary} />
      ),
    },

    {
      id: "2",
      group: "Catalog",
      image: (
        <MaterialIcons name="menu-book" size={54} color={colors.secondary} />
      ),
    },
    {
      id: "3",
      group: "Videos",
      image: (
        <MaterialCommunityIcons
          name="video-outline"
          size={54}
          color={colors.secondary}
        />
      ),
    },
    {
      id: "4",
      group: "Product Range",
      image: (
        <MaterialIcons name="category" size={54} color={colors.secondary} />
      ),
    },
  ]);

  useEffect(() => {}, []);

  const renderOrderList = () => {
    return (
      <FlatList
        numColumns={2}
        data={groups}
        columnWrapperStyle={styles.row}
        renderItem={({ item, index }) => {
          return (
            <CategoriesCard
              name={item.group}
              imagePath={item.image}
              navigation={navigation}
              id={item.id}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
    <View style={{height:"10%"}}>
      <AppHeader
            home
            backBtnOnly
            title="Back"
            bckBtnImg={require("../assets/menu.png")}
            navigation={navigation}
            headerTitle="Hi Tech Plastics Engineering"
          />
    </View>
       
 

      <View style={styles.bannerView}>
        <Image
          style={styles.tinyBanner}
          source={require("../assets/hiTechBanner.png")}
        />
      </View>

   <View style={{height:"55%", }}>
    {renderOrderList()}
   </View>
    </SafeAreaView>
  );
};

export default GuestHome;

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
  row: {
    flex: 1,
    
    alignSelf:"center",
  },
  tinyBanner: {
    flex:1,
    width: Platform.OS === "android" ? "100%" : "100%",
    height: Platform.OS === "android" ? "100%" : "100%",
    resizeMode: "contain",
    marginTop:0
  },
  bannerView:{
    paddingHorizontal:15,
    marginTop:10,
 
    height:"35%"

  }
});
