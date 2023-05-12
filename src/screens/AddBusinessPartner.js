import React, { useContext, useEffect, useState } from "react";
import AppText from "../components/AppText";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import allCustomersApi from "../api/allCustomers";
import { ProgressDialog } from "react-native-simple-dialogs";
import { customersList } from "../context/customresList";
import postOrder from "../api/postOrder";

const AddBusinessPartner = ({ navigation, route }) => {
  const [progressVisible, setprogressVisible] = useState(false);
  const [name, setname] = useState("");
  const [creditDays, setCreditDays] = useState("");
  const [ApprovedCreditLimit, setApprovedCreditLimit] = useState("");
  const [address, setAddress] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [officePh, setOfficePh] = useState("");
  const [residentialNo, setResidentialNo] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [coBusinessPartner, setCoBusinessPartner] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [entity, setEntity] = useState("");
  const [entity1, setEntity1] = useState("");
  const [isSelected, setSelection] = useState(false);
  const { customers } = useContext(customersList);
  const [customerList, setCustomers] = useState([]);
  const [CardCode, setCardCode] = useState({});
  const [AccountBalance, setAccountBalance] = useState({});
  const [CreditLimit, setCreditLimit] = useState({});
  const [RemainingLimit, setRemainingLimit] = useState({});
  const [TotalDiscount, setTotalDiscount] = useState({});
  const [Phone1, setPhone1] = useState({});
  const [Phone2, setPhone2] = useState({});
  const [CardForeignName, setCardForeignName] = useState({});
  const [WTCode, setWTCode] = useState({});
  const [WTName, setWTName] = useState({});
  const [AcctName, setAcctName] = useState({});
  const [Rate, setRate] = useState({});
  const [AcctCode, setAcctCode] = useState({});
  const [WhsName, setWhsName] = useState({});
  const [WhsCode, setWhsCode] = useState({});
  const [GroupNum, setGroupNum] = useState({});
  const [listName, setlistName] = useState({});
  const [listNum, setlistNum] = useState({});
  const [PricelistNum, setPricelistNum] = useState({});
  const [Industory, setIndustory] = useState({});
  const [CustomerLegalEntity, setCustomerLegalEntity] = useState({});
  const [territryID, setterritryID] = useState({});
  const [Name, setName] = useState({});
  const [Code, setCode] = useState({});
  const [OcrCode, setocrCode] = useState({});
  const [OcrName, setocrName] = useState({});
  const [DiscRel, setdescript] = useState({});
  const [parent, setparent] = useState({});
  const [GroupName, setgroupName] = useState({});
  const [CurrCode, setcurrCode] = useState({});
  const [ChkName, setchkName] = useState({});
  const [IndCode, setindCode] = useState({});
  const [IndCodeForBp, setindCodeForBp] = useState({});
  const [IndName, setindName] = useState({});
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [PaymentGroup, setpaymentGroup] = useState({});
  const [ShipAddress, setShipAddress] = useState({});
  const [PriceCode, setPriceCode] = useState({});
  const [PriceName, setPriceName] = useState({});
  const [GroupCode, setGroupCode] = useState({});
  const [GroupCodeS, setGroupCodeS] = useState({});
  const [MailAddres, setMailAddres] = useState({});
  const [CashCustomer, setCashCustomer] = useState({});
  const [IsSpecial, setIsSpecial] = useState({});
  const [EcVatGroup, setEcVatGroup] = useState({});
  const [VatRate, setVatRate] = useState({});
  const [U_Adv_IT, setU_Adv_IT] = useState({});
  const [U_alwbrmtx, setU_alwbrmtx] = useState({});
  const [AddressCode, setAddressCode] = useState({});
  const [U_MRP_TAX_Rate, setU_MRP_TAX_Rate] = useState({});
  const [U_Adv_IT_Rate, setU_Adv_IT_Rate] = useState({});
  const [CreditLine, setCreditLine] = useState({});
  const [Balance, setBalance] = useState({});
  const [CNIC, setCNIC] = useState({});
  const [PDC_Cheque_Received, setPDC_Cheque_Received] = useState({});
  const [U_WhsCode, setU_WhsCode] = useState({});
  const [CellNo, setCellNo] = useState({});
  const [NTN, setNTN] = useState({});
  const [STRN, setSTRN] = useState({});
  const [Notes, setNotes] = useState({});
  const [CustomerGroup, setCustomerGroup] = useState({});
  const [ObjectCode, setObjectCode] = useState({});
  const [Series, setSeries] = useState({});
  const [SeriesName, setSeriesName] = useState({});
  const [NextNumber, setNextNumber] = useState({});
  const [BeginStr, setBeginStr] = useState({});
  const [Remark, setRemark] = useState({});
  const [NumSize, setNumSize] = useState({});
  const [SlpCode, setSlpCode] = useState({});
  const [SlpCodeForBP, setSlpCodeForBP] = useState({});
  const [SlpName, setSlpName] = useState({});
  const [U_SalesType, setU_SalesType] = useState({});
  const [PaymentTerm, setPaymentTerm] = useState({});
  const [EffectiveDiscount, setEffectiveDiscount] = useState({});
  const [ConsolidatingBP, setConsolidatingBP] = useState({});
  const [ConsolidatingBPType, setConsolidatingBPType] = useState({});
  const [AccountReceivable, setAccountReceivable] = useState({});
  const [DownPaymentClearingAccount, setDownPaymentClearingAccount] = useState(
    {}
  );
  const [DownPaymentInterimAccount, setDownPaymentInterimAccount] = useState(
    {}
  );

  const createobj = () => {
    let obj = {
      // MainParty: isSelected,
      // SubPartyOf: coBusinessPartner,
      // CompanyName: companyName,
      // CustomerName: name,
      // Email: email,
      // ResidentialNo: residentialNo,
      // Fax: fax,
      // OfficePh: officePh,
      // warehouseAddress: warehouseAddress,
      // PhAreaCode: areaCode,
      // MailingAddress: address,
      // PaymentTerms: paymentTerms,
      // ApprovedCreditDays: creditDays,
      // ApprovedCreditLimit: ApprovedCreditLimit,

      // City: city, in addresslistforbillto, ship to
      // Mobile: mobile, in contact person list

      CustomerLegalEntity: entity1,

      // Natureofbusiness: entity,
      // cardCode: CardCode, uncomment later
      // fishy
      // accountBalance: AccountBalance,
      // creditLimit: CreditLimit,
      // remainingLimit: RemainingLimit,
      // totalDiscount: TotalDiscount,
      // phone1: Phone1,
      // phone2: Phone2,
      // cardForeignName: CardForeignName,infinite null value

      cardType: cardType,

      // wtCode: WTCode,
      // wtName: WTName,
      // acctName: AcctName, ??? infinite value
      // rate: Rate,
      // acctCode: AcctCode,infinite null value
      // whsName: WhsName,
      // whsCode: WhsCode,
      // groupNum: GroupNum,
      // listName: listName,
      // listNum: listNum,
      // pricelistNum: PricelistNum,
      // industory: Industory,
      // customerLegalEntity: CustomerLegalEntity,
      // territryID: territryID,
      // Name: Name, // extra, infinite null value
      // code: Code,
      // ocrCode: OcrCode,
      // ocrName: OcrName,
      // descript: DiscRel,
      // parent: parent,
      // groupName: GroupName,
      // currCode: CurrCode,
      // chkName: ChkName,
      // indCode: IndCode,
      // indCodeForBp: IndCodeForBp,
      // indName: IndName,

      cardName: cardName,

      // paymentGroup: PaymentGroup,
      // shipAddress: ShipAddress,
      // priceCode: PriceCode,
      // priceName: PriceName,
      // groupCode: GroupCode,
      // groupCodeS: GroupCodeS,
      // mailAddres: MailAddres,
      // cashCustomer: CashCustomer,
      // discRel: DiscRel,
      // isSpecial: IsSpecial,
      // ecVatGroup: EcVatGroup,
      // vatRate: VatRate,
      // u_Adv_IT: U_Adv_IT,
      // u_alwbrmtx: U_alwbrmtx,
      // addressCode: AddressCode, getting infinite null vals
      // u_MRP_TAX_Rate: U_MRP_TAX_Rate,
      // u_Adv_IT_Rate: U_Adv_IT_Rate,
      // creditLine: CreditLine,
      // balance: Balance, getting 0's, extra
      // cnic: CNIC,
      // pdC_Cheque_Received: PDC_Cheque_Received,
      // u_WhsCode: U_WhsCode,
      // cellNo: CellNo,
      // ntn: NTN,
      // strn: STRN,
      // notes: Notes,
      // customerGroup: CustomerGroup,
      // objectCode: ObjectCode,
      // series: Series,
      // seriesName: SeriesName,
      // nextNumber: NextNumber,
      // beginStr: BeginStr, // extra
      // remark: Remark,
      // numSize: NumSize,
      // slpCode: SlpCode,
      // slpCodeForBP: SlpCodeForBP,
      // slpName: SlpName,
      // u_SalesType: U_SalesType,
      // paymentTerm: PaymentTerm,
      // effectiveDiscount: EffectiveDiscount,
      // consolidatingBP: ConsolidatingBP,
      // consolidatingBPType: ConsolidatingBPType,
      // accountReceivable: AccountReceivable, infinite null value
      // downPaymentClearingAccount: DownPaymentClearingAccount,
      // downPaymentInterimAccount: DownPaymentInterimAccount,
      series: 78,
      slpCodeForBP: 10,
    };
    // console.log("createobj1::", obj);
    postPartner(obj);
  };

  useEffect(() => {
    // getUserDetails();
  }, []);
  const getAllCustomers = async (code, territory) => {
    // console.log("getAllCustomers, slpcode", code);
    // console.log("getAllCustomers,territory", territory);
    setprogressVisible(true);
    const response = await allCustomersApi.getAllCustomers(code, territory);
    setprogressVisible(false);
    // console.log("customersList", response.data);

    // let objs = [response.data.Data];
    // setfullCustomers(objs);
    //  console.log(setfullCustomers);
    // console.log(objs.AccountBalance);
    //1
    var CardCode = [];
    response.data.Data.map((item) => {
      // console.log("item.CardCode", item.CardCode);

      CardCode.push({ cardCode: item.CardCode });
    });
    setCardCode(CardCode);
    //2
    var AccountBalance = [];
    response.data.Data.map((item) => {
      AccountBalance.push({ accountBalance: item.AccountBalance });
    });
    setAccountBalance(AccountBalance);
    //3
    var CreditLimit = [];
    response.data.Data.map((item) => {
      CreditLimit.push({ creditLimit: item.CreditLimit });
    });
    setCreditLimit(CreditLimit);

    var RemainingLimit = [];
    response.data.Data.map((item) => {
      RemainingLimit.push({ remainingLimit: item.RemainingLimit });
    });
    setRemainingLimit(RemainingLimit);

    var TotalDiscount = [];
    response.data.Data.map((item) => {
      TotalDiscount.push({ totalDiscount: item.TotalDiscount });
    });
    setTotalDiscount(TotalDiscount);

    var Phone1 = [];
    response.data.Data.map((item) => {
      Phone1.push({ phone1: item.Phone1 });
    });
    setPhone1(Phone1);

    var Phone2 = [];
    response.data.Data.map((item) => {
      Phone2.push({ phone2: item.Phone2 });
    });
    setPhone2(Phone2);

    var CardForeignName = [];
    response.data.Data.map((item) => {
      CardForeignName.push({ cardForeignName: item.CardForeignName });
    });
    setCardForeignName(CardForeignName);

    var CardType = [];
    response.data.Data.map((item) => {
      CardType.push({ cardType: item.CardType });
    });
    setCardType(CardType);

    var WTCode = [];
    response.data.Data.map((item) => {
      WTCode.push({ wtCode: item.WTCode });
    });
    setWTCode(WTCode);

    var WTName = [];
    response.data.Data.map((item) => {
      WTName.push({ wtName: item.WTName });
    });
    setWTName(WTName);

    var AcctName = [];
    response.data.Data.map((item) => {
      // console.log("item.AcctName", item.AcctName);
      AcctName.push({ acctName: item.AcctName });
    });
    setAcctName(AcctName);

    var Rate = [];
    response.data.Data.map((item) => {
      Rate.push({ rate: item.Rate });
    });
    setRate(Rate);

    var AcctCode = [];
    response.data.Data.map((item) => {
      // console.log("item.AcctCode", item.AcctCode);
      AcctCode.push({ acctCode: item.AcctCode });
    });
    setAcctCode(AcctCode);

    var WhsName = [];
    response.data.Data.map((item) => {
      WhsName.push({ whsName: item.WhsName });
    });
    setWhsName(WhsName);

    var WhsCode = [];
    response.data.Data.map((item) => {
      WhsCode.push({ whsCode: item.WhsCode });
    });
    setWhsCode(WhsCode);

    var GroupNum = [];
    response.data.Data.map((item) => {
      GroupNum.push({ groupNum: item.GroupNum });
    });
    setGroupNum(GroupNum);

    var listName = [];
    response.data.Data.map((item) => {
      listName.push({ listName: item.listName });
    });
    setlistName(listName);

    var listNum = [];
    response.data.Data.map((item) => {
      listNum.push({ listNum: item.listNum });
    });
    setlistNum(listNum);

    var PricelistNum = [];
    response.data.Data.map((item) => {
      PricelistNum.push({ pricelistNum: item.PricelistNum });
    });
    setPricelistNum(PricelistNum);

    var Industory = [];
    response.data.Data.map((item) => {
      Industory.push({ industory: item.Industory });
    });
    setIndustory(Industory);

    var CustomerLegalEntity = [];
    response.data.Data.map((item) => {
      CustomerLegalEntity.push({
        customerLegalEntity: item.CustomerLegalEntity,
      });
    });
    setCustomerLegalEntity(CustomerLegalEntity);

    var territryID = [];
    response.data.Data.map((item) => {
      territryID.push({ territryID: item.territryID });
    });
    setterritryID(territryID);

    var Name = [];
    response.data.Data.map((item) => {
      // console.log("item.Name", item.Name);
      Name.push({ Name: item.Name });
    });
    setName(Name);

    var Code = [];
    response.data.Data.map((item) => {
      Code.push({ code: item.Code });
    });
    setCode(Code);

    var OcrCode = [];
    response.data.Data.map((item) => {
      OcrCode.push({ ocrCode: item.OcrCode });
    });
    setocrCode(OcrCode);

    var OcrName = [];
    response.data.Data.map((item) => {
      OcrName.push({ ocrName: item.OcrName });
    });
    setocrName(OcrName);

    var DiscRel = [];
    response.data.Data.map((item) => {
      DiscRel.push({ descript: item.DiscRel });
    });
    setdescript(DiscRel);

    var parent = [];
    response.data.Data.map((item) => {
      parent.push({ parent: item.parent });
    });
    setparent(parent);

    var GroupName = [];
    response.data.Data.map((item) => {
      GroupName.push({ groupName: item.GroupName });
    });
    setgroupName(GroupName);

    var CurrCode = [];
    response.data.Data.map((item) => {
      CurrCode.push({ currCode: item.CurrCode });
    });
    setcurrCode(CurrCode);

    var ChkName = [];
    response.data.Data.map((item) => {
      ChkName.push({ chkName: item.ChkName });
    });
    setchkName(ChkName);

    var IndCode = [];
    response.data.Data.map((item) => {
      IndCode.push({ indCode: item.IndCode });
    });
    setindCode(IndCode);

    var IndCodeForBp = [];
    response.data.Data.map((item) => {
      IndCodeForBp.push({ indCodeForBp: item.IndCodeForBp });
    });
    setindCodeForBp(IndCodeForBp);

    var IndName = [];
    response.data.Data.map((item) => {
      IndName.push({ indName: item.IndName });
    });
    setindName(IndName);

    var CardName = [];
    response.data.Data.map((item) => {
      CardName.push({ cardName: item.CardName });
    });
    setcardName(CardName);

    var PaymentGroup = [];
    response.data.Data.map((item) => {
      PaymentGroup.push({ paymentGroup: item.PaymentGroup });
    });
    setpaymentGroup(PaymentGroup);

    /////////////

    var ShipAddress = [];
    response.data.Data.map((item) => {
      ShipAddress.push({ shipAddress: item.ShipAddress });
    });
    setShipAddress(ShipAddress);

    var PriceCode = [];
    response.data.Data.map((item) => {
      PriceCode.push({ priceCode: item.PriceCode });
    });
    setPriceCode(PriceCode);

    var PriceName = [];
    response.data.Data.map((item) => {
      PriceName.push({ priceName: item.PriceName });
    });
    setPriceName(PriceName);

    var GroupCode = [];
    response.data.Data.map((item) => {
      GroupCode.push({ groupCode: item.GroupCode });
    });
    setGroupCode(GroupCode);

    var GroupCodeS = [];
    response.data.Data.map((item) => {
      GroupCodeS.push({ groupCodeS: item.GroupCodeS });
    });
    setGroupCodeS(GroupCodeS);

    var MailAddres = [];
    response.data.Data.map((item) => {
      MailAddres.push({ mailAddres: item.MailAddres });
    });
    setMailAddres(MailAddres);

    var CashCustomer = [];
    response.data.Data.map((item) => {
      CashCustomer.push({ cashCustomer: item.CashCustomer });
    });
    setCashCustomer(CashCustomer);

    var PaymentGroup = [];
    response.data.Data.map((item) => {
      PaymentGroup.push({ paymentGroup: item.PaymentGroup });
    });
    setpaymentGroup(PaymentGroup);

    var IsSpecial = [];
    response.data.Data.map((item) => {
      IsSpecial.push({ isSpecial: item.IsSpecial });
    });
    setIsSpecial(IsSpecial);

    var EcVatGroup = [];
    response.data.Data.map((item) => {
      EcVatGroup.push({ ecVatGroup: item.EcVatGroup });
    });
    setEcVatGroup(EcVatGroup);

    var VatRate = [];
    response.data.Data.map((item) => {
      VatRate.push({ vatRate: item.VatRate });
    });
    setVatRate(VatRate);

    var U_Adv_IT = [];
    response.data.Data.map((item) => {
      U_Adv_IT.push({ u_Adv_IT: item.U_Adv_IT });
    });
    setU_Adv_IT(U_Adv_IT);

    var U_alwbrmtx = [];
    response.data.Data.map((item) => {
      U_alwbrmtx.push({ u_alwbrmtx: item.U_alwbrmtx });
    });
    setU_alwbrmtx(U_alwbrmtx);

    var AddressCode = [];
    response.data.Data.map((item) => {
      AddressCode.push({ addressCode: item.AddressCode });
    });
    setAddressCode(AddressCode);

    var U_MRP_TAX_Rate = [];
    response.data.Data.map((item) => {
      U_MRP_TAX_Rate.push({ u_MRP_TAX_Rate: item.U_MRP_TAX_Rate });
    });
    setU_MRP_TAX_Rate(U_MRP_TAX_Rate);

    var U_Adv_IT_Rate = [];
    response.data.Data.map((item) => {
      U_Adv_IT_Rate.push({ u_Adv_IT_Rate: item.U_Adv_IT_Rate });
    });
    setU_Adv_IT_Rate(U_Adv_IT_Rate);

    var CreditLine = [];
    response.data.Data.map((item) => {
      CreditLine.push({ creditLine: item.CreditLine });
    });
    setCreditLine(CreditLine);

    var Balance = [];
    response.data.Data.map((item) => {
      Balance.push({ balance: item.Balance });
    });
    setBalance(Balance);

    var CNIC = [];
    response.data.Data.map((item) => {
      CNIC.push({ cnic: item.CNIC });
    });
    setCNIC(CNIC);

    var PDC_Cheque_Received = [];
    response.data.Data.map((item) => {
      PDC_Cheque_Received.push({
        pdC_Cheque_Received: item.PDC_Cheque_Received,
      });
    });
    setPDC_Cheque_Received(PDC_Cheque_Received);

    var U_WhsCode = [];
    response.data.Data.map((item) => {
      U_WhsCode.push({ u_WhsCode: item.U_WhsCode });
    });
    setU_WhsCode(U_WhsCode);

    var CellNo = [];
    response.data.Data.map((item) => {
      CellNo.push({ cellNo: item.CellNo });
    });
    setCellNo(CellNo);

    var NTN = [];
    response.data.Data.map((item) => {
      NTN.push({ ntn: item.NTN });
    });
    setNTN(NTN);

    var STRN = [];
    response.data.Data.map((item) => {
      STRN.push({ strn: item.STRN });
    });
    setSTRN(STRN);

    var Notes = [];
    response.data.Data.map((item) => {
      Notes.push({ notes: item.Notes });
    });
    setNotes(Notes);

    var CustomerGroup = [];
    response.data.Data.map((item) => {
      CustomerGroup.push({ customerGroup: item.CustomerGroup });
    });
    setCustomerGroup(CustomerGroup);

    var ObjectCode = [];
    response.data.Data.map((item) => {
      ObjectCode.push({ objectCode: item.ObjectCode });
    });
    setObjectCode(ObjectCode);

    var Series = [];
    response.data.Data.map((item) => {
      Series.push({ series: item.Series });
    });
    setSeries(Series);

    var SeriesName = [];
    response.data.Data.map((item) => {
      SeriesName.push({ seriesName: item.SeriesName });
    });
    setSeriesName(SeriesName);

    var NextNumber = [];
    response.data.Data.map((item) => {
      NextNumber.push({ nextNumber: item.NextNumber });
    });
    setNextNumber(NextNumber);

    var BeginStr = [];
    response.data.Data.map((item) => {
      BeginStr.push({ beginStr: item.BeginStr });
    });
    setBeginStr(BeginStr);

    var Remark = [];
    response.data.Data.map((item) => {
      Remark.push({ remark: item.Remark });
    });
    setRemark(Remark);

    var NumSize = [];
    response.data.Data.map((item) => {
      NumSize.push({ numSize: item.NumSize });
    });
    setNumSize(NumSize);

    var SlpCode = [];
    response.data.Data.map((item) => {
      SlpCode.push({ slpCode: item.SlpCode });
    });
    setSlpCode(SlpCode);

    var SlpCodeForBP = [];
    response.data.Data.map((item) => {
      // console.log("slpCode", item.slpCode);
      SlpCodeForBP.push({ slpCodeForBP: item.SlpCodeForBP });
    });
    setSlpCodeForBP(SlpCodeForBP);

    var SlpName = [];
    response.data.Data.map((item) => {
      SlpName.push({ slpName: item.SlpName });
    });
    setSlpName(SlpName);

    var U_SalesType = [];
    response.data.Data.map((item) => {
      U_SalesType.push({ u_SalesType: item.U_SalesType });
    });
    setU_SalesType(U_SalesType);

    var PaymentTerm = [];
    response.data.Data.map((item) => {
      PaymentTerm.push({ paymentTerm: item.PaymentTerm });
    });
    setPaymentTerm(PaymentTerm);

    var EffectiveDiscount = [];
    response.data.Data.map((item) => {
      EffectiveDiscount.push({ effectiveDiscount: item.EffectiveDiscount });
    });
    setEffectiveDiscount(EffectiveDiscount);

    var ConsolidatingBP = [];
    response.data.Data.map((item) => {
      ConsolidatingBP.push({ consolidatingBP: item.ConsolidatingBP });
    });
    setConsolidatingBP(ConsolidatingBP);

    var ConsolidatingBPType = [];
    response.data.Data.map((item) => {
      ConsolidatingBPType.push({
        consolidatingBPType: item.ConsolidatingBPType,
      });
    });
    setConsolidatingBPType(ConsolidatingBPType);

    var AccountReceivable = [];
    response.data.Data.map((item) => {
      // console.log("item.AccountReceivable", item.AccountReceivable);
      AccountReceivable.push({ accountReceivable: item.AccountReceivable });
    });
    setAccountReceivable(AccountReceivable);

    var DownPaymentClearingAccount = [];
    response.data.Data.map((item) => {
      DownPaymentClearingAccount.push({
        downPaymentClearingAccount: item.DownPaymentClearingAccount,
      });
    });
    setDownPaymentClearingAccount(DownPaymentClearingAccount);

    var DownPaymentInterimAccount = [];
    response.data.Data.map((item) => {
      DownPaymentInterimAccount.push({
        downPaymentInterimAccount: item.DownPaymentInterimAccount,
      });
    });
    setDownPaymentInterimAccount(DownPaymentInterimAccount);

    if (!response.ok)
      return Alert.alert("Couldn't retrieve the customers List");
    var cust = [];
    response.data.Data.map((item) => {
      cust.push({ label: item.CardName, value: item.CardCode });
    });

    setCustomers(cust);
  };
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    console.log("user_Details", JSON.parse(jsonValue));
    const jsonValue1 = await AsyncStorage.getItem("@customer_Details");
    console.log("customer_Details", JSON.parse(jsonValue1));
    if (!customers.length > 0)
      getAllCustomers(
        JSON.parse(jsonValue).salePersonCode,
        JSON.parse(jsonValue).territory
      );
    else {
      let cust = [];
      customers.map((item) => {
        cust.push({ label: item.CardName, value: item.CardCode });
      });

      setCustomers(cust);
    }
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };
  const postPartner = async (obj) => {
    setprogressVisible(true);
    const response = await postOrder.PostPartner(obj);
    console.log("saleOrder response:", response.data, response.data.Message);
    setprogressVisible(false);

    if (response.data.code === 0) {
      Alert.alert("Success", "Successfully Posted Partner!", [{ text: "OK" }]);
      navigation.navigate("Home");
    } else {
      Alert.alert("Error", response.data.Message, [{ text: "OK" }]);
    }

    if (!response.ok) return Alert.alert("Unable to post");
  };

  const pickerStyle = {
    inputAndroid: {
      color: "black",
      padding: 0,
      margin: 0,
    },
  };
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={{ paddingBottom: 10 }}>
        <AppHeader
          backBtnOnly
          title="Back"
          bckBtnImg={require("../assets/back-button.png")}
          navigation={navigation}
          headerTitle="Business Partner"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 10 }}>
          <View style={styles.checkboxContainer}>
            <AppText style={styles.label}>Main Party*</AppText>
            <Checkbox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
          </View>
        </View>
        {!isSelected && (
          <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
            <AppText style={styles.label}>Sub Party of*</AppText>
            <View style={styles.picker}>
              <RNPickerSelect
                onValueChange={(value, indx) => setCoBusinessPartner(value)}
                items={customerList}
                placeholder={{
                  label: "Select Business Partner",
                  value: null,
                }}
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
              />
            </View>
          </View>
        )}
        <View style={styles.row}>
          <View style={styles.childView}>
            <AppText style={styles.label}>Company name</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Customer Name"
              value={companyName}
              onChangeText={(value) => setCompanyName(value)}
            />
          </View>
          <View style={styles.childView}>
            <AppText style={styles.label}>City</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Customer Name"
              value={city}
              onChangeText={(value) => setCity(value)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.childView}>
            <AppText style={styles.label}>Customer Name</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Customer Name"
              value={name}
              onChangeText={(value) => setname(value)}
            />
          </View>
          <View style={styles.childView}>
            <AppText style={styles.label}>Mobile</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile"
              value={mobile}
              onChangeText={(value) => setMobile(value)}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.childView}>
            <AppText style={styles.label}>E-mail</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter E-mail"
              value={email}
              keyboardType={"email"}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View style={styles.childView}>
            <AppText style={styles.label}>Fax</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Fax no"
              value={fax}
              onChangeText={(value) => setFax(value)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.childView}>
            <AppText style={styles.label}>Ph Area Code</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Ph Area Code"
              value={areaCode}
              onChangeText={(value) => setAreaCode(value)}
            />
          </View>
          <View style={styles.childView}>
            <AppText style={styles.label}>Residential no</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Residential no"
              value={residentialNo}
              onChangeText={(value) => setResidentialNo(value)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.childView}>
            <AppText style={styles.label}>Office Ph #</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Office Ph #"
              value={officePh}
              onChangeText={(value) => setOfficePh(value)}
            />
          </View>
          <View style={styles.childView}>
            <AppText style={styles.label}>Warehouse Address</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter Warehouse Address"
              value={warehouseAddress}
              onChangeText={(value) => setWarehouseAddress(value)}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>Mailing Address</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter Mailing Address"
            value={address}
            onChangeText={(value) => setAddress(value)}
          />
        </View>

        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 10 }}
        >
          <AppText style={styles.label}>Payment Terms</AppText>
          <View style={styles.picker}>
            <RNPickerSelect
              onValueChange={(value, indx) => setPaymentTerms(value)}
              items={[
                { label: "Advance", value: "Advance" },
                { label: "COD", value: "COD" },
                { label: "Credit", value: "Credit" },
              ]}
              placeholder={{
                label: "Select Payment Terms",
                value: null,
              }}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.childView}>
            <AppText style={styles.label}>Approved Credit Days</AppText>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter Credit Days"
              value={creditDays}
              onChangeText={(value) => setCreditDays(value)}
            />
          </View>
          <View style={styles.childView}>
            <AppText style={styles.label}>Approved Credit Limit</AppText>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter Credit Limit"
              value={ApprovedCreditLimit}
              onChangeText={(value) => setApprovedCreditLimit(value)}
            />
          </View>
        </View>
        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 10 }}
        >
          <AppText style={styles.label}>Card Type </AppText>
          <View style={styles.picker}>
            <RNPickerSelect
              name={"Card Type"}
              onValueChange={(value, indx) => setCardType(value)}
              items={[
                { label: "Vendor", value: "S" },
                { label: "Customer", value: "C" },
                { label: "Lead", value: "L" },
              ]}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <AppText style={styles.label}>Card Name</AppText>
          <TextInput
            style={styles.input}
            placeholder="Enter Card Name"
            value={cardName}
            onChangeText={(value) => setCardName(value)}
          />
        </View>
        <View
          style={{ marginHorizontal: sizes.base_margin, marginVertical: 10 }}
        >
          <AppText style={styles.label}>Customer Legal Entity </AppText>
          <View style={styles.picker}>
            <RNPickerSelect
              name={"Legal Entity"}
              onValueChange={(value, indx) => setEntity1(value)}
              items={[
                { label: "Company", value: "C" },
                { label: "Private", value: "P" },
                { label: "Government", value: "G" },
                { label: "Employee", value: "E" },
              ]}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
            />
          </View>
        </View>

        <View
          style={{
            marginHorizontal: sizes.base_margin,
            marginVertical: 10,
            marginBottom: 50,
          }}
        >
          <AppText style={styles.label}>Nature of business*</AppText>
          <View style={styles.picker}>
            <RNPickerSelect
              name={"Business Nature"}
              onValueChange={(value, indx) => setEntity(value)}
              items={[
                { label: "Manufacturer", value: "Manufacturer" },
                { label: "Wholesaler", value: "Wholesaler" },
                { label: "Distributor", value: "Distributor" },
                { label: "Commercial Importer", value: "Commercial Importer" },
                { label: "Retailer", value: "Retailer" },
                { label: "Exporter", value: "Exporter" },
              ]}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
            />
          </View>
        </View>
      </ScrollView>
      <ProgressDialog
        visible={progressVisible}
        title="Adding Business Partner"
        message="Please wait..."
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={createobj} style={styles.loginBtnStyle}>
          <AppButton text="Next" iconFreeButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddBusinessPartner;
const styles = StyleSheet.create({
  label: {
    color: colors.secondary,
    fontSize: sizes.normal_font,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  row: {
    marginHorizontal: sizes.base_margin,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  picker: {
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
  childView: {
    marginTop: 1,
    width: "48%",
  },
  input: {
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryPickerContainer: {
    paddingHorizontal: sizes.base_margin,
    paddingVertical: 10,
    marginHorizontal: 15,
    borderRadius: 4,
    height: 39,
    backgroundColor: colors.white,
  },
  bPartnerPickerContainer: {
    paddingHorizontal: sizes.base_margin,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 4,
    height: 39,
    backgroundColor: colors.white,
  },

  loginBtnStyle: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    height: 50,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    width: "100%",
  },
  buttonContainer: {
    right: 10,
    left: 10,
    position: "absolute",
    bottom: 40,
    flex: 1,
  },
});
