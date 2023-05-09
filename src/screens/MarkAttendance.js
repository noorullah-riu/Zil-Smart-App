import React, { useState, useEffect,  } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import AppHeader from "../components/AppHeader";
import * as Location from "expo-location";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import MarkAttendanceApi from "../api/markAttendance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MarkAttendance = ({ navigation }) => {

  const [mapRegion, setMapRegion] = useState(null);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [locationResult, setLocationResult] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const [progressVisible, setprogressVisible] = useState(false);
  const [slp, setSlp] = useState({});
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [date, setDate] = useState("");
  const [locationPermisssion, setLocationPermisssion] = useState("");





  useEffect(() => {
    getUserDetails();

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    setDate( year + "-" + month + "-" + date);

    setCurrentTime(hours + ":" + min);
  }, []);

  const handleMapRegionChange = (mapRegion) => {
    setMapRegion(mapRegion);
  };
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setSlp(JSON.parse(jsonValue).Id);
    setUserCode(JSON.parse(jsonValue).SapUserCode);
    setUserName(JSON.parse(jsonValue).Name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };
  const handleCheckIn = async() => {
    console.log("checkIn called",userCode,userName,currentTime,date,currentLocation,currentTime);
    if (locationPermisssion !== "granted") return Alert.alert("Error,You have to turn on your Location!");
    else{
      setprogressVisible(true);

      const response = await MarkAttendanceApi.markAttendance(userCode,userName,currentTime,date,currentLocation,currentTime);
      console.log("handleCheckIn:",response)
      setprogressVisible(false);
      if (response.data.Message === "Successfully Updated") Alert.alert("Successfully Marked Attendance!");
  
      if (!response.ok) return Alert.alert("Unable to mark your Attendance!");
    }
   

  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermisssion(status)
      if (status === "granted") {
        setHasLocationPermissions(true);
        let location = await Location.getCurrentPositionAsync({});
        setLocationResult(JSON.stringify(location)); 
        let latLong = location.coords.latitude + " , " + location.coords.longitude;
        setCurrentLocation(latLong)
   

        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Mark Attendance"
      />
      <View style={{}}>
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChange={handleMapRegionChange}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude:lat,
              longitude:long,
            }}
            
          />
        </MapView>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleCheckIn()}>
          <AppButton
            text="CHECK IN"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MarkAttendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5,
  },
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    height: Platform.OS === "android" ? 60 : 70,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: "10%",
    marginVertical: 45,
  },
});
