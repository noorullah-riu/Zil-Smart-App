import React from "react";
import { View, ScrollView, StyleSheet, Image, Platform } from "react-native";
import { DrawerItemList } from "@react-navigation/drawer";

import colors from "../components/colors";
import DrawerFooter from "../components/DrawerFooter";
import AppText from "../components/AppText";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomDrawer = (props) => {
  return (
    <View style={styles.maincontainer}>
      <ScrollView style={{ paddingBottom: 0 }}>
        <View
          style={{
            // borderWidth: 1,
            // marginVertical:10,
            // marginTop:55,
            // padding: 0,
            // margin: 0,x
            justifyContent: "center",
          }}
        >
          <Image
            style={styles.icon_next}
            source={require("../assets/logo.png")}
          />
        </View>

        <View>
          <AppText style={styles.h1}>We make things perfect</AppText>
        </View>
        <View
          style={{
            borderBottomColor: colors.light_grey,
            borderBottomWidth: 1,
            marginBottom: 15,
          }}
        />
        <View style={{ margin: 0, padding: 0 }}>
          <DrawerItemList {...props} />
        </View>
      </ScrollView>
      <DrawerFooter navigation={props.navigation} />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 0,
    padding: 0,
  },
  header: {
    marginTop: Platform.OS === "android" ? 16 : 60,
    marginBottom: 0,
  },
  icon_next: {
    width: Platform.OS === "android" ? 100 : 140,
    height: Platform.OS === "android" ? 100 : 140,
    alignSelf: "center",
    resizeMode: "contain",
    // marginVertical:30,
    marginTop: 50,
    marginBottom: 20,
  },
  h1: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 17,
    fontWeight: "bold",
    color: colors.secondary,

    marginBottom: Platform.OS === "ios" ? 15 : 15,
  },
});
//
