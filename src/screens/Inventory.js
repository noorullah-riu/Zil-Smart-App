import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import colors from "../components/colors";
import { MaterialIcons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import AppText from "../components/AppText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sizes from "../components/sizes";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

import SaleReportCard from "../components/SaleReportCard";
import saleReportApi from "../api/saleReport";
import { ProgressDialog } from "react-native-simple-dialogs";
import InventoryReportCard from "../components/InventoryReportCard";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

import AppButton from "../components/AppButton";
import AppRow from "../components/AppRow";

const Inventory = ({ navigation, route }) => {
  const { code } = route.params;
  const [userId, setUserId] = useState({});
  const [progressVisible, setprogressVisible] = useState(false);
  const [reports1, setReports1] = useState([]);
  const [loading, setloading] = useState(false);
  const [dateView, setDateView] = useState(true);
  const [fromdate, setfromDate] = useState("");
  const [todate, settoDate] = useState("");
  const [name, setName] = useState("");
  const [openBal, setOpenBal] = useState(0);
  const [closeBal, setCloseBal] = useState(0);


  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const [isPickerShow2, setIsPickerShow2] = useState(false);
  const [date2, setDate2] = useState(new Date(Date.now()));

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
    console.log("------------", value.getFullYear());
    console.log("------------", value.getMonth());
    console.log("------------", value.getDate());

    var date = value.getDate(); //Current Date
    var month = value.getMonth() + 1; //Current Month
    var year = value.getFullYear(); //Current Year,.
    var today =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (date < 10 ? "0" + date : date);
    console.log("today", today);
    setfromDate(today);
    // handleDateChange(today);
  };

  const onChange2 = (event, value) => {
    setDate2(value);
    if (Platform.OS === "android") {
      setIsPickerShow2(false);
    }
    console.log("------------", value.getFullYear());
    console.log("------------", value.getMonth());
    console.log("------------", value.getDate());

    var date = value.getDate(); //Current Date
    var month = value.getMonth() + 1; //Current Month
    var year = value.getFullYear(); //Current Year,.
    var today =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (date < 10 ? "0" + date : date);
    console.log("today", today);
    settoDate(today);
    //handleDateChange(today);
  };

  const html = `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Jumbo Roll Batch Wise Status Report v1</title>
    <style type="text/css"> * {
        margin: 0;
        padding: 0;
        text-indent: 0;
    }

    .s1 {
        color: black;
        font-family: "Times New Roman", serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: underline;
        font-size: 19pt;
    }

    .s2 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10.5pt;
    }

    .s3 {
        color: black;
        font-family: "Times New Roman", serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10.5pt;
    }

    .h1 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 10.5pt;
    }

    .s4 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
    }

    .s5 {
        color: black;
        font-family: "Times New Roman", serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
    }

    p {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 7.5pt;
        margin: 0pt;
    }

    .s6 {
        color: black;
        font-family: "Times New Roman", serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 7.5pt;
    }

    .s7 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 8.5pt;
    }

    .s8 {
        color: black;
        font-family: "Times New Roman", serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8.5pt;
    }

    table, tbody {
        vertical-align: top;
        overflow: visible;
    }
    </style>
</head>
<body>
<p class="s1" style="padding-left: 274pt;text-indent: 0pt;text-align: center;">Batch Wise Stock Report</p>
<p style="text-indent: 0pt;text-align: left;"><br/></p>
<p class="s3" style="padding-top: 5pt;padding-left: 274pt;text-indent: 0pt;text-align: center;"><span
        class="s2">From</span> <span class="h1">20-Jun-22</span> <span class="s2">To</span> <span
        class="h1">20-Jun-22</span></p>
<p style="text-indent: 0pt;text-align: left;"><br/></p>
<p style="text-indent: 0pt;text-align: left;">RM000002</p>
<p style="text-indent: 0pt;text-align: left;">980mm<span class="s6"> </span>x<span class="s6"> </span>36mic<span
        class="s6"> </span>Orange</p>
<p style="padding-left: 6pt;text-indent: 0pt;text-align: left;">
<table style="border-collapse:collapse;margin-left:6.225pt" cellspacing="0">
    <tr style="height:18pt">
        <td style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt"
            bgcolor="#C0C0C0"><p class="s7"
                                 style="padding-top: 6pt;padding-left: 15pt;text-indent: 0pt;text-align: left;">
            Item<span class="s8"> </span>Code</p></td>
        <td style="width:98pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt"
            bgcolor="#C0C0C0"><p class="s7"
                                 style="padding-top: 6pt;padding-left: 43pt;text-indent: 0pt;text-align: left;">
            Batch<span class="s8"> </span>No</p></td>
        <td style="width:58pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt"
            bgcolor="#C0C0C0"><p class="s7"
                                 style="padding-top: 6pt;padding-left: 15pt;text-indent: 0pt;text-align: left;">Mfg<span
                class="s8"> </span>Date</p></td>
        <td style="width:57pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt"
            bgcolor="#C0C0C0"><p class="s7"
                                 style="padding-top: 6pt;padding-left: 11pt;text-indent: 0pt;text-align: left;">
            Opening</p></td>
        <td style="width:65pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt"
            bgcolor="#C0C0C0"><p class="s7"
                                 style="padding-top: 6pt;padding-left: 21pt;text-indent: 0pt;text-align: left;">
            Reciept</p></td>
        <td style="width:61pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt"
            bgcolor="#C0C0C0"><p class="s7"
                                 style="padding-top: 6pt;padding-left: 17pt;text-indent: 0pt;text-align: left;">
            Issue</p></td>
        <td style="width:65pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt"
            bgcolor="#C0C0C0"><p class="s7"
                                 style="padding-top: 6pt;padding-left: 17pt;text-indent: 0pt;text-align: left;">
            Closing</p></td>
        <td style="width:72pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt"
            bgcolor="#C0C0C0"><p class="s7"
                                 style="padding-top: 6pt;padding-left: 27pt;text-indent: 0pt;text-align: left;">
            Yards</p></td>
        <td style="width:83pt;border-top-style:solid;border-top-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt"
            bgcolor="#C0C0C0"><p class="s7"
                                 style="padding-top: 6pt;padding-left: 26pt;text-indent: 0pt;text-align: left;">
            Meters</p></td>
    </tr>
    <tr style="height:15pt">
        <td style="width:53pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt">
            <p class="s4" style="padding-top: 1pt;padding-right: 21pt;text-indent: 0pt;text-align: right;">1</p></td>
        <td style="width:218pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt">
            <p class="s4" style="padding-top: 2pt;padding-left: 13pt;text-indent: 0pt;text-align: left;">CHAWLA/15/10657<span
                    class="s5"> </span>-<span class="s5"> </span>107</p></td>
        <td style="width:58pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt">
            <p style="text-indent: 0pt;text-align: left;"><br/></p></td>
        <td style="width:57pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt">
            <p class="s4" style="padding-top: 2pt;padding-right: 6pt;text-indent: 0pt;text-align: right;">128.70</p>
        </td>
        <td style="width:65pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt">
            <p class="s4" style="padding-top: 2pt;padding-right: 5pt;text-indent: 0pt;text-align: right;">0.00</p></td>
        <td style="width:61pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt">
            <p class="s4" style="padding-top: 2pt;padding-right: 6pt;text-indent: 0pt;text-align: right;">0.00</p></td>
        <td style="width:65pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt">
            <p class="s4" style="padding-top: 2pt;padding-right: 6pt;text-indent: 0pt;text-align: right;">128.70</p>
        </td>
        <td style="width:72pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt">
            <p class="s4" style="padding-top: 1pt;padding-right: 5pt;text-indent: 0pt;text-align: right;">4,350.84</p>
        </td>
        <td style="width:83pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:2pt;border-right-style:solid;border-right-width:1pt">
            <p class="s4" style="padding-top: 1pt;padding-right: 16pt;text-indent: 0pt;text-align: right;">3,977.00</p>
        </td>
    </tr>
</table>
<table style="border-collapse:collapse;margin-left:6.225pt;margin-top: 10pt" cellspacing="0">
    <tr style="height:15pt">
        <td style="width:53pt">
            <p class="s4" style="padding-top: 1pt;padding-right: 21pt;text-indent: 0pt;text-align: right;"></p></td>
        <td style="width:218pt">
            <p class="s4" style="padding-top: 2pt;padding-left: 13pt;text-indent: 0pt;text-align: left;"></p></td>
        <td style="width:58pt">
            <p style="text-indent: 0pt;text-align: left;"><br/></p></td>
        <td style="width:57pt">
            <p class="s4" style="padding-top: 2pt;padding-right: 6pt;text-indent: 0pt;text-align: right;">0.00</p>
        </td>
        <td style="width:65pt">
            <p class="s4" style="padding-top: 2pt;padding-right: 5pt;text-indent: 0pt;text-align: right;">3,078.00</p></td>
        <td style="width:61pt">
            <p class="s4" style="padding-top: 2pt;padding-right: 6pt;text-indent: 0pt;text-align: right;">0.00</p></td>
        <td style="width:65pt">
            <p class="s4" style="padding-top: 2pt;padding-right: 6pt;text-indent: 0pt;text-align: right;">3,078.00</p>
        </td>
        <td style="width:72pt">
            <p class="s4" style="padding-top: 1pt;padding-right: 5pt;text-indent: 0pt;text-align: right;">32,820.00</p>
        </td>
        <td style="width:83pt">
            <p class="s4" style="padding-top: 1pt;padding-right: 16pt;text-indent: 0pt;text-align: right;">30,000.00</p>
        </td>
    </tr>
</table>
</html>`;

  const handleDateChange = (date) => {
    console.log("in handleDateChange", date);
    setfromDate(date);
  };
  const handleDateChange1 = (date) => {
    console.log("in handleDateChange", date);
    settoDate(date);
  };

  const DocDateSelectionView = () => (
    <>
            <Pressable
          onPress={() => setIsPickerShow(true)}
          style={{
            flexDirection: "row",
            marginTop: 20,
            borderColor: "#aaa",
            borderWidth: 1,
          }}
        >
          <View
            style={{
              marginHorizontal: sizes.base_margin,
              marginVertical: 0,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <AppText style={styles.p1}>From Date</AppText>
          </View>

          <View
            style={{
              marginTop: 0,
              flex: 1,
              backgroundColor: "#fff",
              height: 40,
              justifyContent: "center",
            }}
          >
            <View style={{}}>
              <AppText style={{ colors: "#555" }}>
                {/* {display()} */} {fromdate}
              </AppText>
            </View>
          </View>
        </Pressable>

        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={false}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}

        <View style={{ marginBottom: 20 }}>
          <Pressable
            onPress={() => setIsPickerShow2(true)}
            style={{
              flexDirection: "row",
              marginTop: 20,
              borderColor: "#aaa",
              borderWidth: 1,
            }}
          >
            <View
              style={{
                marginHorizontal: sizes.base_margin,
                marginVertical: 0,
                flex: 1,
                justifyContent: "center",
              }}
            >
              <AppText style={styles.p1}>To Date</AppText>
            </View>

            <View
              style={{
                marginTop: 0,
                flex: 1,
                backgroundColor: "#fff",
                height: 40,
                justifyContent: "center",
              }}
            >
              <AppText style={{ colors: "#555" }}>
                {/* {display()} */} {todate}
              </AppText>
            </View>
          </Pressable>

          {isPickerShow2 && (
            <DateTimePicker
              value={date2}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={false}
              onChange={onChange2}
              style={styles.datePicker}
            />
          )}
        </View>

{/*       <Vi
ew
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          alignContent: "center",
        }}
      >
        <View style={{ marginBottom: 0, width: "50%" }}>
          <AppText style={[styles.p1]}>Date From</AppText>
          <View>
            <DatePicker
              modal
              open={true}
              showIcon={false}
              style={{ width: "100%" }}
              date={fromdate}
              mode="date"
              placeholder=" Select date"
              format="yyyy-MM-DD"
              minDate="2000-01-01"
              confirmBtnText="Confirm"
              display="default"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  marginTop: 10,
                  marginBottom: 0,
                  borderColor: colors.light_grey,
                  backgroundColor: colors.white,
                  //   borderRadius: 10,
                  height: 50,
                  alignItems: "center",
                  //  paddingLeft: 10,
                  width: "100%",
                  marginHorizontal: 10,
                },
              }}
              onDateChange={(date) => {
                handleDateChange(date);
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 0, width: "50%" }}>
          <AppText style={[styles.p1]}>Date To</AppText>
          <View>
            <DatePicker
              showIcon={false}
              style={{ width: "100%" }}
              date={todate}
              mode="date"
              placeholder=" Select date"
              format="yyyy-MM-DD"
              minDate="2000-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  marginTop: 10,
                  marginBottom: 0,
                  borderColor: colors.light_grey,
                  backgroundColor: colors.white,
                  //   borderRadius: 10,
                  height: 50,
                  alignItems: "center",
                  //  paddingLeft: 10,
                  width: "100%",
                  marginHorizontal: 10,
                },
              }}
              onDateChange={(date) => {
                handleDateChange1(date);
              }}
            />
          </View>
        </View>


      </View> */}

      <View
        style={{
          marginVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "95%",
          alignContent: "center",
        }}
      >
        <View style={{ width: "50%", marginHorizontal: 5 }}>
          {/*    <TouchableOpacity onPress={() => getLedgerReport()}>
          <AppButton
            text="Get Ledger"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity> */}
          <TouchableOpacity onPress={() => getReport()}>
            <View style={styles.export}>
              <AppText
                style={{
                  alignSelf: "center",
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                Get Inventory
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%", marginHorizontal: 5 }}>
          <TouchableOpacity onPress={() => createAndSavePDF()}>
            <View style={styles.export}>
              <AppText
                style={{
                  alignSelf: "center",
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                Export Invoice
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  useEffect(() => {
    // getReport();
  }, []);

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserId(JSON.parse(jsonValue).id);
  };

  const getReport = async () => {
    if (fromdate == "" || todate == "") {
      alert("Date selecton is must");
    } else {
      setprogressVisible(true);
      const response = await saleReportApi.getInventoryReport(
        fromdate,
        todate,
        code
      );
      console.log("getSaleReport", response.data);
      if (response.data.data) {
        setReports1(response.data.data);
      } else Alert.alert("No record found.");
      setprogressVisible(false);
      if (!response.ok)
        return Alert.alert("Couldn't retrieve the Sales Report");
    }
  };
  const createAndSavePDF = async () => {
    if (reports1?.length == 0) {
      alert("No data to create report");
    } else {
      setloading(true);
      try {
        var htmlIn = html;
        const { uri } = await Print.printToFileAsync({
          html: html,
          base64: false,
        });
        if (Platform.OS === "ios") {
          await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
          // await Sharing.shareAsync(uri);
        } else {
          //   const downloadDir = SAF.getUriForDirectoryInRoot('Download');
          const permission = await MediaLibrary.requestPermissionsAsync();
          if (permission.granted) {
            const asset = await MediaLibrary.createAssetAsync(uri);
            const album = await MediaLibrary.getAlbumAsync("Download");

            if (album == null) {
              await MediaLibrary.createAlbumAsync("Download", asset, false);
            } else {
              await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }
          }
          setloading(false);
          navigation.navigate("PdfView", { uril: htmlIn });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const renderReport = () => {
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={reports1}
        renderItem={({ item, index }) => {
          return <InventoryReportCard item={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item.$id}
      />
    );
  };
  const ledgerHeader = () => (
    <>
      <View style={styles.r1}>
        <AppRow style={styles.textContainer}>
          <MaterialIcons
            name="account-box"
            size={22}
            color={colors.primaryBlue}
          />
          <AppText style={styles.p8}>{name}</AppText>
        </AppRow>
        <AppRow style={{ justifyContent: "space-between" }}>
          <AppRow style={styles.textContainer}>
            <AppText style={styles.p7}>Opening Balance: </AppText>

            <AppText style={styles.p6b}>{openBal}</AppText>
          </AppRow>
          <AppRow>
            <AppText style={styles.p7}>Closing Balance: </AppText>

            <AppText style={styles.p6b}>{closeBal}</AppText>
          </AppRow>
        </AppRow>
      </View>
      <AppRow style={styles.r1}>
        <AppText style={styles.p2}>DocNum</AppText>
        <AppText style={styles.p1_0}>Date</AppText>
        <AppText style={styles.p3}>Debit</AppText>
        <AppText style={styles.p4}>Credit</AppText>
        <AppText style={styles.p4}>Balance</AppText>
      </AppRow>
    </>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <AppHeader
          doubleBtn
          doubleBtnContainerStyle={{}}
          doubleBtnImg1={require("../assets/back-button.png")}
          titleImg1="Back"
          styleImg1={{
            width: Platform.OS === "ios" ? 35 : 38,
            height: Platform.OS === "ios" ? 35 : 38,
            marginLeft: 10,
          }}
          //      doubleBtnImg2={require("../assets/search.png")}
          /*      doubleBtnImg2Style={{
            width: 20,
            height: 20,
            marginRight: 27,
          }} */
          navigation={navigation}
          navigateTo="CustomersList"
          headerTitle="Inventory Report"
        />
      </View>
      <ProgressDialog
        visible={progressVisible}
        title="Loading"
        message="Please wait..."
      />
      <ProgressDialog
        visible={loading}
        title="Exportng pdf" //"Posting Data"
        message="Please wait..."
      />

      {dateView ? DocDateSelectionView() : null}
      {!dateView ? ledgerHeader() : null}
      {renderReport()}
    </SafeAreaView>
  );
};
export default Inventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    marginLeft: 37,
    marginVertical: 10,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
  },
  tabview: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  export: {
    color: colors.white,
    fontWeight: "bold",
    backgroundColor: colors.secondary,
    fontSize: 16,
    width: "90%",
    textAlign: "center",
    padding: 20,
    marginVertical: 10,
    alignSelf: "center",
  },
  header: {
    marginHorizontal: 20,
    marginTop: 15,
  },

  routeone: {
    backgroundColor: "#F1F1F1",
    flex: 1,
  },
  btngrp: {
    marginVertical: 15,
  },
  loginBtnStyle: {
    backgroundColor: colors.BLACK,
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.BLACK,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
  },
  loginBtnStyle1: {
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.BLACK,
    borderRadius: 5,
    marginVertical: 0,
    marginBottom: 0,
    marginHorizontal: 5,
  },
  customTxtStyle: {
    color: "#fff",
    fontSize: Platform.OS === "android" ? 16 : 20,
    alignSelf: "center",
    textAlign: "center",
    padding: 8,
  },
  customTxtStyle1: {
    color: colors.BLACK,
    fontSize: Platform.OS === "android" ? 16 : 20,
    alignSelf: "center",
    textAlign: "center",
    padding: 8,
  },
  filterView: {
    backgroundColor: colors.WHITE,
    borderColor: colors.BLACK,
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cartcontainer2: {
    marginTop: 15,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#ADB5BD",
    borderRadius: 7,
    marginHorizontal: 15,
    backgroundColor: colors.WHITE,
  },
  transactionsView: {
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#ADB5BD",
    borderRadius: 7,
    marginHorizontal: 15,
    backgroundColor: colors.WHITE,
  },
  cartcontainer3: {
    marginTop: 15,
    borderWidth: 1,
    paddingVertical: 10,
    borderColor: "#ADB5BD",
    borderRadius: 7,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  baseText: {
    fontSize: 14,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 5,
    textAlign: "center",
  },
  transactionText: {
    fontSize: 16,
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 5,
    textAlign: "center",
  },
  totalPayments: {
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  paymentName: {
    color: colors.ptext_grey,
    fontSize: 16,
  },
  paymentValue: {
    color: colors.BLACK,
    fontSize: 14,
  },
  key: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    width: 150,
  },
  value: {
    fontSize: 18,
    color: "#ADB5BD",
    textAlign: "center",
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ADB5BD",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: colors.white,
    marginBottom: 0,
    height: 100,
    marginVertical: 15,
  },

  container1: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#F1F1F1",
  },

  heading: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  header1: {
    height: 50,
    backgroundColor: colors.white,
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 50,
    backgroundColor: colors.white,
  },
  text: {
    textAlign: "center",
    fontWeight: "100",
    color: "black",
    fontSize: 16,
  },
  headingView: {
    marginTop: 25,
    // marginLeft: 16,
    marginHorizontal: 10,
    justifyContent: "space-between",
  },
  routetwo: {
    backgroundColor: "#F1F1F1",
    flex: 1,
  },

  p2: {
    fontWeight: "bold",
    fontSize: 16,
    width: "25%",
    alignSelf: "flex-start",
  },
  p3: {
    fontWeight: "bold",
    fontSize: 16,
    width: "25%",
    alignSelf: "flex-start",
  },

  r1: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ADB5BD",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ADB5BD",
    marginHorizontal: 20,
  },
  group: {},
  label: {
    color: colors.black,
    marginVertical: 5,
  },
  label1: {
    color: colors.black,
    marginTop: 37,
    marginVertical: 5,
  },
  inputfield: {
    backgroundColor: colors.light_grey,
    borderColor: colors.light_grey,
    borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    height: Platform.OS === "android" ? 50 : 55,
    borderRadius: 5,
    alignItems: "center",
  },
  bottomContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  image: {
    width: "100%",
    height: 75,
    justifyContent: "center",
  },

  h: {
    color: colors.secondary,
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  num: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
    width: "20%",
  },
  total: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: 18,
    width: "20%",
  },
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    // width: "60%",
  },
  date: {
    marginTop: 35,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  deliveryDateView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginRight: 20,
  },
  t1: {
    color: colors.default_grey,
  },
  t2: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  h1: {
    color: colors.new_black,
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
