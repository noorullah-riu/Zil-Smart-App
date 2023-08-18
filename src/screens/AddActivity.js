import React, { useEffect, useState } from "react";
import ImageInputList from "../components/ImageInputList";
import AppText from "../components/AppText";
const { width } = Dimensions.get("screen");
import * as FileSystem from "expo-file-system";

import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import postActivityApi from "../api/postActivity";
import {ProgressDialog} from "react-native-simple-dialogs";

const AddActivity = ({ navigation, route }) => {

  const [progressVisible, setprogressVisible] = useState(false);
  const { customerName, customerCode, item } = route.params;
  const [currentTime, setCurrentTime] = useState("");
  const [customer, setCustomer] = useState(customerName);
  const [remarks, setRemarks] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [imagesList, setImagesList] = useState([]);
  const [showImageInput, setShowImageInput] = useState(true);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPhoneNumInput, setShowPhoneNumInput] = useState(false);
  const [activity, setActivity] = useState({});
  const [images, setImages] = useState({});
  const [base64Images, setBase64Images] = useState([]);
  const [slp, setSlp] = useState({});
  const [Name, setName] = useState("");

  useEffect(() => {
    getUserDetails();

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes


    setCurrentTime(hours + ":" + min);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      let text = "Waiting..";
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = location.coords.latitude + " , " + location.coords.longitude;
        console.log("location:", text, text.toString());
        setLocation(text.toString());
      }
    })();
  }, []);

  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).salePersonCode);
    setName(JSON.parse(jsonValue).name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const addActivity = async () => {
    setprogressVisible(true);
    const resBase64Imgs = imagesList.map((img) => ({
      Url: "",
      ImageString: img,
      ImageName: "",
    }));
    activity["id"] = 0;
    activity["bpCode"] = customerCode;
    activity["name"] = customerName;
    activity["contactPerson"] = 0;
    activity["subject"] = -1;
    activity["startTime"] = currentTime;
    activity["endTime"] = currentTime;
    activity["perority"] = 0;
    activity["checkInLocation"] = `check in ${location}`;
    activity["checkoutLocation"] = "";
    activity["activityType"] = -1;
    activity["catagory"] = 1;
    activity["status"] = "";
    activity["pictureUrl"] = "";
    activity["activtyType"] = "M";
    activity["remarks"] = remarks;
    activity["userId"] = slp;
    activity["base64BitCheckIn"] = "";
    activity["base64BitCheckOut"] = "";
    activity["clgCode"] = 0;
    activity["address"] = "";
    activity["CreatedBy"] = Name;
    
    activity["multipleImages"] = resBase64Imgs;
    console.log(activity);
    const response = await postActivityApi.postActivity(activity);
    console.log("addActivity response", response);
    console.log("addActivity response Message", response.data.message);

    setprogressVisible(false);
    if (response.ok) {
      Alert.alert(response.data.message);
       navigation.navigate("Home");
    }
    if (!response.ok) return Alert.alert("Unable to post Activity");
  };

  const handleCustomerInput = (value) => setCustomer(value);

  const handleRemarksInput = (value) => setRemarks(value);

  const handlEmailInput = (value) => setEmail(value);

  const handlPhoneNumberInput = (num) => setPhone(num);

  const getImagesObject = () => {

    console.log("ImagesObject in raw format", imagesList);
    const res = imagesList.map((img) => ({
      Url: "",
      ImageString: img,
      ImageName: "",
    }));
    console.log("ImagesObject in required format:", res);
    setBase64Images(res);
  };


  const handleAdd = async (uri) => {
    const base64Uri = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    setImageUris([...imageUris, uri]);
    setImagesList([...imagesList, base64Uri]);
  };

  const handleRemove = (uri) => setImageUris(imageUris.filter((imageUri) => imageUri !== uri));

  return (
    <SafeAreaView>
      <View style={{ paddingBottom: 10 }}>
        <AppHeader
          backBtnOnly
          title="Back"
          bckBtnImg={require("../assets/back-button.png")}
          navigation={navigation}
          headerTitle="Add Activity"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={{ marginHorizontal: sizes.base_margin, marginTop: 1 }}>
          <View style={{ marginBottom: 6 }}>
            <AppText style={styles.label}>Customer</AppText>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Customer Name"
            value={customer}
            onChangeText={setCustomer}
          />
        </View>

        <View style={{ marginHorizontal: sizes.base_margin }}>
          <View style={{ marginVertical: 6 }}>
            <AppText style={styles.label}>Time</AppText>
          </View>
          <TextInput
            style={styles.input}
            editable={false}
            value={currentTime}
          />
        </View>

        <View>
          {showEmailInput ? (
            <View style={{ paddingHorizontal: sizes.base_margin }}>
              <View style={{ marginTop: 14, marginBottom: 10 }}>
                <AppText style={styles.label}>Email</AppText>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter Your Email"
                onChangeText={(value) => handlEmailInput(value)}
              />
            </View>
          ) : null}
        </View>

        <View>
          {showPhoneNumInput ? (
            <View style={{ paddingHorizontal: sizes.base_margin }}>
              <View style={{ marginTop: 14, marginBottom: 10 }}>
                <AppText style={styles.label}>Phone Number</AppText>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Add phone number"
                onChangeText={(num) => handlPhoneNumberInput(num)}
              />
            </View>
          ) : null}
        </View>
        <View>
          <View style={{ marginHorizontal: sizes.base_margin }}>
            <View style={{ marginVertical: 6 }}>
              <AppText style={styles.label}>Remarks</AppText>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Remarks"
              onChangeText={(value) => handleRemarksInput(value)}
            />
          </View>
          {/* {showImageInput ? (
            <>
              <View
                style={{ paddingHorizontal: sizes.base_margin, marginTop: 15 }}
              >
                <AppText style={styles.label}>Activity Images</AppText>
              </View>

              <View
                style={{
                  paddingHorizontal: sizes.base_margin,
                  marginBottom: 30,
                  marginTop: 0,
                }}
              >
                <ImageInputList
                  imageUris={imageUris}
                  onAddImage={handleAdd}
                  onRemoveImage={handleRemove}
                />
              </View>
            </>
          ) : null} */}
        </View>
        <ProgressDialog
            visible={progressVisible}
            title="Loading data"
            message="Please wait..."
        />
        <TouchableOpacity 
        style={{marginTop:40}}
        onPress={() => addActivity()}>
          <AppButton
            text="ADD ACTIVITY"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
            navigation1="Login"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddActivity;
const styles = StyleSheet.create({
  label: {
    color: colors.secondary,
    fontSize: sizes.normal_font,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Platform.OS === "android" ? 60 : 70,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: "10%",
  },
});
