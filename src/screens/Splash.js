import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../components/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({navigation}) => {
        const [userDetails, setUserDetails] = useState({});

        useEffect(() => {
       //     getUserDetails();
        }, []);

        const getUserDetails = async () => {
            const jsonValue = await AsyncStorage.getItem("@user_Details");
            console.log("from splash:", JSON.parse(jsonValue));
            setUserDetails(jsonValue);
            if (jsonValue !== null) {
                if (jsonValue !== null && JSON.parse(jsonValue).typeOfUser === "Sales")
                    navigation.navigate("AppDrawerNav");
                else if (jsonValue !== null && JSON.parse(jsonValue).typeOfUser === "Tech")
                    navigation.navigate("AppDrawerNav3");
                else navigation.navigate("AppDrawerNav");
            }
        };
        const storeUserDetails = async (value) => {
            await AsyncStorage.setItem("@user_Details", value);
        };

        const handleGuestUser = () => {
            storeUserDetails("guest");
            navigation.navigate("AppDrawerNav1");
        };
        return (
            <SafeAreaView style={styles.contentContainer}>
                <View style={styles.container}>
                    <View>
                        <Image
                            style={styles.icon1}
                            source={require("../assets/logo.png")}
                        />

                        <AppText style={styles.p1}>
                            Leaders in all kinds of self adhesive tapes
                        </AppText>
                    </View>

                    <View style={styles.btnContainer}>
                        <View style={styles.btn2View}>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <AppButton
                                    text="LOGIN"
                                    iconFreeButton
                                    loginBtnStyle={styles.loginBtnStyle}
                                    loginBtnText={styles.loginBtnText}
                                    navigation={navigation}
                                    navigation1="Login"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
;

export default Splash;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        marginBottom: 10,
    },
    h1: {
        marginTop: Platform.OS === "ios" ? "35%" : "35%",
        fontSize: Platform.OS === "ios" ? 50 : 50,
        fontWeight: "bold",
        color: "white",
        marginHorizontal: 20,
    },
    h2: {
        fontSize: Platform.OS === "ios" ? 50 : 50,

        fontWeight: "bold",
        color: "white",
        marginHorizontal: 20,
    },
    p1: {
        marginVertical: 15,
        fontSize: Platform.OS === "ios" ? 20 : 18,
        color: colors.secondary,
        marginHorizontal: 10,
        marginTop: 15,
        textAlign: "center",
    },
    brandName: {
        fontSize: Platform.OS === "ios" ? 50 : 18,
        color: colors.secondary,
        marginHorizontal: 10,
        marginTop: 100,
        fontWeight: "bold",
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
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
        marginHorizontal: 30,
    },

    signinBtnStyle: {
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: Platform.OS === "android" ? 60 : 70,
        borderWidth: 2,
        borderColor: colors.secondary,
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 30,
    },

    signBtnText: {
        color: colors.secondary,
        marginBottom: 4,
        marginLeft: 10,
        fontSize: Platform.OS === "android" ? 16 : 20,
        fontWeight: "bold",
        alignSelf: "center",
    },
    btnContainer: {
        marginTop: "auto",
    },
    icon1: {
        width: Platform.OS === "android" ? "54%" : "60%",
        height: Platform.OS === "android" ? "50%" : "40%",
        marginTop: Platform.OS === "android" ? "10%" : "10%",
        alignSelf: "center",
        marginHorizontal: 30,
        resizeMode: "contain",
    },
    contentContainer: {
        justifyContent: "space-between",
        flex: 1,
    },
    btn1View: {
        marginVertical: 10,
    },
    btn2View: {
        marginVertical: 5,
    },
    btn3View: {
        marginTop: 5,
    },
});
