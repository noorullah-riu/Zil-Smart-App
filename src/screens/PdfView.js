import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  Pressable,
} from "react-native";
import AppHeader from "../components/AppHeader";
import { ProgressDialog } from "react-native-simple-dialogs";
import { WebView } from "react-native-webview";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

//import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from "expo-file-system";

import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

const PdfView = ({ route, navigation }) => {
  const { uril } = route.params;
  const [loading, setloading] = useState(false);

  const createpdf = () => {
    // alert("function");
    printToFile();
  };
  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

  /*   const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  }; */

  const printToFile = async () => {
    setloading(true);
    const file = await Print.printToFileAsync({
      html: uril,
      base64: false,
    });
     await shareAsync(file.uri);
     setloading(false);
/*     const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      alert("Permission is must");
    } */
/* 
    const base64Data = "my base 64 data";

    try {
      await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        "fileName",
        "application/pdf"
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, file);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      throw new Error(e);
    } */


    /*    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      // return;
    } */
    /*   await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
     .then(({ uri }) => {
       console.log('Finished downloading to ', uri);
     })
     .catch(error => {
       console.error(error);
     });

 } */

    /*    await StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      fileName,
      "application/pdf"
    )
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      }); */
  };

  const printToFile2 = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    alert("File has been saved in device");
    // console.log("url htm ",uril);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Pressable
        onPress={() => createpdf()}
        style={{ backgroundColor: "#ddd", padding: 10,marginBottom:20 }}
      >
        <Text style={{ textAlign: "center" }}>Download pdf</Text>
      </Pressable>
      <WebView
        style={{ marginTop:0 }}
        // source={{ uri:uri }}
        source={{ html: uril }}
      />
      
      <ProgressDialog
        visible={loading}
        title="Sharing pdf" //"Posting Data"
        message="Please wait..."
      />
    </SafeAreaView>
  );
};

export default PdfView;

const styles = StyleSheet.create({});
