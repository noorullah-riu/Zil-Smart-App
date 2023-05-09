import React from "react";
import { View, StyleSheet } from "react-native";

function AppRow({ children, style }) {
  return (
      <View style={[style,styles.container]}>
          {children}
      </View>
  )
}

export default AppRow;


const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    alignItems:"center",
  },
})