import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "./colors";

const Card = ({ children, style }) => {
  const styleProp = Array.isArray(style)
    ? [styles.card, ...style]
    : [styles.card, style];
  return <View style={styleProp}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    
  },
});
