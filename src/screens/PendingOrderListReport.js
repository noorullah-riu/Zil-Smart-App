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
import DropDownPicker from "react-native-dropdown-picker";
import allCustomersApi from "../api/allCustomers";


const PendngOrderListReport = ({ navigation, route }) => {
  const [progressVisible, setprogressVisible] = useState(false);
  const [p_oHeaderData, setPOHeaderData] = useState([]);
  const [slp, setSlp] = useState(0);
  const [loading, setloading] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [Customers, setCustomers] = useState([]);
  const [Customer, setCustomer] = useState("");

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    getAllCustomers(JSON.parse(jsonValue).salePersonCode);
    setSlp(JSON.parse(jsonValue).salePersonCode);

    // getPOHeaderData(JSON.parse(jsonValue).salePersonCode);
  };

  const getPOHeaderData = async () => {
    if (Customer == "") {
      alert("Please select customer")
    } else {
      setprogressVisible(true);
      const response = await POHeaderDetailsApi.getPOHeaderDetails(slp, Customer);
    //  console.log(response.data.message, "-------->>>");
      if (response.data.data !== null) {
        console.log(response.data.data, "-------->>>");
        //  console.log(response.data.data[0].orderDetails, "-------->>>");
        setPOHeaderData(response?.data.data);
        setprogressVisible(false);
      } else if(response.data.message == "No record Found") {
        setprogressVisible(false);
        setPOHeaderData([]);
        alert("No record Found")
      }else {
        setprogressVisible(false);
        setPOHeaderData([]);
        alert("Unable to load data,Try again")
      }


    }
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


  const getAllCustomers = async (code) => {
    //  setprogressVisible(true);
    // alert(code)
    const response = await allCustomersApi.getAllCustomers(code);
    // setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customers List");
    setCustomers(response.data.Data);
  };

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
          //    ListFooterComponent={exportPdfBtn}
          key={(item) => {
            `-${item.docNum}-${item.docDate}`;
          }}
        />
      </>
    );
  };
  const createAndSavePDF = async () => {
    if (Customer == "") {
      alert("Please select customer")
    } else {
      setloading(true);
      function generatePDFTemplate() {
        let TotalYds = 0;
        let TotalMtr = 0;
        let TotalCtns = 0;
        let GroupCtnsTotal = 0;
        let GroupYdsTotal = 0;
        let GroupMtrsReqTotal = 0;

        let sNum = 0;

        const tableRows1 = p_oHeaderData
          .map((object) => {
            sNum++;
            GroupCtnsTotal = 0;
            GroupYdsTotal = "";
            let rows = "";
            return `
        <tr>
        <td class="centerSmall">${sNum}</td>
        <td class="centerSmall">${object.docNum}</td>
        <td class="centerSmall">Ctns </td>
        <td colspan="4" style="text-align: left; font-weight:700; ">
          ${object.cardName}
        </td>
        <td></td>
        <td class="fBoldCenter">${object.docDate.split(" ")[0]}</td>
        <td class="txtCenter">${object.docDueDate.split(" ")[0]}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
        <div>
        ${object.orderDetails
                .map((innerObj) => {
                  const yds = innerObj.ydsRequiredInt;
                  const Mtr = innerObj.metersRequiredInt;
                  const cartons = parseFloat(innerObj.remainingCartons);
                  GroupCtnsTotal += parseFloat(innerObj.remainingCartons);
                  GroupYdsTotal += innerObj.ydsRequired;
                  GroupMtrsReqTotal = innerObj.metersRequired;
                  TotalYds += yds;
                  TotalMtr += Mtr;
                  TotalCtns += cartons;

                  return `
                  <tr>
                  <td></td>
                  <td></td>
                  <td class="txtCenter">${innerObj.remainingCartons}</td>
                  <td colspan="4">${innerObj.itemName}</td>
                  <td class="txtCenter">${innerObj.status} </td>
                  <td></td>
                  <td></td>
                  <td class="txtCenter">${innerObj.totalPcs}</td>
                  <td class="txtCenter">${innerObj.remainingQuantity}</td>
                  <td class="txtCenter">${innerObj.lrRemainig}</td>
                  <td class="txtCenter">${innerObj.ydsRequired}</td>
                  <td class="txtCenter">${innerObj.metersRequired}</td>
                  <td class="txtCenter">${innerObj.productionStatus}</td>
                  <td class="txtCenter">${innerObj.count}</td>
                </tr>`;
                })
                .join("")}
        <tr>
        <td></td>
        <td></td>
        <td class="center700">${GroupCtnsTotal}</td>
        <td colspan="4"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="center700">${GroupYdsTotal}</td>
        <td class="center700">${GroupMtrsReqTotal}</td>
        <td></td>
        <td></td>
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
    
        th,
        td {
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
          margin-right: 50px;
          width: 100%;
          font-size: 10px;
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
    
        .fBoldCenter {
          font-weight: bold;
          text-align: center
        }
    
        .fBoldLeft {
          font-weight: bold;
          text-align: left
        }
    
        .centerSmall {
          text-align: center;
          font-weight: 700;
          font-size: small;
        }
    
        .center700 {
          text-align: center;
          font-weight: 700;
        }
    
        .txtCenter {
          text-align: center;
        }
    
        .txtPendng {
          height: 5px;
          text-align: center;
          text-decoration: underline;
        }
    
        .txtZakori {
          height: 5px;
          margin-top: 5px;
          text-align: center;
          text-decoration: underline;
        }
    
        .pDiv {
          border-right-width: 0px;
          border-bottom-width: 0px;
          font-weight: bold;
        }
      </style>
        </head>
        <body>
          
        <table>
        <tr>
          <td class="pDiv">
            <h3 class="txtZakori">
              ZAKORI INDUSTRIES (PVT) LIMITED
            </h3>
          </td>
        </tr>
      </table>
      </u>
      <div>
        <h4 class="txtPendng">
          Pending Order List
        </h4>
      </div>
     
      <table class="demo">
      <thead style="display: table-header-group; font-weight: 700;">
        <td colspan="3" class="fBoldLeft">Sno</td>
        <td colspan="4" class="fBoldLeft">
          Description
        </td>
        <td class="fBoldCenter">Status</td>
        <td class="fBoldCenter">Order Date</td>
        <td class="fBoldCenter">Dilivery Date</td>
        <td class="fBoldCenter">Pcs</td>
        <td class="fBoldCenter">Qty</td>
        <td class="fBoldCenter">LR's Qty</td>
        <td class="fBoldCenter">Yds Req</td>
        <td class="fBoldCenter">Mtrs Req</td>
        <td class="fBoldCenter">Production Status</td>
        <td class="fBoldLeft">Count</td>
      </thead>

      <tbody>
        ${tableRows1}
        <div style="margin-top: 10px;">
        </div>
     <tr>
        <td colspan="2" class="center700">Total</td>
        <td class="center700">${TotalCtns}</td>
        <td colspan="7"></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="center700">${TotalYds}</td>
        <td class="center700">${TotalMtr}</td>
        <td></td>
        <td></td>
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
        message="Please wait it can take longer..."
      />

      <View
        style={{ marginHorizontal: 10, marginVertical: 20 }}
      >
        <AppText style={{}}>Select Customer</AppText>
        <View style={styles.picker}>
          <DropDownPicker
            open={open}
            value={value}
            // items={items}
            items={Customers?.map(option => ({
              label: option.CardName,
              value: option.CardCode,
            }))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setCustomers}
            listMode="MODAL"
            onSelectItem={item => {
              setCustomer(item.value)
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => getPOHeaderData()}
          style={{ width: "50%" }}
        >
          <AppButton
            text="Get Data"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => createAndSavePDF()}
          style={{ width: "50%" }}
        >
          <AppButton
            text="Export pdf"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity>
      </View>
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
