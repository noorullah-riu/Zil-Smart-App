import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from './AppText';
import colors from "./colors";
import AppRow from './AppRow';
import AppColumn from './AppColumn';
import { EvilIcons } from '@expo/vector-icons';

const InquiryDetailCard = ({navigation, imagePath,name, price, quantity, currentItem}) => {
    
        const [updatedQty, setUpdatedQty ]= useState(quantity);
   
        const handleAddQty = () => {
            let qty = updatedQty;
            qty = qty+1;
            setUpdatedQty(qty)
        }
    
        const handleSubtractQty = () => {
            let qty = updatedQty;
            if(qty > 0) qty = qty - 1;
            setUpdatedQty(qty)

        }

    return (
            <AppRow style={styles.card1}>
                
                <AppColumn style={styles.c1}>
                    <View style={styles.row1}>
                        <AppText numberOfLines={1} style={styles.p2}>{name}</AppText>
                    </View>
                </AppColumn>

                <AppColumn style={styles.c2}>
                    <AppRow>

                        <TouchableOpacity onPress={() => handleSubtractQty()} >
                            <EvilIcons name="minus" size={26} color={colors.card_h2} />
                        </TouchableOpacity>

                        <AppText style={styles.p6b}>{updatedQty}</AppText>

                        <TouchableOpacity onPress={() => handleAddQty()} >
                        <EvilIcons name="plus" size={26} color={colors.card_h2} />

                        </TouchableOpacity>

                    </AppRow>
                </AppColumn>

                
                
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
        height:75
       
    },

    row1:{
        justifyContent:"space-between",
        width:"100%"
        
    },
    row2:{
        marginVertical:2,
        
    },
    p2:{
        color:colors.secondary,
        fontWeight:"bold",
       
        paddingVertical:4,
        borderRadius:5,
        width:"80%",
        fontSize: Platform.OS === "ios" ? 18 : 14,

    },
    p3:{
        color:colors.yellow,
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
        color:colors.yellow,
        width:"20%",
        fontSize:Platform.OS === "ios" ? 16 : 14,
        fontWeight:"bold",
        textAlign:"center"
    },
    p7:{
      
        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,
    },
    p7b:{
        width:"20%",
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
        width:"70%"
    },
    c2:{
        width:"30%",
        flexDirection:"row"
    }, 
    c3:{
        width:"15%"
    }
})