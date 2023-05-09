import React from 'react';
import { StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import AppText from './AppText';
import colors from "./colors";
import AppRow from './AppRow';
const OrderListCard = ({navigation,id,value,name,item,orderDate,deliveryDate, docEntry}) => {
    // console.log("docnum:",item)
    return (
        <View style={styles.card1}>
            {/* <TouchableOpacity onPress={ () => navigation.navigate("OrderDetail", {id,item})}> */}
            <TouchableOpacity onPress={ () => navigation.navigate("DrfatOrderDetail", {docEntry,item})}>
                <AppRow style={styles.row1}>
                    <AppText style={styles.p2}># {id}</AppText>
                    {/*<AppText  style={styles.p3}>{item.DocCurrency} <AppText style={styles.p3}>{item.DocCurrency ==="PKR" ? item.DocTotal : item.DocTotalFC}</AppText></AppText>*/}
                </AppRow>
                <AppRow style={styles.row1}>
                    <AppText style={styles.p4}>{name}</AppText>
                </AppRow>
                    <AppText style={styles.p6}>Order Date:     <AppText style={styles.p6b}>{orderDate}</AppText></AppText>
                    <AppText style={styles.p7}>Delivery Date: <AppText style={styles.p7b}>{deliveryDate}</AppText></AppText>
                    {/* <AppText style={styles.p7}>Doc Entry: <AppText style={styles.p7b}>{docEntry}</AppText></AppText> */}
                    <AppText style={styles.p6}>Remarks: <AppText style={styles.p6b}>{item.remarks}</AppText></AppText>
            </TouchableOpacity>
        </View>
    );
}

export default OrderListCard;

const styles = StyleSheet.create({
    card1:{
        backgroundColor:colors.white,
        padding:10,
        marginHorizontal:10,
        borderRadius:10,
        marginVertical:10,

    },

    row1:{
        justifyContent:"space-between",
        marginVertical:2,

    },
    row2:{
        marginVertical:2,

    },
    p2:{
        color:colors.white,
        fontWeight:"bold",
        backgroundColor:colors.secondary,
        paddingHorizontal:15,
        paddingVertical:4,
        borderRadius:5,
        fontSize: Platform.OS === "ios" ? 18 : 16,

    },
    p3:{
        color:colors.yellow,
        fontSize: Platform.OS === "ios" ? 18 : 16,
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
        color:colors.blue,
        fontSize:Platform.OS === "ios" ? 16 : 14,
    },
    p7:{

        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,
    },
    p7b:{
        color:colors.blue,
        fontSize:Platform.OS === "ios" ? 16 : 14,
    },
})
