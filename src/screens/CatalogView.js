import React, {  useEffect } from "react";
import { StyleSheet, Dimensions,  } from "react-native";

import PDFReader from 'rn-pdf-reader-js'
const CatalogView = ({ navigation, route }) => {
  let catalogCode = route.params;

  useEffect(() => {}, []);

  return (
    <PDFReader
    source={{
      uri: catalogCode,
    }}
  />
  );
};

export default CatalogView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
