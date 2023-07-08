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

  const html1 = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device width,initial scale =1.0" />
      <meta name="keywords" content="HTML,CSS" />
      <meta name="description" content="....." />
  
      <title>Bp Ledger Report (ZIL)</title>
      <style>
        h1 {
          color: black;
          font-family: Calibri, sans-serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 22pt;
        }
        .s1 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 11.5pt;
        }
        .s2 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: 700;
          text-decoration: none;
          font-size: 10pt;
        }
        .s21 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: 100;
          padding-left: 136pt;
          text-align: left;
          text-decoration: none;
          font-size: 10pt;
        }
        .s22 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: 100;
          padding-left: 133pt;
          text-align: left;
          text-decoration: none;
          font-size: 10pt;
        }
        .s23 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: 100;
          padding-left: 116pt;
          text-align: left;
          text-decoration: none;
          font-size: 10pt;
        }
        .s24 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: 100;
          padding-left: 178pt;
          text-align: left;
          text-decoration: none;
          font-size: 10pt;
        }
        .s25 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: 100;
          padding-left: 156pt;
          text-align: left;
          text-decoration: none;
          font-size: 10pt;
        }
        .s3 {
          color: black;
          font-family: Calibri, sans-serif;
          font-style: normal;
          font-weight: bold;
          text-decoration: none;
          font-size: 8pt;
        }
        .s4 {
          color: black;
          font-family: "Times New Roman", serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 8pt;
        }
        img {
          width: 150px;
          height: 150px;
          float: left;
          margin-left: 50px;
          margin-right: 30px;
          margin-top: 50px;
        }
  
        .t3 {
          color: black;
          font-family: Calibri, sans-serif;
          font-style: normal;
          font-weight: bold;
          font-size: 10pt;
          margin-left: 20px;
          margin-right: 20px;
        }
      </style>
    </head>
  
    <body>
      <!-- HEADER PART -->
  
      <img
      style="
      height:100px;
      width:200px;
      "
        src="http://192.168.1.8:5555/Content/34234.PNG"
        alt="logo"
      />
      <u>
        <p
          style="
            text-align: center;
            padding-right: 200px;
            font-size: 20px;
            font-weight: 800;
            padding-top: 40px;
          "
        >
          A Project Of Zakori Group
        </p>
        <h2 style="text-align: center; padding-right: 200px">
          ZAKORI INDUSTRIES (PVT) LIMITED,PAKISTAN
        </h2>
        <h3 style="text-align: center; padding-right:0px">
          LEADER IN ALL KIND OF SELF ADHESIVE TAPES
        </h3>
      </u>
      <h2
        style="
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          margin-top: 50px;
        "
      >
        Batch Wise Stock Report
      </h2>

    <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

    <!-- Table PART -->
    <table
      style="
        border-collapse: collapse;
        margin-top: 60px;
        margin-left: 50px;
        margin-right: 50px;
        width: 90%;
      "
      cellspacing="0"
    >
      <tr style="height: 4pt; background-color: gainsboro">
        <td
          style="
            width: 10%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 4pt; text-align: center"> No#</p>
        </td>
        <td
          style="
            width: 20%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 2pt; text-align: center">
          Item Name
          </p>
        </td>
        <td
          style="
            width: 10%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 2pt; text-align: center">
          Date
          </p>
        </td>
        <td
          style="
            width: 12%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 4pt; text-align: center">Opening</p>
        </td>
        <td
          style="
            width: 12%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 3pt;
              text-align: center;
            "
          >
          Reciept
          </p>
        </td>

        <td
          style="
            width: 10%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 4pt; text-align: center">
          Issue
          </p>
        </td>
        <td
          style="
            width: 10%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 4pt; text-align: center">
          Closing
          </p>
        </td>
        <td
          style="
            width: 18%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 20pt; text-align: center">
          Yards
          </p>
        </td>

        <td
        style="
          width: 18%;
          border-top-style: solid;
          border-top-width: 1pt;
          border-left-style: solid;
          border-left-width: 1pt;
          border-bottom-style: solid;
          border-bottom-width: 1pt;
          border-right-style: solid;
          border-right-width: 1pt;
        "
      >
        <p class="s3" style="padding-right: 20pt; text-align: center">
        Meters
        </p>
      </td>
      </tr>

 `;

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

  const [html2, setHtml2] = useState(``);

  const createAndSavePDF = async () => {
    setloading(true);
    try {
      var htm = html1 + html2;
      //  console.log("HTML => ", html2);
      const { uri } = await Print.printToFileAsync({
        html: html1 + html2,
        base64: false,
      });
      if (Platform.OS === "ios") {
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
        await Sharing.shareAsync(uri);
      } else {
        setloading(false);
        navigation.navigate("PdfView", { uril: htm });
      }
    } catch (error) {
      console.error(error);
    }
  };
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
        var html = ``;

        response.data?.data?.map((item) => {
          html =
            html +
            `
        <tr style="height: 4pt">
        <td
          style="
            width: 10%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 4pt; text-align: center">
          ${item.$id}
          </p>
        </td>
        <td
          style="
            width: 20%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 2pt; text-align: center">${item.itemName}</p>
        </td>
        <td
          style="
            width: 10%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 2pt; text-align: center">
          ${item.docDate}
          </p>
        </td>
        <td
          style="
            width: 12%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 4pt; text-align: center">${item.qty_IN}</p>
        </td>
        <td
          style="
            width: 12%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p
            class="s3"
            style="
              padding-right: 3pt;
              text-align: center;
            "
          >
          0.00
          </p>
        </td>
    
        <td
          style="
            width: 10%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 4pt; text-align: center">
          0.00
          </p>
        </td>
        <td
          style="
            width: 10%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 4pt; text-align: center">
          ${item.qty_OUT}
          </p>
        </td>
        <td
          style="
            width: 18%;
            border-top-style: solid;
            border-top-width: 1pt;
            border-left-style: solid;
            border-left-width: 1pt;
            border-bottom-style: solid;
            border-bottom-width: 1pt;
            border-right-style: solid;
            border-right-width: 1pt;
          "
        >
          <p class="s3" style="padding-right: 20pt; text-align: center">
          ${item.yards}
          </p>
        </td>
        <td
        style="
          width: 18%;
          border-top-style: solid;
          border-top-width: 1pt;
          border-left-style: solid;
          border-left-width: 1pt;
          border-bottom-style: solid;
          border-bottom-width: 1pt;
          border-right-style: solid;
          border-right-width: 1pt;
        "
      >
        <p class="s3" style="padding-right: 20pt; text-align: center">
        ${item.meters}
        </p>
      </td>
      </tr>

    
        `;
        });
        html += `
        </table>
        <p style="text-indent: 0pt;text-align: left;"><br/></p>
        <p style="text-indent: 0pt;text-align: left;"><br/></p>

        </body>
        </html>
        `;
        setHtml2(html);

      } else Alert.alert("No record found.");
      setprogressVisible(false);
      if (!response.ok)
        return Alert.alert("Couldn't retrieve the Sales Report");
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
        title="Exporting pdf" //"Posting Data"
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
