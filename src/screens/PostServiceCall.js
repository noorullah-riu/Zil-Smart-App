import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppHeader from "../components/AppHeader";
import OrderDetailCard from "../components/OrderDetailCard";
import colors from "../components/colors";
import deliveryDetailsApi from "../api/DeliveryDetail";
import AppText from "../components/AppText";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/AppButton";
import postServiceCallApi from "../api/postServiceCall";

const DeliveryDetail1 = ({ route, navigation }) => {
  const { item } = route.params;

  const [progressVisible, setprogressVisible] = useState(true);
  const [cardCode, setCardCode] = useState("");
  const [cardName, setCardName] = useState("");
  const [date, setDate] = useState("");
  const [deliveryDetail, setDeliveryDetail] = useState([]);
  const [subTotal, setSubTotal] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [complain, setComplain] = useState({});
  const [ItemCode, setItemCode] = useState("");
  const [ItemDescription, setItemDescription] = useState("");

  const [remarks, setRemarks] = useState("");
  const [subject, setSubject] = useState("");
  const [callType, setCallType] = useState("");

  const getDeliveryDetail = async (DocNum) => {
    const response = await deliveryDetailsApi.getDeliveryDetails(DocNum);
    console.log("response from getDeliveryDetail api", response.data.Data[0]);
    setItemCode(response.data.Data[0].ItemCode);
    setItemDescription(response.data.Data[0].Dscription);
    setprogressVisible(false);
    if (!response.ok) return alert("Couldn't retrieve the Delivery Detail");
    setDeliveryDetail(response.data.Data[0]);
  };
 
  useEffect(() => {
    getDeliveryDetail(item.DocNum);
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    console.log(JSON.parse(jsonValue));
    setCardCode(JSON.parse(jsonValue).SapUserCode);
    setCardName(JSON.parse(jsonValue).Name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };
  const onSelectVal = (value) => {
    console.log("in onSelectVal:", value);
    setCallType(value);

  };

  const addComplain = async () => {
    setprogressVisible(true);
    const response = await postServiceCallApi.postServiceCall(
      cardCode,
      cardName,
      ItemCode,
      ItemDescription,
      subject,
      callType,
      remarks
    );
    console.log("addComplain response:", response);
    setprogressVisible(false);
    if (response.ok) {
      Alert.alert(response.data.Message);
      navigation.navigate("Home");
    }

    if (!response.ok) return Alert.alert("Unable to add Complain");
  };
  const footer = () => {
    return (
      <>
        <View style={styles.bottomContainer}>
          <View>
            <View style={{}}>
              <AppText style={styles.date}>Remarks</AppText>
            </View>
            <View style={styles.deliveryDateView}>
              <TextInput
                multiline={true}
                onChangeText={setRemarks}
                autoFocus={true}
                value={remarks}
                placeholder="Add your remarks here.."
              />
            </View>
          </View>
          <View>
            <View style={{}}>
              <AppText style={styles.date}>Subject</AppText>
            </View>
            <View style={styles.deliveryDateView}>
              <TextInput
                multiline={true}
                onChangeText={setSubject}
                autoFocus={true}
                value={subject}
                placeholder="Add your subject here.."
              />
            </View>
          </View>
          <View style={{}}>
            <AppText style={styles.date}>Call Type</AppText>
          </View>
          <View style={styles.deliveryDateView}>
            <RNPickerSelect
              onValueChange={(value) => onSelectVal(value)}
              items={[
                { label: "Installation", value: "Installation" },
                { label: "Repair", value: "Repair" },
                { label: "Warranty", value: "Warranty" },
                { label: "Service Contract", value: "ServiceContract" },
              ]}
              style={{ inputAndroid: { color: 'black' } }}
            />
          </View>
          <View style={{ marginTop: 40 }}>
            <TouchableOpacity onPress={() => addComplain()}>
              <AppButton
                text="Add Complain"
                iconFreeButton
                loginBtnStyle={styles.loginBtnStyle}
                navigation={navigation}
                navigation1="Login"
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const renderOrderDetail = () => {
    return (
      <OrderDetailCard
       
        item={item}
        navigation={navigation}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Delivery Detail"
      />
      

      {footer()}
    </SafeAreaView>
  );
};

export default DeliveryDetail1;

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
  r1: {
    justifyContent: "space-between",
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
    width: "60%",
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
  bottomContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  image: {
    width: "100%",
    height: 75,
    justifyContent: "center",
  },
  bottomContainer: {
    marginLeft: 25,
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
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  date: {
    marginTop: 15,
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
