import React, { useState, useEffect, useContext } from "react";
import MapView, { Marker,  } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import AppHeader from "../components/AppHeader";
import * as Location from "expo-location";
import colors from "../components/colors";
import MarkAttendanceApi from "../api/markAttendance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActivitiesOnMap = ({ navigation, route }) => {
  const { latLongList } = route.params;
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
  const handleCheckIn = async () => {
    console.log(
      "checkIn called",
      userCode,
      userName,
      currentTime,
      date,
      currentLocation,
      currentTime
    );
    setprogressVisible(true);

    const response = await MarkAttendanceApi.markAttendance(
      userCode,
      userName,
      currentTime,
      date,
      currentLocation,
      currentTime
    );
    setprogressVisible(false);

    if (!response.ok) return alert("Unable to mark your Attendance!");
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setHasLocationPermissions(true);
        let location = await Location.getCurrentPositionAsync({});
        setLocationResult(JSON.stringify(location));
        let latLong =
          location.coords.latitude + " , " + location.coords.longitude;
        setCurrentLocation(latLong);

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
    console.log("latLongList in ActOnMap", latLongList);
  }, []);

  const mapMarkers = () => {
    return latLongList.map((obj) => (
      <Marker
        coordinate={obj}
      />
    ));
  };
  return (
    <View style={styles.container}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Activities Map"
      />
      <View style={{}}>
        <MapView
          style={styles.map}
          region={mapRegion}
          onRegionChange={handleMapRegionChange}
          // provider="google"
          // loadingEnabled = {true}
          // showsCompass={true}
          // moveOnMarkerPress = {false}
          showsUserLocation={true}

          // style={styles.map}
          // region={mapRegion}
          // onRegionChange={handleMapRegionChange}
          // showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: 31.52358005642689,
              longitude: 74.2746343286123,
            }}
          />
          <Marker
            coordinate={{
              latitude: 31.501444185361823,
              longitude: 74.32001947128914,
            }}
          />
           {mapMarkers()}
          {/* <Polyline
            coordinates={[
              { latitude: 31.52358005642689, longitude: 74.2746343286123 },
              { latitude: 31.501444185361823, longitude: 74.32001947128914 },
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              "#7F0000",
              "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
              "#B24112",
              "#E5845C",
              "#238C23",
              "#7F0000",
            ]}
            strokeWidth={6}
          /> */}
        </MapView>
      </View>
    </View>
  );
};
export default ActivitiesOnMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
