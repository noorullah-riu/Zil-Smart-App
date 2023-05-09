import React from "react";
import { View, StyleSheet } from "react-native";

function AppColumn({ children, style }) {
  return (
      <View style={[style,styles.container]}>
          {children}
      </View>
  )
}

export default AppColumn;


const styles = StyleSheet.create({
  container:{
    flexDirection: "column",
    alignItems:"stretch",
    display:"flex"
  },
})