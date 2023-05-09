import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import colors from "../components/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

function DrawerFooter({ navigation }) {
  const handlelogout = () => {
    console.log("in handlelogout");
    storeUserDetails();
    navigation.navigate("Splash");
  };
  const storeUserDetails = async (value) => {
    try {
      console.log("in login user daw:80, ken:85, pel:93");
      await AsyncStorage.clear().removeItem("@user_Details");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.footerContainer}>
 {/*      <TouchableOpacity
        style={{ flexDirection: "row", marginBottom: 20, margin                                                                                                                                                                                                                                                                                                 Left: 15 }}
      >
      
        <View style={{marginLeft:6, flexDirection:"row"}}>
        <Ionicons name="settings-outline" size={20} color={colors.secondary}  />
        <Text style={styles.text_footer1}>Settings</Text>
        </View>
       
      </TouchableOpacity> */}

      <TouchableOpacity
        style={{ flexDirection: "row", marginLeft: 17 }}
        onPress={() => handlelogout()}
      >
        <View style={{marginLeft:6, flexDirection:"row"}}>
        <MaterialIcons name="logout" size={20} color={colors.secondary}  />
        <Text style={styles.text_footer1}>Logout</Text>
        </View>
     
        
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default DrawerFooter;

const styles = StyleSheet.create({
  footerContainer: {
    marginBottom: Platform.OS === 'android' ? 20 : 10,
  },

  icon_exit: {
    width: 26,
    height: 25,
    marginLeft: 18,
    alignSelf: "center",
  },
  text_footer0: {
    fontSize: Platform.OS === "android" ? 16 : 18,
    fontWeight: Platform.OS === "android" ? "300" : "400",
    marginLeft: 15,
    color: colors.WHITE,
    marginVertical: Platform.OS === "android" ? 12 : 14,
  },
  text_footer1: {
    fontSize: 14,
    marginLeft: 22,
    color: colors.default_grey,
    alignSelf: "center",
  },
});
