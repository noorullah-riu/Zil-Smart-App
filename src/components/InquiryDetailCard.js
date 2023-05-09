import React, {useState} from 'react';
import { StyleSheet,View, } from "react-native";
import AppText from './AppText';
import colors from "./colors";
import AppRow from './AppRow';
import AppColumn from './AppColumn';


const InquiryDetailCard = ({ name,quantity,navigation }) => {

    return (
            <AppRow style={styles.card1}>
                
                    <View style={styles.row1}>
                        <AppText multiline style={styles.p2}>{name}</AppText>
                    </View>

                        <AppText style={styles.p6b}>{quantity}</AppText>  

            
                
            </AppRow>  
         
    );
}

export default InquiryDetailCard;

const styles = StyleSheet.create({
    card1:{
        backgroundColor:colors.white,
        padding:10,
        marginHorizontal:20,
        borderRadius:10,
        marginVertical:10,
        height:50

    },

    row1:{
        width:"65%"
        
    },
    row2:{
        marginVertical:2,
        
    },
    p2:{
        color:"black",
        
        borderRadius:5,
        width:"60%",
        fontSize: Platform.OS === "ios" ? 16 : 16,

    },
    p3:{
        color:"black",
        fontSize: Platform.OS === "ios" ? 18 : 14,
        fontWeight:"bold",

    },
    p4:{
        color:colors.card_h2,
        fontWeight:"bold",
        fontSize:Platform.OS === "ios" ? 18 : 16,

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
        color:"black",

        width:"25%",
        fontSize:Platform.OS === "ios" ? 16 : 16,
        // fontWeight:"bold",
        textAlign:"center"
    },
    p7:{
      
        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,
    },
    p7b:{
        width:"35%",
        color:colors.yellow,
        fontSize:Platform.OS === "ios" ? 16 : 14,
        fontWeight:"bold"

    },
    img:{
        borderRadius:10,
        width:70,
        height:70,
    },
    c1:{
        // width:"55%"
    },
    c2:{
        width:"25%",
        flexDirection:"row",
        
    }, 
    c3:{
        width:"35%",
    }
})