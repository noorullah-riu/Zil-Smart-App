import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import POReportCard from "../components/POReportCard";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import AppRow from "../components/AppRow";
import POHeaderDetailsApi from "../api/pendingOrderReport";

const PendngOrderListReport = ({ navigation, route }) => {
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
    setprogressVisible(true);
    const response = await POHeaderDetailsApi.getPOHeaderDetails(slpCode);
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
      <>
        <FlatList
          contentContainerStyle={{}}
          data={p_oHeaderData}
          ListHeaderComponent={pOReportHeading}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <POReportCard item={item} />;
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
          GroupYdsTotal = 0;
          let rows = "";
          return `
        <tr>
          <td style="text-align:center;;font-size:small;">
           ${sNum}
          </td>
          <td style="text-align:center;font-weight:700;font-size:small;">
            ${object.docNum}
          </td>
          <td style="text-align:center;font-weight:700;font-size:small;">
            Ctns
          </td>

          <td colspan="4" style="text-align: left; font-weight:700; ">
            ${object.cardName}
          </td>
          <td style="font-weight: bold;text-align: center; "></td>
          <td style="font-weight: bold;text-align: center;">
            ${object.docDate.split(" ")[0]}
          </td>
          <td style="text-align: center;">${
            object.docDueDate.split(" ")[0]
          }</td>
          <td style="font-weight: bold;text-align: center;"></td>
          <td style="font-weight: bold;text-align: center;"></td>
          <td style="font-weight: bold;text-align: center;"></td>
          <td style="font-weight: bold;text-align: center;"></td>
          <td style="font-weight: bold;text-align: center;"></td>
          <td style="font-weight: bold;text-align: center;"></td>
          <td style="font-weight: bold;text-align: center;"></td>
        </tr>
        <div>
        ${object.orderDetails
          .map((innerObj) => {
            const yds = parseFloat(innerObj.yds);
            const cartons = parseFloat(innerObj.cartons);
            GroupCtnsTotal += parseFloat(innerObj.cartons);
            GroupYdsTotal += parseFloat(innerObj.yds);
            GroupMtrsReqTotal = "N.A";
            TotalYds += yds;
            TotalCtns += cartons;

            return `
              <tr>
                <td style="text-align: center;"></td>
                <td style="text-align: center;"></td>
                <td style="text-align: center;">
                  ${cartons}
                </td>
                <td colspan="4" style="text-align: left;">
                  ${innerObj.itemName}
                </td>
                <td style="text-align: center;">
                  ${innerObj.status}
                </td>
                <td style="text-align: center;"></td>
                <td style="text-align: center;"></td>
                <td style="text-align: center;">
                  ${innerObj.pcsPerDzn}
                </td>
                <td style="text-align: center;">
                  ${innerObj.quantity}
                </td>
                <td style="text-align: center;">
                  ${innerObj.lr}
                </td>
                <td style="text-align: center;">
                  ${yds}
                </td>
                <td style="text-align: center;"> N.A </td>
                <td style="text-align: center;">
                  ${innerObj.productionStatus}
                </td>
                <td style="text-align: center;">
                  ${innerObj.count}
                </td>
              </tr>`;
          })
          .join("")}
        <tr>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center; font-weight:700;">${GroupCtnsTotal}</td>
          <td colspan="4" style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;font-weight:700; ">${GroupYdsTotal}</td>
          <td style="text-align: center;font-weight:700; ">${GroupMtrsReqTotal}</td>
          <td  style="text-align: center;"></td>
          <td style="text-align: center;"></td>

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
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }


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
        <body>
          
          <table class="demo14">
            <tr>
                <td style="border-right-width: 0px; border-bottom-width: 0px; font-weight: bold;">
                    <h3 style="margin-top: 30px; margin-left: 47%;">
                        Zakori Industries (Pvt) Limited
                    </h3>
                </td>
               
            </tr>
        </table>
        <div style="text-align: center; margin-bottom: 4px; margin-top: -2%;">
            <h4>Pending Order List</h4>
        </div>
     
    <table class="demo" >
      <thead style="display: table-header-group; font-weight: 700;">
        <td colspan="3" style="font-weight: bold;">Sno</td>
        <td colspan="4" style="font-weight: bold; text-align: left;  ">
            Description
        </td>
        <td style="font-weight: bold; text-align: center;">Status</td>
        <td style="font-weight: bold; text-align: center;">Order Date</td>
        <td style="font-weight: bold; text-align: center;">Dilivery Date</td>
        <td style="font-weight: bold;">Pcs</td>
        <td style="font-weight: bold; text-align: center;">Qty</td>
        <td style="font-weight: bold; text-align: center;">LR's Qty</td>
        <td style="font-weight: bold;">Yds Req</td>
        <td style="font-weight: bold; text-align: center;">Mtrs Req</td>
        <td style="font-weight: bold; text-align: center;">
                Production Status
            </td>
        <td style="font-weight: bold;">Count</td>
      </thead>
      <tbody>
        ${tableRows1}
        <tr>
          <td colspan="2" style="text-align: center;font-weight:1000;">Total</td>
          <td style="text-align: center;font-weight:1000;">${TotalCtns}</td>
          <td colspan="7" style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;font-weight:1000;">${TotalYds}</td>
          <td style="text-align: center;font-weight:1000;">N.A</td>
          <td style="text-align: center; "></td>
          <td style="text-align: center; "></td>
        </tr>
      </tbody>
    </table>
    
    
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
        headerTitle="PO Report"
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
