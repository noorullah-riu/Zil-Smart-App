import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";

const FGInStockReport = ({
    customer,
}) => {
  useEffect(() => {
   //  findLineTotal();
  }, []);

 // const [initBal, setInitBal] = useState(parseInt(OpeningBalance));

  const findLineTotal = () => {
   /* const lineTotal =
       parseInt(debit) !== 0
        ? parseInt(OpeningBalance) + parseInt(debit)
        : parseInt(OpeningBalance) - parseInt(credit);
    setInitBal(lineTotal);
    console.log("lineTotal is", lineTotal);
    return lineTotal; */
  };

  return (
    <AppRow style={styles.card1}>
          <AppText style={styles.p2}>{customer.itemCode}</AppText>
          <AppText style={styles.p3}>{customer.itemName}</AppText>
          <AppText style={styles.p4}>{customer.inStock}</AppText>
    </AppRow>
  );
};

export default FGInStockReport;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    paddingVertical:10,
    
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
    color: colors.card_h2,
    fontWeight: "normal",
    width:"30%",
    // borderWidth:1,
    fontSize:12,
    // textAlign:"center"
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
    color: colors.card_h2,
    fontWeight: "normal",
    width:"50%",
    // borderWidth:1,
    fontSize:12,
    // textAlign:"center"
  },
 
  p5: {
    color: colors.tertiary,
  },
  p6: {
    color: colors.card_h2,
    fontWeight: "normal",
    width:"20%",
    // borderWidth:1,
    fontSize:12,
    // textAlign:"center"
  },
  p4: {
    color: colors.card_h2,
    fontWeight: "normal",
    width:"20%",
    // borderWidth:1,
    fontSize:12,
    // textAlign:"center"


  },
});
