import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import colors from "../components/colors";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddActivity from "../screens/AddActivity";
import AllActivities from "../screens/AllActivities";
import Videos from "../screens/Videos";
import ProductRange from "../screens/ProductRange";
import Company from "../screens/Company";
import Catalog from "../screens/Catalog";
import Inquiries from "../screens/Inquiries";
import { Dimensions } from "react-native";
const { Navigator, Screen } = createDrawerNavigator();
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import GuestHome from "../screens/GuestHome";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';
import Categories from "../screens/Categories";

const AppDrawerNav1 = ({ navigation }) => {
  return (
    <Navigator
      drawerContent={CustomDrawer}
      screenOptions={{
        activeTintColor: colors.primary,
        activeBackgroundColor: colors.secondary,
        itemStyle: {
          width: "100%",
          marginLeft: 0,
        },
      }}
    >
      <Screen
        name="GuestHome"
        component={GuestHome}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={25} color={colors.secondary} />
          ),
          drawerLabel: "Home",
          headerShown: false,
        }}
      />

      <Screen
        name="Company"
        component={Company}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
           
            <FontAwesome5 name="building" size={25} color={colors.secondary} />

          ),
          drawerLabel: "Company",
          headerShown: false,
        }}
      />
      <Screen
        name="Catalog"
        component={Catalog}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            
            <MaterialIcons name="menu-book" size={25} color={colors.secondary} />

          ),
          drawerLabel: "Catalog",
          headerShown: false,
        }}
      />

      <Screen
        name="Videos"
        component={Videos}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
           
            <MaterialCommunityIcons name="video-outline" size={25} color={colors.secondary} />

          ),
          drawerLabel: "Videos",
          headerShown: false,
        }}
      />
      <Screen
        name="ProductRange"
        component={Categories}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
      
            <MaterialIcons name="category" size={25} color={colors.secondary} />

          ),
          drawerLabel: "ProductRange",
          headerShown: false,
        }}
      />
     
    </Navigator>
  );
};

const styles = StyleSheet.create({
  icon_next: {
    width: Platform.OS === "android" ? 20 : 25,
    height: Platform.OS === "android" ? 20 : 25,
    margin: 0,
  },
  icon_profile: {
    width: Platform.OS === "android" ? 22 : 24,
    height: Platform.OS === "android" ? 22 : 24,

  },
  icon_profile1: {
    width: Platform.OS === "android" ? 20 : 22,
    height: Platform.OS === "android" ? 26 : 29,
    marginRight: 3,
  },
  icon_profile2: {
    width: Platform.OS === "android" ? 17 : 22,
    height: Platform.OS === "android" ? 13 : 16,
    marginRight: 3,
  },
  icon_profile3: {
    width: Platform.OS === "android" ? 15 : 21,
    height: Platform.OS === "android" ? 19 : 26,


    marginRight: 3,
  },
  icon_voucher: {
    width: Platform.OS === "android" ? 25 : 30,
    height: Platform.OS === "android" ? 25 : 30,
    margin: 0,
  },
  allicon_size: {},
});
export default AppDrawerNav1;
