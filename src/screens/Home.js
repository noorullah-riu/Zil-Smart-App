import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Alert, FlatList } from "react-native";
import AppText from "../components/AppText";
import colors from "../components/colors";
import Card1 from "../components/Card1";
import AppHeader from "../components/AppHeader";
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryPie,
  VictoryTheme,
} from "victory-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import allActivitiesApi from "../api/allActivities";

const Home = ({ navigation }) => {
  const [userId, setUserId] = useState({});
  const [allActivities, setAllActivities] = useState([]);
  const [progressVisible, setprogressVisible] = useState(true);

  const [stat1, setstat1] = useState([]);
  const [stat2, setstat2] = useState([]);
  const [stat3, setstat3] = useState([]);

  const getAllActivities = async (userId) => {
    const response = await allActivitiesApi.getAllActivities(userId);
    setprogressVisible(false);
    if (!response.ok)
      return Alert.alert("Couldn't retrieve the Activities List");
    setAllActivities(response.data.Data);
  };

  const getStat1 = async (slp) => {
    // alert(slp);
    const response = await allActivitiesApi.getStats1(slp);
    console.log("response from getStat1 api", response.data);
    if (!response.ok) return Alert.alert("Couldn't retrieve stats");
    if (response.data.data) {
      console.log(response.data.data, "+++1++");
      setstat1(response.data.data[0]);
    }
  };
  const getStat2 = async (slp) => {
    const response = await allActivitiesApi.getStats2(slp);
    console.log("response from getStat2 api", response.data);
    if (!response.ok) return Alert.alert("Couldn't retrieve stats");
    if (response.data.data) {
      console.log(response.data.data, "+++2++");
      setstat2(response.data.data);
    }
  };
  const getStat3 = async (slp) => {
    const response = await allActivitiesApi.getStats3(slp);
    console.log("response from getStat3 api", response.data);
    if (!response.ok) return Alert.alert("Couldn't retrieve stats");
    if (response.data.data) {
      console.log(response.data.data, "+++3++");
      setstat3(response.data.data);
    }
  };
  const getUserDetails = async () => {
    const jsonValue = await AsyncStorage.getItem("@user_Details");
    setUserId(JSON.parse(jsonValue).Id);
    console.log(
      "getUserDetails in AllActivities screen",
      JSON.parse(jsonValue).salePersonCode
    );

    getStat1(JSON.parse(jsonValue).salePersonCode);
    getStat2(JSON.parse(jsonValue).salePersonCode);
    getStat3(JSON.parse(jsonValue).salePersonCode);

   // getAllActivities(JSON.parse(jsonValue).Id);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const [activities, setActivities] = useState([
    {
      category: "Sales Planning",
      priority: "Normal",
      time: "09:00 - 09:45",
      company: "Hi-Tech Plastics Engineering",
      type: "Meeting1",
    },
    {
      category: "Sales Planning",
      priority: "Normal",
      time: "09:00 - 09:45",
      company: "Hi-Tech Plastics Engineering",
      type: "Meeting2",
    },
    {
      category: "Sales Planning",
      priority: "Normal",
      time: "09:00 - 09:45",
      company: "Hi-Tech Plastics Engineering",
      type: "Meeting3",
    },
    {
      category: "Sales Planning",
      priority: "Normal",
      time: "09:00 - 09:45",
      company: "Hi-Tech Plastics Engineering",
      type: "Meeting4",
    },
    {
      category: "Sales Planning",
      priority: "Normal",
      time: "09:00 - 09:45",
      company: "Hi-Tech Plastics Engineering",
      type: "Meeting5",
    },
    {
      category: "Sales Planning",
      priority: "Normal",
      time: "09:00 - 09:45",
      company: "Hi-Tech Plastics Engineering",
      type: "Meeting6",
    },
    {
      category: "Sales Planning",
      priority: "Normal",
      time: "09:00 - 09:45",
      company: "Hi-Tech Plastics Engineering",
      type: "Meeting7",
    },
    {
      category: "Sales Planning",
      priority: "Normal",
      time: "09:00 - 09:45",
      company: "Hi-Tech Plastics Engineering",
      type: "Meeting8",
    },
  ]);

  const renderActivityList = () => {
    return (
      <FlatList
        ListHeaderComponent={renderSalesGraph}
        contentContainerStyle={{ paddingBottom: 30 }}
        data={activities}
        renderItem={({ item, index }) => {
          return (
            <Card1
              category={item.category}
              priority={item.priority}
              time={item.time}
              company={item.company}
              type={item.type}
            />
          );
        }}
        keyExtractor={(item) => item.type}
      />
    );
  };

  //Drishyam

  const data = [
    { x: 56, y: 56, lab: "1", name: "Name of Product 1" },
    { x: 33, y: 33, lab: "2", name: "Name of Product 2" },
    { x: 76, y: 76, lab: "3", name: "Name of Product 3" },
    { x: 16, y: 16, lab: "4", name: "Name of Product 4" },
    { x: 43, y: 43, lab: "5", name: "Name of Product 5" },
    { x: 36, y: 36, lab: "6", name: "Name of Product 6" },
  ];
  const pieData = stat2
    .filter((value) => value.quantity > 0)
    .map((value, index) => ({
      y: value.quantity,
      x: value.month,
   //   label: value.lab,
    }));
  console.log(pieData);

  const barData = stat3
    .filter((value) => value.quantity)
    .map((value, index) => ({
      y: value.quantity,
      x: value.month,
    }));
  //console.log(barData);

  const renderSalesGraph = () => {
    return (
      <View style={{ paddingTop: 0 }}>
        <View style={styles.dateView}>
          <AppText style={styles.p1}>
            Total Sales of Month  {stat1?.month}
          </AppText>
          <AppText style={styles.p12}>
             {stat1?.quantity || 0} - PKR
          </AppText>
        </View>
        <View style={styles.cartcontainer0}>
          <View style={{}}>
            <AppText style={styles.p1}>
              Previous {stat3?.length} month's Sale Quantity
            </AppText>
          </View>
{/* 
          <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              data={barData}
            />
          </VictoryChart> */}
            <VictoryGroup colorScale={[colors.secondary, colors.tertiary]}>
            <VictoryBar
              data={barData}
              alignment="start"
              style={{ labels: { fill: "#aaa", fontSize: 8 } }}
              labels={({ datum }) => `${datum.x}: ${datum.y} `}
            />
          </VictoryGroup> 
        </View>

        <View style={styles.dateView2}>
          <AppText style={styles.p1}>Top items Sold this month</AppText>
          <VictoryPie
            colorScale={[
              colors.tomato,
              colors.secondary,
              colors.blue,
              colors.font_grey,
              colors.grey,
            ]}
            style={{
              labels: {
                fill: colors.secondary,
                fontSize: 8,
                fontWeight: "bold",
              },
            }}
            height={300}
            width={300}
            /*       events={{
             onClick: (evt) => alert(`aaaa`)
        //     onClick: (evt) => alert(`(${evt.clientX}, ${evt.clientY})`) 
            }}  */
            data={pieData}
            /*      data={[
              { x: 2, y: 2, label: "CodeX" },
              { x: 2, y: 2, label: "CodeY" },
              { x: 2, y: 2, label: "Codez" },
            ]} */
          />
        </View>
        {/*       <View style={{ backgroundColor: "white", paddingVertical: 10 }}>
          <AppRow>
            <AppText style={styles.hP}>{stat2[0]?.itemCode}</AppText>
            <AppText style={styles.ph}>{stat2[0]?.itemName}</AppText>
          </AppRow>

          <AppRow>
            <AppText style={styles.hP}>{stat2[1]?.itemCode}</AppText>
            <AppText style={styles.ph}>{stat2[1]?.itemName}</AppText>
          </AppRow>

          <AppRow>
            <AppText style={styles.hP}>{stat2[2]?.itemCode}</AppText>
            <AppText style={styles.ph}>{stat2[2]?.itemName}</AppText>
          </AppRow>
        </View> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        home
        backBtnOnly
        title="Back"
        bckBtnImg={require("../assets/menu.png")}
        navigation={navigation}
        headerTitle="HCC Business One Sales"
      />

      <ScrollView>{renderSalesGraph()}</ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    marginBottom: 25,
  },
  h1: {
    color: colors.new_black,
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  dateView: {
    marginVertical: 10,
    backgroundColor: colors.white,
    padding: 20,
    marginHorizontal: 30,
  },
  dateView2: {
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: colors.white,
    // padding: 20,
    marginHorizontal: 10,
  },
  p1: {
    color: colors.font_grey,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  p12: {
    color: colors.tomato,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  icon1: {
    width: Platform.OS === "android" ? 310 : 310,
    height: Platform.OS === "android" ? 235 : 240,
    marginTop: Platform.OS === "android" ? 25 : 25,
    alignSelf: "center",
    borderRadius: 20,
  },
  row1: {
    justifyContent: "space-between",
    marginVertical: 2,
  },
  containerf1: {},
  image: {
    width: "100%",
    height: 140,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 35,
  },
  icon_menu: {
    width: 50,
    height: 50,
  },
  icon_menu1: {
    width: 200,
    height: 60,
    alignSelf: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 10,
    color: colors.WHITE,
  },
  icon_share: {
    width: 20,
    height: 20,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  cartcontainer0: {
    marginTop: 20,
    borderWidth: 1,
    padding: 5,
    borderColor: colors.background,
    borderRadius: 7,
    alignItems: "center",
    // height: 250,
    backgroundColor: colors.white,
    marginHorizontal: 10,
  },
  baseText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 15,
  },
  baseText2: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 0,
    marginBottom: 0,
    marginLeft: 15,
  },
  hP: {
    fontSize: 12,
    color: colors.primaryBlue,
    //textAlign:"left",
    fontWeight: "bold",
    paddingBottom: 10,
    marginBottom: 0,
    marginLeft: 35,
  },
  ph: {
    fontSize: 12,
    color: colors.font_grey,

    fontWeight: "bold",
    paddingBottom: 10,
    marginBottom: 0,
    marginLeft: 15,
  },
});
