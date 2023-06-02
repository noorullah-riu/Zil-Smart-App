
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

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).salePersonCode);
    getPOHeaderData(JSON.parse(jsonValue).salePersonCode);
  };

  const getPOHeaderData = async (slpCode) => {
    //  alert(slpCode);
    setprogressVisible(true);
    const response = await POHeaderDetailsApi.getDailyRecievableHeaderDetails(slpCode);
    console.log(response?.data.data, "DalyRecivble ------>");
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
          sNum++;
          GroupCtnsTotal = 0;
          let rows = "";
          //   var gcreditDays=object.creditDays;
          //   var gcreditLine=object.creditLine;
          return `
           <tr style="background-color:#c0c0c0;width: 100%; border: 2px solid #000000; ">
                <td colspan="7" style="text-align:left;font-weight:700;font-size:small;">${object.cardName}</td>
          </tr>
           ${object.details
              .map((innerObj) => {
                //  const yds = parseFloat(innerObj.yds);
                //  const cartons = parseFloat(innerObj.cartons);
                //  GroupCtnsTotal += parseFloat(innerObj.cartons);
                //  GroupYdsTotal += parseFloat(innerObj.yds);
                GroupMtrsReqTotal = "N.A";
                //  TotalYds += yds;
                //  TotalCtns += cartons;
                return `
            <tr>
              <td colspan="3" style="text-align: left;font-weight: 600; font-size: smaller;border-right: 0px;">
             
              </td>

            <td colspan="2"
              style=" font-weight: 600;padding-left: 4%; font-size: smaller;border-left: 0px;border-right: 0px;font-size: 13px; ">
              Credit Limit:<span style="margin-left: 4%; font-weight: 100"></span>
            </td>
            <td colspan="2"
              style="padding-left: 6%; font-size: smaller;border-left: 0px;font-weight: 600;font-size: 13px;">Credit
              Days:<span style="margin-left: 4%;font-weight: 100">30 Days</span></td>
          </tr>
          <tr>
            <td rowspan="1" style="text-align: center;">${innerObj.docNum} </td>
            <td rowspan="1" style="text-align: center;">${innerObj.invoiceDate}</td>
            <td rowspan="1" style="text-align: center;">${innerObj.docTotal}</td>
            <td rowspan="1" style="text-align: center;">${innerObj.paidToDate}</td>
            <td rowspan="1" style="text-align: center;">${innerObj.balance}</td>
            <td rowspan="1" style="text-align: center;">${innerObj.dueDate}</td>
            <td rowspan="1" style="text-align: center;">${innerObj.dueDays}</td>
          </tr>
    
    
          <tr>
            <td colspan="7" style="padding-left: 10%; text-align: center; font-weight: 600; font-size: small;border: 0px">
              OverDue Balance:<span style="padding-left: 14%;">${innerObj.balance}</span>
            </td>
          </tr>`;
              })
              .join("")}
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
      img {
        margin-top:15px;
        width: 130px;
        height: 60px;
        border: 0px solid #000000;
        border-collapse: collapse;
      }
      .demo14 {
        border: 0px solid black;
        border-collapse: collapse;
        width: 100%;
      }
      .demo14 td {
        border: 0px solid #000000;
      }
      .demo th {
        border: 0.7px solid #000000;
        padding: 5px;
        background: #ffffff;
      }
      .demo td {
        border: 1px solid #000000;
        padding: 5px;
        font-size: 10px;
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
      Daily Receivable Report
    </h4>
  </div>
</u>
     <table class="demo">
      <thead style="display: table-header-group;background-color:#c0c0c0;font-weight: 700;">
      <tr>
        <th rowspan="1" style="text-align: center; ">Inv.No#</th>
        <th rowspan="1" style="text-align: center;">Invoice Date</th>
        <th rowspan="1" style="text-align: center;">Invoice Total</th>
        <th rowspan="1" style="text-align: center;">Paid</th>
        <th rowspan="1" style="text-align: center;">Balance</th>
        <th rowspan="1" style="text-align: center;">DueDate</th>
        <th rowspan="1" style="text-align: center;">DueDays</th>
       </tr>
      </thead>
      
      <tbody>
        ${tableRows1}
      </tbody>
    </table>
    
    <div style="display: flex; flex-direction: row;">
    <table style="border: 0.7px solid black; border-collapse: collapse; padding: 3px; margin-left: 4%; margin-top: 0.5%; width: 5%; font-size: 10px;">
        <tr>
            <td style="font-weight: bold; text-align: center;">
                Total
            </td>
        </tr>
    </table>
   </div>
        </body>
      </html>
    `;

      return htmlTemplate;
    }

    const pdfTemplate = generatePDFTemplate();
    try {
      var htm = pdfTemplate;
      const { uri } = await Print.printToFileAsync({
        html: pdfTemplate,
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

