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
  const [creditLimit, setcreditLimit] = useState("");
  const [creditDays, setcreditDays] = useState("");
  const [openingBalance, setopeningBalance] = useState("");

  const [totalDebit, settotalDebit] = useState("");
  const [totalCredit, settotalCredit] = useState("");
  const [closingBalance, setclosingBalance] = useState("");




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
      <meta name="viewport" />
      <meta name="keywords" content="HTML,CSS" />
      <meta name="description" content="....." />
  
      <title>Bp Ledger Report (ZIL)</title>
      <style>
          .s3 {
              color: black;
              font-family: Calibri, sans-serif;
              font-style: normal;
              text-decoration: none;
              font-size: 8pt;
              margin: 5px;
          }
  
          img {
              float: left;
              margin-left: 50px;
              margin-right: 0px;
              margin-top: 0px;
          }
  
          h1,
          h2,
          h3,
          h4,
          h4,
          h5,
          h6,
          p {
              font-family: Calibri, sans-serif;
              font-style: normal;
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
  
          .lastTable {
              width: 20%;
              border-style: solid;
              border-width: 1pt;
          }
  
          .lastTable2 {
              border-style: solid;
              border-width: 1pt;
  
          }
  
          .tCell10 {
              width: 10%;
              border-style: solid;
              border-width: 1pt;
  
          }
  
          .tCell10E {
              width: 10%;
  
          }
  
          img {
              width: 150px;
              height: 80px;
  
          }
      </style>
  </head>
  
  <body>
  
      <!-- HEADER PART     <img style=" src="http://192.168.1.8:5555/Content/34234.PNG" alt="logo" />  -->
      <div>
          <div style="display: inline-block;margin-top: 10px;">
              <img src="http://182.180.92.42:5555/Content/34234.PNG" alt="logo" />
          </div>
          <div style="display: inline-block; width: 100px;">
          </div>
          <div style="display: inline-block;margin-top: 0px;margin-bottom: -10px;margin-top: -20px;">
              <div style="margin-top:10px;margin-bottom: -15px;">
                  <h6 style="text-align: center;">
                      A Project Of Zakori Group
                  </h6>
              </div>
              <div style="margin-top:-10px;margin-bottom: -10px;">
                  <h5 style="text-align: center;text-decoration: underline;margin-top: -10px;
               font-weight: bold ;
              ">
                      ZAKORI INDUSTRIES (PVT) LIMITED,PAKISTAN
                  </h5>
              </div>
              <div style="margin-top:-15px;margin-bottom: -15px;">
                  <h6 style="text-align: center;margin-top: -10px;">
                      LEADER IN ALL KIND OF SELF ADHESIVE TAPES
                  </h6>
              </div>
          </div>
      </div>
      <div>
          <h5 style="
          text-align: center;
              font-weight: bold;">
              Customer Ledger Report
          </h5>
      </div>
  
      <div style="margin-top: -20px;margin-left: 10px;margin-right: 10px; align-self: center;">
          <div style="display: inline-block;width: 70%; ">
              <div style="display: inline-block;">
                  <p style="font-size: small;">Customer Name:</p>
              </div>
              <div style="display: inline-block;margin-left: 10px;">
                  <p style="font-size: small;font-weight: bold ">${name}</p>
              </div>
          </div>
  
          <div style="display: inline-block;width: auto;">
              <div style="display: inline-block;">
                  <p style="font-size: small;">Credit Limit:</p>
              </div>
              <div style="display: inline-block;">
                  <p style="font-size: small;font-weight: bold; margin-left: 10px;">${creditLimit}</p>
              </div>
          </div>
      </div>
  
      <div style="margin-top: -25px;margin-bottom: -10px; margin-left: 10px;margin-right: 10px; align-self: center;">
          <div style="display: inline-block;width: 70%; ">
          </div>
  
          <div style="display: inline-block; width: auto">
              <div style="display: inline-block;">
                  <p style="font-size: small;">Credit Days:</p>
              </div>
              <div style="display: inline-block;">
                  <p style="font-size: small;font-weight: bold;margin-left: 10px;">${creditDays}</p>
              </div>
          </div>
      </div>
      <div>
  
          <table style="
        border-collapse: collapse;
        margin-left: 0%;
        margin-right: 0%;
        width: 98%;
        ">
              <tr>
                  <td class="tCell10">
                      <p class="s3" style="font-weight: bold; text-align: center">Date</p>
                  </td>
                  <td class="tCell10">
                      <p class="s3" style="font-weight: bold;text-align: center">
                          Doc Type
                      </p>
                  </td>
                  <td class="tCell10">
                      <p class="s3" style="font-weight: bold; text-align: center">
                          Doc No #
                      </p>
                  </td>
                  <td class="tCell10">
                      <p class="s3" style="font-weight: bold; text-align: center">Debit</p>
                  </td>
                  <td class="tCell10">
                      <p class="s3" style="font-weight: bold;text-align: center;">
                          Credit
                      </p>
                  </td>
  
                  <td class="tCell10">
                      <p class="s3" style="font-weight: bold;text-align: center">
                          Balance
                      </p>
                  </td>
                  <td class="tCell10">
                      <p class="s3" style="font-weight: bold; text-align: center">
                          Due Date
                      </p>
                  </td>
                  <td class="lastTable">
                      <p class="s3" style="font-weight: bold;text-align: center">
                          Overdue
                      </p>
                  </td>
              </tr>
  
              <tr style="height: 0pt;">
                  <td class="tCell10E">
                  </td>
                  <td class="tCell10E">
                      <p class="s3" style=" text-align: center">O.B</p>
                  </td>
                  <td class="tCell10E">
  
                  </td>
                  <td class="tCell10E">
                  </td>
                  <td class="tCell10E">
  
                  </td>
  
                  <td class="tCell10E">
                      <p class="s3" style="text-align: center">
                          ${openingBalance}
                      </p>
                  </td>
                  <td class="tCell10E">
  
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
  const getLedgerReportA = async () => {
    console.log(fromdate, todate, customerCode);
    setprogressVisible(true);
    var totalDebit1 = "";
    var totalCredit1 = "";
    var closingBalance1 = "";
    var totalOverdue1 = "";
    var openingBalance1 = "";

    const response = await ledgerReportApi.getLedgerReport(
      fromdate,
      todate,
      customerCode
    );
    console.log(response.data, "---------- data here of ledger");
    console.log(response.data.data.details, "---------- details here of ledger");

    console.log(response.data.data.customerName, "----------customerName");
    setName(response.data.data.customerName);

    console.log(response.data.data.creditLimit, "----------creditLimit");
    setcreditLimit(response.data.data.creditLimit);

    console.log(response.data.data.creditDays, "----------creditDays");
    setcreditDays(response.data.data.creditDays);

    console.log(response.data.data.openingBalance, "----------openingBalance");
    setopeningBalance(response.data.data.openingBalance);

    console.log(response.data.data.totalDebit, "----------totalDebit");
    // settotalDebit(response.data.data.totalDebit);
    totalDebit1 = response.data.data.totalDebit;

    console.log(response.data.data.totalCredit, "----------totalCredit");
    // settotalCredit(response.data.data.totalCredit);
    totalCredit1 = response.data.data.totalCredit;

    console.log(response.data.data.closingBalance, "----------closingBalance");
    //setclosingBalance(response.data.data.closingBalance);
    closingBalance1 = response.data.data.closingBalance;

    console.log(response.data.data.totalOverDue, "----------totaloverdue");
    //setclosingBalance(response.data.data.closingBalance);
    totalOverdue1 = response.data.data.totalOverDue;

    console.log(response.data.data.openingBalance, "----------openingBalance");
    //setclosingBalance(response.data.data.closingBalance);
    openingBalance1 = response.data.data.openingBalance;


    setReports1(response.data.data.details);
    var html = ``;
    response.data?.data?.details?.map((item) => {
      html =
        html +
        `
        <tr style="height: 0pt">
        <td class="tCell10">
            <p class="s3" style=" text-align: center">
                ${item.date}
            </p>
        </td>
        <td class="tCell10">
            <p class="s3" style="text-align: center">${item.docType}</p>
        </td>
        <td class="tCell10">
            <p class="s3" style=" text-align: center">${item.docNo}</p>
        </td>
        <td class="tCell10">
            <p class="s3" style=" text-align: center">${item.debit}</p>
        </td>
        <td class="tCell10">
            <p class="s3" style="
      text-align: center;">${item.credit}</p>
        </td>

        <td class="tCell10">
            <p class="s3" style="text-align: center">${item.balance}</p>
        </td>
        <td class="tCell10">
            <p class="s3" style=" text-align: center">
                ${item.dueDate}
            </p>
        </td>
        <td class="lastTable">
            <p class="s3" style="  font-size: 8pt; text-align: center">${item.overDue}</p>
        </td>
    </tr>
       `;
    });

    html += `
    </table>
    <div style="float: right;margin-right: 2%;">
        <table>
            <th style="text-align: left;padding-left: 25px;padding-top: 5px;padding-bottom: 5px;  font-family: Calibri, sans-serif;
            font-style: normal;">Summary</th>
            <tr style="height: 0px">
                <td class="lastTable2">
                    <p class="t3" style="text-align: left">Total Debit:</p>
                    <p class="t3" style="text-align: left">Total Credit:</p>
                    <p class="t3" style="text-align: left">Closing Balance:</p>
                    <p class="t3" style="text-align: left;  background-color: rgb(215, 213, 213);">Total Overdue:
                    </p>
                </td>

                <td class="lastTable2">
                    <p class="t3" style="text-align: right">${totalDebit1}</p>
                    <p class="t3" style="text-align: right">${totalCredit1}</p>
                    <p class="t3" style="text-align: right">${closingBalance1}</p>
                    <p class="t3" style="text-align: right;   background-color: rgb(215, 213, 213);">
                        ${totalOverdue1}</p>


                </td>
            </tr>
        </table>

    </div>

</div>
</body>

</html>
`;

    setHtml2(html);

    // if (response?.data?.data?.length) setName(response?.data?.data[0].cardName);
    setprogressVisible(false);
    //  console.log("getLedgerReport", response?.data?.data?.length);
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
          <TouchableOpacity onPress={() => getLedgerReportA()}>
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
                Export Ledgers
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
        <AppText style={styles.headerP4}>Customer</AppText>
        <AppText style={styles.headerP4}>Balance</AppText>
        <AppText style={styles.headerP4}>Debit</AppText>
        <AppText style={styles.headerP4}>Credit</AppText>
        <AppText style={styles.headerP4}>Due Balance</AppText>
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
              balance={item.balance}
              customer={item.customerName}
              debit={item.debit}
              credit={item.credit}
              overDueBalance={item.overDueBalance}

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
