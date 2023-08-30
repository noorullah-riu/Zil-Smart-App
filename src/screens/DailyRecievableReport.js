
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import DailyRecCard from "../components/DailyRecvCard";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import AppRow from "../components/AppRow";
import POHeaderDetailsApi from "../api/pendingOrderReport";

const DailyRecievableReport = ({ navigation, route }) => {
  const [progressVisible, setprogressVisible] = useState(false);
  const [p_oHeaderData, setPOHeaderData] = useState([]);
  const [slp, setSlp] = useState(0);
  const [loading, setloading] = useState(false);

  const [overDueBalance, setoverDueBalance] = useState("");
  const [totalAmount, settotalAmount] = useState("");
  const [totalPaid, settotalPaid] = useState("");
  const [totalRecievable, settotalRecievable] = useState("");

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).salePersonCode);
    getPOHeaderData(JSON.parse(jsonValue).salePersonCode);
  };

  const getPOHeaderData = async (slpCode) => {
    //  alert(slpCode);
    setprogressVisible(true);
    const response = await POHeaderDetailsApi.getDailyRecievableHeaderDetails(slpCode);
    console.log(response?.data.overDueBalance, "DalyRecivble ------>");
    // console.log(response?.data.data[0].details, "details ------>");
    setoverDueBalance(response?.data?.overDueBalance);
    settotalAmount(response?.data?.totalAmount);
    settotalPaid(response?.data?.totalPaid);
    settotalRecievable(response?.data?.totalRecievable);
    setPOHeaderData(response?.data.data);
    setprogressVisible(false);
  };

  const exportPdfBtn = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => createAndSavePDF()}
          style={{ marginVertical: 15 }}
        >
          <AppButton
            text="Export pdf"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity>
      </>
    );
  };

  const pOReportHeading = () => (
    <>
      <AppRow style={styles.r1}>
        <AppText style={styles.p2}>Name</AppText>
        <AppText style={styles.p4}>invoiceTotal</AppText>
        <AppText style={styles.p4}>paidTotal</AppText>
        <AppText style={styles.p4}>totalBalance</AppText>
      </AppRow>
    </>
  );

  useEffect(() => {
    getUserDetails();
  }, []);

  const POReportHeadersList = () => {
    return (
      <>
        <FlatList
          contentContainerStyle={{}}
          data={p_oHeaderData}
          ListHeaderComponent={pOReportHeading}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <DailyRecCard item={item} />;
          }}
          ListFooterComponent={exportPdfBtn}
          key={(item) => {
            `-${item.docNum}-${item.docDate}`;
          }}
        />
      </>
    );
  };
  const createAndSavePDF = async () => {
    setloading(true);
    function generatePDFTemplate() {
      let TotalYds = 0;
      let TotalCtns = 0;
      let GroupCtnsTotal = 0;
      let GroupYdsTotal = 0;
      let GroupMtrsReqTotal = 0;

      let sNum = 0;

      const tableRows1 = p_oHeaderData
        .map((object) => {
          let paidToDate = 0
          let docTotal = 0;
          let Balance = 0;

          sNum++;
          GroupCtnsTotal = 0;

          let rows = "";
          //   var gcreditDays=object.creditDays;
          //   var gcreditLine=object.creditLine;
          return `
          <tr class="h2Style2">
          <td colspan="7" style="font-weight:700;font-size:small;">${object.cardName}</td>
          </tr>

          <tr>
          <td colspan="3" style="border-right: 0px;">
          </td>
          <td colspan="2" class="cL" style="border-right: 0px; border-left: 0px;">
            Credit Limit:<span class="txt">${object.creditLine}</span>
          </td>
          <td colspan="2" class="cL" style="border-right: 0px; border-left: 0px;">
            Credit Days:<span class="txt">${object.creditDays}</span></td>
          </tr>
          <div>
           ${object.details
              .map((innerObj) => {
                GroupMtrsReqTotal = 0;
                //    Balance = innerObj.balance;

                return `
                <tr>
                <td rowspan="1" class="txtCenter">${innerObj.docNum} </td>
                <td rowspan="1" class="txtCenter">${innerObj.invoiceDate}</td>
                <td rowspan="1" class="txtCenter">${innerObj.docTotalString}</td>
                <td rowspan="1" class="txtCenter">${innerObj.paidToDateString}</td>
                <td rowspan="1" class="txtCenter">${innerObj.balance}</td>
                <td rowspan="1" class="txtCenter">${innerObj.dueDate}</td>
                <td rowspan="1" class="txtCenter">${innerObj.dueDays}</td>
                </tr>
              `;
              })
              .join("")}

              <tr>
              <td rowspan="1" class="txtCenter"></td>
              <td rowspan="1" class="txtCenter"></td>
              <td rowspan="1" class="fBoldCenter">${object.invoiceTotalString}</td>
              <td rowspan="1" class="fBoldCenter">${object.paidTotalString}</td>
              <td rowspan="1" class="fBoldCenter">${object.totalBalanceString}</td>
              <td rowspan="1" class="txtCenter"></td>
              <td rowspan="1" class="txtCenter"></td>
              </tr>

              <tr>
              <td colspan="7" style="padding-left: 10%; text-align: center; font-weight: 600; font-size: small;border: 0px">
                OverDue Balance:<span style="padding-left: 14%;">${object.totalBalanceString}</span>
              </td>
               </tr>

        </div>
        `;
        })
        .join("");
      const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      
      <head>
        <title>Pending Order</title>
        <style>
          body {
            margin-left: 10px;
            margin-right: 10px;
          }
      
          .demo {
            border: 0.7px solid black;
            border-collapse: collapse;
            padding: 5px;
            width: 100%;
            font-size: 10px;
            margin-top: -1%;
          }
      
          .demo th {
            border: 0.7px solid #000000;
            padding: 5px;
          }
      
          .demo td {
            border: 1px solid #000000;
            padding: 5px;
          }
      
          .fBoldCenter {
            font-weight: bold;
            text-align: center;
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
            .lastTable2 {
            border-style: solid;
            border-width: 1pt;
            
            }
            
          .txtCenter {
            text-align: center;
          }
      
          .txtZakori {
            height: 5px;
            margin-top: 5px;
            text-align: center;
            text-decoration: underline;
          }
      
          h1,
          span,
          td,
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
      
          .AICenter {
            align-items: center;
          }
      
          .hStyle {
            background-color: #bebdbd;
            width: 100%;
            border: 1px solid #000000;
          }
      
          .h2Style {
            background-color: #bebdbd;
            width: 100%;
            border: 2px solid #000000;
          }
          .h2Style2 {
            width: 100%;
            border: 2px solid #000000;
          }
      
          .f7Small {
            font-weight: 700;
            font-size: small;
          }
      
          .txt {
            margin-left: 4%;
            font-weight: 600
          }
      
          .cL {
            font-weight: 600;
            padding-left: 4%;
            font-size: small;
            border-left: 0px;
            border-right: 0px;
      
          }
          .tDiv{
            border: 0.7px solid black; border-collapse: collapse; margin-top: 0.5%; width: 5%; font-size: 10px;
          }
        </style>
      </head>
      
      
      <body>
        <div class="AICenter">
          <h3 class="txtZakori">
            ZAKORI INDUSTRIES (PVT) LIMITED
          </h3>
        </div>
        <div class="AICenter">
          <h4 class="txtCenter">
            Daily Receivable Report
          </h4>
        </div>
        <table class="demo">
          <thead>
            <tr class="hStyle">
              <th rowspan="1" class="fBoldCenter">Inv.No#</th>
              <th rowspan="1" class="fBoldCenter">Invoice Date</th>
              <th rowspan="1" class="fBoldCenter">Invoice Total</th>
              <th rowspan="1" class="fBoldCenter">Paid</th>
              <th rowspan="1" class="fBoldCenter">Balance</th>
              <th rowspan="1" class="fBoldCenter">DueDate</th>
              <th rowspan="1" class="fBoldCenter">DueDays</th>
            </tr>
         
          </thead>
      
      <tbody>
      <tr class="h2Style">
      <td colspan="7" style="font-weight:700;font-size:small;">Azmat Ul Islam</td>
      </tr>
        ${tableRows1}
      </tbody>
    </table>
 
    <table style="float: right;margin-right: 2%;margin-top: 20px;">
        <tr>
            <td class="lastTable2">
                <p class="t3" style="text-align: left">Total Amount:</p>
                <p class="t3" style="text-align: left">Total Paid:</p>
                <p class="t3" style="text-align: left">Total Receivable:</p>
                <p class="t3" style="text-align: left;">Overdue Balance:</p>
            </td>

            <td class="lastTable2">
                <p class="t3" style="text-align: right">${totalAmount}</p>
                <p class="t3" style="text-align: right">${totalPaid}</p>
                <p class="t3" style="text-align: right">${totalRecievable}</p>
                <p class="t3" style="text-align: right;">${overDueBalance}</p>


            </td>
        </tr>
    </table>

        </body>
      </html>
    `;

      return htmlTemplate;
    }


    /*     <div style="float: right;margin-right: 2%;margin-top: 20px;">
        <table>
            <tr style="height: 0px">
                <td class="lastTable2">
                    <p class="t3" style="text-align: left">Total Amount:</p>
                    <p class="t3" style="text-align: left">Total Paid:</p>
                    <p class="t3" style="text-align: left">Total Receivable:</p>
                    <p class="t3" style="text-align: left;">Overdue Balance:</p>
                </td>
    
                <td class="lastTable2">
                    <p class="t3" style="text-align: right">totalDebit1</p>
                    <p class="t3" style="text-align: right">totalCredit1</p>
                    <p class="t3" style="text-align: right">closingBalance1</p>
                    <p class="t3" style="text-align: right;">totalOverdue1</p>
    
    
                </td>
            </tr>
        </table>
    
    </div> */

    const pdfTemplate = generatePDFTemplate();
    try {
      var htm = pdfTemplate;
      const { uri } = await Print.printToFileAsync({
        html: pdfTemplate,
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
  return (
    <View style={{ flex: 1 }}>
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
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}
        navigation={navigation}
        headerTitle="Daily Receivable"
      />

      <ProgressDialog
        visible={progressVisible}
        title="Fetching Data"
        message="It may take longer time than usual."
      />
      <ProgressDialog
        visible={loading}
        title="Exporting Pdf"
        message="Please wait..."
      />
      <POReportHeadersList />
    </View>
  );
};

export default DailyRecievableReport;
const styles = StyleSheet.create({
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

  p2: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 12,
    width: "30%",
  },
  p3: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 12,
    width: "24%",
  },
  p4: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 12,
    width: "22%",
  },
});

