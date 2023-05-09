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
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import Categories from "../screens/Categories";
import Deliveries from "../screens/Deliveries_Sales";
import Feedback from "../screens/Feedback";
import Reports from "../screens/Reports";
import Complaint from "../screens/Complaint_User";
import { Entypo ,AntDesign} from "@expo/vector-icons";
import Deliveries_Customer from "../screens/Deliveries_Customer";
import CheckPayable from "../screens/CheckPayable";
import Reports1 from "../screens/Reports1";
import ServiceCallStatus from "../screens/ServiceCall";

const AppDrawerNav2 = ({ navigation }) => {
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
      {/* <Screen
        name="Deliveries"
        component={Deliveries_Customer}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={25} color={colors.secondary} />
          ),
          drawerLabel: "Deliveries",
          headerShown: false,
        }}
      /> */}
<Screen
        name="Home"
        component={Home}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={23} color={colors.secondary} />
          ),
          drawerLabel: "Home",
          headerShown: false,
        }}
      />
      <Screen
        name="Feedback"
        component={Feedback}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="building" size={25} color={colors.secondary} />
          ),
          drawerLabel: "Feedback",
          headerShown: false,
        }}
      />
      <Screen
        name="Reports"
        component={Reports1}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="menu-book"
              size={25}
              color={colors.secondary}
            />
          ),
          drawerLabel: "Reports",
          headerShown: false,
        }}
      />

      {/* <Screen
        name="Complaint"
        component={Complaint}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="emoji-sad" size={24} color={colors.secondary} />
          ),
          drawerLabel: "Complaint",
          headerShown: false,
        }}
      /> */}
      <Screen
        name="ServiceCallStatus"
        component={ServiceCallStatus}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="customerservice" size={24} color={colors.secondary} />
          ),
          drawerLabel: "Service Call",
          headerShown: false,
        }}
      />

      {/* <Screen
        name="Complaint"
        component={Complaint}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <Screen
              name="Complaint"
              component={Complaint}
              navigation={navigation}
              options={{
                drawerIcon: ({ color, size }) => (
                  <AntDesign
                    name="customerservice"
                    size={24}
                    color={colors.secondary}
                  />
                ),
                drawerLabel: "Sevice Call",
                headerShown: false,
              }}
            />
          ),
          drawerLabel: "Complaint",
          headerShown: false,
        }}
      /> */}
      {/* <Screen
        name="CheckPayable"
        component={CheckPayable}
        navigation={navigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5
              name="file-invoice-dollar"
              size={24}
              color={colors.secondary}
            />
          ),
          drawerLabel: "Check Payable",
          headerShown: false,
        }}
      /> */}
      {/*<Screen
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
      /> */}
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
export default AppDrawerNav2;
