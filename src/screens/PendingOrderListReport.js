import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import POReportCard from "../components/POReportCard";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import AppRow from "../components/AppRow";
import ledgerReportApi from "../api/ledgerReport";
import POHeaderDetailsApi from "../api/pendingOrderReport";
import { ScrollView } from "react-native-gesture-handler";

const PendngOrderListReport = ({ navigation, route }) => {
  const [progressVisible, setprogressVisible] = useState(false);
  const [dateView, setDateView] = useState(true);
  const [p_oHeaderData, setPOHeaderData] = useState([]);
  const [slp, setSlp] = useState(0);
  const [loading, setloading] = useState(false);
  const [cardCode, setCardCode] = useState("");
  const [html2, setHtml2] = useState("");

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).salePersonCode);
    getPOHeaderData(JSON.parse(jsonValue).salePersonCode);
  };
  const getPOHeaderData = async (slpCode) => {
    console.group("getPOHeaderData API called");
    setprogressVisible(true);
    const response = await POHeaderDetailsApi.getPOHeaderDetails(slpCode);
    setPOHeaderData(response?.data.data);
    setprogressVisible(false);
  };

  const ExportPdfBtn = () => (
    <View style={{ marginVertical: 20, marginBottom: 20 }}>
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
  );

  const POReportHeading = () => (
    <>
      <AppRow style={styles.r1}>
        <AppText style={styles.p2}>Id</AppText>
        <AppText style={styles.p3}>S_O Num</AppText>
        <AppText style={styles.p4}>Customer</AppText>
        <AppText style={styles.p4}>S_O Date</AppText>
        <AppText style={styles.p4}>Delivery Date</AppText>
      </AppRow>
    </>
  );
  useEffect(() => {
    getUserDetails();
  }, []);

  const POReportHeadersList = () => {
    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 2 }}
        data={p_oHeaderData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <POReportCard item={item} />;
        }}
        keyExtractor={(item) => item.docNum}
      />
    );
  };
  const createAndSavePDF = async () => {
    setloading(true);
    let formData = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device width,initial scale=1.0" />
        <meta name="keywords" content="HTML,CSS" />
        <meta name="description" content="....." />
    
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
          }
    
          .demo1 {
            border: 0.7px solid black;
            border-collapse: collapse;
            margin-top: 12px;
            width: 60%;
            margin-bottom: 6px;
            font-size: 10px;
          }
    
          .demo1 td {
            border: 0.7px solid #000000;
            padding: 5px;
          }
          .demo14 {
            border: 0px solid black;
            border-collapse: collapse;
            width: 100%;
          }
    
          .demo14 td {
            border: 0px solid #000000;
          }
    
          .demo11 {
            border: 0px solid #000000;
            border-collapse: collapse;
            margin-top: -16px;
            width: 67%;
            font-size: 10px;
          }
    
          .demo11 td {
            border: 0px;
          }
    
          .demo2 {
            border: 0.7px solid #000000;
            border-collapse: collapse;
            width: 50%;
            margin-bottom: 6px;
            font-size: 10px;
            margin-top: 12px;
            margin-left: 40px;
          }
    
          .demo2 td {
            border: 0.7px solid #000000;
            padding: 5px;
          }
    
          .demo22 {
            border: 0px;
            margin-top: -16px;
            border-collapse: collapse;
            width: 13%;
            margin-left: 30px;
            font-size: 10px;
          }
    
          .demo22 td {
            border: 0px;
          }
    
          .demo3 {
            border: 0.7px solid #000000;
            border-collapse: collapse;
            float: right;
            width: 30%;
            margin-top: 4px;
            font-size: 10px;
          }
    
          .demo3 td {
            border: 0.7px solid #000000;
            padding: 5px;
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
    
          .vertical {
            display: block;
            margin-top: 118px;
            overflow: hidden;
            border-style: solid;
            border-width: 1.5px;
            border-color: #000;
            border-top: 0px;
            border-left: 0px;
            border-right: 0px;
          }
    
          img {
            width: 130px;
            height: 70px;
            border: 0px solid #000000;
            border-collapse: collapse;
          }
    
          .Div1 {
            border-style: solid;
            width: 300px;
            height: 100px;
            margin-top: 20px;
    
            float: right;
            border-color: black;
            border-width: 1px;
            margin-bottom: 20px;
          }
    
          .Div2 {
            border-style: solid;
            float: right;
            width: 450px;
            height: 108px;
            margin-top: 6px;
    
            border-color: black;
            border-width: 1px;
            margin-bottom: 20px;
          }
    
          .Div {
            border-style: solid;
            height: 40px;
            margin-top: -12px;
    
            border-color: black;
            border-width: 1px;
            font-size: 10px;
    
            display: flex;
            align-items: center;
          }
    
          .std-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
    
            margin-top: 20px;
          }
          .std-row2 {
            display: flex;
            flex-direction: row;
          }
    
          .std-row1 {
            display: flex;
            flex-direction: row;
            width: 100%;
            margin-top: -10px;
          }
    
          .box {
            margin-right: 5px;
          }
    
          .std-name-fields {
            width: 200px;
            border: 0px;
            border-bottom: 1px solid #000;
          }
        </style>
      </head>
    
      <body onload="createTableRows()">
        <table class="demo14">
          <tr>
            <td
              style="
                border-right-width: 0px;
                border-bottom-width: 0px;
                font-weight: bold;
              "
            >
              <h3 style="margin-top: 30px; margin-left: 47%">
                Zakori Industries (Pvt) Limited
              </h3>
            </td>
    
            <td
              style="
                border: 0px;
                font-weight: 700;
                align-content: flex-end;
                font-size: 10px;
              "
            >
              <p style="margin-top: 30px; margin-left: 40%">
                Print Date:<span style="margin-left: 2%">27.02.2023</span
                ><span style="margin-left: 2%">11:58:20 AM</span>
              </p>
            </td>
          </tr>
        </table>
    
        <div style="text-align: center; margin-bottom: 4px; margin-top: -2%">
          <h4>Pending Order List</h4>
        </div>
    
        <div>
          <table class="demo">
            <thead style="display: table-header-group; font-weight: 700">
              <td colspan="3" style="font-weight: bold; text-align: center">Sno</td>
              <td colspan="4" style="font-weight: bold; text-align: left">
                Description
              </td>
              <td style="font-weight: bold; text-align: center">Status</td>
              <td style="font-weight: bold; text-align: center">Order Date</td>
              <td style="font-weight: bold; text-align: center">Dilivery Date</td>
              <td style="font-weight: bold; text-align: center">Pcs/Ctn</td>
              <td style="font-weight: bold; text-align: center">Quantity</td>
              <td style="font-weight: bold; text-align: center">Lr's Qty</td>
              <td style="font-weight: bold; text-align: center">Yards Req</td>
              <td style="font-weight: bold; text-align: center">Meters Req</td>
              <td style="font-weight: bold; text-align: center">
                Production Status
              </td>
              <td style="font-weight: bold; text-align: center">Count Status</td>
            </thead>
            <tbody id="table-body"></tbody>
          </table>
        </div>
        <div style="display: flex; flex-direction: row">
          <table
            style="
              border: 0.7px solid black;
              border-collapse: collapse;
              padding: 5px;
              margin-left: 2%;
              margin-top: 0.5%;
              width: 5%;
              font-size: 10px;
            "
          >
            <tr>
              <td colspan="3" style="font-weight: bold; text-align: center">
                Total
              </td>
            </tr>
          </table>
          <table
            style="
              border: 0.7px solid black;
              border-collapse: collapse;
              padding: 5px;
              margin-left: 1%;
              margin-top: 0.5%;
              width: 5%;
              font-size: 10px;
            "
          >
            <tr>
              <td colspan="3" style="font-weight: bold; text-align: center">
                1.134
              </td>
            </tr>
          </table>
          <table
            style="
              border: 0.7px solid black;
              border-collapse: collapse;
              padding: 5px;
              margin-left: 60%;
              margin-top: 0.5%;
              width: 5%;
              font-size: 10px;
            "
          >
            <tr>
              <td colspan="3" style="font-weight: bold; text-align: center">
                1.134
              </td>
            </tr>
          </table>
          <table
            style="
              border: 0.7px solid black;
              border-collapse: collapse;
              padding: 5px;
              margin-top: 0.5%;
              width: 5%;
              font-size: 10px;
            "
          >
            <tr>
              <td colspan="3" style="font-weight: bold; text-align: center">
                1.134
              </td>
            </tr>
          </table>
        </div>
      </body>
      <script>
        const tableBody = document.getElementById("table-body");
        function createTableRows() {

          let rows = "";
           for (let j = 0; j < ${p_oHeaderData.length}; j++) {
            let TCtns = 0;
            let TYardsReq = 0;
            let TMetersReq = 0;
            rows += `
            <tr>            
            <td  style="text-align:center;font-weight:700;font-size:small;">${p_oHeaderData[j].docNum}</td>
            <td  style="text-align:center;font-weight:700;font-size:small;">Ctns</td>  
            <td colspan="4" style="font-weight: bold;text-align: left;">${p_oHeaderData[j].cardName}</td>
            <td  style="font-weight: bold;text-align: center;"></td>
            <td style="font-weight: bold;text-align: center;">${p_oHeaderData[j].docDate}</td>
            <td  style="text-align: center;">${p_oHeaderData[j].docDueDate}</td>
            <td style="font-weight: bold;text-align: center;"></td>
            <td style="font-weight: bold;text-align: center;"></td>
            <td style="font-weight: bold;text-align: center;"></td>
            <td style="font-weight: bold;text-align: center;"></td>
            <td style="font-weight: bold;text-align: center;"></td>
            <td style="font-weight: bold;text-align: center;"></td>
            <td style="font-weight: bold;text-align: center;"></td>
            </tr>`;
    
            for (let i = 0; i < data.SalePerson[j].customers.length; i++) {
              TCtns += data.SalePerson[j].customers[i].Ctns;
              TYardsReq += data.SalePerson[j].customers[i].YardsReq;
              TMetersReq += data.SalePerson[j].customers[i].MetersReq;

              rows += `<tr>
                        <td style="text-align: center;"></td>                                                   
                        <td   style="text-align: center;"></td>
                        <td  style="text-align: center;">${p_oHeaderData[j].orderDetails[i].cartons}</td>
                        <td colspan="4" style="text-align: left;">${p_oHeaderData[j].orderDetails[i].itemName}</td>
                        <td  style="text-align: center;">${p_oHeaderData[j].orderDetails[i].status}</td>
                        <td style="text-align: center;"></td>
                        <td  style="text-align: center;"></td>
                        <td style="text-align: center;">${p_oHeaderData[j].orderDetails[i].pcsPerDzn}</td>
                        <td style="text-align: center;">${p_oHeaderData[j].orderDetails[i].quantity}</td>
                        <td style="text-align: center;">${p_oHeaderData[j].orderDetails[i].lr}</td>
                        <td style="text-align: center;">${p_oHeaderData[j].orderDetails[i].yds}</td>
                        <td style="text-align: center;"> - </td>
                        <td style="text-align: center;">${p_oHeaderData[j].orderDetails[i].productionStatus}</td>
                        <td style="text-align: center;">${p_oHeaderData[j].orderDetails[i].count}</td>
                      </tr>`;
            }
            rows += 
            `<tr>                                                                                            
            <td style="font-weight: bold;text-align: center;border-right: 0px;"></td>
            <td   style="font-weight: bold;text-align: center;border-right: 0px;"></td>
            <td  style="font-weight: bold;border-left: 0px; text-align: center;font-size:12px">${TCtns}</td>
            <td colspan="4" style="font-weight: bold;text-align: left;border: 0px;"></td>
            <td  style="font-weight: bold;text-align: center;border: 0px;"></td>
            <td style="font-weight: bold;text-align: center;border: 0px;"></td>
            <td  style="font-weight: bold;text-align: center;border: 0px;"></td>
            <td style="font-weight: bold;text-align: center;border: 0px;"></td>
            <td style="font-weight: bold;text-align: center;border: 0px;"></td>
            <td style="font-weight: bold;text-align: center;border: 0px;"></td>
            <td style="font-weight: bold;text-align: center;">${TYardsReq}</td>
            <td style="font-weight: bold;text-align: center;">${TMetersReq}</td>
            <td style="font-weight: bold;text-align: center;border: 0px;"></td>
            <td style="font-weight: bold;text-align: center;border-left: 0px;"></td>
            </tr>`;
          }
          var temp = tableBody.ownerDocument.createElement("div");
          temp.innerHTML = "<table>" + rows + "</table>";
          tableBody.parentNode.replaceChild(temp.firstChild.firstChild, tableBody);
        }
      </script>
    </html>`;
    try {
      var htm = formData;
      //  console.log("HTML => ", html2);
      const { uri } = await Print.printToFileAsync({
        html: formData,
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
    <ScrollView>
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
        headerTitle="P_O Report"
      />

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
      <POReportHeading />
      <POReportHeadersList />
      <ExportPdfBtn />
    </ScrollView>
  );
};

export default PendngOrderListReport;
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
    width: "10%",
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
