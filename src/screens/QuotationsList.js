import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Text,
} from "react-native";
import AppHeader from "../components/AppHeader";
import QuotationListCard from "../components/QuotationListCard";
import colors from "../components/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import saleQuotationsApi from "../api/saleQuotations";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { preCategoriesRouteContext } from "../context/PreCategoriesRoute";
import { ProgressDialog } from "react-native-simple-dialogs";

const Quotations = ({ navigation }) => {
  // const [date, setDate] = useState("");
  const [slp, setSlp] = useState({});
  const [quotationsList, setQuotationsList] = useState([]);
  const [progressVisible, setprogressVisible] = useState(true);
  const [isFetching, setFetching] = useState(false);
  const { preCategoriesRouteVal, setPreCategoriesRouteVal } = useContext(
    preCategoriesRouteContext
  );
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const display = () => {
    if (Date == null) {
      return <Text>{title}</Text>;
    } else if (isPickerShow == false) {
      return <Text>{date.toLocaleDateString()}</Text>;
    } else if (isPickerShow == true) {
      return <Text>{date.toLocaleDateString()}</Text>;
    }
  };
  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };
  useEffect(() => {
    console.log(
      "preCategoriesRouteVal in quotations List",
      preCategoriesRouteVal
    );
    getUserDetails();
    setPreCategoriesRouteVal("quotationsList");
  }, []);
  const onRefresh = () => {
    setFetching(true);
    getUserDetails();
  };
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).salePersonCode);
    getAllQuotations(JSON.parse(jsonValue).salePersonCode);
    console.log(JSON.parse(jsonValue).salePersonCode);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const getAllQuotations = async (slp) => {
    const response = await saleQuotationsApi.getSaleQuotations(slp, date);
    setprogressVisible(false);
    setFetching(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the quotations List");
    // console.log(response.data.data)
    if (response.data.data) setQuotationsList(response.data.data);
    else {
      Alert.alert("No quotations found!");
    }
  };
  <View>
    <View style={styles.pickedDateContainer}>
      <Pressable onPress={showPicker} style={styles.dateDiv}>
        <Text style={styles.txtDate}>{display()}</Text>
      </Pressable>
    </View>

    {isPickerShow && (
      <DateTimePicker
        value={date}
        mode={"date"}
        display={Platform.OS === "ios" ? "spinner" : "default"}
        is24Hour={false}
        onChange={onChange}
        style={styles.datePicker}
      />
    )}
  </View>;
  const handleDateChange = (date) => {
    setDate(date);
    getAllQuotations(date, slp);
  };
  const [orders, setOrders] = useState([
    {
      id: "10025",
      value: "10",
      name: "Johny & Jugnu",
      count: 6,
      orderDate: "10-08-2021",
      deliveryDate: "10-08-2021",
    },
    {
      id: "10026",
      value: "10",
      name: "Johny & Jugnu",
      count: 6,
      orderDate: "10-08-2021",
      deliveryDate: "10-08-2021",
    },
    {
      id: "10027",
      value: "10",
      name: "Johny & Jugnu",
      count: 6,
      orderDate: "10-08-2021",
      deliveryDate: "10-08-2021",
    },
    {
      id: "10028",
      value: "10",
      name: "Johny & Jugnu",
      count: 6,
      orderDate: "10-08-2021",
      deliveryDate: "10-08-2021",
    },
    {
      id: "10029",
      value: "10",
      name: "Johny & Jugnu",
      count: 6,
      orderDate: "10-08-2021",
      deliveryDate: "10-08-2021",
    },
  ]);
  const DocDateSelectionView = () => (
    <View style={{ marginBottom: 20 }}>
      <View style={{ marginHorizontal: sizes.base_margin, marginVertical: 14 }}>
        <AppText style={styles.p1}>Select Document Date</AppText>
      </View>

      <View>
        <DatePicker
          showIcon={false}
          style={{ width: "100%" }}
          date={date}
          mode="date"
          placeholder=" Select date"
          format="DD/MM/yyyy"
          minDate="01-01-2000"
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "relative",
              left: 0,
              top: 0,
              marginLeft: 10,
            },
            dateInput: {
              marginTop: 15,
              borderColor: colors.white,
              backgroundColor: colors.white,
              borderRadius: 10,
              height: 60,
              alignItems: "flex-start",
              paddingLeft: 10,
              width: "100%",
              marginHorizontal: 10,
            },
          }}
          onDateChange={(date) => {
            handleDateChange(date);
          }}
        />
      </View>
    </View>
  );

  const renderQuotationList = () => {
    return (
      <FlatList
        data={quotationsList}
        onRefresh={() => onRefresh()}
        refreshing={isFetching}
        renderItem={({ item, index }) => {
          return (
            <QuotationListCard
              id={item.docNum}
              item={item}
              value={item.docTotal}
              name={item.customerName}
              orderDate={item.docDate}
              deliveryDate={item.deliveryDate}
              navigation={navigation}
            />
          );
        }}
        keyExtractor={(item) => item.docNum}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader  
        home
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/menu.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/add.png")}
        doubleBtnImg2Style={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginRight: 25,
        }}
        navigation={navigation}
        navigateTo="CustomersList"
        headerTitle="Quotations List"
        myRoute="quotation"
      />

      {/*{DocDateSelectionView()}*/}
      {renderQuotationList()}
      <ProgressDialog
        visible={progressVisible}
        title="Loading Data"
        message="Please wait..."
      />
    </SafeAreaView>
  );
};

export default Quotations;
const styles = StyleSheet.create({
  p1: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
    width: "60%",
  },
  pickedDateContainer: {
    flexDirection: "row",

    marginHorizontal: 10,
  },

  datePicker: {
    width: 320,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dateDiv: {
    height: 50,
    width: "100%",

    borderRadius: 10,
    backgroundColor: colors.white,
    justifyContent: "center",
  },

  txtDate: {
    color: colors.grey,
    textAlign: "center",
  },
});
