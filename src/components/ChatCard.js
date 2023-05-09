import React from 'react';
import { StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import AppText from './AppText';
import colors from "./colors";
import AppRow from './AppRow';
import AppColumn from '../components/AppColumn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card5 = ({navigation, imagePath,name,code,balance,limit, item, messageDate, message, count}) => {
    const onPress = () => {
        
        console.log("start chating");
        navigation.navigate("ChatDetail",{imagePath});
    }

    const storeCustomerDetails = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@customer_Details', jsonValue)
        } catch (e) {
            console.log(e);
        }
      }
      
    return (

        <TouchableOpacity onPress={ () => onPress()}>
            <AppRow style={styles.card1}>
                <AppColumn style={{marginRight:15,width:"20%"}}>
                    <Image style={styles.img} source={imagePath} />
                </AppColumn>

                <AppColumn style={styles.col2}>

                     <AppRow style={styles.row1}>
                        <AppText  numberOfLines={1} style={styles.p2}>{name}</AppText>
                     </AppRow>

                     <AppRow style={styles.row2}>
                        <AppText  numberOfLines={1} style={styles.p4}>{message}</AppText>
                        
                     </AppRow>
            
                </AppColumn>

                <AppColumn style={{marginRight:0,width:"25%",}}>
                    <AppText style={styles.p3}>{messageDate}</AppText>
                    <View style={styles.unreadmsg}>
                            <AppText style={styles.p3a}>{count}</AppText>
                    </View>
                </AppColumn>

            </AppRow>  
        </TouchableOpacity>
         
    );
}

export default Card5;
const styles = StyleSheet.create({
    card1:{
        backgroundColor:colors.white,
        padding:10,
        marginHorizontal:10,
        borderRadius:10,
        marginVertical:5,
       
    },

    row1:{
        justifyContent:"space-between",
    
        
    },
    row2:{
        marginVertical:2,

        
    },
    p2:{
        color:colors.secondary,
        fontWeight:"bold",
        paddingVertical:4,
        fontSize: Platform.OS === "ios" ? 18 : 16,
     

    },
    p3:{
        color:colors.yellow,
        fontSize: Platform.OS === "ios" ? 14 : 16,
        fontWeight:"bold",
        marginBottom:10,

    },
    
    p4:{
        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,


    },
    p5:{
        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,

    },
    
    p6:{
      
        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,
        marginTop:5,
    },
    p6b:{
        color:colors.yellow,
        fontSize:Platform.OS === "ios" ? 16 : 14,
        fontWeight:"bold"
    },
    p7:{
      
        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,
    },
    p7b:{
        color:colors.yellow,
        fontSize:Platform.OS === "ios" ? 16 : 14,
        fontWeight:"bold"

    },
    img:{
        borderRadius:40,
        width:65,
        height:65,
    },
    unreadmsg:{
        backgroundColor:colors.tomato,
        borderRadius:15,
        width:25,
        height:25,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
       
    },
    p3a:{
        color:colors.white,
        fontSize: Platform.OS === "ios" ? 12 : 14,
       

    },
    col2:{
        marginRight:0,
        width: Platform.OS === "ios" ? "60%" : "55%",
        
    }
})