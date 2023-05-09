import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import AppHeader from "../components/AppHeader";
import InquiryDetailCard from "../components/InquiryDetailCard";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import getAllUsersAPI from "../api/allSAPUsers";
import RNPickerSelect from "react-native-picker-select";
import AssignInquiryApi from "../api/assignInquiry";

const InquiryDetail = ({ route, navigation }) => {
  const { item, deliveryDate, remarks, inqDetail, itemsDetail, id } = route.params;
  console.log("InquiryDetail:", itemsDetail);

  const [usersList, setUsersList] = useState([]);
  const [progressVisible, setprogressVisible] = useState(true);
  const [wannaAssign, setWannaAssign] = useState(false);

  const [assignee, setAssignee] = useState("");

  const [date, setDate] = useState("");
  const [selectedVal, setSelectedVal] = useState("");

  const onSelectVal = (value, label) => {
    console.log("in AppPicker", value);
    setSelectedVal(value);
  };
  const getTotal = (item) => {
    const total = item.Quantity * item.Price;
    setSubTotal(total);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const onDateChange = (event, selectedDate) => {
    let newDate = selectedDate || date;
    setDate(newDate);
    setShow(false);
  };

  const footer = () => {
    return (
      <>
        <View style={styles.bottomContainer}>
          <View>
            <View style={{}}>
              <AppText style={styles.date}>Delivery Date</AppText>
            </View>
            <View style={styles.deliveryDateView}>
              <TextInput editable={false} value={deliveryDate} />
            </View>
          </View>

          <View>
            <View style={{}}>
              <AppText style={styles.date}>Remarks</AppText>
            </View>
            <View style={styles.deliveryDateView}>
              <TextInput multiline={true} editable={false} value={remarks} />
            </View>
          </View>
        </View>
      </>
    );
  };

  const renderInquiryDetail = () => {
    return (
      <FlatList
        data={itemsDetail}
        renderItem={({ item, index }) => {
          return (
            <InquiryDetailCard
              name={item.ItemName}
              quantity={item.Quantity}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item) => item.ItemName}
      />
    );
  };

  const handleAssign = () => {};

  const getAllUsers = async (code) => {
    const response = await getAllUsersAPI.getAllUsers();
    setprogressVisible(false);
    console.log("SAP users List", response.data.Data);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the SAP users List");
    setUsersList(
      response.data.Data.map((obj) => ({
        label: obj.FirstName,
        value: obj.Id,
      }))
    );
  };
// const assignInquiry = () => {

// }
const assignInquiry = async () => {
  console.log("assigning Inquiry:");

     setprogressVisible(true);
      const response = await AssignInquiryApi.assignInquiry(id,selectedVal);
      console.log(response);
      setprogressVisible(false);
      if (response.ok) {
        Alert.alert("Successfully Assigned");
        navigation.navigate("AdminInquiryList");
      }
      if (!response.ok) return Alert.alert("Unable to assigned Inquiry");

  }
  

 

  const handleWannaAssign = () => {
    setWannaAssign(!wannaAssign);
    getAllUsersAPI.getAllUsers();
  };
  const pickerStyle = {
   
    inputAndroid: {
      color: "black",
      padding: 0,
      margin: 0,
    },
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Inquiry Detail"
      />
      <AppRow style={styles.r1}>
        <AppText style={styles.p1}>Item Name</AppText>
        <AppText style={styles.p2}>Qty</AppText>
      </AppRow>
      <View>{renderInquiryDetail()}</View>
      <View>{footer()}</View>

      <TouchableOpacity onPress={ () => handleWannaAssign() }>
        <AppText style={styles.assign}>Want to Assign?</AppText>
      </TouchableOpacity>
      {wannaAssign && (
        <>
          <View style={{ marginLeft: 25 }}>
            <AppText style={styles.date}>Assignee</AppText>
          
          </View>
          <View
            style={{
              padding: 15,
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: colors.white,
              backgroundColor: colors.white,
            }}
          >
            <RNPickerSelect
              name="customer"
              onValueChange={(value, indx) => onSelectVal(value, indx)}
              items={[
                {label: "Rewinding", value: "Rewinding"},
                {label: "Slitting", value: "Slitting"},
                {label: "In Stock", value: "In Stock"},
                {label: "Hold", value: "Hold"},
              ]}
              placeholder={{
                label: "Select an Assignee",
                value: null,
              }}
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
            />
          </View>

          <View style={styles.assignBtn}>
            <TouchableOpacity onPress={() => assignInquiry()}>
              <AppButton
                text="ASSIGN"
                iconFreeButton
                loginBtnStyle={styles.loginBtnStyle}
                navigation={navigation}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default InquiryDetail;

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
    marginTop: 10,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  assign: {
    marginTop: 10,
    marginBottom: 15,
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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
  assignBtn: {
    marginVertical: 20,
  },
});
