import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens

import SplashScreen from "../screens/Splash";
import LoginScreen from "../screens/Login";
import Signup from "../screens/Signup";

import CustomersList from "../screens/CustomersList";
import Categories from "../screens/Categories";
import ChatList from "../screens/Chat";
import Items from "../screens/Items";
import OrderDetail from "../screens/OrderDetail";
import QuotationDetail from "../screens/QuotationDetail";
import PendingRecovery from "../screens/PendingRecovery";
import PostOrder from "../screens/PostOrder";
import PostOrderEdit from "../screens/PostOrderEdit";
import AddActivity from "../screens/AddActivity";
import AppDrawerNav from "./AppDrawerNav";
import AppDrawerNav1 from "./AppDrawerNav1";
import ChatDetail from "../screens/ChatDetail";
import AppHeader from "../components/AppHeader";
import UpdateActivity from "../screens/UpdateActivity";
import GoogleMaps from "../screens/GoogleMaps";
import CatalogView from "../screens/CatalogView";
import VideoList from "../screens/VideoList";
import VideoView from "../screens/VideoView";
import PostInquiry from "../screens/PostInquiry";
import AdminInquiryList from "../screens/AdminInquiryList";
import InquiryDetail from "../screens/InquiryDetail";
import Ledger from "../screens/Ledger";
import Deliveries from "../screens/Deliveries_Sales";
import Feedback from "../screens/Feedback";
import Complaint from "../screens/Complaint_User";
import AppDrawerNav2 from "./AppDrawerNav2";
import Expenses from "../screens/Expenses";
import PostExpense from "../screens/postExpense";
import MarkAttendance from "../screens/MarkAttendance";
import PurchaseRequest from "../screens/PurchaseRequest";
import Sales from "../screens/Sales";
import Inventory from "../screens/Inventory";
import ActivitiesOnMap from "../screens/ActivitiesOnMap";
import AppDrawerNav3 from "./AppDrawerNav3";
import Reports1 from "../screens/Reports1";
import PurchaseReqList from "../screens/PurchaseReqList";
import PdfView from "../screens/PdfView";
import StockList from "../components/StockList";
import Deliveries_Customer from "../screens/Deliveries_Customer";
import DeliveryDetail1 from "../screens/PostServiceCall";
import PendingRecoveryDetail from "../screens/PendingRecoveryDetail";
import ItemDetailList from "../screens/ItemDetailList";
import ItemDetailListEdit from "../screens/ItemDetailListEdit";
import CustomerDetail from "../screens/CustomerDetail";
import StockDetail from "../screens/StockDetail";
import DrfatOrderDetail from "../screens/DraftOrderDetail";
import SaleInvoiceDetail from "../screens/SaleInvoiceDetail";
import SalesInvoiceDetail from "../screens/SalesInvoiceDetail";
import InventoryItems from "../screens/InventoryItems";
import AgingReport from "../screens/Aging";
import ItemListDetailScreen from "../screens/ItemListDetailScreen";
import PendngOrderListReport from "../screens/PendingOrderListReport";
import DailyRecievableReport from "../screens/DailyRecievableReport";
import MonthalyCommissionReport from "../screens/MonthalyCommissionReport";
import JumboRollReport from "../screens/JumboRollReport";
import LogRollReport from "../screens/LogRollReport";
import FgInStockReport from "../screens/FgInStockReport";
import StackManager from "./StackManager";

const { Navigator, Screen } = createStackNavigator();

const AppStackNav = ({ navigation }) => {
  return (
    <Navigator>
      <Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Screen
        name="CustomersList"
        component={CustomersList}
        options={{ headerShown: false }}
      />
      <Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />
      <Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
      <Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{ headerShown: false }}
      />
      <Screen name="Items" component={Items} options={{ headerShown: false }} />

      <Screen
        name="PostOrder"
        component={PostOrder}
        options={{ headerShown: false }}
      />

       <Screen
        name="PendngOrderListReport"
        component={PendngOrderListReport}
        options={{ headerShown: false }}
      /> 

      <Screen
        name="DailyRecievableReport"
        component={DailyRecievableReport}
        options={{ headerShown: false }}
      />
      <Screen
        name="MonthalyCommissionReport"
        component={MonthalyCommissionReport}
        options={{ headerShown: false }}
      />
      <Screen
        name="JumboRollReport"
        component={JumboRollReport}
        options={{ headerShown: false }}
      />
      <Screen
        name="LogRollReport"
        component={LogRollReport}
        options={{ headerShown: false }}
      />
      <Screen
        name="FgInStockReport"
        component={FgInStockReport}
        options={{ headerShown: false }}
      />

      <Screen
        name="ItemListDetailScreen"
        component={ItemListDetailScreen}
        options={{ headerShown: false }}
      />

      <Screen
        name="PostOrderEdit"
        component={PostOrderEdit}
        options={{ headerShown: false }}
      />

      <Screen
        name="PostPurchaseRequest"
        component={PurchaseRequest}
        options={{ headerShown: false }}
      />
      <Screen
        name="PostInquiry"
        component={PostInquiry}
        options={{ headerShown: false }}
      />
      <Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{ headerShown: false }}
      />
      <Screen
        name="QuotationDetail"
        component={QuotationDetail}
        options={{ headerShown: false }}
      />
      <Screen
        name="AddActivity"
        component={AddActivity}
        options={{ headerShown: false }}
      />
      <Screen
        name="UpdateActivity"
        component={UpdateActivity}
        options={{ headerShown: false }}
      />
      <Screen
        name="GoogleMaps"
        component={GoogleMaps}
        options={{ headerShown: false }}
      />
      <Screen
        name="CatalogView"
        component={CatalogView}
        options={{ headerShown: false }}
      />
      <Screen
        name="PdfView"
        component={PdfView}
        options={{
          headerShown: true,
        }}
      />
      <Screen
        name="VideoList"
        component={VideoList}
        options={{ headerShown: false }}
      />
      <Screen
        name="VideoView"
        component={VideoView}
        options={{ headerShown: false }}
      />
      <Screen
        name="AgingReport"
        component={AgingReport}
        options={{ headerShown: false }}
      />

      <Screen
        name="AdminInquiryList"
        component={AdminInquiryList}
        options={{ headerShown: false }}
      />
      <Screen
        name="InquiryDetail"
        component={InquiryDetail}
        options={{ headerShown: false }}
      />
      <Screen
        name="Ledger"
        component={Ledger}
        options={{ headerShown: false }}
      />
      <Screen
        name="Reports1"
        component={Reports1}
        options={{ headerShown: false }}
      />
      <Screen
        name="Feedback"
        component={Feedback}
        CATA
        options={{ headerShown: false }}
      />
      <Screen
        name="Complaint"
        component={Complaint}
        options={{ headerShown: false }}
      />
      <Screen
        name="Expenses"
        component={Expenses}
        options={{ headerShown: false }}
      />
      <Screen
        name="MarkAttendance"
        component={MarkAttendance}
        options={{ headerShown: false }}
      />
      <Screen
        name="PendingRecovery"
        component={PendingRecovery}
        options={{ headerShown: false }}
      />
      <Screen
        name="PendingRecoveryDetail"
        component={PendingRecoveryDetail}
        options={{ headerShown: false }}
      />
      <Screen
        name="ItemDetailList"
        component={ItemDetailList}
        options={{ headerShown: false }}
      />
      <Screen
        name="ItemDetailListEdit"
        component={ItemDetailListEdit}
        options={{ headerShown: false }}
      />
      <Screen
        name="PostExpense"
        component={PostExpense}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Sales"
        component={Sales}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Inventory"
        component={Inventory}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Deliveries_Customer"
        component={Deliveries_Customer}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="StockList"
        component={StockList}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="StockDetail"
        component={StockDetail}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="DrfatOrderDetail"
        component={DrfatOrderDetail}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="SalesInvoiceDetail"
        component={SalesInvoiceDetail}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="InventoryItems"
        component={InventoryItems}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="DeliveryDetail1"
        component={DeliveryDetail1}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="ActivitiesOnMap"
        component={ActivitiesOnMap}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="StackManager"
        component={StackManager}
        options={{
          headerShown: false,
        }}
      />



      <Screen
        name="AppDrawerNav"
        options={{ headerShown: false }}
        component={AppDrawerNav}
        navigation={navigation}
        initialRouteName="Signup"
      />
      <Screen
        name="AppDrawerNav1"
        options={{ headerShown: false }}
        component={AppDrawerNav1}
        navigation={navigation}
        initialRouteName="Signup"
      />
      <Screen
        name="AppDrawerNav2"
        options={{ headerShown: false }}
        component={AppDrawerNav2}
        navigation={navigation}
      // initialRouteName="Signup"
      />
      <Screen
        name="AppDrawerNav3"
        options={{ headerShown: false }}
        component={AppDrawerNav3}
        navigation={navigation}
      // initialRouteName="Signup"
      />
    </Navigator>
  );
};

export default AppStackNav;
