import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import SaleReportCard from "../components/LedgerReportCard";
import ledgerReportApi from "../api/ledgerReport";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import sizes from "../components/sizes";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import AppRow from "../components/AppRow";
import { MaterialIcons } from "@expo/vector-icons";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { ProgressDialog } from "react-native-simple-dialogs";

const Ledger = ({ navigation, route }) => {
  const { customerCode, customerName, item } = route.params;
  const [progressVisible, setprogressVisible] = useState(true);
  const [dateView, setDateView] = useState(true);

  const [reports1, setReports1] = useState([]);
  const [openBal, setOpenBal] = useState(0);
  const [closeBal, setCloseBal] = useState(0);
  const [loading, setloading] = useState(false);

  const [cardCode, setCardCode] = useState("");
  const [name, setName] = useState("");

  //const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false);

  const [customerDetails, setCustomerDetails] = useState("");
  const [fromdate, setfromDate] = useState("");
  const [todate, settoDate] = useState("");

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
        Bussiness Partner Ledger
      </h2>
    <div style="margin-top: 60px; margin-left: 50px; margin-right: 50px">
      <p style="display: table-cell; font-weight: 600">Customer Name:</p>
      <p style="margin-left: 150px; margin-top: -20px">${name}</p>
      <p style="margin-left: 550px; margin-top: -40px; font-weight: 600">
        Credit Limit:
      </p>
      <p style="margin-left: 700px; margin-top: -35px">7,500,000.00</p>
    </div>
    <div style="margin-top: 60px; margin-left: 50px; margin-right: 50px">
      <p style="margin-left: 550px; margin-top: -40px; font-weight: 600">
        Credit Days:
      </p>
      <p style="margin-left: 700px; margin-top: -35px">30 Days</p>
    </div>
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
          <p class="s3" style="padding-right: 4pt; text-align: center">Date</p>
        </td>
        <td
          style="
            width: 8%;
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
            Doc Type
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
            Doc No #
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
          <p class="s3" style="padding-right: 4pt; text-align: center">Debit</p>
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
            Credit
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
            Balance
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
            Due Date
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
          Line Memo
          </p>
        </td>
      </tr>
      `;

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
  const handleDateChange = (date) => {
    console.log("in handleDateChange", date);
    setfromDate(date);
  };
  const handleDateChange1 = (date) => {
    console.log("in handleDateChange", date);
    settoDate(date);
  };
  const getLedgerReport = async () => {
    console.log(fromdate, todate, customerCode);
    setprogressVisible(true);
    const response = await ledgerReportApi.getLedgerReport(
      fromdate,
      todate,
      customerCode
    );
    console.log(response.data, "---------- data here of ledger");
    setReports1(response.data.data);
    var html = ``;
    var totalCredit = 0;
    var totalDebit = 0;
    response.data?.data?.map((item) => {
      totalCredit += item.credit;
      totalDebit += item.debit;

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
      ${item.postingDate.split("T")[0]}
      </p>
    </td>
    <td
      style="
        width: 8%;
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
      <p class="s3" style="padding-right: 2pt; text-align: center">${
        item.docStatus
      }</p>
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
      ${item.docNum}
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
      <p class="s3" style="padding-right: 4pt; text-align: center">${
        item.debit
      }</p>
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
      ${item.credit}
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
        8.216,066.69
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
        ${item.dueDate.split("T")[0]}
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
  ${item.lineMemo}
      </p>
    </td>
  </tr>

    `;
    });

    html += `</table>
<p style="text-indent: 0pt;text-align: left;"><br/></p>
<h2 style="padding-top: 3pt;text-indent: 0pt;text-align: right;padding-right:40pt;">Summary</h2>
<p style="text-indent: 0pt;text-align: left;"><br/></p>


<table
style="
  border-collapse: collapse;

  margin-left: 50px;
  margin-right: 50px;
  width: 40%;
  float: right;
"
cellspacing="0"
>
<tr style="height: 4pt">
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
    <p class="t3" style="text-align: left">Total Debit:</p>
    <p class="t3" style="text-align: left">Total Credit:</p>
    <p class="t3" style="text-align: left">Closing Balance:</p>
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
    <p class="t3" style="text-align: right">${parseFloat(totalDebit).toFixed(
      2
    )}</p>

    <p class="t3" style="text-align: right">${parseFloat(totalCredit).toFixed(
      2
    )}</p>

    <p class="t3" style="text-align: right">${parseFloat(
      totalCredit - totalDebit
    ).toFixed(2)}</p>
  </td>
</tr>
</table>
</body>
</html>`;

    setHtml2(html);

    if (response?.data?.data?.length) setName(response?.data?.data[0].cardName);
    setprogressVisible(false);
    console.log("getLedgerReport", response?.data?.data?.length);
    setOpenBal(response?.data?.OpenBalance);
    setCloseBal(response?.data?.CloseBalance);
    if (response?.data?.Code === 0) setDateView(false);
    if (response?.data?.data?.length === 0)
      return Alert.alert("No record found");
    if (!response.ok) return Alert.alert("Couldn't retrieve the Ledger Report");
  };

  const getCustomerDetails = async () => {
    const customerJsonValue = await AsyncStorage.getItem("@customer_Details");
    console.log("getCustomerDetails", JSON.parse(customerJsonValue).CardCode);
    setCardCode(JSON.parse(customerJsonValue).CardCode);
  };
  const DocDateSelectionView = () => (
    <>
      <View style={{}}>
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
      </View>

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
          <TouchableOpacity onPress={() => getLedgerReport()}>
            <AppButton
              text="Get Ledger"
              iconFreeButton
              loginBtnStyle={styles.loginBtnStyle}
              navigation={navigation}
              navigation1="Login"
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%", marginHorizontal: 5 }}>
          <TouchableOpacity onPress={createAndSavePDF}>
            <View style={styles.export}>
              <AppText
                style={{
                  alignSelf: "center",
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                Export Invoice{" "}
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
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
  useEffect(() => {
    getCustomerDetails();
  }, []);
  const listHeader = () => {
    return (
      <AppRow style={styles.headerCard}>
        <AppText style={styles.headerP4}>Posting Date</AppText>
        <AppText style={styles.headerP4}>Invoice#</AppText>
        <AppText style={styles.headerP4}>Debit</AppText>
        <AppText style={styles.headerP4}>Credit</AppText>
        <AppText style={styles.headerP4}>Balance</AppText>
      </AppRow>
    );
  };
  const renderReportsList = () => {
    const initBal = "";
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 450 }}
        data={reports1}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <SaleReportCard
              OpeningBalance={item.OpeningBalance}
              customer={item.account}
              salePerson={item.currency}
              inv={item.baseRef}
              date={item.postingDate}
              itemCode={item.itemCode}
              description={item.memo}
              debit={item.debit}
              credit={item.credit}
              total={item.lineTotal}
            />
          );
        }}
        keyExtractor={(item) => item.baseRef}
      />
    );
  };
  return (
    <SafeAreaView>
      <AppHeader
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/back-button.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/search.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}
        navigation={navigation}
        headerTitle="Ledger"
      />

      {dateView ? DocDateSelectionView() : null}
      {!dateView ? ledgerHeader() : null}

      {listHeader()}
      {renderReportsList()}

      <ProgressDialog
        visible={loading}
        title="Exporting Pdf" //"Posting Data"
        message="Please wait..."
      />
    </SafeAreaView>
  );
};

export default Ledger;
const styles = StyleSheet.create({
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  export: {
    color: colors.white,
    fontWeight: "bold",
    backgroundColor: colors.secondary,
    fontSize: 16,
    height: 50,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    height: 306,
    width: 420,
    borderRadius: 100,
    borderColor: "red",
    borderWidth: 2,
  },
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    borderRadius: 5,
  },
  r1: {
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  p1_0: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
  },
  p2: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
  },
  p7: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  p3: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
  },
  p4: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 5,

    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerCard: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    paddingVertical: 20,
    marginVertical: 8,
    marginBottom: 0,
  },
  headerP4: {
    color: colors.black,
    fontWeight: "bold",
    width: "20%",
    fontSize: 12,
  },
  textContainer: {
    borderRadius: 10,
    marginVertical: 3,
  },
  p6b: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 16,
    fontWeight: "normal",
  },
  p8: {
    color: colors.primaryBlue,
    fontWeight: "bold",
    fontSize: 20,
  },
});
