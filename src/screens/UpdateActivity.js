import React, { useEffect, useState } from "react";
import ImageInputList from "../components/ImageInputList";
import AppText from "../components/AppText";
const { width } = Dimensions.get("screen");
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import * as FileSystem from "expo-file-system";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import updateActivityApi from "../api/updateActivity";
import * as Location from "expo-location";
import postActivity from "../api/postActivity";
import postActivityApi from "../api/postActivity";

const UpdateActivity = ({ navigation, route }) => {
  
  const [progressVisible, setprogressVisible] = useState(true);
  const { openedActivity, itemObject } = route.params;
  const [currentTime, setCurrentTime] = useState("");
  const [customer, setCustomer] = useState("");
  const [remarks, setRemarks] = useState(openedActivity.remarks);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUris, setImageUris] = useState([]);
  const [showImageInput, setShowImageInput] = useState(true);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPhoneNumInput, setShowPhoneNumInput] = useState(false);
  const [activity, setActivity] = useState({});
  const [imagesList, setImagesList] = useState([]);
  const [slp, setSlp] = useState("");
  const [base64Images, setBase64Images] = useState([]);

  useEffect(() => {
    getUserDetails();
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    // setCurrentTime( year + "-" + month + "-" + date + " " + hours + ":" + min);
    // setCurrentTime( year + "-" + month + "-" + date);hours + ":" + min

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
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const closeActivity = async () => {
 
    activity["id"] = openedActivity.id;
    activity["bpCode"] = openedActivity.bpCode;
    activity["name"] = openedActivity.name;
    activity["contactPerson"] = 0;
    activity["startTime"] = openedActivity.startTimeInString;
    activity["endTime"] = currentTime;
    activity["perority"] = 0;
    activity["subject"] = -1;
    activity["checkInLocation"] = openedActivity.checkInLocation;
    activity["checkoutLocation"] = location;
    activity["activityType"] = -1;
    activity["catagory"] = 1;
    activity["status"] = "N";
    activity["activtyType"] = "M";
    activity["remarks"] = remarks;
    activity["userId"] = slp;
    activity["base64BitCheckIn"] = "";
    activity["base64BitCheckOut"] = "";
    activity["clgCode"] = openedActivity.id;
    activity["address"] = "";
    activity["multipleImages"] = getImagesObject();

    console.log("activity obj.length: ", activity["multipleImages"].length);
    console.log("activity:", activity); 

    setprogressVisible(true);
    
    const response = await postActivityApi.postActivity(activity);
    console.log("response1", response.data.message);
    setprogressVisible(false);
    if (response.ok) {
      Alert.alert(response.data.message);
      navigation.goBack(); 
    }
    if (!response.ok) return Alert.alert("Unable to update Activity");
  };

  const handlEmailInput = (value) => setEmail(value);

  const handlPhoneNumberInput = (num) => setPhone(num);
  const handleAdd = async (uri) => {
    const base64Uri = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    setImageUris([...imageUris, uri]);
    setImagesList([...imagesList, base64Uri]);
  };
  const getImagesObject = () => {
    const res = imagesList.map((img) => ({
      Url: "",
      ImageString: img,
      ImageName: "",
    }));
    setBase64Images(res);
    return res;
  };
  const handleRemove = (uri) =>
    setImageUris(imageUris.filter((imageUri) => imageUri !== uri));

  return (
    <SafeAreaView>
      <View style={{ paddingTop: 0 }}>
        <View style={{ marginBottom: 15 }}>
          <AppHeader
            backBtnOnly
            title="Back"
            bckBtnImg={require("../assets/back-button.png")}
            navigation={navigation}
            headerTitle="Update Activity"
          />
        </View>
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
            editable={false}
            value={openedActivity.name}
          />
        </View>

        <View style={{ marginHorizontal: sizes.base_margin }}>
          <View style={{ marginVertical: 6 }}>
            <AppText style={styles.label}>Check In Time</AppText>
          </View>
          <TextInput
            style={styles.input}
            editable={false}
            value={openedActivity.startTimeInString}
          />
        </View>
<View style={{ marginHorizontal: sizes.base_margin }}>
          <View style={{ marginVertical: 6 }}>
            <AppText style={styles.label}>Check Out Time</AppText>
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
              autoFocus={true}
              value={remarks}
              onChangeText={setRemarks}
            />
          </View>
          {showImageInput ? (
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
          ) : null}
        </View>
        <TouchableOpacity onPress={() => closeActivity()}>
          <AppButton
            text="CLOSE ACTIVITY"
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

export default UpdateActivity;

const styles = StyleSheet.create({
  label: {
    color: colors.secondary,
    fontSize: sizes.normal_font,
    fontWeight: "bold",
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

  input: {
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
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
