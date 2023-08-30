import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import AppButton from "../components/AppButton";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import AppText from "../components/AppText";
import draftOrderHeaderApi from "../api/draftOrderHeader";
import DraftOrderDetailCard from "../components/DraftOrderDetailCard";
import draftOrderTableApi from "../api/draftOrderTable";
import postOrderApi from "../api/postOrder";
import { ProgressDialog } from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import saleReportApi from "../api/saleReport";
import InvoiceDetailCard from "../components/InvoiceDetailCard";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { shareAsync } from "expo-sharing";
import { StorageAccessFramework } from "expo-file-system";

const SalesInvoiceDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const [progressVisible, setprogressVisible] = useState(true);
  const [date, setDate] = useState("");
  const [loading, setloading] = useState(false);
  const [draftHeadDetail, setDraftHeadDetail] = useState([]);
  const [draftTableDetail, setDraftTableDetail] = useState([]);

  const [subTotal, setSubTotal] = useState("");
  const [NameC, setNameC] = useState("");
  const [Adress, setAdress] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [DateC, setDateC] = useState("");
  const [InvoiceC, setInvoiceC] = useState("");
  const [DeliveryC, setDeliveryC] = useState("");

  const [grandTotal, setGrandTotal] = useState("");

  const [sosq, setSoSq] = useState({});
  const [saleOrder, setSaleOrder] = useState({});
  const [user, setUserDetails] = useState({});
  const [html2, setHtml2] = useState(``);
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  
  <head>
    <title>Sale Invoice</title>
    <style>
      body {
        margin-left: 10px;
        margin-right: 10px;
      }
  
      h1,
      h2,
      h3,
      h4,
      h4,
      legend,
      h5,
      h6,
      p {
        font-family: Calibri, sans-serif;
        font-style: normal;
      }
  
      .demo {
        border: 0.7px solid gray;
        border-collapse: collapse;
        padding: 5px;
        width: 100%;
        font-size: 10px;
      }
  
      .demo1 {
        border: 0.7px solid gray;
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
        border: 0px solid gray;
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
        width: 31%;
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
        margin-top: 15px;
        width: 130px;
        height: 60px;
        border: 0px solid #000000;
        border-collapse: collapse;
  
  
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
  
      .txtBC {
        font-weight: bold;
        text-align: center;
      }
  
      .txtB {
        font-weight: bold;
      }
    </style>
  </head>
  
  <body>
  
    <table class="demo14">
      <tr>
  
  
        <td style=" width: 34%; border-right-width:
          0px;border-bottom-width: 0px; font-weight: bold;">
          <img src="http://182.180.92.42:5555/Content/34234.PNG" alt="logo" />
        </td>
        <td style=" border-right-width: 0px;border-bottom-width: 0px;font-weight: bold; ">
          <h3 style="margin-top: 50px;text-decoration: underline;text-align: center;">
            Zakori Industries (Pvt) Limited
          </h3>
        </td>
  
        <td style=" width: 34%; border-right-width:
          0px;border-bottom-width: 0px; font-weight: bold;">
        </td>
      </tr>
    </table>
  
    <div style=" background-color: darkgrey; margin-bottom: 4px;margin-top: 10px;text-align: center; ">
      <h4 style="
       text-decoration: underline;
      padding: 10px;
        ">
        Sales Invoice
      </h4>
    </div>
  
    <div class="std-row1">
      <table class="demo1">
        <tr>
          <td style=" width: 10%; border-right-width: 0px;border-bottom-width: 0px;padding-top: 10px; font-weight: bold;">
            To:</td>
          <td colspan="2" style="border-left-width: 0px;border-bottom-width: 0px; padding-top:10px;font-weight:600;">
            ${NameC}</td>
          <td style=" border-right-width: 0px;width: 10%;border-bottom-width:0px;font-weight: bold;">Cnic:</td>
          <td colspan="2" style="border-left-width: 0px;width:30%;border-bottom-width: 0px;">${CNIC}</td>
        </tr>
        <tr>
          <td style=" border-right-width:0px;border-bottom-width: 0px;border-top-width: 0px;font-weight:bold;">Address:
          </td>
          <td colspan="2" style="border-left-width: 0px;border-bottom-width:0px;border-top-width: 0px;">${Adress}
          </td>
          <td style=" border-right-width: 0px;border-bottom-width:0px;border-top-width: 0px;font-weight: bold;">NTN:</td>
          <td colspan="2" style="border-left-width: 0px;border-top-width:0px;border-bottom-width: 0px;">.</td>
        </tr>
        <tr>
          <td style="border-right-width: 0px;border-top-width: 0px;"></td>
          <td colspan="2" style="border-left-width: 0px;border-top-width: 0px;"></td>
          <td
            style="border-left-width: 0.8px; border-right-width:0px;border-bottom-width: 0px;border-top-width: 0px;font-weight:bold;">
            STRN:</td>
          <td colspan="2" style="border-left-width: 0px;border-top-width: 0px;">.</td>
        </tr>
  
      </table>
  
  
      <table class="demo2">
        <tr>
          <td style=" border-right-width: 0px;width: 30%;border-bottom-width:0px;font-weight: bold;">Date:</td>
          <td colspan="2" style="border-left-width: 0px;width:30%;border-bottom-width: 0px;">${DateC}</td>
        </tr>
        <tr>
          <td style=" border-right-width: 0px;border-bottom-width:0px;border-top-width: 0px;font-weight: bold;">Invoice
            No.</td>
          <td colspan="2" style="border-left-width: 0px;border-top-width:0px;border-bottom-width: 0px;">${InvoiceC}</td>
        </tr>
        <tr>
          <td
            style="border-left-width: 0.8px; border-right-width:0px;border-bottom-width: 0px;border-top-width: 0px;font-weight:bold;">
            Delivery No.</td>
          <td colspan="2" style="border-left-width: 0px;border-top-width: 0px;">${DeliveryC}</td>
        </tr>
  
      </table>
    </div>
  
    <table class="demo">
      <tr>
        <td rowspan="2" class="txtBC">Sr#</td>
        <td rowspan="2" class="txtB">Description</td>
        <td colspan="2" class="txtBC">Quantity</td>
        <td colspan="2" class="txtBC">Amount in PKR</td>
        <td colspan="2" class="txtBC">Sales Tax</td>
        <td rowspan="2" class="txtBC">Inclusive Sales Tax(PKR)</td>
      </tr>
  
      <tr>
        <td class="txtBC">Ctns</td>
        <td class="txtBC">Pieces</td>
        <td class="txtBC">Unit Price</td>
        <td class="txtBC">Total</td>
        <td class="txtBC">Rate%</td>
        <td class="txtBC">Amount</td>
      </tr>
  
      `;


      const createAndSavePDF = async () => {
        setloading(true);
        try {
        //  var htm = html1 + html2;
          var htm = htmlContent + html2;
          //  console.log("HTML => ", html2);
          const { uri } = await Print.printToFileAsync({
            html: htmlContent + html2,
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
          setloading(false);
        }
      };

  const createAndSavePDF2 = async () => {
    setloading(true);
    try {
      //   var html = html2;
      var html = htmlContent + html2;
      //  console.log("HTML => ", html2);
      const { uri } = await Print.printToFileAsync({
        /*   html: htmlContent + html2 + html3, */
        html: htmlContent + html2,
        base64: false,
      });
      if (Platform.OS === "ios") {
        await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
        await Sharing.shareAsync(uri);
      } else {
        setloading(false);
        navigation.navigate("PdfView", { uril: html });
        ///   navigation.navigate("PdfView",{uril: htm})
        // setloading(false);
        // alert("Downloaded");
      }
    } catch (error) {
      setloading(false);
      console.error(error);
    }
  };


  const getInvoiceDetail = async () => {
    setprogressVisible(true);
    const response = await saleReportApi.getSalesReportDetail(item.docNum);
    console.log(response.data.data, "----------------Report Invoice Array");
    setprogressVisible(false);
    if (!response.ok) {
      alert("Couldn't retrieve the Order Detail");
      setDraftTableDetail([]);
    } if (response.data) {
    //  console.log(response.data.data, "----------------Report Invoice Array");
      setDraftTableDetail(response.data.data.invoiceDetail);
      setDateC(response?.data.data?.docDate);
      setInvoiceC(response?.data.data?.cardCode);
      setDeliveryC(response?.data.data?.dscription);
      
      setCNIC(response?.data.data?.cnic);
      setNameC(response?.data.data?.cardName);
      setAdress(response?.data.data?.adress);  //ctnsTotal
      var html = ``;
      var totalprice = 0;
      var totalcrtn = 0;
      var totalPrice3 = 0;
      var count = 0;

      response.data?.data?.invoiceDetail?.map((item) => {
          count++;
        //  totalcrtn = totalcrtn + parseInt(item.cartons);
        //   totalPrice3 += parseInt(item.price * item.pcsPerDzn * item.cartons);
        //    totalprice = totalPrice3 + totalprice;
        html +=
          ` 
          <tr>
          <td style="text-align: center;">${count}</td>
          <td style="width: 40%;">${item.description}</td>
          <td style="text-align: center;">${item.ctns}</td>
          <td style="text-align: center;">${item.pieces}</td>
          <td style="text-align: center;">item.price}</td>
          <td style="text-align: center;">${item.totalString}</td>
          <td style="text-align: center;">${item.rate}</td>
          <td style="text-align: center;">${item.amount}</td>
          <td style="text-align: center;">${item.inclusiveSalesTaxString}</td>
        </tr>
        `;
      });

      html += `

      <tr>
      <td style="border-left-color: #ffffff;border-bottom-color: #ffffff;"></td>
      <td style="border-left-width: o.7px;font-weight: bold;text-align:center;">Total</td>
      <td class="txtBC">${response?.data.data?.ctnsTotal}</td>
      <td class="txtBC"></td>
      <td class="txtBC"></td>
      <td class="txtBC">${response?.data.data?.amountTotal}</td>
      <td class="txtBC" colspan="2">0.00</td>
      <td class="txtBC">${response?.data.data?.amountTotal}</td>

    </tr>
    </table>

    <table class="demo3">
      <tr>
        <td style=" border-right-width: 0px;width: 50%;border-bottom-width:
          0px;font-weight: bold;">Total Down Payment:
        </td>
        <td colspan="2" style="border-left-width: 0px;width:
          30%;border-bottom-width: 0px;font-weight: bold;">0.00</td>
      </tr>
      <tr>
        <td style=" border-right-width: 0px;border-bottom-width:
          0px;border-top-width: 0px;font-weight: bold;">Total
          Amount:</td>
        <td colspan="2" style="border-left-width: 0px;border-top-width:
          0px;border-bottom-width: 0px;font-weight: bold;">${response?.data.data?.totalAmount}</td>
      </tr>
    </table>
      <p style="
      text-decoration: underline;
        font-size:12px;
        font-weight: bold;
        margin-top: 40px;
        ">
        Comments:
    <ul class="a">
      <li style="  font-size: 10px; font-weight:
        200;margin-top: 10px;margin-left: 10px;">
        Income Tax Exempted U/S 153
      </li>
    </ul>
    </p>
  
    <P style="
      font-size:12px;
      font-weight: bold;
      ">Remarks:</P>
    <P contenteditable="true" class="Div">${response?.data.data?.remarks}</P>
  
  
    <div class="std-row">
      <div class="box">
        <div style="margin-top: 20px;">
          <div class="std-name-fields">
          </div>
        </div>
        <legend style="text-align: center; padding-top: 8px;font-size: 12px;font-weight: bold;">
          Sales Manager</legend>
  
      </div>
      <div class="box">
        <div style="margin-top: 20px;">
          <div class="std-name-fields">
          </div>
        </div>
        <legend style="text-align: center; padding-top: 8px;font-size: 12px;font-weight: bold;">Finance
          Manager</legend>
  
      </div>
      <div class="box">
        <div style="margin-top: 20px;">
          <div class="std-name-fields">
          </div>
        </div>
        <legend style="text-align: center; padding-top: 8px;font-size: 12px;font-weight: bold;">General
          Manager</legend>
  
      </div>
    </div>
  
    <p style="
        font-size: 12px;
        font-weight: bold;
        text-decoration: underline;
        margin-top: 10px;">Terms And Conditions:</p>
    <P style="
      font-size: 10px;
      margin-top: -6px;
      margin-right: 100px;
      ">
      Please preserve this invoice for future reference.<br />
      All payments to be made by the purchaser/s under the agreement shall be
      made by cheque/bank transfer/cash in favor of <br />
      the Company, and shall be considered to have been received by the
      company only when the amount receivable is<br />
      confirmed as credited into the bank account of the company, the bank
      account/wire transfer details of which shall be<br />
      provided from time to time.<br />
      Zakori Industries (Pvt) Limited will not be responsible for any payment made by the customer to any person other
      than duly<br />
      authorized
    </P>
    <p style=" 
      font-size: 14px;
      font-weight: bold;
      margin-top: 6px;
      text-align: center;">Thank you for doing bussiness with us!</p>
  </body>
  
  <footer class="vertical"></footer>
  <div class="std-row">
    <table class="demo11">
      <tr>
        <td style=" width: 10%; border-right-width: 0px;border-bottom-width:0px; font-weight: bold;font-size: 10px;">
          Address:</td>
  
      </tr>
      <tr>
        <td style="width: 50%; border-right-width: 0px;border-bottom-width:0px;border-top-width: 0px;font-size:10px;">
          Plot No. 186, Industrial Estate Jamrud Road</td>
  
      </tr>
      <tr>
        <td style="border-right-width: 0px;border-top-width: 0px;width:50%;font-size:10px;">Hayatabad, Peshawar, KP,
          Pakistan</td>
  
  
      </tr>
      <tr>
        <td
          style="border-right-width: 0px;border-top-width: 0px;width:50%;font-size:8px;font-weight: bold;font-style: italic;">
          This document is generated from SAP Business One systems of ZIL</td>
      </tr>
  
    </table>
    <table class="demo22">
  
  
      <tr>
        <td style=" border-right-width: 0px;width: 10%;border-bottom-width:
          0px;font-weight: bold;font-size: 8px;font-size: 10px;">
          Tel 1:</td>
        <td colspan="2" style="border-left-width: 0px;width:
          30%;border-bottom-width: 0px;font-size: 8px;">
          +92-91-5822838</td>
      </tr>
      <tr>
        <td style=" border-right-width: 0px;border-bottom-width:
          0px;border-top-width: 0px;font-weight: bold;font-size: 10px;">
          Tel 2:</td>
        <td colspan="2" style="border-left-width: 0px;border-top-width:
          0px;border-bottom-width: 0px;font-size: 8px;">
          +92-91-5810330</td>
      </tr>
      <tr>
        <td style="border-left-width: 1.1px; border-right-width:
          0px;border-bottom-width: 0px;border-top-width: 0px;font-size:
          small;font-weight: bold;font-size: 10px;">
          Email:</td>
        <td colspan="2" style="border-left-width: 0px;border-top-width:
          0px;font-size: 8px;font-style: italic;">
          info@zakorigroup.com</td>
      </tr>
      <tr>
        <td style="border-left-width: 1.1px; border-right-width:
          0px;border-bottom-width: 0px;border-top-width: 0px;font-size:
          small;font-weight: bold;font-size: 10px;">
          Web:</td>
        <td colspan="2" style="border-left-width: 0px;border-top-width:
          0px;font-size: 8px;font-style: italic;">
          https://www.ziltapes.com</td>
      </tr>
  
  
    </table>
  </div>
  </body>
  
  </html>
`;
      setHtml2(html);
    }
  };

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserDetails(JSON.parse(jsonValue));
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getTotal = (item) => {
    const total = item.Quantity * item.Price;
    setSubTotal(total);
  };
  useEffect(() => {
    getUserDetails();
    getInvoiceDetail();
    console.log("itemdetail:", item);
  }, []);

  const [remarks, setRemarks] = useState("");

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };

  const header = () => {
    return (
      <View style={styles.bottomContainer}>
        <AppRow style={styles.row1}>
          <AppText style={styles.p4}>{item.cardName}</AppText>
        </AppRow>
        <AppRow style={styles.deliveryDateView}>
          <AppRow>
            <AppText style={styles.date1}>Discount:</AppText>
            <AppText style={styles.remHeading}>{item.discSum}%</AppText>
          </AppRow>

          <AppRow>
            <AppText style={styles.date1}>NumAtCard: </AppText>
            <AppText style={styles.remHeading}>{item.numAtCard}</AppText>
          </AppRow>
          <AppRow>
            <AppText style={styles.date1}>Total: </AppText>
            <AppText style={styles.remHeading}>
              {item.docCurrency} {item.docTotal}
            </AppText>
          </AppRow>
        </AppRow>

        <AppRow>
          <AppText style={styles.date1}>Remarks: </AppText>
          <AppText multiline style={[{ width: "85%" }, styles.remHeading]}>
            {item.comments}
          </AppText>
        </AppRow>
      </View>
    );
  };

  const renderOrderDetail = () => {
    return (
      <FlatList
        data={draftTableDetail}
        renderItem={({ item, index }) => {
          return <InvoiceDetailCard item={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item.itemCode}
      />
    );
  };
  return (
    <SafeAreaView style={{}}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Order Detail"
      />
      <TouchableOpacity onPress={createAndSavePDF}>
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
      {header()}
      <AppRow style={styles.r1}>
        <AppText style={styles.p1}>Item Name </AppText>
        <AppText style={styles.p2}>Cartons</AppText>
        <AppText style={styles.p3}>Pieces</AppText>
      {/*   <AppText style={styles.p3}>Total</AppText> */}
      </AppRow>

      <View>{renderOrderDetail()}</View>

      <ProgressDialog
        visible={loading}
        title="Exporting Pdf"
        message="Please wait..."
      />
    </SafeAreaView>
  );
};

export default SalesInvoiceDetail;

const styles = StyleSheet.create({
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginBottom: 100,
    marginHorizontal: 10,
  },
  r1: {
    justifyContent: "space-between",
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "40%",
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
  p2: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
  },
  p3: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "20%",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: 75,
    justifyContent: "center",
  },
  bottomContainer: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 0,
    // padding: 10,
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
    width: "22%",
  },
  total: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: 18,
    width: "20%",
  },

  date: {
    marginTop: 35,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  date1: {
    marginVertical: 10,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 1,
  },

  deliveryDateView: {
    justifyContent: "space-between",
  },

  input: {
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  listContainer: {},
  remHeading: {
    color: colors.card_h1,
    fontSize: 12,
  },
  row1: {
    justifyContent: "space-between",
    marginVertical: 2,
  },
  p4: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
});
