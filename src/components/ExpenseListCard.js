import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import { FontAwesome5, Foundation } from "@expo/vector-icons";

const ExpenseListCard = ({ itemObject }) => {
    return (
        <View style={styles.card1}>
            <AppRow style={{ justifyContent: "space-between", marginBottom: 10 }}>
                <AppRow>
                    <TouchableOpacity onPress={() => alert("Delete this")}>
                        <AppText style={styles.pD}>
                            Delete
                        </AppText>
                    </TouchableOpacity>
                </AppRow>
                <AppRow>
                    <TouchableOpacity onPress={() => alert("Update")}>
                        <AppText style={styles.pY}>
                            Update
                        </AppText>
                    </TouchableOpacity>
                </AppRow>
            </AppRow>

            <AppRow style={{ justifyContent: "space-between" }}>
                <AppRow>
                    <FontAwesome5 name="calendar-day" size={15} color={colors.tertiary} />
                    <AppText style={styles.p6}>{itemObject.date.slice(0, 10)}</AppText>
                </AppRow>
                <AppRow>
                    <Foundation name="dollar-bill" size={24} color={colors.tertiary} />
                    <AppText style={styles.p6}>{itemObject.docTotal}</AppText>
                </AppRow>
            </AppRow>
            <AppRow style={styles.row1}>
                <AppText style={styles.p0}>
                    Customer: <AppText style={styles.p6}>{itemObject.customerName}</AppText>
                </AppText>
            </AppRow>
            <AppRow style={styles.row1}>
                <AppText style={styles.p0}>
                    Payment Type: <AppText style={styles.p6}>{itemObject.paymentType}</AppText>
                </AppText>
                <AppText style={styles.p0}>
                    Cheque #: <AppText style={styles.p6}>{itemObject.checkNo}</AppText>
                </AppText>
            </AppRow>
            <AppRow style={styles.row1}>
                <AppText style={styles.p0}>
                    Remarks: <AppText style={styles.p6}>{itemObject.remarks}</AppText>
                </AppText>
            </AppRow>
        </View>
    );
};

export default ExpenseListCard;

const styles = StyleSheet.create({
    card1: {
        backgroundColor: colors.white,
        padding: 15,
        marginHorizontal: 8,
        borderRadius: 10,
        marginVertical: 8,
        marginBottom: 0,
    },

    row1: {
        justifyContent: "space-between",
        marginVertical: 5,
    },
    row2: {
        marginVertical: 2,
        justifyContent: "space-between",
    },
    p2: {
        color: colors.card_h2,
        // fontWeight: "bold",
        fontWeight: "normal",
    },
    p0: {
        color: colors.tertiary,
        fontWeight: "bold",
    },
    pD: {
        color: colors.tomato,
        fontWeight: "bold",
    },

    pY: {
        color: colors.yellow,
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
        marginLeft: 5,
    },
});
