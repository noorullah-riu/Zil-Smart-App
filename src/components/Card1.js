import React from 'react';
import { StyleSheet,View,} from "react-native";
import AppText from './AppText';
import colors from "./colors";
import AppRow from './AppRow';
const card1 = ({category,priority,time,company,type}) => {
    return (
        <View style={styles.card1}>

                <AppRow style={styles.row1}>
                    <AppText style={styles.p2}>{category}</AppText>
                    <AppText  style={styles.p3}>{priority}</AppText>
                </AppRow>
                <AppRow style={styles.row1}>
                    <AppText style={styles.p4}>{company}</AppText>
                    <AppText style={styles.p5}>{time}</AppText>
                </AppRow>
                <AppText style={styles.p6}>{type}</AppText>
                
         </View>
    );
}

export default card1;

const styles = StyleSheet.create({
    card1:{
        backgroundColor:colors.white,
        padding:15,
        marginHorizontal:10,
        borderRadius:10,
        marginVertical:10,
        marginBottom:0
    },

    row1:{
        justifyContent:"space-between",
        marginVertical:2,
        
    },
    p2:{
        color:colors.secondary,
        fontWeight:"bold",

    },
    p3:{
        color:colors.yellow,

    },
    p4:{
        color:colors.card_h1,

    },
    p5:{
        color:colors.tertiary
    },
    p6:{
        color:colors.card_h2,
    },
})