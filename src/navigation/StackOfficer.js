import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import {View, Text, Image, StyleSheet, Platform} from "react-native";
import colors from "../components/colors";
import Home from "../screens/Home";
import Orders from "../screens/OrdersList";
import QuotationsList from "../screens/QuotationsList";

const {Navigator, Screen} = createDrawerNavigator();
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReportsManager from "../screens/ReportsManager";
// import { FontAwesome5 } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
import {
    FontAwesome5,
    MaterialCommunityIcons,
    AntDesign,
    Ionicons,
    Fontisto,
} from "@expo/vector-icons";
import Expenses from "../screens/Expenses";
import AddBusinessPartner from "../screens/AddBusinessPartner";
import AllActivities from "../screens/AllActivities";

{
    /* <FontAwesome5 name="luggage-cart" size={24} color="black" /> */
}
const StackOfficer = ({navigation}) => {
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
                name="Home"
                component={Home}
                navigation={navigation}
                options={{
                    drawerIcon: ({color, size}) => (
                        <AntDesign name="home" size={23} color={colors.secondary}/>
                    ),
                    drawerLabel: "Home Officer",
                    headerShown: false,
                }}
            />

            <Screen
                name="Orders"
                component={Orders}
                navigation={navigation}
                options={{
                    drawerIcon: ({color, size}) => (
                        <Fontisto
                            name="shopping-bag-1"
                            size={22}
                            color={colors.secondary}
                        />
                    ),
                    drawerLabel: "Orders",
                    headerShown: false,
                }}
            />
            <Screen
                name="QuotationsList"
                component={QuotationsList}
                navigation={navigation}
                options={{
                    drawerIcon: ({color, size}) => (
                        <MaterialCommunityIcons
                            name="file-document-edit-outline"
                            size={24}
                            color={colors.secondary}
                        />
                    ),
                    drawerLabel: "Quotations",
                    headerShown: false,
                }}
            />
             <Screen
                name="incoming"
                component={Expenses}
                navigation={navigation}
                options={{
                    drawerIcon: ({color, size}) => (
                        // <Image
                        // style = { styles.icon_profile3 }
                        // source={ require("../assets/quotation0.png") } />
                        <Ionicons
                            name="ios-documents-outline"
                            size={24}
                            color={colors.secondary}
                        />
                    ),
                    drawerLabel: "Incoming Payments",
                    headerShown: false,
                }}
            /> 
            <Screen
                name="AllActivities"
                component={AllActivities}
                navigation={navigation}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="clipboard-check-outline"
                            size={24}
                            color={colors.secondary}
                        />
                    ),
                    drawerLabel: "Activities",
                    headerShown: false,
                }}
            />
            <Screen
                name="businessPartner"
                component={AddBusinessPartner}
                navigation={navigation}
                options={{
                    drawerIcon: ({color, size}) => (
                        // <Image
                        // style = { styles.icon_profile3 }
                        // source={ require("../assets/quotation0.png") } />
                        <Ionicons
                            name="ios-documents-outline"
                            size={24}
                            color={colors.secondary}
                        />
                    ),
                    drawerLabel: "Business Partner",
                    headerShown: false,
                }}
            />
            <Screen
                name="Reports"
                component={ReportsManager}
                navigation={navigation}
                options={{
                    drawerIcon: ({color, size}) => (
                        // <Image
                        // style = { styles.icon_profile3 }
                        // source={ require("../assets/quotation0.png") } />
                        <Ionicons
                            name="ios-documents-outline"
                            size={24}
                            color={colors.secondary}
                        />
                    ),
                    drawerLabel: "Reports",
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
        width: Platform.OS === "android" ? 22 : 26,
        height: Platform.OS === "android" ? 22 : 26,
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
        // borderRadius:10,
    },
    icon_profile3: {
        width: Platform.OS === "android" ? 15 : 21,
        height: Platform.OS === "android" ? 19 : 26,
        // width: Platform.OS === 'android' ? 17 : 22,
        // height: Platform.OS === 'android' ? 10 : 16,

        marginRight: 3,
        // borderRadius:10,
    },
    icon_voucher: {
        width: Platform.OS === "android" ? 25 : 30,
        height: Platform.OS === "android" ? 25 : 30,
        margin: 0,
    },
    allicon_size: {},
});
export default StackOfficer;
