import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import postInquiryApi from "../api/postInquiry";
import { ProgressDialog, Dialog } from "react-native-simple-dialogs";
import { sosqContext } from "../context/SoSq";
import InquiryDetailCard from "../components/PostInquiryCard";

const PostInquiry = ({ route, navigation }) => {
  const { items } = route.params;
  const [cartItems, setItems] = useState(items);
  const [customer, setCustomerDetails] = useState({});
  const [user, setUserDetails] = useState({});
  const [enquirey, setEnquirey] = useState({});
  const [inquiry, setInquiry] = useState({});
  const [progressVisible, setprogressVisible] = useState(false);
  const [todaysdate, setTodaysdate] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };

  const { routeVal } = useContext(sosqContext);

  const postInquiry = async () => {
    console.log("posting Inquiry:", name, email, phone, remarks);

    enquirey["id"] = 0;
    enquirey["customerName"] = name;
    enquirey["customerCode"] = "";
    enquirey["email"] = email;
    enquirey["docDate"] = todaysdate;
    enquirey["deliveryDate"] = date;
    enquirey["phoneNumber"] = phone;
    enquirey["remarks"] = remarks;
    enquirey["createdBy"] = "";
    enquirey["assignedTo"] = "";

    inquiry["enquireyView"] = enquirey;
    inquiry["enquireyItems"] = cartItems;

    console.log(inquiry);
    if(email === "" || phone === "" || name === ""){
        Alert.alert(
            "Error", 
            "Please fill the required fields first!",
            [
              { text: "OK",},
          ]);
    }
    else{
        setprogressVisible(true);
        const response = await postInquiryApi.postInquiry(inquiry);
        console.log(response);
        setprogressVisible(false);
        if (response.ok) {
          Alert.alert("Successfully Posted");
          navigation.navigate("GuestHome");
        }
        if (!response.ok) return Alert.alert("Unable to post Order");

    }
    
  };

  useEffect(() => {
   

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    setTodaysdate(month + "/" + date + "/" + +year);
  }, []);

  const getCustomerDetails = async () => {
    const customerJsonValue = await AsyncStorage.getItem("@customer_Details");
    setCustomerDetails(JSON.parse(customerJsonValue));
    const userJsonValue = await AsyncStorage.getItem("@user_Details");
    setUserDetails(JSON.parse(userJsonValue));
  };

  const footer = () => {
    return (
      <View style={{ marginBottom: 0 }}>
        <View style={styles.bottomContainer}>
          <View style={{}}>
            <AppText style={styles.date}>Email</AppText>
          </View>
          <View style={styles.deliveryDateView}>
            <TextInput
              placeholder="Enter Customer Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={{}}>
            <AppText style={styles.date}>Phone</AppText>
          </View>
          <View style={styles.deliveryDateView}>
            <TextInput
              placeholder="Enter Customer Phone"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={{}}>
            <AppText style={styles.date}>Name</AppText>
          </View>
          <View style={styles.deliveryDateView}>
            <TextInput
              placeholder="Enter Customer Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={{}}>
            <AppText style={styles.date}>Remarks</AppText>
          </View>
          <View style={styles.deliveryDateView}>
            <TextInput
              placeholder="Enter Customer Remarks"
              value={remarks}
              onChangeText={setRemarks}
            />
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <ProgressDialog
            visible={progressVisible}
            title="Posting Data"
            message="Please wait..."
          />
        </View>
      </View>
    );
  };

  const renderItemsList = (navigation) => {
    return (
      <FlatList
        data={cartItems}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          return (
            <InquiryDetailCard
              name={item.Name}
              quantity={item.Qty}
              price={item.Price}
              imagePath={""}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item) => item.Id}
      />
    );
  };

  return (
    <SafeAreaView>
      <AppHeader
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/back-button.png")}
        titleImg1="Back"
        styleImg1={{
          width: 45,
          height: 45,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/search.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}
        navigation={navigation}
        navigateTo="CustomersList"
        headerTitle="Post Inquiry"
      />
      <ScrollView style={{ marginBottom: 100 }}>
        <View>
          <AppRow style={styles.r1}>
            <AppText style={styles.p1}>Item Name</AppText>
            <AppText style={styles.p2}>Qty</AppText>
          </AppRow>

          {renderItemsList()}
          {footer()}

          <TouchableOpacity onPress={() => postInquiry()}>
            <AppButton
              text="POST INQUIRY"
              iconFreeButton
              loginBtnStyle={styles.loginBtnStyle}
              navigation={navigation}
              navigation1="Login"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostInquiry;

const styles = StyleSheet.create({
  card1: {
    backgroundColor: colors.white,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },

  row1: {
    justifyContent: "space-between",
  },
  row2: {
    marginVertical: 2,
  },
  p2: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
  p3: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 18 : 16,
    fontWeight: "bold",
  },
  p4: {
    color: colors.card_h2,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
  p5: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },

  p6: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    marginTop: 5,
  },
  p6b: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
  },
  p7: {
    color: colors.card_h2,
    fontSize: Platform.OS === "ios" ? 16 : 14,
  },
  p7b: {
    color: colors.yellow,
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "bold",
  },
  img: {
    borderRadius: 10,
    width: 70,
    height: 70,
  },

  r1: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "77%",
  },
  p2: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "25%",
  },
  p3: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "15%",
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
    width: "20%",
  },
  total: {
    color: colors.yellow,
    fontWeight: "bold",
    fontSize: 18,
    width: "20%",
  },
  row: {
    paddingBottom: 100,
  },
  bottomContainer: {
    
    marginLeft: 25,
  },
  listContainer: {
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
    marginHorizontal: "10%",
  },
  label: {
    color: colors.BLACK,
    marginVertical: 5,
  },
  date: {
    marginTop: 35,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  deliveryDateView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginRight: 20,
  },
  input: {
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});


