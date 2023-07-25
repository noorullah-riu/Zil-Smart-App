import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";


const card1 = ({
  customer,
  debit,
  credit,
  overDueBalance,
  balance,
}) => {
  useEffect(() => {
    // findLineTotal();
  }, []);

  const [initBal, setInitBal] = useState(parseInt(balance));

  const findLineTotal = () => {
    const lineTotal =
      parseInt(debit) !== 0
        ? parseInt(balance) + parseInt(debit)
        : parseInt(balance) - parseInt(credit);
    setInitBal(lineTotal);
    console.log("lineTotal is", lineTotal);
    return lineTotal;
  };

  return (
    <AppRow style={styles.card1}>
        {/*   <AppText style={styles.p4}>{date.split("T")[0]}</AppText> */}
        <AppText style={styles.p4}>{customer}</AppText>
          <AppText style={styles.p4}>{balance}</AppText>
          <AppText style={styles.p4}>{debit}</AppText>
          <AppText style={styles.p4}>{credit}</AppText>
          <AppText style={styles.p4}>{overDueBalance}</AppText>
    </AppRow>
  );
};

export default card1;

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
  p4: {
    color: colors.card_h2,
    fontWeight: "normal",
    width:"20%",
    fontSize:12,
  },
});
