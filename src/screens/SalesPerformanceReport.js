import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ProgressDialog } from "react-native-simple-dialogs";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import SalesPerformanceReportCard from "../components/SalesPerformanceReport";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import AppRow from "../components/AppRow";
import SalesPerformanceReportApi from "../api/salesPerformanceReport";
import sizes from "../components/sizes";

const SalesPerformanceReport = ({ navigation }) => {
  const [progressVisible, setprogressVisible] = useState(false);
  const [performanceHeaderData, setPerformanceHeaderData] = useState([]);
  const [loading, setloading] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [date2, setDate2] = useState(new Date(Date.now()));
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isPickerShow2, setIsPickerShow2] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getSalesCommissionReport = async () => {
    setprogressVisible(true);
    const response = await SalesPerformanceReportApi.getSalesPerformanceReport(
      fromDate,
      toDate
    );
    setPerformanceHeaderData(response?.data.data);
    setprogressVisible(false);
  };
  const onFromDateChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
    var date = value.getDate();
    var month = value.getMonth() + 1;
    var year = value.getFullYear();
    var today =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (date < 10 ? "0" + date : date);
    setFromDate(today);
  };
  const onToDateChange = (event, value) => {
    setDate2(value);
    if (Platform.OS === "android") {
      setIsPickerShow2(false);
    }

    var date = value.getDate();
    var month = value.getMonth() + 1;
    var year = value.getFullYear();
    var today =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (date < 10 ? "0" + date : date);
    setToDate(today);
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
              <AppText style={{ colors: colors.secondary, marginLeft: 5 }}>
                {fromDate}
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
            onChange={onFromDateChange}
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
              <AppText style={{ colors: colors.secondary, marginLeft: 5 }}>
                {toDate}
              </AppText>
            </View>
          </Pressable>

          {isPickerShow2 && (
            <DateTimePicker
              value={date2}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={false}
              onChange={onToDateChange}
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
          <TouchableOpacity onPress={() => getSalesCommissionReport()}>
            <AppButton
              text="Get Report"
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
                Export Report{" "}
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
  const commissionReportHeading = () => (
    <>
      <DocDateSelectionView />
      <AppRow style={styles.r1}>
        <AppText style={styles.p2}>Customer Name</AppText>
        <AppText style={styles.p3}>Cartons</AppText>
        <AppText style={styles.p3}>Sales</AppText>
        <AppText style={styles.p3}>Recoveries</AppText>
      </AppRow>
    </>
  );

  const POReportHeadersList = () => {
    return (
      <>
        <FlatList
          data={performanceHeaderData}
          ListHeaderComponent={commissionReportHeading}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <SalesPerformanceReportCard item={item} />;
          }}
          key={(item) => {
            `-${item.id}-${item.slpName}`;
          }}
        />
      </>
    );
  };
  const createAndSavePDF = async () => {
    setloading(true);
    let grandTotalSales = 0;
    let grandTotalRecoveries = 0;

    function generatePDFTemplate() {
      let totalCartons = 0;
      let totalSales = 0;
      let totalRecoveries = 0;

      const tableRows1 = performanceHeaderData
        .map((object) => {
          totalCartons = 0;
          totalSales = 0;
          totalRecoveries = 0;
          return `
          <tr>
            <td style="text-align:left;font-weight:700;font-size:small; ">
              ${object.slpName} 
            </td>
            <td style="font-weight: bold;text-align:center;"></td>
            <td style="font-weight: bold;text-align:center;"></td>
            <td style="font-weight: bold;text-align:center;"></td>
            <td style="font-weight: bold;text-align:center;"></td>
          </tr>
          <div>
          ${object.details
            .map((innerObj) => {
              totalCartons += innerObj.cartons;
              totalSales += innerObj.sales;
              grandTotalSales += innerObj.sales;
              totalRecoveries += innerObj.recoveries;
              grandTotalRecoveries += innerObj.recoveries;

              return `
                <tr>
                  <td style="text-align: left; " >
                    ${innerObj.cardName} 
                  </td>
                  <td style="text-align: center; ">
                    ${innerObj.cartons}
                  </td>  
                  <td style="text-align: center;">
                    ${innerObj.sales}
                  </td>  
                  <td style="text-align: center;">
                  ${innerObj.recoveries}
                </td> 
                <td style="text-align: center;">
                ${innerObj.dueBalance}
              </td> 
                </tr>`;
            })
            .join("")}
          <tr>
            <td style="text-align: center;"></td>
            <td style="text-align: center;font-weight:700;">${
              object.totalCartons
            }</td>
            <td style="text-align: center;font-weight:700;">${
              object.totalSales
            }</td>
            <td style="text-align: center;font-weight:700;">${
              object.totalRecoveries
            }</td>
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
        td:contains("Olympia Trader"") span {
          display: inline;
        }
        
        td span {
          display: none;
        }
        .hide {
          display: none;
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
          Sales Performance Report
        </h4>
      </div>
    </u>


        <div style="text-align: center; margin-bottom: 4px; margin-top: -2%;">
        <h4>Date: <span style="">${fromDate}</span><span style=""> To <span style=""> ${toDate}</span></h4>
      </div>
        <table class="demo">
          <thead style="display: table-header-group; font-weight: 700;">
            <td style="font-weight: bold; text-align: left; ">
              Customer Name 
            </td>
            <td style="font-weight: bold; text-align: center;">Cartons</td>
            <td style="font-weight: bold; text-align: center;">
              Sales
            </td>
            <td style="font-weight: bold; text-align: center;">Recoveries</td>
            <td style="font-weight: bold; text-align: center;">
              Due balance
            </td>
          </thead>
          <tbody style="display: table-header-group;">
            ${tableRows1}
            <tr>
              <td style="text-align:left;font-weight:700;font-size:small;">
                TOTAL SALES:
              </td>
              <td style="font-weight: bold;text-align:center;"></td>
              <td style="font-weight: bold;text-align:center;font-weight: 1500">${grandTotalSales}</td>
              <td style="font-weight: bold;text-align:center;"></td>
              <td style="font-weight: bold;text-align:center;"></td>
            </tr>
            <tr>
              <td style="text-align:left;font-weight:700;font-size:small; ">
                TOTAL RECOVERIES:
              </td>
              <td style="font-weight: bold;text-align:center;"></td>
              <td style="font-weight: bold;text-align:center;"></td>
              <td style="font-weight: bold;text-align:center;font-weight: 1500">${grandTotalRecoveries}</td>
              <td style="font-weight: bold;text-align:center;"></td>
            </tr>
          </tbody>
        </table>
        <table class="demo">
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
        headerTitle="Perfromance Report"
      />
      <ProgressDialog
        visible={progressVisible}
        title="Loading wait"
        message="Plz wait..."
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

export default SalesPerformanceReport;
const styles = StyleSheet.create({
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
    width: "23.3%",
  },
  p4: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 12,
    width: "20%",
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
});
