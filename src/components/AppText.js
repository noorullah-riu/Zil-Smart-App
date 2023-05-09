import React from "react";
import { Text, StyleSheet } from "react-native";

export default ({ children, style, ...rest }) => {
  const styleProp = Array.isArray(style)
    ? [styles.text, ...style]
    : [styles.text, style];
  return (
    <Text {...rest} style={styleProp}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
  },
});
