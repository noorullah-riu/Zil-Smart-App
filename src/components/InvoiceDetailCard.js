import React, {useState} from "react";
import {
    StyleSheet,
    Image,
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import AppColumn from "./AppColumn";

const InvoiceDetailCard = ({item}) => {
    console.log("in OrderDetailCard", item.itemName)
    return (
        <View style={styles.container}>
            <AppRow>
                <AppColumn style={styles.c1}>
                    <AppText numberOfLines={2} style={styles.p2}>
                        {item.itemName ? item.itemName : item.itemCode}
                    </AppText>
                </AppColumn>

                <AppColumn style={styles.c2}>
                    <AppText style={styles.p6b}>{item.cartons == 0 ? item.totalPcs : item.cartons}</AppText>
                </AppColumn>
                <AppColumn style={styles.c3}>
                    <AppText style={styles.p7b}>{parseFloat(item.price).toFixed(2)}</AppText>
                </AppColumn>
                <AppColumn style={styles.c3}>
                    <AppText style={styles.p7b}>{parseFloat(item.price * item.totalPcs).toFixed(2)}</AppText>
                </AppColumn>
            </AppRow>
        </View>
    );
};

export default InvoiceDetailCard;
const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: colors.white,
        marginHorizontal: 5,
        marginVertical: 2,
        padding: 10,
    },
    card1: {},
    card2: {},

    row1: {
        justifyContent: "space-between",
        width: "100%",
    },
    row2: {
        marginVertical: 2,
    },

    p3: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 18 : 14,
        fontWeight: "bold",
    },
    p4: {
        color: colors.card_h2,
        fontWeight: "bold",
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p5: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },

    p6: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        marginTop: 5,
    },
    p6b: {
        color: colors.yellow,
        // width: "20%",
        fontSize: Platform.OS === "ios" ? 14 : 14,
        fontWeight: "bold",
        textAlign: "center",
        alignItems: "center"
    },
    p7: {
        color: colors.tomato,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },
    p7b: {
        // width: "40%",
        color: colors.tomato,
        fontSize: Platform.OS === "ios" ? 14 : 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    p8b: {
        // width: "40%",
        color: colors.tomato,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
        textAlign: "right",
    },

    img: {
        borderRadius: 10,
        width: 70,
        height: 70,
    },
    c1: {
        width: "40%",
        // borderWidth:1
    },
    c2: {
        width: "20%",
        flexDirection: "row",
        marginLeft: 3
        // borderWidth:1
    },
    c3: {
        width: "20%",
        // borderWidth:1
    },
    c4: {
        width: "20%",
        // borderWidth:1
    },
    deliveryDateView: {
        // backgroundColor: colors.white,
        paddingVertical: 15,
        // marginRight: 20,
    },
    remHeading: {
        color: colors.primaryBlue,
        // fontWeight: "bold",
        fontSize: Platform.OS === "ios" ? 12 : 12,
        fontWeight: "bold",

    },
    p2: {
        color: colors.primaryBlue,
        fontWeight: "bold",

        paddingVertical: 4,
        borderRadius: 5,
        // width: "80%",
        fontSize: Platform.OS === "ios" ? 12 : 12,
    },
});
