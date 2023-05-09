import React from "react";
import { StatusBar, View, StyleSheet, SafeAreaView } from "react-native";
import colors from "./components/colors";
import MainNav from "./navigation/MainNav";

const MyApp = () => {
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <>
      <View>
        <MyStatusBar
          backgroundColor={colors.secondary}
          barStyle="light-content"
        />
      </View>
      <MainNav />
    </>
  );
};

export default MyApp;

const styles = StyleSheet.create({
  container: {},
  statusBar: {},
});
