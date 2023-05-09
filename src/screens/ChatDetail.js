import React, { useState }from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from "react-native";
import AppText from '../components/AppText';
import AppHeader from '../components/AppHeader';
import colors from "../components/colors";

import AppRow from '../components/AppRow';

 const ChatDetail = ({navigation, route}) => {
   const {imagePath} = route.params;

     return (
         <View>
             <AppHeader title = "Johney & Jugnu" chatBtn imagePath = {imagePath} navigation = { navigation } />

         </View>
     );
 }
 
 export default ChatDetail;