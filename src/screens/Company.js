import React from "react";
import { WebView } from "react-native-webview";

import { View, Text } from "react-native";
const Company = () => {
  return (
    <WebView
      source={{
        uri: "https://hitech-machinery.com/",
      }}
      // style={{ marginTop: 1 }}
    />
  );
};

export default Company;


