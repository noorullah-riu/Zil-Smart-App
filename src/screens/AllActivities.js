import React, {useState, useEffect} from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    useWindowDimensions,
    FlatList,
    Alert,
    RefreshControl
} from "react-native";
import colors from "../components/colors";
import AppHeader from "../components/AppHeader";
import AppText from "../components/AppText";
import {TabView, SceneMap, TabBar} from "react-native-tab-view";
import OpenedActivityCard from "../components/OpenedActivityCard";
import ClosedActivityCard from "../components/ClosedActivityCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import allActivitiesApi from "../api/allActivities";
import AppRow from "../components/AppRow";
import {Entypo} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native-gesture-handler";
import sizes from "../components/sizes";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

const AllActivities = ({navigation}) => {

    const [userId, setUserId] = useState({});
    const [allActivities, setAllActivities] = useState([]);
    const [progressVisible, setprogressVisible] = useState(true);
    const [refreshing, setRefreshing] = useState(true);
    const [closedActivities, setClosedActivities] = useState([])
    const [filteredClosedActivities, setFilteredClosedActivities] = useState([])


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
        getUserDetails();
    }, []);
    const [remarks, setRemarks] = useState("");

    //const [date, setDate] = useState("");


    const handleDateChange = (date) => {
        setDate(date);
        // findCloseActivitiesList(date)

    };
    const findCloseActivitiesList = async (date) => {
        const response = await allActivitiesApi.getAllActivities(userId);
        let res = response.data.data.filter(obj => obj.status !== "N").filter(obj => obj.EndDueDate.split("T")[0] === date);
        console.log("FilteredClosedActivities::", res)
        setFilteredClosedActivities(res)
    }


    const getAllActivities = async (userId) => {
        console.log(userId);
        const response = await allActivitiesApi.getAllActivities(userId);
        setRefreshing(false);
        console.log(response.data)
        setClosedActivities(response.data.data.filter(obj => obj.status !== "N"))
        setAllActivities(response.data.data.filter(obj => obj.status !== "Y"))
        setprogressVisible(false);
        if (!response.ok)
            return Alert.alert("Couldn't retrieve today's Activities");
        renderClosedActivityList()
    };

    const getUserDetails = async () => {

        const jsonValue = await AsyncStorage.getItem("@user_Details");
        setUserId(JSON.parse(jsonValue).id);
        getAllActivities(JSON.parse(jsonValue).salePersonCode);

    };
   const onRefresh = () => {
        setAllActivities([]);
        getUserDetails()
    };
    const renderOpenedActivityList = () => {
        return (
            <FlatList
                contentContainerStyle={{paddingBottom: 450}}
                data={allActivities}
                ListHeaderComponent={renderO_Act_Head}
                renderItem={({item, index}) => {
                    return (
                        <OpenedActivityCard
                            category={item.catagory}
                            priority={item.perority}
                            time={item.startTimeInString}
                            company={item.name}
                            remarks={item.remarks}
                            itemObject={item}
                            navigation={navigation}
                        />
                    );
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                keyExtractor={(item) => item.id}
            />
        );
    };
    const renderC_Act_Head = () => {
        return (
            <AppRow style={styles.headingView}>
                <AppText style={styles.t1}>Closed Activities List</AppText>
            {/*     <TouchableOpacity onPress={handleMapView1}>
                    <AppRow>
                        <Entypo name="location" size={24} color={colors.secondary}/>
                        <AppText style={styles.t2}>View on Map</AppText>
                    </AppRow>
                </TouchableOpacity> */}
            </AppRow>
        );
    };


    const handleMapView1 = () => {

        const latLongList = [];
        closedActivities.map((arr) => {
            if(arr.checkInLocation) {
            latLongList.push({
                id: arr.id,
                latitude: Number(arr.checkoutLocation.split(",")[0]),
                longitude: Number(arr.checkoutLocation.split(",")[1])
            });
        }})

        console.log("latLongList of objects:", latLongList)
        navigation.navigate("ActivitiesOnMap", {latLongList: latLongList})
    }
    const renderO_Act_Head = () => {
        return (
            <AppRow style={styles.headingView}>
                <AppText style={styles.t1}>Open Activities</AppText>

            </AppRow>
        );
    };
    const renderClosedActivityList = () => {
        return (
            <FlatList
                contentContainerStyle={{paddingBottom: 450}}
                data={closedActivities}
                ListHeaderComponent={renderC_Act_Head}
                renderItem={({item, index}) => {
                    return (
                        <ClosedActivityCard
                            item={item}
                        />
                    );
                }}
                keyExtractor={(item) => item.id}
            />
        );
    };
    const FirstRoute = () => {
        return (
            <View style={styles.routetwo}>

                {renderOpenedActivityList()}
            </View>
        );
    };
    const SecondRoute = () => {
        return (
            <View style={styles.routetwo}>
                {/*{DocDateSelectionView()}*/}

                {renderClosedActivityList()}
            </View>
        );
    };
    const DocDateSelectionView = () => (
        <View style={{marginBottom: 20}}>
            <View style={{marginHorizontal: sizes.base_margin, marginVertical: 14}}>
                <AppText style={styles.p1}>Select Document Date</AppText>
            </View>

            
{/*           <AppRow
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ marginTop: 0, flex: 1 }}>
              <AppText style={styles.p1}>Delivery Date</AppText>
            </View>
            <View style={{ marginTop: 0, flex: 1}}>
              <View style={{ backgroundColor: "#fff",padding:10 }}>
                <View style={styles.pickedDateContainer}>
                  <Pressable onPress={showPicker} style={styles.dateDiv}>
                    <Text style={{color:"#555",textAlign:"center"}}>{display()}</Text>
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
              </View>
            </View>
          </AppRow> */}
  {/*           <View>
                <DatePicker
                    showIcon={false}
                    style={{width: "100%"}}
                    date={date}
                    mode="date"
                    placeholder=" Select date"
                    format="YYYY-MM-DD"
                    minDate="2000-01-01"
                    maxDate="2025-01-01"
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
                            height: 50,
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
            </View> */}
        </View>
    );

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: "all", title: "Open Activities"},
        {key: "today", title: "Closed Activities"},
    ]);

    const renderScene = SceneMap({
        all: FirstRoute,
        today: SecondRoute,
    });

    const renderTabBar = (props) => (
        <View style={styles.tabview}>
            <TabBar
                {...props}
                indicatorStyle={{backgroundColor: colors.primaryBlue}}
                style={{backgroundColor: colors.WHITE, color: colors.blue}}
                inactiveColor={colors.default_grey}
                activeColor={colors.primaryBlue}
            />
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <AppHeader
                    doubleBtn
                    doubleBtnContainerStyle={{}}
                    doubleBtnImg1={require("../assets/back-button.png")}
                    titleImg1="Back"
                    styleImg1={{
                        width: Platform.OS === "ios" ? 35 : 30,
                        height: Platform.OS === "ios" ? 35 : 30,
                        marginLeft: 10,
                    }}
                    doubleBtnImg2={require("../assets/add.png")}
                    myRoute="AddActivity"
                    doubleBtnImg2Style={{
                        width: Platform.OS === "ios" ? 35 : 30,
                        height: Platform.OS === "ios" ? 35 : 30,
                        marginRight: 25,
                    }}
                    navigation={navigation}
                    navigateTo="CustomersList"
                    headerTitle="Activities List"
                />
            </View>

            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
                renderTabBar={renderTabBar}
                navigation={navigation}
            />
        </SafeAreaView>
    );
};
export default AllActivities;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    welcome: {
        marginLeft: 37,
        marginVertical: 10,
        marginTop: 20,
    },
    welcomeText: {
        fontSize: 24,
    },
    tabview: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    header: {
        marginHorizontal: 20,
        marginTop: 15,
    },

    routeone: {
        backgroundColor: "#F1F1F1",
        flex: 1,
    },
    btngrp: {
        marginVertical: 15,
    },
    loginBtnStyle: {
        backgroundColor: colors.BLACK,
        justifyContent: "center",
        borderWidth: 0.5,
        borderColor: colors.BLACK,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 45,
    },
    loginBtnStyle1: {
        backgroundColor: colors.WHITE,
        justifyContent: "center",
        borderWidth: 0.5,
        borderColor: colors.BLACK,
        borderRadius: 5,
        marginVertical: 0,
        marginBottom: 0,
        marginHorizontal: 5,
    },
    customTxtStyle: {
        color: "#fff",
        fontSize: Platform.OS === "android" ? 16 : 20,
        alignSelf: "center",
        textAlign: "center",
        padding: 8,
    },
    customTxtStyle1: {
        color: colors.BLACK,
        fontSize: Platform.OS === "android" ? 16 : 20,
        alignSelf: "center",
        textAlign: "center",
        padding: 8,
    },
    filterView: {
        backgroundColor: colors.WHITE,
        borderColor: colors.BLACK,
        borderWidth: 1,
        padding: 7,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    cartcontainer2: {
        marginTop: 15,
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: "#ADB5BD",
        borderRadius: 7,
        marginHorizontal: 15,
        backgroundColor: colors.WHITE,
    },
    transactionsView: {
        padding: 15,
        marginTop: 15,
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: "#ADB5BD",
        borderRadius: 7,
        marginHorizontal: 15,
        backgroundColor: colors.WHITE,
    },
    cartcontainer3: {
        marginTop: 15,
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: "#ADB5BD",
        borderRadius: 7,
        marginHorizontal: 15,
        marginBottom: 20,
    },
    baseText: {
        fontSize: 14,
        paddingBottom: 0,
        marginBottom: 0,
        marginLeft: 5,
        textAlign: "center",
    },
    transactionText: {
        fontSize: 16,
        paddingBottom: 0,
        marginBottom: 0,
        marginLeft: 5,
        textAlign: "center",
    },
    totalPayments: {
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
    paymentName: {
        color: colors.ptext_grey,
        fontSize: 16,
    },
    paymentValue: {
        color: colors.BLACK,
        fontSize: 14,
    },
    key: {
        fontWeight: "bold",
        fontSize: 16,
        color: colors.ptext_grey,
        textAlign: "center",
        width: 150,
    },
    value: {
        fontSize: 18,
        color: "#ADB5BD",
        textAlign: "center",
    },
    infoCard: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ADB5BD",
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: colors.WHITE,
        marginBottom: 0,
        height: 100,
        marginVertical: 15,
    },

    container1: {
        flex: 1,
        padding: 16,
        paddingTop: 40,
        backgroundColor: "#F1F1F1",
    },

    heading: {
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
    },
    header1: {
        height: 50,
        backgroundColor: colors.WHITE,
    },
    dataWrapper: {
        marginTop: -1,
    },
    row: {
        height: 50,
        backgroundColor: colors.WHITE,
    },
    text: {
        textAlign: "center",
        fontWeight: "100",
        color: "black",
        fontSize: 16,
    },
    headingView: {
        marginTop: 25,
        // marginLeft: 16,
        marginHorizontal: 10,
        justifyContent: "space-between",
    },
    routetwo: {
        backgroundColor: "#F1F1F1",
        flex: 1,
    },
    p1: {
        color: colors.ptext_grey,
        fontWeight: "bold",
        fontSize: 16,
        width: "50%",
        alignSelf: "flex-start",
    },
    p2: {
        color: colors.ptext_grey,
        fontWeight: "bold",
        fontSize: 16,
        width: "25%",
        alignSelf: "flex-start",
    },
    p3: {
        color: colors.ptext_grey,
        fontWeight: "bold",
        fontSize: 16,
        width: "25%",
        alignSelf: "flex-start",
    },

    r1: {
        backgroundColor: colors.WHITE,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ADB5BD",
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    listContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ADB5BD",
        marginHorizontal: 20,
    },
    group: {},
    label: {
        color: colors.BLACK,
        marginVertical: 5,
    },
    label1: {
        color: colors.BLACK,
        marginTop: 37,
        marginVertical: 5,
    },
    inputfield: {
        backgroundColor: colors.light_grey,
        borderColor: colors.light_grey,
        borderWidth: 1,
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 15,
        height: Platform.OS === "android" ? 50 : 55,
        borderRadius: 5,
        alignItems: "center",
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
        width: "20%",
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
    t1: {
        color: colors.default_grey,
    },
    t2: {
        color: colors.secondary,
        fontWeight: "bold",

    },
});
