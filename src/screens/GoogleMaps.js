import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import AppHeader from "../components/AppHeader";
const GoogleMaps = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppHeader
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/back-button.png")}
        navigation={navigation}
        headerTitle="Google Map"
      />
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 31.5011579,
            longitude: 74.3181667,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 31.5011579,
              longitude: 74.3181667,
            }}
            // title={marker.title}
            // description={marker.description}
          />
        </MapView>
      </View>
    </View>
  );
};
export default GoogleMaps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
