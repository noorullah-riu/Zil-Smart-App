import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import AppHeader from "../components/AppHeader";
import InquiryListCard from "../components/InquiryListCard";
import colors from "../components/colors";

import allInquiriesApi from "../api/allInquiries";


const AdminInquiryList = ({ navigation }) => {

  const [progressVisible, setprogressVisible] = useState(true);

  const [inquiriesList, setInquiriesList] = useState([]);

  const getAllInquiries = async () => {
    const response = await allInquiriesApi.getAllInquiries();

    setprogressVisible(false);
   

    const res = response.data.Data.map(object => ({
    
                inqDetail:object.EnquireyView, 
                itemsDetail: object.EnquireyItems,
              
       
    }));

    if (!response.ok)
      return Alert.alert("Couldn't retrieve the Inquiries List");
    if (response.data.Data) setInquiriesList(res);
    else {
      Alert.alert("No inquiries found!");
      setInquiriesList([]);
    }
  };

  useEffect(() => {
    getAllInquiries();
  }, []);



  const renderInquiriesList = () => {
      console.log("in renderInquiriesList11",inquiriesList)
    return (
      <FlatList
        data={inquiriesList}
        renderItem={({ item, index }) => {
          return (
            <InquiryListCard
              id={item.inqDetail.Id}
              value={item.inqDetail.DocTotal}
              name={item.inqDetail.CustomerName}
              itemsDetail={item.itemsDetail}
              inqDetail={item.inqDetail}
              orderDate={item.inqDetail.DocDate}
              remarks={item.inqDetail.Remarks}
              deliveryDate={item.inqDetail.DeliveryDate}
              PhoneNumber={item.inqDetail.PhoneNumber}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item) => item.Id}
      />
    );
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
       <AppHeader 
            doubleBtn 
            doubleBtnContainerStyle = {{}}
            doubleBtnImg1 =  {require("../assets/back-button.png")}
            titleImg1="Back"
            styleImg1={{
              width: 36,
              height: 36,
              marginLeft:10,
            }}
            doubleBtnImg2 = {require("../assets/search.png")}
            doubleBtnImg2Style = {{
              width: 20,
              height: 20,
              marginRight:27,
              }}
            navigation = { navigation } 
            headerTitle = "Inquiry List"
        />

    {renderInquiriesList()}
    </SafeAreaView>
  );
};

export default AdminInquiryList;

const styles = StyleSheet.create({
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
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
    marginHorizontal: "20%",
    marginBottom: 0,
  },
});
