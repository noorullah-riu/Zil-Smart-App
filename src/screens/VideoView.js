import * as ScreenOrientation from "expo-screen-orientation";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { WebView } from "react-native-webview";

const VideoView = ({navigation, route}) => {
    let {url}  = route.params;




    console.log("url",url)
  return (
    <WebView
      source={{
        uri: url,
      }}
      style={{ marginTop: 35 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  text: {
    marginTop: 36,
    marginBottom: 12,
  },
});

export default VideoView;


