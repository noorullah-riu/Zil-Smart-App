import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Formik } from "formik";
import AppForm from "../components/AppForm";
import AppFormField from "../components/AppFormField";
import * as Yup from "yup";
import AppText from "../components/AppText";
import SwitchSelector from "react-native-switch-selector";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import SubmitButton from "../components/SubmitButton";
import loginCompanyUserApi from "../api/loginCompanyUser";
import loginCustomerUserApi from "../api/loginCustomerUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressDialog } from "react-native-simple-dialogs";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  CustomerCode: Yup.string().required().max(50),
  PhoneNumber: Yup.string().required().max(50),
});
const validationSchema1 = Yup.object().shape({
  UserCode: Yup.string().required().max(50),
  Password: Yup.string().required().label("password"),
});

const LoginScreen = ({ navigation }) => {
  const [progressVisible, setprogressVisible] = useState(false);

  const [UserDetails, setUserDetails] = useState({});
  const [userType, setUserType] = useState("cU");
  const [itemQty, setitemQty] = useState(1);

  const settingUserType = (value) => {
    console.log("In settingUserType", value);
    setUserType(value);
  };
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("ios-eye");

  useEffect(() => { }, []);

  const handleCustomerUserLogin = async (Customer) => {
    console.log(
      "handleCustomerUserLogin:",
      Customer.UserCode,
      Customer.Password
    );

     setprogressVisible(true);
    const res = await loginCompanyUserApi.loginCompanyUser(
      Customer.UserCode,
      Customer.Password
    );
    console.log("in handleCompanyUserLogin", res.data.userDetails.typeOfUser);
    if (res.data.code === 3) {
      Alert.alert("Error!", res.data.message, [
        { text: "OK", onPress: () => setprogressVisible(false) },
      ]);
    } else if (res.data !== null && res.data.userDetails.typeOfUser === "HOD") {
      setprogressVisible(false);
      storeUserDetails(res.data.userDetails);
      navigation.navigate("AppDrawerNav");
    } else if (
      res.data.userDetails !== null &&
      res.data.userDetails.typeOfUser === "Manager"
    ) {
      setprogressVisible(false);
      storeUserDetails(res.data.Data);
      navigation.navigate("StackManager");
    } else if (
      res.data.userDetails !== null &&
      res.data.userDetails.TypeOfUser === "Tech"
    ) {
      setprogressVisible(false);
      storeUserDetails(res.data.userDetails);
      navigation.navigate("StackManager");
    } else {
      Alert.alert("Error!", res.data.message, [
        { text: "OK", onPress: () => setprogressVisible(false) },
      ]);
    }
  };

  const storeUserDetails = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user_Details", jsonValue);
    } catch (e) { }
  };

  const loginView = () => {
    return (
      <Formik
        initialValues={{
          UserCode: "",
          Password: "",
        }}
        onSubmit={(values) => handleCustomerUserLogin(values)}
        validationSchema={validationSchema1}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View style={{}}>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                customIcon="flag"
                iconname="person-circle-outline"
                name="UserCode"
                placeholder="User Code"
                textContentType="none"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon
                icon="lock"
                name="Password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
            </View>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.loginBtnStyle}>
                <AppText
                  style={{
                    alignSelf: "center",
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  Login
                </AppText>
              </View>
            </TouchableOpacity>
            <AppButton
              navigation={navigation}
              text={""}
              iconFreeButton
              loginBtnStyle={styles.dummyButton}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image style={styles.icon1} source={require("../assets/logo.png")} />
        <AppText style={styles.h2}>Welcome to ZIL</AppText>
        <AppText style={{ textAlign: "center", marginTop: 60 }}>
          Login To Your Account
        </AppText>

        {/* <View style={styles.suboptionsRow1}>
          <SwitchSelector
            initial={0}
            borderRadius={5}
            height={60}
            onPress={(value) => settingUserType(value)}
            textColor={colors.grey}
            selectedColor="white"
            buttonColor={colors.secondary}
            borderColor={colors.primary}
            options={[
              { label: "CUSTOMER", value: "cU" },
              { label: "COMPANY USER", value: "compU" },
            ]}
            testID="user-switch-selector"
            accessibilityLabel="user-switch-selector"
          />
        </View>
*/}
        <View style={{ marginHorizontal: 30, marginTop: 20, height: "100%" }}>
          {loginView()}

          <ProgressDialog
            visible={progressVisible}
            title="Signing In"
            message="Please wait..."
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 40,
    backgroundColor: colors.primary,
    marginBottom: Platform.OS === "ios" ? 210 : 115,
  },

  h2: {
    fontSize: Platform.OS === "ios" ? 26 : 22,
    fontWeight: Platform.OS === "ios" ? "600" : null,
    color: colors.secondary,
    textAlign: "center",
    marginHorizontal: 30,
    marginTop: Platform.OS === "ios" ? 35 : 28,
  },
  h3: {
    fontSize: Platform.OS === "ios" ? 26 : 22,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "left",
    marginHorizontal: 30,
    marginTop: Platform.OS === "ios" ? 35 : 30,
  },
  h5: {
    fontSize: Platform.OS === "ios" ? 17 : 17,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "right",
    marginHorizontal: 20,
    marginVertical: Platform.OS === "ios" ? 17 : 17,
    marginRight: 0,
  },
  h6: {
    fontSize: Platform.OS === "ios" ? 17 : 17,
    fontWeight: "bold",
    color: colors.secondary,
    marginHorizontal: 5,

    marginVertical: Platform.OS === "ios" ? 17 : 57,
  },
  h7: {
    fontSize: Platform.OS === "ios" ? 17 : 17,
    fontWeight: Platform.OS === "ios" ? "600" : null,
    color: colors.grey,
    marginVertical: Platform.OS === "ios" ? 17 : 17,
  },
  suboptionsRow1: {
    marginTop: "15%",
    marginBottom: "10%",
    marginHorizontal: 30,
  },
  icon1: {
    width: Platform.OS === "android" ? "42%" : "41%",
    height: Platform.OS === "android" ? "23%" : "24%",
    marginTop: Platform.OS === "android" ? "10%" : "10%",
    alignSelf: "center",
    marginHorizontal: 30,
    resizeMode: "contain",
  },
  dummyButton: {
    fontWeight: "bold",
    marginTop: 15,
    justifyContent: "center",
    height: 60,
    borderColor: "#fff",
    borderRadius: 5,
    marginVertical: 0,
    marginBottom: 0,
  },
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    fontWeight: "bold",
    marginTop: 15,
    justifyContent: "center",
    height: 60,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    marginVertical: 0,
    marginBottom: 0,
  },

  bottomRow: {
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? -25 : 0,
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
  buttonTextStyle: {
    color: colors.white,
    marginLeft: 10,
    fontSize: Platform.OS === "android" ? 14 : 14,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
