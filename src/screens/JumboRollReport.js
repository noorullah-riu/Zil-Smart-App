import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import AgingReportCard from "../components/AgingReportCard";
import JumboRollCard from "../components/JumboRollCard"
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-datepicker";
import sizes from "../components/sizes";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import AppRow from "../components/AppRow";
import { MaterialIcons } from "@expo/vector-icons";
import { ProgressDialog } from "react-native-simple-dialogs";
import ledgerReportApi from "../api/ledgerReport";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

const JumboRollReport = ({ navigation, route }) => {
  // const { code } = route.params;
  //  alert(code);
  const code = 'uu';
  const [progressVisible, setprogressVisible] = useState(false);
  const [dateView, setDateView] = useState(true);

  const [reports1, setReports1] = useState([]);
  const [reports2, setReports2] = useState([
    {
      PostingDate: "2021-01-05T00:00:00",
      DueDate: "2021-01-05T00:00:00",
      TaxDate: "2021-01-05T00:00:00",
      BaseRef: "110000188",
      VoucherNo: "110000188",
      Memo: "CASH FROM A 3 PLASTIC TO ALLIED SHIIPER",
      ContraAct: "C000001",
      Currency: "",
      AcctName: "",
      Shortname: "A20401010",
      Account: "A 3 PLASTICS",
      Debit: 500000,
      Credit: 0,
      LineTotal: 280000,
    },

    {
      PostingDate: "2021-10-11T00:00:00",
      DueDate: "2021-10-11T00:00:00",
      TaxDate: "2021-10-11T00:00:00",
      BaseRef: "110000792",
      VoucherNo: "110000792",
      Memo: "A/R Invoices - C000001",
      ContraAct: "C000001",
      Currency: "",
      AcctName: "",
      Shortname: "A20101002",
      Account: "A 3 PLASTICS",
      Debit: 0,
      Credit: 28103.74,
      LineTotal: -123103.74,
    },
    {
      PostingDate: "2021-10-11T00:00:00",
      DueDate: "2021-10-11T00:00:00",
      TaxDate: "2021-10-11T00:00:00",
      BaseRef: "110000792",
      VoucherNo: "110000792",
      Memo: "A/R Invoices - C000001",
      ContraAct: "C000001",
      Currency: "",
      AcctName: "",
      Shortname: "A20101002",
      Account: "A 3 PLASTICS",
      Debit: 0,
      Credit: 28103.74,
      LineTotal: -123103.74,
    },
  ]);
  const [openBal, setOpenBal] = useState(0);
  const [closeBal, setCloseBal] = useState(0);
  const [loading, setloading] = useState(false);

  const [cardCode, setCardCode] = useState("");
  const [name, setName] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [fromdate, setfromDate] = useState("");
  const [todate, settoDate] = useState("");
  const [Pieces, setPieces] = useState();

  const [html2, setHtml2] = useState("");



  const html1 = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device width,initial scale =1.0" />
      <meta name="keywords" content="HTML,CSS" />
      <meta name="description" content="....." />
  
      <title>zill</title>
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
          margin-top:15px;
          width: 130px;
          height: 60px;
          border: 0px solid #000000;
          border-collapse: collapse;
        }
      body {
        margin-left: 10px;
        margin-right: 10px;
          }
      .demo14 {
      border: 0px solid black;
      border-collapse: collapse;
      width: 100%;
      }
    img {
    width: 130px;
    height: 70px;
    border: 0px solid #000000;
    border-collapse: collapse;
     }

      </style>
    </head>
  
    <body>
      <table class="demo14">
      <tr>
        <td
          style=" width: 34%; border-right-width:
          0px;border-bottom-width: 0px; font-weight: bold;">
          <img src="http://182.180.92.42:5555/Content/34234.PNG"
          alt="logo"> </td>
        <td  style=" border-right-width: 0px;border-bottom-width: 0px;font-weight: bold;  ">  
     <u>
    <h3 style="margin-top: 50px;">
    ZAKORI INDUSTRIES (PVT) LIMITED
    </h3>
     </u>
  </td>
      </tr>
    </table>
  </u>
    <div style=" background-color: darkgrey;text-align: center;margin-bottom: 4px;margin-top: 10px;">
      <u>
      <h4 style="
       height: 30px;
       vertical-align: middle;
       display:table-cell;
        ">
        Jumbo Roll Stock Report
      </h4>
    </div>
  </u>
  
      <table
        style="
          border-collapse: collapse;
          margin-top: 60px;
          margin-left: auto;
          margin-right: auto;
          width: 90%;
        "
        cellspacing="0"
      >
        <tr style="height: 4pt; background-color: gainsboro">
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
            <p class="s3" style="padding-right: 4pt; text-align: left">
              Item<span class="s4"> </span>Code
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
            <p class="s3" style="padding-right: 2pt; text-align: left">
              Item Name<span class="s4"> </span>
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
            <p class="s3" style="padding-right: 4pt; text-align: left">
              Pieces
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
          <p class="s3" style="padding-right: 4pt; text-align: left">
         In Stock(kg)
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
        <p class="s3" style="padding-right: 4pt; text-align: left">
        Amount
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
      setloading(false);
      console.error(error);
    }
  };

  const getLedgerReport = async (codehere) => {
    getCustomerDetails();
    setprogressVisible(true);
    const response = await ledgerReportApi.getJumboRollReport(
      cardCode
    );
    console.log(response?.data, "------------");
    if (response.data.data == null) {
      Alert.alert("No record found");
    } else {
      var html = ``;
      var totalPieces = 0;
      var inStockTotal = 0;
      var totalAmount = 0;

      response.data?.data?.map((item) => {
        totalPieces += item.pieces;
        inStockTotal += item.inStock;
        totalAmount += item.amount;
        //  totalDebit += item.debit;

        html =
          html +
          `
            <tr style="height: 4pt">
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
              <p class="s3" style="padding-right: 4pt; text-align: left">
                <span class="s4">${item.itemCode} </span>
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
              <p class="s3" style="padding-right: 2pt; text-align: left">
                <span class="s4">${item.itemName} </span>
              </p>
            </td>
            <td
              style="
                width: 5%;
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
              <p class="s4" style="padding-right: 2pt; text-align: left">${item.pieces}</p>
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
              <p class="s4" style="padding-right: 4pt; text-align: left">
              ${item.inStock}
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
              <p
                class="s4"
                style="
                  padding-right: 3pt;
                  text-align: left;
                "
              >
              ${item.amount}
              </p>
            </td>
          </tr>
            `;
      });
      html += `</table>
      <table
      style="
        border-collapse: collapse;
        margin-top: 0px;
        margin-left: auto;
        margin-right: auto;
        width: 90%;
      "
      cellspacing="0"
    >
      <tr style="height: 4pt;">
        <td
          style="
            width: 12%;
          "
        >
          <p class="s3" style="padding-right: 4pt; text-align: left">
          </p>
        </td>
        <td
          style="
            width: 12%;
          "
        >
          <p class="s3" style="padding-right: 2pt; text-align: left">
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
          <p class="s3" style="padding-right: 4pt; text-align: left">
            ${totalPieces}
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
        <p class="s3" style="padding-right: 4pt; text-align: left">
        ${inStockTotal}
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
      <p class="s3" style="padding-right: 4pt; text-align: left">
      ${totalAmount}
      </p>
    </td>

      </tr>
      </table>
      </body>
      </html>`;

      setHtml2(html);
      setReports1(response?.data.data);
      // setPieces(amount);
      //  setName(response.data.data[0].cardName);
      // alert(totalCredit - totalDebit);
      //  setBalance(parseFloat(totalCredit - totalDebit).toFixed(2));
      setDateView(false);
    }
    setprogressVisible(false);

  };




  const getCustomerDetailsa = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    // setSlp(JSON.parse(jsonValue).salePersonCode);
    console.log("getUserDetails", JSON.parse(jsonValue).salePersonCode)
    setCardCode(JSON.parse(jsonValue).salePersonCode);
    // getLedgerReport(JSON.parse(jsonValue).salePersonCode);
    //    getDraftOrdersList(JSON.parse(jsonValue).salePersonCode)
    // getDraftOrdersList(14)
    //   getApprovedSaleOrders(date,JSON.parse(jsonValue).salePersonCode)
    //   return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getCustomerDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    // setUserId(JSON.parse(jsonValue).Id);
    console.log(
      "getUserDetails in AllActivities screen",
      JSON.parse(jsonValue).salePersonCode
    );
    setCardCode(JSON.parse(jsonValue).salePersonCode);

  };

  const DocDateSelectionView = () => (
    <>
      <View style={{ marginVertical: 20 }}>
        <TouchableOpacity onPress={() => getLedgerReport()}>
          <AppButton
            text="Get Data"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity>
      </View>
    </>
  );
  const DocDateSelectionView2 = () => (
    <>
      <View style={{ marginVertical: 20 }}>
        <TouchableOpacity onPress={() => createAndSavePDF()}>
          <AppButton
            text="Export pdf"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity>
      </View>
    </>
  );

  const ledgerHeader = () => (
    <>
      <AppRow style={styles.r1}>
        <AppText style={styles.p2}>Item Code</AppText>
        <AppText style={styles.p3}>Name</AppText>
        <AppText style={styles.p4}>Pieces</AppText>
        <AppText style={styles.p4}>In Stock</AppText>
        <AppText style={styles.p4}>Amount</AppText>
      </AppRow>
    </>
  );
  useEffect(() => {
    getCustomerDetails();
  }, []);

  const renderReportsList = () => {
    const initBal = "";
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 450 }}
        data={reports1}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <JumboRollCard
              customer={item}
            />
          );
        }}
        keyExtractor={(item) => item.type}
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
        //    doubleBtnImg2={require("../assets/pdf_file.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}

        navigation={navigation}
        headerTitle="Jumbo Roll"
      />
      {/*      <AppHeader
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/back-button.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginLeft: 10,
        }}
      //  doubleBtnImg2={require("../assets/pdf_file.png")}
      doubleBtnImg2={require("../assets/pdf_file.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}
        navigation={navigation}
        headerTitle="Aging Report"
           onPressRight={()=>alert("open pdf view")}
      //  onPressRight={() => createAndSavePDF()}
      /> */}
      <ProgressDialog
        visible={progressVisible}
        title="Loading Data"
        message="Please wait..."
      />
      <ProgressDialog
        visible={loading}
        title="Exporting Pdf"
        message="Please wait..."
      />
      {dateView ? DocDateSelectionView() : DocDateSelectionView2()}
      {!dateView ? ledgerHeader() : null}
      {!dateView ? renderReportsList() : null}
    </SafeAreaView>
  );
};

export default JumboRollReport;
const styles = StyleSheet.create({
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 60 : 70,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: "10%",
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
