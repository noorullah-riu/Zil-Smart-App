import React, {useEffect, useState} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import {FontAwesome5} from "@expo/vector-icons";
import AppColumn from "./AppColumn";


const InventoryReportCard = ({item, navigation}) => {
    console.log("in Sale Detail Card", item.docNum)
    return (
        <View style={styles.card1}>
            <AppRow style={styles.row1}>
                <AppText style={styles.p2}>{item.itemCode} : {item.itemName}</AppText>
            </AppRow>
            <AppRow style={styles.row1}>
                <AppText style={styles.p4}>Batch No: {item.batchNum}</AppText>
            </AppRow>
            <AppText style={styles.p6}>Order Date: <AppText
                style={styles.p6b}>{item.docDate.split(' ')[0]}</AppText></AppText>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppText style={styles.p7}>Opening: {item.qty_IN} </AppText>
                <AppText style={styles.p7}>Closing: {item.qty_OUT}</AppText>
                <AppText style={styles.p7}>Yards: {item.yards}</AppText>
                <AppText style={styles.p7}>Meters: {item.meters}</AppText>
            </View>
        </View>
    );
};

export default InventoryReportCard;

const styles = StyleSheet.create({
    card1: {
        backgroundColor: colors.white,
        padding: 15,
        // marginHorizontal: 8,
        borderRadius: 10,
        marginVertical: 8,
        marginBottom: 0,
    },

    row1: {
        //    justifyContent:"space-between",
        marginVertical: 2,
    },
    row2: {
        marginVertical: 2,
        justifyContent: "space-between",
    },
    p2: {
        color: colors.black,
        fontWeight: "bold",
    },
    p0: {
        color: colors.tertiary,
        fontWeight: "bold",
    },
    heading: {
        color: colors.secondary,
        fontWeight: "bold",
    },
    p3: {
        color: colors.yellow,
    },
    p4: {
        color: colors.card_h2,
        fontWeight: "normal",
    },
    p5: {
        color: colors.tertiary,
    },
    p6: {
        color: colors.card_h2,
        fontWeight: "normal",
    },
});
