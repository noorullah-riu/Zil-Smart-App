import React, {useState} from 'react';
import {View, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from '../components/colors';
import Constants from 'expo-constants';

import AppForm from "../components/AppForm"
import AppFormField from "../components/AppFormField"
import * as Yup from "yup";

const statusBarHeight = Constants.statusBarHeight;
import {Ionicons} from '@expo/vector-icons';
import NumericInput from 'react-native-numeric-input';
import SwitchSelector from 'react-native-switch-selector';

const validationSchema = Yup.object().shape({
    userName: Yup.string().required().max(50),
    password: Yup.string().required().min(5).label("password"),

});

const Login = ({navigation}) => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('ios-eye');

    const [orderType, setOrderType] = useState("");
    const [itemQty, setitemQty] = useState(1);
    const settingOrderType = (value) => {
        console.log(value);
        setOrderType(value);

    }
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <AppText style={styles.h2}>Welcome to Smart App</AppText>
                <View style={styles.suboptionsRow1}>
                    <SwitchSelector
                        hasPadding="true"
                        initial={0}
                        onPress={value => settingOrderType(value)}
                        textColor={colors.grey}
                        selectedColor={colors.background}
                        buttonColor={colors.primary}
                        borderColor={colors.light_grey}
                        hasPadding
                        options={[
                            {label: "CUSTOMER", value: "c",},
                            {label: "COMPANY USER", value: "cu",}
                        ]}
                        testID="user-switch-selector"
                        accessibilityLabel="user-switch-selector"
                    />
                </View>
                <AppForm
                    initialValues={{userName: "", password: "",}}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={validationSchema}
                    secureTextEntry={passwordVisibility}
                    rightIcon={
                        <TouchableOpacity>
                            <Ionicons name={rightIcon} size={28} color='grey'/>
                        </TouchableOpacity>
                    }

                >

                    <View style={{marginRight: 20}}>

                    </View>
                    <View style={{marginRight: 20}}>

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon
                            icon="lock"
                            name="password"
                            placeholder="Password"
                            secureTextEntry
                            textContentType="password"
                        />

                    </View>

                </AppForm>
            </SafeAreaView>
        </View>
    );
}

export default Login;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    h2: {
        fontSize: Platform.OS === "ios" ? 30 : 30,
        fontWeight: Platform.OS === "ios" ? "600" : null,
        color: colors.primary,
        textAlign: "center",
        marginHorizontal: 20,
        marginTop: Platform.OS === "ios" ? 0 : 17,

    },
    suboptionsRow1: {
        marginTop: "15%",
        marginHorizontal: 20,


    },
})

import React, {useState} from 'react';
import {StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity, FlatList} from "react-native";
import AppText from '../components/AppText';
import Constants from "expo-constants";
import colors from "../components/colors";
import AppRow from '../components/AppRow';
import Card3 from '../components/Card3';


const Chats = ({navigation}) => {
    const [orders, setOrders] = useState([
        {
            name: "Baby Feeder Solution",
            imagePath: require("../assets/feeder.png"),
        },
        {
            name: "LED Bulb Solution",
            imagePath: require("../assets/led2.png"),

        },
        {
            name: "Medical Parts Solution",
            imagePath: require("../assets/injection.png"),

        },
        {
            name: "Paint Bucket Solution",
            imagePath: require("../assets/paint-bucket.png"),

        },

        {
            name: "PVC Fitting Solution",
            imagePath: require("../assets/pvc.png"),

        },


    ]);
    const renderOrderList = () => {
        return (
            <FlatList
                numColumns={2}
                data={orders}
                renderItem={({item, index}) => {
                    return (
                        <Card3
                            name={item.name}
                            imagePath={item.imagePath}
                        />
                    );
                }}
                keyExtractor={(item) => item.imagePath}
            />
        );
    };
    return (
        <SafeAreaView style={{flex: 1,}}>
            {renderOrderList()}
        </SafeAreaView>
    );
}

export default Chats;
const styles = StyleSheet.create({})

// card3
import React from 'react';
import {StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity} from "react-native";
import AppText from './AppText';
import Constants from "expo-constants";
import colors from "./colors";
import AppRow from './AppRow';

const card1 = ({name, imagePath}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.card1}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={imagePath}/>
                </View>
                <View style={styles.textContainer}>
                    <AppText style={styles.p}>{name}</AppText>
                </View>
            </View>
        </TouchableOpacity>

    );
}

export default card1;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        marginLeft: Platform.OS === 'android' ? "5%" : "7%",
    },
    card1: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10,
    },
    imgContainer: {

        backgroundColor: colors.primary,
        margin: 8,
        borderRadius: 10,
        paddingHorizontal: 0,
        paddingVertical: 20

    },
    img: {
        alignSelf: "center",
    },
    textContainer: {
        width: 150,
        height: 60
    },
    p: {
        color: colors.secondary,
        marginVertical: 7,
        fontSize: 18,

        textAlign: "center"

    },


})

import React, {useState} from 'react';
import {StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity, FlatList} from "react-native";
import AppText from '../components/AppText';
import Constants from "expo-constants";
import colors from "../components/colors";
import AppRow from '../components/AppRow';
import Card3 from '../components/Card3';


const Chats = ({navigation}) => {
    const [orders, setOrders] = useState([
        {
            name: "LED Bulb Solution",
            imagePath: require("../assets/led2.png"),

        },
        {
            name: "Baby Feeder Solution",
            imagePath: require("../assets/feeder.png"),
        },

        {
            name: "Medical Parts Solution",
            imagePath: require("../assets/injection.png"),

        },
        {
            name: "Paint Bucket Solution",
            imagePath: require("../assets/paint-bucket.png"),

        },

        {
            name: "Chair Manufacturing",
            imagePath: require("../assets/chair.png"),

        },
        {
            name: "PVC Fitting Solution",
            imagePath: require("../assets/pvc.png"),

        },


    ]);

    return (
        <SafeAreaView style={{flex: 1,}}>
            <AppRow>
                <Card3 name="LED Bulb Solution" imagePath={require("../assets/led2.png")}/>
                <Card3 name="Baby Feeder Solution" imagePath={require("../assets/paint-bucket.png")}/>


            </AppRow>


            <AppRow>
                <Card3 name="Baby Feeder Solution" imagePath={require("../assets/pvc.png")}/>

                <Card3 name="Medical Parts Solution" imagePath={require("../assets/chair.png")}/>
            </AppRow>

        </SafeAreaView>
    );
}

export default Chats;
const styles = StyleSheet.create({})
    // 27 aug >> home
    < SafeAreaView
style = {
{
    flex:1,
}
}>

<
View
style = {
{
    borderColor:colors.yellow, borderWidth
:
    1, borderRadius
:
    20,
}
}>

<
Image
style = {styles.icon1}
source = {require("../assets/linechart.png"
)
}
/>

<AppText style={styles.h1}>
    Recent Activity
</AppText>
<View style={styles.dateView}>
    <AppText style={styles.p1}>Jan 17,2021</AppText>
</View>

{
    renderActivityList()
}
</View>

</SafeAreaView>
// 31/8

// card4
import React from 'react';
import {StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity} from "react-native";
import AppText from './AppText';
import Constants from "expo-constants";
import colors from "./colors";
import AppRow from './AppRow';
import AppButton from './AppButton';

const card4 = ({navigation, name, imagePath, price}) => {
    return (
        <TouchableOpacity>
            <View style={styles.card1}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={imagePath}/>
                </View>
                <View style={styles.textContainer}>
                    <AppText style={styles.p}>{name}</AppText>
                </View>
                <View>
                    <AppText style={styles.p1}>${price}K</AppText>

                </View>
                <View>
                    <AppButton
                        iconButton
                        text="ADD TO CART"
                        iconName={require("../assets/cart.png")}
                        containerStyle={styles.toppingsBtn}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default card4;

const styles = StyleSheet.create({
    card1: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: "5%",
        marginVertical: Platform.OS === 'android' ? 10 : 10,
        justifyContent: "center",
        marginRight: Platform.OS === 'android' ? 10 : 12,
        marginLeft: Platform.OS === 'android' ? 13 : 14,

        height: Platform.OS === 'android' ? 285 : 300,
        width: Platform.OS === 'android' ? 155 : 160,
    },
    imgContainer: {

        backgroundColor: colors.primary,
        margin: "5%",
        borderRadius: 10,
        paddingHorizontal: 0,
        paddingVertical: "10%",
        height: Platform.OS === 'android' ? 110 : 130,


    },
    img: {
        alignSelf: "center",
        width: Platform.OS === 'android' ? 125 : 110,
        height: Platform.OS === 'android' ? 50 : 75,
    },
    textContainer: {

        marginVertical: 2,
    },
    p: {
        color: colors.secondary,

        fontSize: Platform.OS === 'android' ? 14 : 16,
        marginLeft: 10,

    },
    p1: {
        color: colors.yellow,

        fontSize: Platform.OS === 'android' ? 14 : 16,
        marginLeft: 10,

    },
    toppingsBtn: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: colors.secondary,
        height: Platform.OS === 'android' ? 40 : 45,

        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 8,
        paddingHorizontal: 20
    },

})


import React, {useEffect, useState} from "react";
import {StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity} from "react-native";
import Constants from "expo-constants";
import AppForm from "../components/AppForm"
import AppFormField from "../components/AppFormField"
import * as Yup from "yup";
import AppText from "../components/AppText";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import SubmitButton from "../components/SubmitButton";
import {Formik, handleSubmit} from "formik";


const validationSchema = Yup.object().shape({
    name: Yup.string().required().max(50),
    email: Yup.string().required().max(50),
    password: Yup.string().required().min(5),
    confirmPassword: Yup.string().required().min(5),
    companyName: Yup.string().required().max(50),
    companyType: Yup.string().required().max(50),

});

const Signup = ({navigation}) => {

    const [orderType, setOrderType] = useState("");
    const [itemQty, setitemQty] = useState(1);
    const settingOrderType = (value) => {
        console.log(value);
        setOrderType(value);

    }
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('ios-eye');

    useEffect(() => {

    }, []);

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>

                <Image style={styles.icon1} source={require("../assets/blue_hcc.png")}/>
                <AppText style={styles.h3}>Create Account</AppText>


                <View style={{marginHorizontal: 30,}}>


                    <AppForm
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            companyName: "",
                            companyType: ""
                        }}
                        onSubmit={(values) => console.log(values)}
                        validationSchema={validationSchema}
                        handleChange
                        handleSubmit
                    >
                        <View style={{marginTop: "5%"}}>
                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="flag"
                                iconname="person-circle-outline"
                                name="name"
                                placeholder="Name"
                                textContentType="name"
                            />

                        </View>

                        <View style={{marginTop: "5%"}}>
                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="flag"
                                iconname="mail"
                                name="email"
                                placeholder="Email"
                                textContentType="emailAddress"
                            />

                        </View>
                        <View style={{marginTop: "5%"}}>
                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="md-business"
                                iconname="md-business-outline"
                                name="companyName"
                                placeholder="Company Name"
                                textContentType="name"
                            />

                        </View>
                        <View style={{marginTop: "5%"}}>
                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="md-business"
                                iconname="md-business"
                                name="companyType"
                                placeholder="Company Type"
                                textContentType="name"
                            />

                        </View>
                        <View style={{marginTop: "5%"}}>


                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="md-business"
                                iconname="lock-closed"
                                name="password"
                                placeholder="Password"
                                textContentType="password"
                                secureTextEntry
                            />
                        </View>
                        <View style={{marginTop: "5%"}}>
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon
                                icon="lock"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                secureTextEntry
                                textContentType="password"
                            />
                        </View>
                        <View style={{marginTop: "5%"}}>
                            {/* <TouchableOpacity onPress={() => navigation.navigate("AppDrawerNav")}>
                  <AppButton
                      navigation={navigation}
                      text="SIGN UP"
                      iconFreeButton
                      loginBtnStyle = {styles.loginBtnStyle}
                  />
          </TouchableOpacity> */}

                            <SubmitButton/>

                            <AppRow style={styles.bottomRow}>
                                <AppText style={styles.h7}>Already have an account?</AppText>
                                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                    <AppText style={styles.h6}>SIGN IN</AppText>
                                </TouchableOpacity>
                            </AppRow>
                        </View>
                    </AppForm>
                </View>


            </ScrollView>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.primary,
        marginBottom: 20,
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
        marginRight: 30,
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
        // textAlign:"right",
        marginVertical: Platform.OS === "ios" ? 17 : 17,
    },
    suboptionsRow1: {
        marginTop: "15%",
        marginBottom: "10%",
        marginHorizontal: 30,

    },
    icon1: {
        width: Platform.OS === 'android' ? "52%" : "50%",
        height: Platform.OS === 'android' ? "8%" : "8%",
        marginTop: Platform.OS === 'android' ? "10%" : "15%",
        alignSelf: "center",
        marginHorizontal: 30,

    },
    loginBtnStyle: {
        backgroundColor: colors.secondary,
        // flexDirection: 'row',
        justifyContent: "center",
        height: Platform.OS === 'android' ? 60 : 70,
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 5,
        // marginTop:20,
        marginHorizontal: 30,
        marginVertical: 0,
        marginBottom: 0,
    },
    bottomRow: {
        justifyContent: "center",
        marginTop: Platform.OS === 'android' ? -45 : 0,
        marginBottom: 70,
    }

});

export default Signup;


// Signup2

import React, {useEffect, useState} from "react";
import {StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity} from "react-native";
import Constants from "expo-constants";
import AppForm from "../components/AppForm"
import AppFormField from "../components/AppFormField"
import * as Yup from "yup";
import AppText from "../components/AppText";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import SubmitButton from "../components/SubmitButton";
import {Formik} from "formik";


const validationSchema = Yup.object().shape({
    name: Yup.string().required().max(50),
    email: Yup.string().required().max(50),
    password: Yup.string().required().min(5),
    confirmPassword: Yup.string().required().min(5),
    companyName: Yup.string().required().max(50),
    companyType: Yup.string().required().max(50),

});

const Signup = ({navigation}) => {

    const [orderType, setOrderType] = useState("");
    const [itemQty, setitemQty] = useState(1);
    const settingOrderType = (value) => {
        console.log(value);
        setOrderType(value);

    }
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('ios-eye');

    useEffect(() => {

    }, []);

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>

                <Image style={styles.icon1} source={require("../assets/blue_hcc.png")}/>
                <AppText style={styles.h3}>Create Account</AppText>


                <View style={{marginHorizontal: 30,}}>


                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            companyName: "",
                            companyType: ""
                        }}
                        onSubmit={(values) => console.log(values)}
                        validationSchema={validationSchema}

                    >
                        {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                            <>
                                <View style={{marginTop: "5%"}}>
                                    <AppFormField
                                        customIcon
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        customIcon="flag"
                                        iconname="person-circle-outline"
                                        name="name"
                                        placeholder="Name"
                                        textContentType="name"
                                    />

                                </View>

                                <View style={{marginTop: "5%"}}>
                                    <AppFormField
                                        customIcon
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        customIcon="flag"
                                        iconname="mail"
                                        name="email"
                                        placeholder="Email"
                                        textContentType="emailAddress"
                                    />

                                </View>
                                <View style={{marginTop: "5%"}}>
                                    <AppFormField
                                        customIcon
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        customIcon="md-business"
                                        iconname="md-business-outline"
                                        name="companyName"
                                        placeholder="Company Name"
                                        textContentType="name"
                                    />

                                </View>
                                <View style={{marginTop: "5%"}}>
                                    <AppFormField
                                        customIcon
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        customIcon="md-business"
                                        iconname="md-business"
                                        name="companyType"
                                        placeholder="Company Type"
                                        textContentType="name"
                                    />

                                </View>
                                <View style={{marginTop: "5%"}}>


                                    <AppFormField
                                        customIcon
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        customIcon="md-business"
                                        iconname="lock-closed"
                                        name="password"
                                        placeholder="Password"
                                        textContentType="password"
                                        secureTextEntry
                                    />
                                </View>
                                <View style={{marginTop: "5%"}}>
                                    <AppFormField
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        icon
                                        icon="lock"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        secureTextEntry
                                        textContentType="password"
                                    />
                                </View>
                                <View style={{marginTop: "5%"}}>
                                    {/* <TouchableOpacity onPress={() => navigation.navigate("AppDrawerNav")}>
                  <AppButton
                      navigation={navigation}
                      text="SIGN UP"
                      iconFreeButton
                      loginBtnStyle = {styles.loginBtnStyle}
                  />
          </TouchableOpacity> */}

                                    <SubmitButton title="SIGNUP"/>

                                    <AppRow style={styles.bottomRow}>
                                        <AppText style={styles.h7}>Already have an account?</AppText>
                                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                            <AppText style={styles.h6}>SIGN IN</AppText>
                                        </TouchableOpacity>
                                    </AppRow>
                                </View>
                            </>

                        )}
                    </Formik>
                </View>


            </ScrollView>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.primary,
        marginBottom: 20,
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
        marginRight: 30,
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
        // textAlign:"right",
        marginVertical: Platform.OS === "ios" ? 17 : 17,
    },
    suboptionsRow1: {
        marginTop: "15%",
        marginBottom: "10%",
        marginHorizontal: 30,

    },
    icon1: {
        width: Platform.OS === 'android' ? "52%" : "50%",
        height: Platform.OS === 'android' ? "8%" : "8%",
        marginTop: Platform.OS === 'android' ? "10%" : "15%",
        alignSelf: "center",
        marginHorizontal: 30,

    },
    loginBtnStyle: {
        backgroundColor: colors.secondary,
        // flexDirection: 'row',
        justifyContent: "center",
        height: Platform.OS === 'android' ? 60 : 70,
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 5,
        // marginTop:20,
        marginHorizontal: 30,
        marginVertical: 0,
        marginBottom: 0,
    },
    bottomRow: {
        justifyContent: "center",
        marginTop: Platform.OS === 'android' ? -45 : 0,
        marginBottom: 70,
    }

});

export default Signup;
//23 sep , 2018

import React, {useState} from 'react';
import {StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity} from "react-native";
import AppText from './AppText';
import Constants from "expo-constants";
import colors from "./colors";
import AppRow from './AppRow';
import AppButton from './AppButton';
import NumericInput from 'react-native-numeric-input';

const card4 = ({navigation, name, imagePath, price}) => {
    const [selectBtn, setSelectBtn] = useState('CartBtn');
    const [itemQty, setitemQty] = useState(1);

    const settingitemQty = (value) => {
        console.log(value);
        setitemQty(true);
    }
    const alterState = (val) => {
        setSelectBtn(val);
    }
    const NumInput = () => {
        <View style={{alignSelf: "center"}}>
            <NumericInput
                initValue={itemQty}
                onChange={value => settingitemQty(value)}
                style={styles.numericInput}
                rounded={true}
                totalHeight={35}
                totalWidth={125}
                iconStyle={{color: colors.PRIMARY_GREEN,}}
                borderColor={colors.BACKGROUND}
                textColor={colors.PRIMARY_GREEN}
                rightButtonBackgroundColor="#eeeeee"
                leftButtonBackgroundColor="#eeeeee"
                type='plus-minus'
                containerStyle={{borderRadius: 5}}
            />
        </View>
    }

    const CartBtn = () => {
        <AppButton
            iconButton
            text="ADD TO CART"
            iconName={require("../assets/cart.png")}
            containerStyle={styles.toppingsBtn}
        />
    }

    const selectedBtn = () => {
        // switch(selectBtn){
        //   case 'NumInput':
        //       return <NumInput />
        //   default:
        //       return <CartBtn />
        // }

    }
    return (
        <View style={styles.card1}>

            <View style={styles.imgContainer}>
                <Image style={styles.img} source={imagePath}/>
            </View>

            <View style={styles.textContainer}>
                <AppText style={styles.p}>{name}</AppText>
            </View>

            <View>
                <AppText style={styles.p1}>${price}K</AppText>

            </View>

            {/* <TouchableOpacity
          style={styles.wrapper}
          onPress={ () => alterState('NumInput') }
       >
           <AppButton
              iconButton
              text="ADD TO CART"
              iconName={require("../assets/cart.png")}
              containerStyle = {styles.toppingsBtn}
            />

       </TouchableOpacity> */}

            {selectedBtn()}
        </View>
    );
}

export default card4;

const styles = StyleSheet.create({
    wrapper: {},
    card1: {
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingBottom: 10,
    },
    imgContainer: {

        backgroundColor: colors.primary,
        borderRadius: 10,

        marginTop: "12%",
        marginBottom: "5%",
        paddingHorizontal: 10,
        paddingVertical: 15,

        justifyContent: "center",
        alignSelf: "center",


    },
    img: {
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        width: Platform.OS === 'android' ? 110 : 110,
        height: Platform.OS === 'android' ? 50 : 50,
    },
    textContainer: {

        marginVertical: 2,
    },
    p: {
        color: colors.secondary,

        fontSize: Platform.OS === 'android' ? 14 : 16,
        marginLeft: 10,
        width: 150,
        height: Platform.OS === 'android' ? 70 : 80,
    },
    p1: {
        color: colors.yellow,

        fontSize: Platform.OS === 'android' ? 14 : 16,
        marginLeft: 10,
        textAlign: "left",
        alignSelf: "flex-start"

    },
    toppingsBtn: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: colors.secondary,

        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal: 8,
        paddingHorizontal: Platform.OS === 'android' ? 0 : 10,
        paddingVertical: Platform.OS === 'android' ? 10 : 10,


    },


})
// login backup
import React, {useEffect, useState} from "react";
import {StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity, Alert} from "react-native";
import Constants from "expo-constants";

import AppForm from "../components/AppForm"
import AppFormField from "../components/AppFormField"
import * as Yup from "yup";
import AppText from "../components/AppText";
import SwitchSelector from 'react-native-switch-selector';
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import SubmitButton from "../components/SubmitButton";
import loginCompanyUserApi from "../api/loginCompanyUser";
import loginCustomerUserApi from "../api/loginCustomerUser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProgressDialog,} from 'react-native-simple-dialogs';


const validationSchema = Yup.object().shape({
    UserCode: Yup.string().required().max(50),
    Password: Yup.string().required().label("password"),
    CustomerCode: Yup.string().required().max(50),
    PhoneNumber: Yup.string().required().max(50),


});

const LoginScreen = ({navigation}) => {
    const [progressVisible, setprogressVisible] = useState(false);

    const [UserDetails, setUserDetails] = useState({});
    const [userType, setUserType] = useState("cU");
    const [itemQty, setitemQty] = useState(1);

    const settingUserType = (value) => {
        setUserType(value);


    }
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('ios-eye');

    useEffect(() => {

    }, []);

    const handleCustomerUserLogin = async (CustomerCode, PhoneNumber) => {
        console.log("handleCustomerUserLogin", userType)


        const res = await loginCustomerUserApi.loginCustomerUser(CustomerCode, PhoneNumber);
        console.log("CustomerUserLogin", res.data.UserDetails.SapUserCode)
        setprogressVisible(false);
        storeUserDetails(res.data.UserDetails)
        res.data.UserDetails.SapUserCode == CustomerCode ? navigation.navigate("AppDrawerNav") : Alert.alert(res.originalError)

    }

    const handleCompanyUserLogin = async (UserCode, Password) => {

        console.log("in handleCompanyUserLogin", userType)
        const res = await loginCompanyUserApi.loginCompanyUser(UserCode, Password)
        console.log("in handleCompanyUserLogin", res)

        setprogressVisible(false);
        storeUserDetails(res.data.Data)
        res.data.Data.SapUserCode == UserCode ? navigation.navigate("AppDrawerNav") : Alert.alert(res.originalError)

    }
    const storeUserDetails = async (value) => {

        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user_Details', jsonValue)
        } catch (e) {
        }
    }


    const handleOnSubmit = async ({UserCode, Password, CustomerCode, PhoneNumber}) => {
        console.log("aya");


        setprogressVisible(true);

        if (userType === 'cU') handleCustomerUserLogin(CustomerCode, PhoneNumber)

        if (userType === 'compU') handleCompanyUserLogin(UserCode, Password)

    }

    const loginView = () => {
        if (userType === 'cU') {
            return (
                <AppForm
                    initialValues={{UserCode: "", Password: "", CustomerCode: "", PhoneNumber: ""}}
                    onSubmit={(values) => handleOnSubmit(values)}
                    validationSchema={validationSchema}
                    secureTextEntry={passwordVisibility}>
                    <View>
                        <View style={{}}>
                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="flag"
                                iconname="person-circle-outline"
                                name="CustomerCode"
                                validationSchema
                                placeholder="Customer Code"
                                textContentType="none"
                            />

                        </View>

                        <View style={{marginTop: "8%"}}>
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon
                                icon="cellphone-android"
                                name="PhoneNumber"
                                placeholder="Phone Number"
                                textContentType="telephoneNumber"
                            />
                        </View>
                    </View>


                    <TouchableOpacity>
                        <AppText style={styles.h5}>Forgot password?</AppText>
                    </TouchableOpacity>

                    <View>

                        <SubmitButton title="LOGIN"/>

                        <AppRow style={styles.bottomRow}>
                            <AppText style={styles.h7}>Don't have an account?</AppText>
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <AppText style={styles.h6}>SIGN UP</AppText>
                            </TouchableOpacity>
                        </AppRow>

                    </View>
                    <ProgressDialog
                        visible={progressVisible}
                        title="Signing In"
                        message="Please wait..."
                    />
                </AppForm>

            )
        } else {
            return (

                <AppForm
                    initialValues={{UserCode: "", Password: "", CustomerCode: "", PhoneNumber: ""}}
                    onSubmit={(values) => handleOnSubmit(values)}
                    validationSchema={validationSchema}
                    secureTextEntry={passwordVisibility}>
                    <View>
                        <View style={{}}>
                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="flag"
                                iconname="person-circle-outline"
                                name="UserCode"
                                placeholder="User Code"
                                textContentType="none"
                            />
                        </View>

                        <View style={{marginTop: "8%"}}>
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
                    </View>


                    <TouchableOpacity>
                        <AppText style={styles.h5}>Forgot password?</AppText>
                    </TouchableOpacity>

                    <View>

                        <SubmitButton title="LOGIN"/>

                        <AppRow style={styles.bottomRow}>
                            <AppText style={styles.h7}>Don't have an account?</AppText>
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <AppText style={styles.h6}>SIGN UP</AppText>
                            </TouchableOpacity>
                        </AppRow>

                    </View>
                    <ProgressDialog
                        visible={progressVisible}
                        title="Signing In"
                        message="Please wait..."
                    />
                </AppForm>


            )
        }


    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>


                <Image style={styles.icon1} source={require("../assets/blue_hcc.png")}/>
                <AppText style={styles.h2}>Welcome to HCC Smart App</AppText>
                <AppText style={styles.h3}>Sign In</AppText>


                <View style={styles.suboptionsRow1}>
                    <SwitchSelector
                        initial={0}
                        borderRadius={5}
                        height={60}
                        onPress={value => settingUserType(value)}
                        textColor={colors.grey}
                        selectedColor="white"
                        buttonColor={colors.secondary}
                        borderColor={colors.primary}
                        options={[
                            {label: "CUSTOMER", value: "cU",},
                            {label: "COMPANY USER", value: "compU",}
                        ]}
                        testID="user-switch-selector"
                        accessibilityLabel="user-switch-selector"
                    />
                </View>
                <View style={{marginHorizontal: 30,}}>
                    {loginView()}
                </View>


            </SafeAreaView>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {

        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.primary,
        marginBottom: 110,

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
        // textAlign:"right",
        marginVertical: Platform.OS === "ios" ? 17 : 17,
    },
    suboptionsRow1: {
        marginTop: "15%",
        marginBottom: "10%",
        marginHorizontal: 30,

    },
    icon1: {
        width: Platform.OS === 'android' ? "49%" : "49%",
        height: Platform.OS === 'android' ? "9%" : "10%",
        marginTop: Platform.OS === 'android' ? "10%" : "15%",
        alignSelf: "center",
        marginHorizontal: 30,

    },
    loginBtnStyle: {
        backgroundColor: colors.secondary,
        // flexDirection: 'row',
        justifyContent: "center",
        height: Platform.OS === 'android' ? 60 : 70,
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 5,
        // marginTop:20,
        marginHorizontal: 30,
        marginVertical: 0,
        marginBottom: 0,
    },
    bottomRow: {
        justifyContent: "center",
        marginTop: Platform.OS === 'android' ? -25 : 0,
    }

});

export default LoginScreen;

//login2

import React, {useEffect, useState} from "react";
import {StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity, Alert} from "react-native";
import Constants from "expo-constants";

import AppForm from "../components/AppForm"
import AppFormField from "../components/AppFormField"
import * as Yup from "yup";
import AppText from "../components/AppText";
import SwitchSelector from 'react-native-switch-selector';
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import SubmitButton from "../components/SubmitButton";
import loginCompanyUserApi from "../api/loginCompanyUser";
import loginCustomerUserApi from "../api/loginCustomerUser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProgressDialog,} from 'react-native-simple-dialogs';


const validationSchema = Yup.object().shape({
    // UserCode:Yup.string().required().max(50),
    // Password:Yup.string().required().label("password"),
    CustomerCode: Yup.string().required().max(50),
    PhoneNumber: Yup.string().required().max(50),


});

const LoginScreen = ({navigation}) => {
    const [progressVisible, setprogressVisible] = useState(false);

    const [UserDetails, setUserDetails] = useState({});
    const [userType, setUserType] = useState("cU");
    const [itemQty, setitemQty] = useState(1);

    const settingUserType = (value) => {
        setUserType(value);


    }
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('ios-eye');

    useEffect(() => {

    }, []);

    const handleCustomerUserLogin = async (CustomerCode, PhoneNumber) => {
        console.log("handleCustomerUserLogin", userType)


        const res = await loginCustomerUserApi.loginCustomerUser(CustomerCode, PhoneNumber);
        console.log("CustomerUserLogin", res.data.UserDetails.SapUserCode)
        setprogressVisible(false);
        storeUserDetails(res.data.UserDetails)
        res.data.UserDetails.SapUserCode == CustomerCode ? navigation.navigate("AppDrawerNav") : Alert.alert(res.originalError)

    }

    const handleCompanyUserLogin = async (UserCode, Password) => {

        console.log("in handleCompanyUserLogin", userType)
        const res = await loginCompanyUserApi.loginCompanyUser(UserCode, Password)
        console.log("in handleCompanyUserLogin", res)

        setprogressVisible(false);
        storeUserDetails(res.data.Data)
        res.data.Data.SapUserCode == UserCode ? navigation.navigate("AppDrawerNav") : Alert.alert(res.originalError)

    }
    const storeUserDetails = async (value) => {

        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@user_Details', jsonValue)
        } catch (e) {
        }
    }


    const handleOnSubmit = async ({UserCode, Password, CustomerCode, PhoneNumber}) => {


        setprogressVisible(true);

        handleCustomerUserLogin(CustomerCode, PhoneNumber)


    }

//   const loginView =()=>{
//     if(userType === 'cU'){
//       return(

//       )
//     }else{
// return(
//   <View>
//   <View style={{}}>
//        <AppFormField
//            customIcon
//            autoCapitalize="none"
//            autoCorrect={false}
//            customIcon = "flag"
//            iconname="person-circle-outline"
//            name="UserCode"
//            placeholder="User Code"
//            textContentType="none"
//                        />
//   </View>

//    <View style={{marginTop:"8%"}}>
//        <AppFormField
//        autoCapitalize="none"
//        autoCorrect={false}
//        icon
//        icon="lock"
//        name="Password"
//        placeholder="Password"
//        secureTextEntry
//        textContentType="password"
//        />
//    </View>
// </View>

// )
//     }


//   }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>


                <Image style={styles.icon1} source={require("../assets/blue_hcc.png")}/>
                <AppText style={styles.h2}>Welcome to HCC Smart App</AppText>
                <AppText style={styles.h3}>Sign In</AppText>


                <View style={styles.suboptionsRow1}>
                    <SwitchSelector
                        initial={0}
                        borderRadius={5}
                        height={60}
                        onPress={value => settingUserType(value)}
                        textColor={colors.grey}
                        selectedColor="white"
                        buttonColor={colors.secondary}
                        borderColor={colors.primary}
                        options={[
                            {label: "CUSTOMER", value: "cU",},
                            {label: "COMPANY USER", value: "compU",}
                        ]}
                        testID="user-switch-selector"
                        accessibilityLabel="user-switch-selector"
                    />
                </View>
                <View style={{marginHorizontal: 30,}}>


                    <AppForm
                        initialValues={{CustomerCode: "", PhoneNumber: ""}}
                        onSubmit={(values) => handleOnSubmit(values)}
                        validationSchema={validationSchema}
                        secureTextEntry={passwordVisibility}
                    >
                        <View>
                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="flag"
                                iconname="person-circle-outline"
                                name="CustomerCode"
                                validationSchema
                                placeholder="Customer Code"
                                textContentType="none"
                            />

                        </View>

                        <View style={{marginTop: "8%"}}>
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon
                                icon="cellphone-android"
                                name="PhoneNumber"
                                placeholder="Phone Number"
                                textContentType="telephoneNumber"
                            />
                        </View>
                        <TouchableOpacity>
                            <AppText style={styles.h5}>Forgot password?</AppText>
                        </TouchableOpacity>

                        <View>

                            <SubmitButton title="LOGIN"/>

                            <AppRow style={styles.bottomRow}>
                                <AppText style={styles.h7}>Don't have an account?</AppText>
                                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                    <AppText style={styles.h6}>SIGN UP</AppText>
                                </TouchableOpacity>
                            </AppRow>

                        </View>
                        <ProgressDialog
                            visible={progressVisible}
                            title="Signing In"
                            message="Please wait..."
                        />
                    </AppForm>
                </View>


            </SafeAreaView>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {

        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.primary,
        marginBottom: 110,

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
        // textAlign:"right",
        marginVertical: Platform.OS === "ios" ? 17 : 17,
    },
    suboptionsRow1: {
        marginTop: "15%",
        marginBottom: "10%",
        marginHorizontal: 30,

    },
    icon1: {
        width: Platform.OS === 'android' ? "49%" : "49%",
        height: Platform.OS === 'android' ? "9%" : "10%",
        marginTop: Platform.OS === 'android' ? "10%" : "15%",
        alignSelf: "center",
        marginHorizontal: 30,

    },
    loginBtnStyle: {
        backgroundColor: colors.secondary,
        // flexDirection: 'row',
        justifyContent: "center",
        height: Platform.OS === 'android' ? 60 : 70,
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 5,
        // marginTop:20,
        marginHorizontal: 30,
        marginVertical: 0,
        marginBottom: 0,
    },
    bottomRow: {
        justifyContent: "center",
        marginTop: Platform.OS === 'android' ? -25 : 0,
    }

});

export default LoginScreen;

// login3
import React, {useEffect, useState} from "react";
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

import AppForm from "../components/AppForm";
import AppFormField from "../components/AppFormField";
import * as Yup from "yup";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

import SwitchSelector from "react-native-switch-selector";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import SubmitButton from "../components/SubmitButton";
import loginCompanyUserApi from "../api/loginCompanyUser";
import loginCustomerUserApi from "../api/loginCustomerUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ProgressDialog} from "react-native-simple-dialogs";

const validationSchema = Yup.object().shape({
    CustomerCode: Yup.string().required().max(50),
    PhoneNumber: Yup.string().required().max(50),
});
const validationSchema1 = Yup.object().shape({
    UserCode: Yup.string().required().max(50),
    Password: Yup.string().required().label("password"),
});

const LoginScreen = ({navigation}) => {

    const [progressVisible, setprogressVisible] = useState(false);

    const [UserDetails, setUserDetails] = useState({});
    const [userType, setUserType] = useState("cU");
    const [itemQty, setitemQty] = useState(1);

    const settingUserType = (value) => {
        console.log(value);
        setUserType(value);
    };
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState("ios-eye");

    useEffect(() => {
        console.log(userType);
    }, []);

    const handleCustomerUserLogin = async (CustomerCode, PhoneNumber) => {
        console.log("handleCustomerUserLogin", userType);

        const res = await loginCustomerUserApi.loginCustomerUser(
            CustomerCode,
            PhoneNumber
        );
        console.log("CustomerUserLogin", res);
        setprogressVisible(false);
        // storeUserDetails(res.data.UserDetails);
        // res.data.UserDetails.SapUserCode == CustomerCode
        //   ? navigation.navigate("AppDrawerNav")
        //   : Alert.alert(res.originalError);
    };

    const handleCompanyUserLogin = async (UserCode, Password) => {
        console.log("in handleCompanyUserLogin", userType);
        const res = await loginCompanyUserApi.loginCompanyUser(UserCode, Password);
        console.log("in handleCompanyUserLogin", res);

        setprogressVisible(false);
        storeUserDetails(res.data.Data);
        res.data.Data.SapUserCode == UserCode
            ? navigation.navigate("AppDrawerNav")
            : Alert.alert(res.originalError);
    };
    const storeUserDetails = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("@user_Details", jsonValue);
        } catch (e) {
        }
    };


    const CustomerUserView = () => {

        const handleOnSubmit = async ({CustomerCode, PhoneNumber}) => {
            //  console.log("UserCode, Password, CustomerCode, PhoneNumber", UserCode, Password, CustomerCode, PhoneNumber)
            setprogressVisible(true);

            handleCustomerUserLogin(CustomerCode, PhoneNumber);

            //  if(userType === 'compU') handleCompanyUserLogin(UserCode,Password)
        };

        return (
            <View style={{marginHorizontal: 30}}>
                <AppForm
                    initialValues={{CustomerCode: "", PhoneNumber: ""}}
                    onSubmit={(values) => handleOnSubmit(values)}
                    validationSchema={validationSchema}
                    secureTextEntry={passwordVisibility}
                >
                    <View>
                        <View style={{}}>
                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="flag"
                                iconname="person-circle-outline"
                                name="CustomerCode"
                                validationSchema
                                placeholder="Customer Code"
                                textContentType="none"
                            />
                        </View>

                        <View style={{marginTop: "8%"}}>
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon
                                icon="cellphone-android"
                                name="PhoneNumber"
                                placeholder="Phone Number"
                                textContentType="telephoneNumber"
                            />
                        </View>
                        <TouchableOpacity>
                            <AppText style={styles.h5}>Forgot password?</AppText>
                        </TouchableOpacity>
                        <View>
                            <AppButton
                                navigation={navigation}
                                text="LOGIN"
                                iconFreeButton
                                loginBtnStyle={styles.loginBtnStyle}
                                onPress={handleSubmit}
                            />

                            <AppRow style={styles.bottomRow}>
                                <AppText style={styles.h7}>Don't have an account?</AppText>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Signup")}
                                >
                                    <AppText style={styles.h6}>SIGN UP</AppText>
                                </TouchableOpacity>
                            </AppRow>
                        </View>
                        <ProgressDialog
                            visible={progressVisible}
                            title="Signing In"
                            message="Please wait..."
                        />
                    </View>
                </AppForm>
            </View>

        )
    }


    const CompanyUserView = () => {
        const handleOnSubmit1 = async ({UserCode, Password}) => {
            //  console.log("UserCode, Password, CustomerCode, PhoneNumber", UserCode, Password, CustomerCode, PhoneNumber)
            setprogressVisible(true);

            handleCompanyUserLogin(UserCode, Password);

            //  if(userType === 'compU') handleCompanyUserLogin(UserCode,Password)
        };
        return (
            <View style={{marginHorizontal: 30}}>
                <AppForm
                    initialValues={{UserCode: "", Password: "",}}
                    onSubmit={(values) => handleOnSubmit1(values)}
                    validationSchema={validationSchema1}
                    secureTextEntry={passwordVisibility}
                >
                    <View>
                        <View style={{}}>
                            <AppFormField
                                customIcon
                                autoCapitalize="none"
                                autoCorrect={false}
                                customIcon="flag"
                                iconname="person-circle-outline"
                                name="CustomerCode"
                                validationSchema
                                placeholder="Customer Code"
                                textContentType="none"
                            />
                        </View>

                        <View style={{marginTop: "8%"}}>
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon
                                icon="cellphone-android"
                                name="PhoneNumber"
                                placeholder="Phone Number"
                                textContentType="telephoneNumber"
                            />
                        </View>
                        <TouchableOpacity>
                            <AppText style={styles.h5}>Forgot password?</AppText>
                        </TouchableOpacity>
                        <View>
                            {/* <SubmitButton title="LOGIN" /> */}
                            <AppButton
                                navigation={navigation}
                                text="LOGIN"
                                iconFreeButton
                                loginBtnStyle={styles.loginBtnStyle}
                                onPress={handleSubmit}
                            />

                            <AppRow style={styles.bottomRow}>
                                <AppText style={styles.h7}>Don't have an account?</AppText>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Signup")}
                                >
                                    <AppText style={styles.h6}>SIGN UP</AppText>
                                </TouchableOpacity>
                            </AppRow>
                        </View>
                        <ProgressDialog
                            visible={progressVisible}
                            title="Signing In"
                            message="Please wait..."
                        />
                    </View>
                </AppForm>
            </View>

        )
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Image
                    style={styles.icon1}
                    source={require("../assets/blue_hcc.png")}
                />
                <AppText style={styles.h2}>Welcome to HCC Smart App</AppText>
                <AppText style={styles.h3}>Sign In</AppText>

                <View style={styles.suboptionsRow1}>
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
                            {label: "CUSTOMER", value: "cU"},
                            {label: "COMPANY USER", value: "compU"},
                        ]}
                        testID="user-switch-selector"
                        accessibilityLabel="user-switch-selector"
                    />
                </View>

                {userType === 'cU' ? <CustomerUserView/> : <CustomerUserView/>}


            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.primary,
        marginBottom: 110,
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
        // textAlign:"right",
        marginVertical: Platform.OS === "ios" ? 17 : 17,
    },
    suboptionsRow1: {
        marginTop: "15%",
        marginBottom: "10%",
        marginHorizontal: 30,
    },
    icon1: {
        width: Platform.OS === "android" ? "49%" : "49%",
        height: Platform.OS === "android" ? "9%" : "10%",
        marginTop: Platform.OS === "android" ? "10%" : "15%",
        alignSelf: "center",
        marginHorizontal: 30,
    },
    // loginBtnStyle: {
    //   backgroundColor: colors.secondary,
    //   // flexDirection: 'row',
    //   justifyContent: "center",
    //   height: Platform.OS === "android" ? 60 : 70,
    //   borderWidth: 0.5,
    //   borderColor: "#fff",
    //   borderRadius: 5,
    //   // marginTop:20,
    //   marginHorizontal: 30,
    //   marginVertical: 0,
    //   marginBottom: 0,
    // },
    loginBtnStyle: {
        backgroundColor: colors.secondary,
        fontWeight: "bold",
        // color:colors.white,
        // flexDirection: 'row',
        justifyContent: "center",
        height: Platform.OS === 'android' ? 60 : 70,
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 5,
        // marginTop:20,
        marginHorizontal: 30,
        marginVertical: 0,
        marginBottom: 0,
        // alignItems:"center"
    },

    bottomRow: {
        justifyContent: "center",
        marginTop: Platform.OS === "android" ? -25 : 0,
    },
});

export default LoginScreen;

// quotation detail

import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, View, StyleSheet, TouchableOpacity} from "react-native";
import AppHeader from '../components/AppHeader';
import OrderDetailCard from '../components/OrderDetailCard';
import RNPickerSelect from 'react-native-picker-select';
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from 'react-native-datepicker';
import AppButton from '../components/AppButton';
import saleOrderDetailsApi from "../api/saleOrderDetails";
import {ProgressDialog, Dialog} from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-async-storage/async-storage';


const QuotationDetail = ({route, navigation}) => {
    const {id} = route.params;

    const [progressVisible, setprogressVisible] = useState(true);
    const [slp, setSlp] = useState({});
    const [date, setDate] = useState('');
    const [orderDetail, setOrderDetail] = useState([]);


    const getSaleorderDetail = async (DocNum) => {
        console.log("getSaleorderDetail api called")

        const response = await saleOrderDetailsApi.getSaleOrderDetails(DocNum);
        console.log("response from getSaleorderDetail apiiiii", response.data.Data[0].length)
        setprogressVisible(false);
        if (!response.ok) return alert("Couldn't retrieve the SaleorderDetail");
        setOrderDetail(response.data.Data[0]);
    };


    useEffect(() => {
        // getUserDetails();
        getSaleorderDetail(id);
        // console.log("received item in order detail:", item)
    }, []);


    //DocNum, ItemCode,Dscription,PriceBefDi,Price,Quantity, UomCode

    const renderOrderList = () => {
        console.log(item);
        // return (
        //   <FlatList
        //     data={item}
        //     renderItem={({ item, index }) => {

        //       return (
        <OrderDetailCard
            id={item.DocNum}
            // value={item.DocTotal}
            name={item.Dscription}
            // count={item.count}
            // orderDate={item.DocDate}
            // deliveryDate={item.DeliveryDate}
            navigation={navigation}

        />
        //       );
        //     }}
        //     keyExtractor={(item) => item.DocNum}
        //   />
        // );
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <AppHeader

                backBtnOnly
                title="Back"
                bckBtnImg={require("../assets/back-button.png")}
                navigation={navigation}
                headerTitle="Quotation Detail"
            />

            {/* {renderOrderList(item)} */}
            {/* <AppText>{item}</AppText> */}
            <OrderDetailCard
                item={orderDetail}
            />

        </SafeAreaView>
    );
}

export default QuotationDetail;

const styles = StyleSheet.create({
    p1: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 16,
        width: "60%"
    },
    loginBtnStyle: {
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        height: Platform.OS === 'android' ? 60 : 70,
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 5,
        marginHorizontal: "20%",
        marginBottom: 0,
    },
})
//card3 16/11/21

import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from "react-native";
import AppText from './AppText';
import colors from "./colors";

const card1 = ({navigation, name, imagePath, itemCode}) => {
    console.log("in card3", imagePath)
    return (

        <TouchableOpacity onPress={() => navigation.navigate("Items", {itemCode: itemCode})}>
            <View style={styles.card1}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{uri: imagePath}}/>
                </View>
                <View style={styles.textContainer}>
                    <AppText style={styles.p}>{name}</AppText>
                </View>
            </View>
        </TouchableOpacity>

    );
}

export default card1;

const styles = StyleSheet.create({
    container: {

        marginTop: "6%",

    },
    card1: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: "5%",
        height: Platform.OS === 'android' ? 185 : "90%",
        width: Platform.OS === 'android' ? 140 : 155,
    },
    imgContainer: {

        // backgroundColor:colors.primary,
        margin: "5%",
        borderRadius: 10,
        paddingHorizontal: 0,
        justifyContent: "center",
        height: Platform.OS === 'android' ? 105 : 110,

    },
    img: {

        // flex:1,
        width: Platform.OS === "android" ? "100%" : "100%",
        height: Platform.OS === "android" ? "100%" : "100%",
        resizeMode: "contain",
        // alignSelf:"center",
        // resizeMode:'cover',
        // width: Platform.OS === 'android' ? 21 : 35,
        // height: Platform.OS === 'android' ? 45 : 75,
    },
    textContainer: {

        alignSelf: "center"
    },
    p: {
        color: colors.secondary,
        marginVertical: 7,
        fontSize: Platform.OS === 'android' ? 14 : 16,

        textAlign: "center"

    },


})
// 16/11/21
//catalog card

import React, {useContext, useEffect} from "react";
import {
    StyleSheet,
    Image,
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import {Asset} from "expo-asset";
import AppText from "./AppText";
import Constants from "expo-constants";
import colors from "./colors";
import AppRow from "./AppRow";

import OpenPdf from "react-native-open-pdf";

const CatalogCard = ({navigation, name, imagePath, catalogCode}) => {


    const handlePress = () => {
        let fileSource = getPdfFile(catalogCode);
        console.log("fileSource", fileSource);
        fileSource = "http://docs.google.com/gview?embedded=true&url=http://110.38.56.6:44502/pdf/" + fileSource;

        console.log("3", fileSource);
        navigation.navigate("CatalogView", fileSource.toString());
    };
    const getPdfFile = (id) => {
        let links = {
            0: "BSeriesCatalougeLeshan.pdf",
            1: "DemajiScrewBarrelCatalogue.pdf",
            2: "HENGDAcatalogue.pdf",
            3: "HUARECatalogue2021.pdf",
            4: "SCR.pdf",
            5: "KSeriesCatalougeleshan.pdf",
            6: "USeriesCatalougeleshan.pdf",
            7: "PlasticPipeAndProfileLineCatalogueJinhu.pdf",
            8: "PlasticSheetAndBoardLineCatalogueJinhu.pdf",
            9: "ScrewAndBarrelCatalogueJinhu.pdf",
            10: "LATESTYH80.pdf",
        };

        return links[id];
    };
    useEffect(() => {
    }, []);
    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <View style={styles.card1}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={imagePath}/>
                </View>
                <View style={styles.textContainer}>
                    <AppText style={styles.p}>{name}</AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CatalogCard;

const styles = StyleSheet.create({
    container: {
        marginTop: "6%",
    },
    card1: {
        backgroundColor: colors.white,
        borderRadius: 10,
        height: Platform.OS === "android" ? 185 : 190,
        width: Platform.OS === "android" ? 160 : 185,
        marginRight: 10,
    },
    imgContainer: {

        borderRadius: 40,
        paddingHorizontal: 0,
        justifyContent: "center",
        alignItems: "center",
        height: Platform.OS === "android" ? 105 : 110,
    },
    img: {
        alignSelf: "center",
        width: Platform.OS === "android" ? "100%" : "100%",
        height: Platform.OS === "android" ? "100%" : "100%",
    },
    textContainer: {

        alignSelf: "center",
        paddingVertical: 20,
    },
    p: {
        color: colors.secondary,
        marginTop: 7,
        fontSize: Platform.OS === "android" ? 14 : 16,

        textAlign: "center",
    },
});


//22/11/21

import React, {useState} from "react";
import {StyleSheet, Image, View, TouchableOpacity} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppButton from "./AppButton";
import NumericInput from "react-native-numeric-input";

const card4 = ({
                   navigation,
                   name,
                   imagePath,
                   price,
                   currentItem,
                   allItems,
                   availableQty,
               }) => {
    const [showCartBtn, setShowCartBtn] = useState(true);
    const [itemQty, setitemQty] = useState(1);
    const [allAddedItems, setallAddedItems] = useState([]);

    const settingitemQty = (value) => {
        let qty = value;
        setitemQty(value);
        currentItem.Qty = value;
        allAddedItems.push(currentItem);
    };
    const alterState = () => {
        setShowCartBtn((showCartBtn) => !showCartBtn);
        currentItem.Qty++;
        allAddedItems.push(currentItem);
    };
    console.log("in card 4:", imagePath);

    return (
        <View style={styles.card1}>

            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{uri: imagePath}}/>
            </View>

            <View style={styles.textContainer}>
                <AppText style={styles.p}>{name}</AppText>
            </View>

            <View>
                <AppText style={styles.p6}>
                    Available Qty: <AppText style={styles.p6b}>{availableQty}</AppText>
                </AppText>

                <AppText style={styles.p1}>${price}K</AppText>
            </View>

            {showCartBtn ? (
                <TouchableOpacity style={styles.wrapper} onPress={() => alterState()}>
                    <AppButton
                        newIconButton
                        text="ADD TO CART"
                        iconName={require("../assets/cart.png")}
                        containerStyle={styles.toppingsBtn}
                    />
                </TouchableOpacity>
            ) : (
                <View style={{alignSelf: "center"}}>
                    <NumericInput
                        initValue={itemQty}
                        onChange={(value) => settingitemQty(value)}
                        style={styles.toppingsBtn}
                        rounded={true}
                        totalHeight={43}
                        totalWidth={147}
                        iconStyle={{color: colors.primaryBlue}}
                        borderColor={colors.primaryBlue}
                        textColor={colors.primaryBlue}
                        rightButtonBackgroundColor="#eeeeee"
                        leftButtonBackgroundColor="#eeeeee"
                        type="plus-minus"
                        containerStyle={styles.numericIpBtn}
                    />
                </View>
            )}
        </View>
    );
};

export default card4;

const styles = StyleSheet.create({
    wrapper: {},
    card1: {
        backgroundColor: colors.white,
        borderRadius: 10,
        borderRadius: 10,
        // marginRight: 10,
        // paddingBottom: 10,
    },
    imgContainer: {

        // backgroundColor:colors.primary,
        // borderRadius:10,

        // marginTop:"12%",
        // marginBottom:"5%",
        // paddingHorizontal:10,
        // paddingVertical:15,

        // justifyContent:"center",
        // alignSelf:"center",

        borderRadius: 40,
        paddingHorizontal: 0,
        justifyContent: "center",
        alignItems: "center",
        height: Platform.OS === "android" ? 105 : 110,
    },
    img: {
        // alignSelf:"center",
        // alignItems:"center",
        paddingTop: 10,
        alignContent: "center",
        width: Platform.OS === "android" ? 110 : 120,
        height: Platform.OS === "android" ? 50 : 110,
        resizeMode: "contain",
    },
    textContainer: {
        marginVertical: 2,
    },
    p: {
        color: colors.secondary,

        fontSize: Platform.OS === "android" ? 14 : 16,
        marginLeft: 10,
        width: 150,
        // height: Platform.OS === "android" ? 70 : 80,
    },
    p1: {
        color: colors.yellow,

        fontSize: Platform.OS === "android" ? 14 : 16,
        marginLeft: 10,
        textAlign: "left",
        alignSelf: "flex-start",
    },
    toppingsBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondary,

        borderWidth: 0.5,
        borderColor: "#fff",
        borderRadius: 10,

        marginTop: 10,
        marginBottom: 10,

        marginHorizontal: 8,
        paddingHorizontal: Platform.OS === "android" ? 0 : 10,
        paddingVertical: Platform.OS === "android" ? 10 : 10,
    },
    numericIpBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: colors.secondary,
        // borderWidth: 0.5,
        // borderColor: '#fff',
        borderRadius: 10,

        marginTop: 15,
        marginBottom: 10,

        marginHorizontal: 10,
        paddingHorizontal: Platform.OS === "android" ? 0 : 10,
        paddingVertical: Platform.OS === "android" ? 10 : 10,
    },
    p6: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 14 : 12,
        marginTop: 5,
        marginLeft: 10,
    },
    p6b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 14 : 12,
        fontWeight: "bold",
    },
});

// debit ? opening_Bal + debit :  opening_Bal - credit => Balance

// 20/2/2022 ActivitiesOnMap

import React, {useState, useEffect, useContext} from "react";
import MapView, {Marker} from "react-native-maps";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import AppHeader from "../components/AppHeader";
import * as Location from "expo-location";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import MarkAttendanceApi from "../api/markAttendance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActivitiesOnMap = ({navigation, route}) => {
    const {latLongList} = route.params;
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

    // const staticData = [
    //   { coordinates: { latitude: 37.78383, longitude: -122.405766 } },
    //   { coordinates: { latitude: 37.78584, longitude: -122.405478 } },
    //   { coordinates: { latitude: 37.784738, longitude: -122.402839 } },
    // ];


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
    // userCode,userName,checkIn,date,checkInLocation,checkOut
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
        console.log("handleCheckIn:", response);
        setprogressVisible(false);

        if (!response.ok) return alert("Unable to mark your Attendance!");
    };
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
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
        console.log("latLongList", latLongList);
    }, []);
    const mapMarkers = () => {
        latLongList.map((report) => (
            <Marker
                key={report.id}
                coordinate={{latitude: report.latitude, longitude: report.longitude}}
                // description={report.comments}
            ></Marker>
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
                >
                    <Marker
                        coordinate={{latitude: 31.52358005642689, longitude: 74.2746343286123}}
                    />
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
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: "center",
        height: Platform.OS === "android" ? 60 : 70,
        borderWidth: 0.5,
        borderColor: "#fff",
        borderRadius: 5,
        marginHorizontal: "10%",
        marginVertical: 45,
    },
});


//25-2-22
//stocklist
import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppRow from "./AppRow";
import {FontAwesome5, AntDesign} from "@expo/vector-icons";

const StockList = ({Stock, ItemCode, ItemName, Description, Price}) => {
    useEffect(() => {
    }, []);

    return (
        <View style={styles.card1}>
            <AppRow style={{justifyContent: "space-between"}}>
                <AppRow>
                    {/* <AntDesign name="database" size={24} color={colors.tertiary} /> */}
                    <FontAwesome5 name="layer-group" size={15} color={colors.tertiary}/>
                    <AppText style={styles.p6}> {Stock}</AppText>
                </AppRow>
                <AppRow>
                    <FontAwesome5 name="file-invoice" size={15} color={colors.tertiary}/>
                    <AppText style={styles.p6}> {ItemCode}</AppText>
                </AppRow>
            </AppRow>
            <AppRow style={styles.row1}>
                <AppText style={styles.p0}>
                    Item Name: <AppText style={styles.p2}>{ItemName}</AppText>
                </AppText>
            </AppRow>

            <AppRow style={styles.row1}>
                <AppText style={styles.p0}>
                    Description: <AppText style={styles.p6}>{Description}</AppText>
                </AppText>
            </AppRow>
            <AppRow style={{justifyContent: "space-between", marginVertical: 2}}>
                <AppRow>
                    <AppText style={styles.p0}>Price: </AppText>
                    <AppText style={styles.p4}>{Price}</AppText>
                </AppRow>
                <AppRow>
                    <AppText style={styles.p0}>Warehouse: </AppText>
                    <AppText style={styles.p4}>{ItemCode.WhsCode}</AppText>
                </AppRow>


            </AppRow>
            {/* <AppRow style={styles.row2}>
        <AppRow>
          <AppText style={styles.p0}>Debit: </AppText>
          <AppText style={styles.p4}>{debit}</AppText>
        </AppRow>
        <AppRow>
          <AppText style={styles.p0}>Credit: </AppText>
          <AppText style={styles.p4}>{credit}</AppText>
        </AppRow>
        <AppRow>
          <AppText style={styles.p0}>Balance: </AppText>
          <AppText style={styles.p4}>{total}</AppText>
        </AppRow>
      </AppRow> */}
        </View>
    );
};

export default StockList;

const styles = StyleSheet.create({
    card1: {
        backgroundColor: colors.white,
        padding: 15,
        marginHorizontal: 8,
        borderRadius: 10,
        marginVertical: 8,
        marginBottom: 0,
    },

    row1: {
        //    justifyContent:"space-between",
        marginVertical: 2,
    },
    row2: {
        marginVertical: 2,
        justifyContent: "space-between",
    },
    p2: {
        color: colors.card_h2,
        // fontWeight: "bold",
        fontWeight: "normal",
    },
    p0: {
        color: colors.tertiary,
        fontWeight: "bold",
    },
    heading: {
        color: colors.secondary,
        fontWeight: "bold",
    },
    p3: {
        color: colors.yellow,
    },
    p4: {
        color: colors.card_h2,
        fontWeight: "normal",
    },
    p5: {
        color: colors.tertiary,
    },
    p6: {
        color: colors.card_h2,
        fontWeight: "normal",
    },
});

//stock.js

import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, SafeAreaView, FlatList, Alert} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import Card5 from "../components/Card5";
import {ProgressDialog, Dialog} from "react-native-simple-dialogs";
import {sosqContext} from "../context/SoSq";
import allStockApi from "../api/allStock";
import StockList from "../components/StockList";

const Stock = ({navigation, route}) => {

//   const { myroute } = route.params;


    const [stockList, setStockList] = useState([]);
    const [progressVisible, setprogressVisible] = useState(true);

    useEffect(() => {
        getAllStock();
    }, []);

    const getAllStock = async (code) => {
        const response = await allStockApi.getAllStock();
        setprogressVisible(false);
        console.log('stock list', response.data.Data);
        if (!response.ok)
            return Alert.alert("Couldn't retrieve the stock list");
        setStockList(response.data.Data);
    };

    const renderStockList = (navigation) => {
        return (
            <FlatList
                contentContainerStyle={{paddingBottom: 70}}
                data={stockList}
                contentContainerStyle={{
                    marginTop: 5
                }}
                renderItem={({item, index}) => {
                    return (
                        <StockList
                            item={item}
                            ItemCode={item.ItemCode}
                            ItemName={item.ItemName}
                            Description={item.Dscription}
                            Price={item.Price}
                            Stock={item.Stock}
                            navigation={navigation}
                        />
                    );
                }}
                keyExtractor={(item) => item.SAPCardCode}
            />
        );
    };
    return (
        <SafeAreaView>
            {/* <AppHeader
        home
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/menu.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ?  35 : 30,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/add.png")}
        doubleBtnImg2Style={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ?  35 : 30,
          marginRight: 25,
        }}
        navigation={navigation}
        headerTitle="Stock List"
        navigateTo="CustomersList"
        myRoute="order"
      /> */}
            {/* <AppHeader
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/menu.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/search.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 25,
        }}
        navigation={navigation}
        headerTitle="Stock List"
      /> */}
            <AppHeader
                backBtnOnly
                title="Back"
                bckBtnImg={require("../assets/back-button.png")}
                navigation={navigation}
                headerTitle="Stock List"
            />
            <ProgressDialog
                visible={progressVisible}
                title="Loading data"
                message="Please wait..."
            />
            {renderStockList()}
        </SafeAreaView>
    );
};

export default Stock;

const styles = StyleSheet.create({
    card1: {
        backgroundColor: colors.white,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
    },

    row1: {
        justifyContent: "space-between",
    },
    row2: {
        marginVertical: 2,
    },
    p2: {
        color: colors.secondary,
        fontWeight: "bold",

        paddingVertical: 4,
        borderRadius: 5,
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p3: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 18 : 16,
        fontWeight: "bold",
    },
    p4: {
        color: colors.card_h2,
        fontWeight: "bold",
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p5: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },

    p6: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        marginTop: 5,
    },
    p6b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    p7: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },
    p7b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    img: {
        borderRadius: 10,
        width: 70,
        height: 70,
    },
});

import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import List from "../components/List";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();

    // get data from the fake api endpoint
    useEffect(() => {
        const getData = async () => {
            const apiResponse = await fetch(
                "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
            );
            const data = await apiResponse.json();
            setFakeData(data);
        };
        getData();
    }, []);

    return (
        <SafeAreaView style={styles.root}>
            {!clicked && <Text style={styles.title}>Programming Languages</Text>}
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            {!fakeData ? (
                <ActivityIndicator size="large"/>
            ) : (

                <List
                    searchPhrase={searchPhrase}
                    data={fakeData}
                    setClicked={setClicked}
                />

            )}
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        width: "100%",
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: "10%",
    },
});
// items detail list 4-3-22
import React, {useState} from "react";
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from "react-native";
import AppText from "./AppText";
import colors from "./colors";
import AppButton from "./AppButton";
import NumericInput from "react-native-numeric-input";
import AppRow from "./AppRow";
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons";

const {width: screenWidth} = Dimensions.get("window");
// const imageWidthHeight = (screenWidth - 60) / 2 - 20;

const ItemsListDetailCard = ({
                                 navigation,
                                 name,
                                 imagePath,
                                 currentItem,
                                 availableQty,
                             }) => {
    const [showCartBtn, setShowCartBtn] = useState(true);
    const [allAddedItems, setallAddedItems] = useState([]);
    const [itemQty, setitemQty] = useState(1);
    const [quantity, setQuantity] = useState(0);
    const [remarks, setRemarks] = useState("");
    const [price, setPrice] = useState("");

    const settingitemQty = (value) => {
        // console.log("in settingitemQty,remarks",remarks)
        setitemQty(value);
        currentItem.Qty = value;
        allAddedItems.push(currentItem);
    };
    const handleRemarksInput = (text) => {
        setRemarks(text);
        currentItem.ItemRemarks = text;
    };
    const handlePriceInput = (text) => {
        setPrice(text);
        currentItem.Price = text;
    };
    const alterState = () => {
        setShowCartBtn((showCartBtn) => !showCartBtn);
        currentItem.Qty++;
        allAddedItems.push(currentItem);
    };

    return (
        <View style={styles.card1}>
            <View style={styles.textContainer}>
                <AppText style={styles.p}>{currentItem.ItemName}</AppText>
            </View>
            <AppRow style={{justifyContent: "space-between"}}>
                <AppRow style={styles.textContainer}>
                    <MaterialCommunityIcons
                        name="warehouse"
                        size={16}
                        color={colors.tertiary}
                    />
                    <AppText style={styles.p6b}> {currentItem.WhsName}</AppText>
                </AppRow>
                <AppRow>
                    <AntDesign name="database" size={16} color={colors.tertiary}/>
                    <AppText style={styles.p6b}> {currentItem.OnHand}</AppText>
                </AppRow>
            </AppRow>

            <View>
                <TextInput
                    multiline={true}
                    onChangeText={(text) => handlePriceInput(text)}
                    autoFocus={true}
                    value={price}
                    placeholder="Enter Price"
                    style={{paddingHorizontal: 10}}
                />
            </View>
            <View>
                <TextInput
                    multiline={true}
                    onChangeText={(text) => handleRemarksInput(text)}
                    autoFocus={true}
                    value={remarks}
                    placeholder="Enter Remarks"
                    style={{paddingHorizontal: 10}}
                />
            </View>

            {showCartBtn ? (
                <TouchableOpacity style={styles.wrapper} onPress={() => alterState()}>
                    <AppButton
                        cart
                        newIconButton
                        text="ADD TO CART"
                        iconName={require("../assets/cart.png")}
                        containerStyle={styles.toppingsBtn}
                    />
                </TouchableOpacity>
            ) : (
                <View style={{alignSelf: "center"}}>
                    <NumericInput
                        initValue={itemQty}
                        onChange={(value) => settingitemQty(value)}
                        style={styles.toppingsBtn}
                        rounded={true}
                        totalHeight={43}
                        totalWidth={147}
                        iconStyle={{color: colors.primaryBlue}}
                        borderColor={colors.primaryBlue}
                        textColor={colors.primaryBlue}
                        rightButtonBackgroundColor="#eeeeee"
                        leftButtonBackgroundColor="#eeeeee"
                        type="plus-minus"
                        containerStyle={styles.numericIpBtn}
                    />
                </View>
            )}
        </View>
    );
};

export default ItemsListDetailCard;

const styles = StyleSheet.create({
    wrapper: {},
    card1: {
        backgroundColor: colors.white,
        borderRadius: 10,
        marginHorizontal: 10,
        // height: Platform.OS === "android" ? 290 : 290,
        // width: Platform.OS === "android" ? 160 : 185,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    imgContainer: {
        borderRadius: 40,
        paddingHorizontal: 0,
        // justifyContent: "center",
        // alignItems: "center",
        height: Platform.OS === "android" ? 105 : 110,
    },
    img: {
        resizeMode: "contain",

        alignSelf: "center",
        width: Platform.OS === "android" ? "100%" : "100%",
        height: Platform.OS === "android" ? "100%" : "100%",
    },
    textContainer: {
        borderRadius: 10,
        // height: 50,
    },
    p: {
        color: colors.tertiary,
        marginBottom: 5,
        marginTop: 5,
        fontSize: Platform.OS === "android" ? 14 : 16,
        // marginLeft: 10,
        // textAlign: "center",
        fontWeight: "bold"
    },
    p6: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 14 : 12,
        marginTop: 5,
        marginLeft: 10,
    },
    p6b: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 14 : 12,
        fontWeight: "normal",
    },
    toppingsBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondary,

        borderWidth: 0.5,
        borderColor: "#fff",
        borderRadius: 10,

        marginTop: 10,
        marginBottom: 10,

        paddingHorizontal: Platform.OS === "android" ? 0 : 0,
        paddingVertical: Platform.OS === "android" ? 10 : 10,
    },
    numericIpBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        borderRadius: 10,

        marginTop: 15,
        marginBottom: 10,

        marginHorizontal: 10,
        paddingHorizontal: Platform.OS === "android" ? 0 : 10,
        paddingVertical: Platform.OS === "android" ? 10 : 10,
    },
});
//7-3-22
// new customers list
import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, SafeAreaView, FlatList, Alert} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import Card5 from "../components/Card5";
import allCustomersApi from "../api/allCustomers";
import {ProgressDialog, Dialog} from "react-native-simple-dialogs";
import {sosqContext} from "../context/SoSq";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../components/SearchBar";
import List from "../components/StockListComponent";
import CustomersListComponent from "../components/CustomersListComponent";

const CustomersList = ({navigation, route}) => {
    const {myroute} = route.params;

    const [customersList, setCustomersList] = useState([]);
    const [progressVisible, setprogressVisible] = useState(true);
    const [spc, setSpc] = useState({});

    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        getUserDetails()
        console.log("in useEffect of allcustomers::::", myroute);
    }, []);
    const getUserDetails = async () => {
        const jsonValue = await AsyncStorage.getItem("@user_Details");
        setSpc(JSON.parse(jsonValue).SalePersonCode);
        getAllCustomers(JSON.parse(jsonValue).SalePersonCode);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    };
    const getAllCustomers = async (code) => {
        const response = await allCustomersApi.getAllCustomers(code);
        setprogressVisible(false);
        // console.log('customersList',response.data.Data);
        if (!response.ok)
            return Alert.alert("Couldn't retrieve the customers List");
        setCustomersList(response.data.Data);
    };

    const renderCustomersList = (navigation) => {
        return (
            <FlatList
                // contentContainerStyle={{ paddingBottom: 70 }}
                data={customersList}
                contentContainerStyle={{
                    marginTop: 5,
                }}
                renderItem={({item, index}) => {
                    return (
                        <Card5
                            item={item}
                            name={item.Name}
                            code={item.SAPCardCode}
                            balance={0}
                            limit={0}
                            imagePath={require("../assets/hiTechSq.png")}
                            route={myroute}
                            navigation={navigation}
                        />
                    );
                }}
                keyExtractor={(item) => item.SAPCardCode}
            />
        );
    };
    return (
        <SafeAreaView>
            <AppHeader
                doubleBtn
                doubleBtnContainerStyle={{}}
                doubleBtnImg1={require("../assets/menu.png")}
                titleImg1="Back"
                styleImg1={{
                    width: Platform.OS === "ios" ? 35 : 30,
                    height: Platform.OS === "ios" ? 35 : 30,
                    marginLeft: 10,
                }}
                doubleBtnImg2={require("../assets/search.png")}
                doubleBtnImg2Style={{
                    width: 20,
                    height: 20,
                    marginRight: 25,
                }}
                navigation={navigation}
                headerTitle="Customers List"
            />
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
                // route={myroute}

            />

            {!customersList ? (
                <ActivityIndicator size="large"/>
            ) : (

                <CustomersListComponent
                    searchPhrase={searchPhrase}
                    data={customersList}
                    route={myroute}
                    setClicked={setClicked}
                />

            )}
        </SafeAreaView>
    );
};

export default CustomersList;

const styles = StyleSheet.create({
    card1: {
        backgroundColor: colors.white,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
    },

    row1: {
        justifyContent: "space-between",
    },
    row2: {
        marginVertical: 2,
    },
    p2: {
        color: colors.secondary,
        fontWeight: "bold",

        paddingVertical: 4,
        borderRadius: 5,
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p3: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 18 : 16,
        fontWeight: "bold",
    },
    p4: {
        color: colors.card_h2,
        fontWeight: "bold",
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p5: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },

    p6: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        marginTop: 5,
    },
    p6b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    p7: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },
    p7b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    img: {
        borderRadius: 10,
        width: 70,
        height: 70,
    },
});

// customers list old

import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, SafeAreaView, FlatList, Alert} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import Card5 from "../components/Card5";
import allCustomersApi from "../api/allCustomers";
import {ProgressDialog, Dialog} from "react-native-simple-dialogs";
import {sosqContext} from "../context/SoSq";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomersList = ({navigation, route}) => {
    const {myroute} = route.params;

    const [customersList, setCustomersList] = useState([]);
    const [progressVisible, setprogressVisible] = useState(true);
    const [spc, setSpc] = useState({});

    useEffect(() => {
        getUserDetails()
        console.log("in useEffect of allcustomers::::", myroute);
    }, []);
    const getUserDetails = async () => {
        const jsonValue = await AsyncStorage.getItem("@user_Details");
        setSpc(JSON.parse(jsonValue).SalePersonCode);
        getAllCustomers(JSON.parse(jsonValue).SalePersonCode);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    };
    const getAllCustomers = async (code) => {
        const response = await allCustomersApi.getAllCustomers(code);
        setprogressVisible(false);
        // console.log('customersList',response.data.Data);
        if (!response.ok)
            return Alert.alert("Couldn't retrieve the customers List");
        setCustomersList(response.data.Data);
    };

    const renderCustomersList = () => {
        return (
            <FlatList
                // contentContainerStyle={{ paddingBottom: 70 }}
                data={customersList}
                contentContainerStyle={{
                    marginTop: 5
                }}
                renderItem={({item, index}) => {
                    return (
                        <Card5
                            item={item}
                            name={item.Name}
                            code={item.SAPCardCode}
                            balance={0}
                            limit={0}
                            imagePath={require("../assets/hiTechSq.png")}
                            route={myroute}
                            navigation={navigation}
                        />
                    );
                }}
                keyExtractor={(item) => item.SAPCardCode}
            />
        );
    };
    return (
        <SafeAreaView>
            <AppHeader
                doubleBtn
                doubleBtnContainerStyle={{}}
                doubleBtnImg1={require("../assets/menu.png")}
                titleImg1="Back"
                styleImg1={{
                    width: Platform.OS === "ios" ? 35 : 30,
                    height: Platform.OS === "ios" ? 35 : 30,
                    marginLeft: 10,
                }}
                doubleBtnImg2={require("../assets/search.png")}
                doubleBtnImg2Style={{
                    width: 20,
                    height: 20,
                    marginRight: 25,
                }}
                navigation={navigation}
                headerTitle="Customers List"
            />
            <ProgressDialog
                visible={progressVisible}
                title="Loading data"
                message="Please wait..."
            />
            {renderCustomersList()}
        </SafeAreaView>
    );
};

export default CustomersList;

const styles = StyleSheet.create({
    card1: {
        backgroundColor: colors.white,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
    },

    row1: {
        justifyContent: "space-between",
    },
    row2: {
        marginVertical: 2,
    },
    p2: {
        color: colors.secondary,
        fontWeight: "bold",

        paddingVertical: 4,
        borderRadius: 5,
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p3: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 18 : 16,
        fontWeight: "bold",
    },
    p4: {
        color: colors.card_h2,
        fontWeight: "bold",
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p5: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },

    p6: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        marginTop: 5,
    },
    p6b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    p7: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },
    p7b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    img: {
        borderRadius: 10,
        width: 70,
        height: 70,
    },
});
// items old

import React, {useState, useEffect, useContext} from "react";
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    Alert,
} from "react-native";
import Card4 from "../components/ItemsListCard";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import colors from "../components/colors";
import allGroupItemsApi from "../api/allGroupItems";
import {ProgressDialog, Dialog} from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {preCategoriesRouteContext} from "../context/PreCategoriesRoute";
import allItemsWithWareHouseApi from "../api/allItemsWithWareHouse";

const Items = ({navigation, route}) => {
    const [itemQty, setitemQty] = useState(1);
    const [progressVisible, setprogressVisible] = useState(true);

    const {itemCode: selectedItem} = route.params;
    const [itemList, setItemList] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const {preCategoriesRouteVal} = useContext(preCategoriesRouteContext);

    useEffect(() => {
        getAllItems(selectedItem);
        getUserDetails();
        console.log("IN ITEMS::", selectedItem);
    }, []);

    getUserDetails = async () => {
        const jsonValue = await AsyncStorage.getItem("@user_Details");
        console.log(jsonValue);
        setUserDetails(jsonValue);
    };

    const settingitemQty = (value) => {
        setitemQty(value);
    };

    const nextPress = () => {
        // console.log(cartItems.length);

        setCartItems([]);
        itemList.forEach((element) => {
            if (element.Qty > 0) {
                cartItems.push(element);
            }
        });
        if (cartItems.length == 0) {
            Alert.alert("Please select an item to proceed!");
        } else {
            if (userDetails === "guest")
                navigation.navigate("PostInquiry", {items: cartItems});
            else {
                preCategoriesRouteVal === "ordersList"
                    ? navigation.navigate("PostOrder", {items: cartItems})
                    : preCategoriesRouteVal === "quotationsList"
                        ? navigation.navigate("PostOrder", {items: cartItems})
                        : preCategoriesRouteVal === "purchaseReq"
                            ? navigation.navigate("PostPurchaseRequest", {items: cartItems})
                            : null;
            }
        }
    };
    const viewDetail = () => {
        navigation.navigate("ViewItemDetail", {})
    }
    const getAllItems = async (selectedItem) => {
        const response = await allGroupItemsApi.getGroupItems(selectedItem);
        // const response = await allItemsWithWareHouseApi.getItemsWithWareHouse(selectedItem);


        setprogressVisible(false);
        if (!response.ok) return alert("Couldn't retrieve the Item Group list");
        setItemList(response.data.Data.filter((obj) => obj.Name !== "Select Item"));
        // setImageUris(imageUris.filter((imageUri) => imageUri !== uri));

        // console.log("in items now", response.data.Data);
    };

    const getItemLayout = (data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });

    const renderItemsList = () => {
        return (
            <FlatList
                numColumns={2}
                // initialNumToRender={5}
                // maxToRenderPerBatch={10}
                // windowSize={10}
                contentContainerStyle={{
                    marginTop: 15,
                }}
                showsVerticalScrollIndicator={false}
                data={itemList}
                columnWrapperStyle={styles.row}
                renderItem={({item, index}) => {
                    return (
                        <Card4
                            name={item.Name} //ItemName
                            itemCode={item.ItemCode} //ItemName
                            imagePath={
                                "http://182.176.160.19:44502/pics/AliBabaUplodedpicture/" +
                                item.FileName
                            }
                            price={item.Price} // Price
                            navigation={navigation}
                            currentItem={item}
                            availableQty={item.AvailableQty} //Quantity
                            allItems={itemList}
                            itemGroupCode={selectedItem}
                        />
                    );
                }}
                keyExtractor={(item) => item.Id}
            />
        );
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <AppHeader
                doubleBtn
                doubleBtnContainerStyle={{}}
                doubleBtnImg1={require("../assets/back-button.png")}
                titleImg1="Back"
                styleImg1={{
                    width: Platform.OS === "ios" ? 35 : 38,
                    height: Platform.OS === "ios" ? 35 : 38,
                    marginLeft: 10,
                }}
                doubleBtnImg2={require("../assets/funnel.png")}
                doubleBtnImg2Style={{
                    width: 20,
                    height: 20,
                    marginRight: 20,
                }}
                navigation={navigation}
                navigateTo="CustomersList"
                headerTitle="All Items"
            />
            <ProgressDialog
                visible={progressVisible}
                title="Loading data"
                message="Please wait..."
            />
            {renderItemsList()}

            {/* <View style={{ marginTop: 0 }}>
        <TouchableOpacity onPress={() => nextPress()}>
          <AppButton
            text="NEXT"
            iconFreeButton
            loginBtnStyle={styles.loginBtnStyle}
            navigation={navigation}
          />
        </TouchableOpacity>
      </View> */}
        </SafeAreaView>
    );
};

export default Items;
const styles = StyleSheet.create({
    row: {
        marginVertical: 5,
        justifyContent: "center",
    },
    loginBtnStyle: {
        backgroundColor: colors.secondary,
        flexDirection: "row",
        justifyContent: "center",
        height: Platform.OS === "android" ? 60 : 70,
        borderWidth: 0.5,
        borderColor: "#fff",
        borderRadius: 5,
        marginHorizontal: "10%",
        marginBottom: 0,
    },
});
// activities on map
import React, {useState, useEffect, useContext} from "react";
import MapView, {Marker, Polyline} from "react-native-maps";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import AppHeader from "../components/AppHeader";
import * as Location from "expo-location";
import colors from "../components/colors";
import AppButton from "../components/AppButton";
import MarkAttendanceApi from "../api/markAttendance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActivitiesOnMap = ({navigation, route}) => {
    const {latLongList} = route.params;
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

    const staticData = [
        {coordinates: {latitude: 37.78383, longitude: -122.405766}},
        {coordinates: {latitude: 37.78584, longitude: -122.405478}},
        {coordinates: {latitude: 37.784738, longitude: -122.402839}},
    ];

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
    // userCode,userName,checkIn,date,checkInLocation,checkOut
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
        console.log("handleCheckIn:", response);
        setprogressVisible(false);

        if (!response.ok) return alert("Unable to mark your Attendance!");
    };
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
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
        latLongList.map((obj) => (
            <Marker
                // key={obj.id}
                coordinate={obj}
                // coordinate={staticData}
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
                    {/* {mapMarkers()} */}
                    <Polyline
                        coordinates={[
                            {latitude: 31.52358005642689, longitude: 74.2746343286123},
                            {latitude: 31.501444185361823, longitude: 74.32001947128914},
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
                    />
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
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: "center",
        height: Platform.OS === "android" ? 60 : 70,
        borderWidth: 0.5,
        borderColor: "#fff",
        borderRadius: 5,
        marginHorizontal: "10%",
        marginVertical: 45,
    },
});

// post order 24/3/22

import React, {useState, useEffect, useContext} from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    TextInput,
} from "react-native";
import AppText from "../components/AppText";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import PostOrderCard from "../components/PostOrderCard";
import postOrderApi from "../api/postOrder";
import postQuotationApi from "../api/postQuotation";
import {ProgressDialog} from "react-native-simple-dialogs";
import {sosqContext} from "../context/SoSq";
import DatePicker from "react-native-datepicker";
import {preCategoriesRouteContext} from "../context/PreCategoriesRoute";
import Items from "./Items";
import RNPickerSelect from "react-native-picker-select";
import allCurrencyaApi from "../api/allCurrency";
import {ScrollView} from "react-native-gesture-handler";
import {addToCartContext} from "../context/addToCartContext";

const PostOrder = ({route, navigation}) => {
    // const { items } = route.params;
    // const [cartItems, setItems] = useState(items);
    const [customer, setCustomerDetails] = useState({});
    const [user, setUserDetails] = useState({});
    const {setPreCategoriesRouteVal} = useContext(preCategoriesRouteContext);
    const [sosq, setSoSq] = useState({});
    const [saleOrder, setSaleOrder] = useState({});
    const [progressVisible, setprogressVisible] = useState(false);
    const [todaysdate, setTodaysdate] = useState("");
    const [remarks, setRemarks] = useState("");
    const [seriesNo, setSeriesNo] = useState("");
    const [subTotal, setSubTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const [dollarRate, setDollarRate] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);

    const [vat, setVat] = useState("");
    const [allCurrencies, setAllCurrencies] = useState([]);
    const [show$Rate, setShow$Rate] = useState(false);

    const [currencyType, setCurrencyType] = useState("");

    const [show, setShow] = useState(false);
    const {setCartItem, cartItem} = useContext(addToCartContext);
    // import { addToCartContext } from "../context/addToCartContext";

    const findSubTotal = () => {
        // console.log("cartItems:",cartItem)
        let res = 0;
        cartItem.forEach((element) => {
            res += parseInt(element.Price * element.Qty);
            // console.log("findSubTotal:", element.Qty);
        });
        // console.log("findSubTotal:", res);
        setSubTotal(res);
    };

    const [date, setDate] = useState("");
    useEffect(() => {
        findSubTotal();
        getCustomerDetails();
        getUserDetails();
        getAllCurrencies();
        // console.log("cartItems:", cartItems);
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        // console.log("CART ITEMS", cartItem);
        // setTodaysdate(month + "/" + date + "/" + +year);
        setTodaysdate(year + "/" + month + "/" + +date);
    }, []);

    const onDateChange = (event, selectedDate) => {
        let newDate = selectedDate || date;
        setDate(newDate);
        setShow(false);
    };

    const onSelectSeries = (value) => {
        console.log("in onSelectSeries:", value);
        setSeriesNo(value);
    };
    const {routeVal} = useContext(sosqContext);

    const postOrder = async () => {
        console.log("postOrder called")
        sosq["customerCode"] = customer.SAPCardCode;
        sosq["customerName"] = customer.Name;
        sosq["deliveryDate"] = date;
        sosq["remarks"] = remarks;
        sosq["docDate"] = todaysdate;

        sosq["SapUserCode"] = user.SapUserCode;

        sosq["seriesString"] = seriesNo;
        sosq["docCurrency"] = currencyType;
        sosq["docRate"] = dollarRate;
        sosq["discountPercent"] = discount;

        saleOrder["saleOrderAndSaleQutation"] = sosq;
        saleOrder["masterItems"] = cartItem;

        console.log("saleOrder:", saleOrder);
        setprogressVisible(true);
        const response = await postOrderApi.postOrder(saleOrder);
        console.log("saleOrder response:", response);
        setprogressVisible(false);

        if (response.ok) {
            Alert.alert(response.data.Message);
            navigation.navigate("Home");
            setCartItem([]);
        }

        if (!response.ok) return Alert.alert("Unable to post Order");
    };

    const postQuotation = async () => {
        console.log("postQuotation called")

        sosq["customerCode"] = customer.SAPCardCode;
        sosq["customerName"] = customer.Name;
        sosq["deliveryDate"] = date;
        sosq["remarks"] = remarks;
        sosq["docDate"] = todaysdate;

        sosq["SapUserCode"] = user.SapUserCode;
        sosq["seriesString"] = seriesNo;
        sosq["docCurrency"] = currencyType;
        sosq["docRate"] = dollarRate;
        sosq["discountPercent"] = discount;

        saleOrder["saleOrderAndSaleQutation"] = sosq;
        saleOrder["masterItems"] = cartItem;

        console.log("saleQUOTATION", saleOrder);
        setprogressVisible(true);
        const response = await postQuotationApi.postQuotation(saleOrder);
        console.log("in postQuotation", response);
        setprogressVisible(false);
        if (response.ok) {
            Alert.alert(response.data.Message);
            // setPreCategoriesRouteVal(null);
            navigation.navigate("Home");
            setCartItem([]);
        }

        if (!response.ok) return Alert.alert("Unable to post Quotation");
    };
    const getUserDetails = async () => {
        const jsonValue = await AsyncStorage.getItem("@user_Details");
        setUserDetails(JSON.parse(jsonValue));
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    const getCustomerDetails = async () => {
        const customerJsonValue = await AsyncStorage.getItem("@customer_Details");
        setCustomerDetails(JSON.parse(customerJsonValue));
        const userJsonValue = await AsyncStorage.getItem("@user_Details");
        setUserDetails(JSON.parse(userJsonValue));
    };
    const getAllCurrencies = async () => {
        setprogressVisible(true);
        const response = await allCurrencyaApi.getAllCurrencies();
        // console.log("response from getAllCurrencies api", response.data.Data);
        setprogressVisible(false);
        if (!response.ok) return alert("Couldn't retrieve the AllCurrencies list");
        const currenciesList = response.data.Data.map((obj) => ({
            label: obj.CurrName,
            value: obj.CurrCode,
        }));
        setAllCurrencies(currenciesList);
    };
    const onSelectCurrency = (value) => {
        console.log("in onSelectCurrency:", value);
        setCurrencyType(value);
        value === "USD" ? setShow$Rate(true) : setShow$Rate(false);
    };
    const footer = () => {
        const handleDiscountInput = (value) => {
            // console.log("in handleDiscountInput", value, subTotal);
            setDiscount(value);

            let discountamount = (value / 100) * subTotal;
            // console.log("discountamount", discountamount);

            setDiscountAmount(discountamount);
            let gt = subTotal - (value / 100) * subTotal;
            setGrandTotal(gt);
        };
        const handleDiscountAmount = (value) => {
            // console.log("in handleDiscountAmount", value, subTotal);

            setDiscountAmount(value);
            let discountpercentage = (value / subTotal) * 100;
            // console.log("discountpercentage", discountpercentage);
            setDiscount(discountpercentage);
            let gt = subTotal - value;
            setGrandTotal(gt);
        };
        const handleRemarksInput = (value) => {
            setRemarks(value);
        };

        return (
            <ScrollView>
                <View style={styles.bottomContainer}>
                    <AppRow style={{justifyContent: "space-between"}}>
                        <AppText style={styles.h}>Sub Total</AppText>
                        <AppText style={styles.num}>{subTotal}</AppText>
                    </AppRow>
                    <AppRow style={{justifyContent: "space-between"}}>
                        <AppText style={styles.h}>Discount</AppText>
                        {/* <AppText style={styles.num}> 0</AppText> */}
                        <View style={styles.discountView}>
                            <TextInput
                                onChangeText={(value) => handleDiscountInput(value)}
                                placeholder="Percentage"
                                style={styles.txtInput}
                                value={discount}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.discountView}>
                            <TextInput
                                onChangeText={(value) => handleDiscountAmount(value)}
                                placeholder="Amount"
                                style={styles.txtInput}
                                value={discountAmount}
                                keyboardType="numeric"
                            />
                        </View>
                    </AppRow>
                    <AppRow style={{justifyContent: "space-between"}}>
                        <AppText style={styles.h}>VAT</AppText>
                        {/* <View style={styles.vatView}>
              <TextInput
                onChangeText={setVat}
                value={vat}
                placeholder="VAT %"
                style={styles.txtInput}
              />
            </View> */}
                        <AppText style={styles.num}>17%</AppText>
                    </AppRow>
                    <View
                        style={{
                            borderBottomColor: colors.light_grey,
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            // marginRight: 20,
                        }}
                    />
                    <AppRow style={{justifyContent: "space-between"}}>
                        <AppText style={styles.h}>Grand Total</AppText>
                        <AppText style={styles.total}>{grandTotal}</AppText>
                    </AppRow>

                    <View
                        style={{
                            borderBottomColor: colors.light_grey,
                            borderBottomWidth: 1,
                            marginVertical: 10,
                            // marginRight: 20,
                        }}
                    />
                    <View>
                        <View style={{}}>
                            <AppText style={styles.p1}>Currency</AppText>
                        </View>
                        <View style={styles.currencyView}>
                            <RNPickerSelect
                                style={{inputAndroid: {color: "black"}}}
                                // useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => setCurrencyType(value)}
                                value={currencyType}
                                items={allCurrencies}
                            />
                        </View>
                    </View>
                    {currencyType === "USD" || currencyType === "RMB" ? (
                        <View>
                            <View style={{}}>
                                <AppText style={styles.dollarRate}>Doc Rate</AppText>
                            </View>
                            <View style={styles.deliveryDateView}>
                                <TextInput
                                    autoFocus={true}
                                    onChangeText={(value) => setDollarRate(value)}
                                    value={dollarRate}
                                    placeholder="Add doc rate here.."
                                />
                            </View>
                        </View>
                    ) : null}

                    <View style={{marginTop: 5}}>
                        <View style={{}}>
                            <AppText style={styles.p1}>Series No.</AppText>
                        </View>
                        <View style={styles.currencyView}>
                            <RNPickerSelect
                                // useNativeAndroidPickerStyle={false}
                                style={{inputAndroid: {color: "black"}}}
                                items={[
                                    {label: "Lahore", value: "LHR"},
                                    {label: "Karachi", value: "KHI"},
                                ]}
                                onValueChange={(value) => setSeriesNo(value)}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={{}}>
                            <AppText style={styles.p1}>Delivery Date</AppText>
                        </View>
                        <DatePicker
                            showIcon={false}
                            style={{width: "100%"}}
                            date={date}
                            mode="date"
                            placeholder=" Select date"
                            // format="MM/DD/yyyy"
                            format="YYYY/MM/DD"
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
                                    marginTop: 35,
                                    borderColor: colors.white,
                                    backgroundColor: colors.white,
                                    borderRadius: 10,
                                    height: 50,
                                    alignItems: "flex-start",
                                    paddingLeft: 10,
                                    width: "100%",
                                    // marginRight: 20,
                                },
                            }}
                            onDateChange={(date) => {
                                setDate(date);
                            }}
                        />
                    </View>

                    <View>
                        <View style={{}}>
                            <AppText style={styles.date}>Remarks</AppText>
                        </View>
                        <View style={styles.deliveryDateView}>
                            <TextInput
                                onChangeText={(value) => handleRemarksInput(value)}
                                defaultValue={remarks}
                                placeholder="Add your remarks here.."
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.postBtn}>
                    {/* <ProgressDialog
            visible={progressVisible}
            title="Posting Data"
            message="Please wait..."
          /> */}
                    {routeVal === "order" ? (
                        <TouchableOpacity onPress={() => postOrder()}>
                            <AppButton
                                text="POST ORDER"
                                iconFreeButton
                                loginBtnStyle={styles.loginBtnStyle}
                                navigation={navigation}
                                navigation1="Login"
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => postQuotation()}>
                            <AppButton
                                text="POST SALE QUOTATION"
                                iconFreeButton
                                loginBtnStyle={styles.loginBtnStyle}
                                navigation={navigation}
                                navigation1="Login"
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {/* <> */}
            </ScrollView>
        );
    };
    const header = () => {
        return (
            <AppRow style={styles.r1}>
                <AppText style={styles.p1}>Item Name</AppText>
                <AppText style={styles.p2}>Qty</AppText>
                <AppText style={styles.p3}>Price</AppText>
                <AppText style={styles.p4}>Total</AppText>
            </AppRow>
        );
    };

    const renderItemsList = (navigation) => {
        return (
            <FlatList
                data={cartItem}
                ListFooterComponent={footer}
                // ListHeaderComponent={header()}
                contentContainerStyle={styles.listContainer}
                renderItem={({item, index}) => {
                    return (
                        <PostOrderCard
                            currentItem={item}
                            name={item.ItemName}
                            quantity={item.Qty}
                            price={item.Price}
                            imagePath={""}
                            navigation={navigation}
                        />
                    );
                }}
                keyExtractor={(item) => item.Id}
            />
        );
    };

    return (
        <SafeAreaView>
            {/* <AppHeader
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/back-button.png")}
        titleImg1="Back"
        styleImg1={{
          width: Platform.OS === "ios" ? 35 : 38,
          height: Platform.OS === "ios" ? 35 : 38,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/search.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}
        navigation={navigation}23
        navigateTo="CustomersList"
        headerTitle="Post Order / Quotation"
      /> */}
            <AppHeader
                backBtnOnly
                title="Back"
                bckBtnImg={require("../assets/back-button.png")}
                navigation={navigation}
                headerTitle="Post Order / Quotation"
            />
            <AppRow style={styles.r1}>
                <AppText style={styles.p1}>Item Name</AppText>
                <AppText style={styles.p2}>Qty</AppText>
                <AppText style={styles.p3}>Price</AppText>
                <AppText style={styles.p4}>Total</AppText>
            </AppRow>
            <View>{renderItemsList()}</View>
            {/* {footer()} */}
        </SafeAreaView>
    );
};

export default PostOrder;

const styles = StyleSheet.create({
    card1: {
        backgroundColor: colors.white,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
    },

    row1: {
        justifyContent: "space-between",
    },
    row2: {
        marginVertical: 2,
    },
    p2: {
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p3: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 18 : 16,
        fontWeight: "bold",
    },
    p4: {
        color: colors.card_h2,
        fontWeight: "bold",
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p5: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },

    p6: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        marginTop: 5,
    },
    p6b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    p7: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },
    p7b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    img: {
        borderRadius: 10,
        width: 70,
        height: 70,
    },

    r1: {
        // justifyContent: "space-between",
        backgroundColor: colors.white,
        padding: 5,
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    p1: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 16,
        width: "50%",
    },
    dollarRate: {
        color: colors.secondary,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 16,
        width: "64%",
    },
    p2: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 16,
        width: "10%",
    },
    p3: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 16,
        width: "20%",
        textAlign: "center",
    },
    p4: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 16,
        width: "20%",
        textAlign: "right",
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
        // width: "27%",
    },
    total: {
        color: colors.tomato,
        fontWeight: "bold",
        fontSize: 18,
        // width: "27%",
    },
    row: {
        paddingBottom: 100,
    },
    bottomContainer: {
        marginHorizontal: 15,
    },
    listContainer: {
        paddingBottom: 30,
        // height: 170,
    },
    loginBtnStyle: {
        backgroundColor: colors.secondary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: Platform.OS === "android" ? 50 : 60,
        borderWidth: 0.5,
        borderColor: "#fff",
        borderRadius: 5,
        marginBottom: 100,
    },
    label: {
        color: colors.BLACK,
        marginVertical: 5,
    },
    date: {
        marginTop: 35,
        marginBottom: 15,
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 16,
        width: "60%",
    },
    currencyView: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        // marginRight: 20,
        marginBottom: 10,
        marginTop: 10,
    },
    deliveryDateView: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        // marginRight: 20,
    },
    discountView: {
        // backgroundColor: colors.white,
        // borderRadius: 10,
        // paddingHorizontal: 15,
        // marginRight: 30,
    },
    vatView: {
        // backgroundColor: colors.white,
        // borderRadius: 10,
        // paddingHorizontal: 15,
        // marginRight: 39,
    },
    txtInput: {
        fontSize: Platform.OS === "ios" ? 16 : 14,
        color: colors.yellow,
        fontWeight: "bold",
        // borderWidth:1,
    },
    postBtn: {
        marginBottom: Platform.OS === "ios" ? 250 : 250,
        marginTop: 40,
        // marginBottom:150
    },
});

// STOCK

import React, {useState, useEffect, useContext} from "react";
import {
    StyleSheet,
    Alert,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import allStockApi from "../api/allStock";
import SearchBar from "../components/SearchBar";
import StockListComponent from "../components/StockListComponent";

const Stock = ({navigation, route}) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [totalRecord, setTotalRecord] = useState(8);
    const [offset, setOffset] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [stockList, setStockList] = useState([]);
    const [progressVisible, setprogressVisible] = useState(true);

    useEffect(() => {
        getAllStock();
    }, [totalRecord]);

    const getAllStock = async () => {
        console.log("getAllStock called")
        // console.log("totalRecord,offSet:", totalRecord, offset);
        const response = await allStockApi.getAllStock();
        setprogressVisible(false);
        console.log('stock list', response.data.Data);
        if (!response.ok) return Alert.alert("Couldn't retrieve the stock list");
        setStockList([...stockList, ...response.data.Data]);
    };

    const loadMoreItems = () => {
        console.log("loadMoreItems called")
        setOffset(totalRecord);
        setTotalRecord(totalRecord + 8);
    };

    const searchData = (text) => {
        const newData = stockList.filter((item) => {
            return item.Description.search(text) > -1;
        });
        setStockList(newData);
        setInput(text);
    };
    return (
        <SafeAreaView>
            <AppHeader
                backBtnOnly
                title="Back"
                bckBtnImg={require("../assets/back-button.png")}
                navigation={navigation}
                headerTitle="Stock List"
            />
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={value => searchData(value)}
                clicked={clicked}
                setClicked={setClicked}
            />

            {!stockList ? (
                <ActivityIndicator size="large"/>
            ) : (
                <StockListComponent
                    searchPhrase={searchPhrase}
                    data={stockList}
                    setClicked={setClicked}
                    navigation={navigation}
                />
            )}
        </SafeAreaView>
    );
};

export default Stock;

const styles = StyleSheet.create({
    card1: {
        backgroundColor: colors.white,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
    },

    row1: {
        justifyContent: "space-between",
    },
    row2: {
        marginVertical: 2,
    },
    p2: {
        color: colors.secondary,
        fontWeight: "bold",

        paddingVertical: 4,
        borderRadius: 5,
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p3: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 18 : 16,
        fontWeight: "bold",
    },
    p4: {
        color: colors.card_h2,
        fontWeight: "bold",
        fontSize: Platform.OS === "ios" ? 18 : 16,
    },
    p5: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },

    p6: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        marginTop: 5,
    },
    p6b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    p7: {
        color: colors.card_h2,
        fontSize: Platform.OS === "ios" ? 16 : 14,
    },
    p7b: {
        color: colors.yellow,
        fontSize: Platform.OS === "ios" ? 16 : 14,
        fontWeight: "bold",
    },
    img: {
        borderRadius: 10,
        width: 70,
        height: 70,
    },
});

//20-4-22
import React, {useState, useEffect} from "react";
import {
    SafeAreaView,
    FlatList,
    View,
    StyleSheet,
    Alert,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import AppHeader from "../components/AppHeader";
import colors from "../components/colors";
import sizes from "../components/sizes";
import AppText from "../components/AppText";
import DatePicker from "react-native-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/AppButton";
import postExpenseApi from "../api/postExpense";
import {
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AppRow from "../components/AppRow";
import * as FileSystem from "expo-file-system";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const postExpense = ({navigation}) => {

    const [detail, setDetail] = useState("");
    const [fuelOrBusFare, setFuelOrBusFare] = useState(0);
    const [localFare, setLocalFare] = useState(0);
    const [food, setFood] = useState(0);
    const [DA, setDA] = useState(0);
    const [misc, setMisc] = useState(0);
    const [total, setTotal] = useState("0");
    const [expenseArr, setExpenseArr] = useState([]);

    const [date, setDate] = useState("");
    const [userCode, setUserCode] = useState("");
    const [userName, setUserName] = useState("");
    const [progressVisible, setprogressVisible] = useState(false);

    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [postingDate, setPostingDate] = useState("");
    const [imageUris, setImageUris] = useState([]);
    const [imagesList, setImagesList] = useState([]);
    const [imageUri, setImageUri] = useState(null);
    const [base64Images, setBase64Images] = useState("");
    let expensetotal = 0;

    useEffect(() => {
        getUserDetails();
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        setPostingDate(year + "-" + month + "-" + date);
    }, []);

    const handlDetailInput = (value) => setDetail(value);

    // const handleTotal = (value) => setTotal(value);
    const handleTotal = (value) => {
        // var total = await (fuelOrBusFare + localFare + food + DA + misc);
        console.log("total", value);
        const onFuelOrBusFareInput = (value) => {
            // setTotal(value);

            setFuelOrBusFare(parseInt(value));
            console.log("onFuelOrBusFareInput1", value);

            // expenseArr.push(parseInt(value));
            // console.log("expenseArr", expenseArr);
            var total = parseInt(value) + localFare + food + DA + misc;
            setTotal(total + "");
            //handleTotal(total);
            // let temp = parseInt(value) + localFare + food + misc + DA;
            // console.log("temp", temp);
            // setTotal(temp);
        };
        const onLocalFareInput = (value) => {
            setLocalFare(parseInt(value));
            console.log("onLocalFareInput", parseInt(value));

            expenseArr.push(parseInt(value));
            console.log("expenseArr", expenseArr);
            var total = parseInt(value) + fuelOrBusFare + food + DA + misc;
            setTotal(total + "");

            // handleTotal(parseInt(value));
            // let temp = parseInt(value) + fuelOrBusFare + localFare + food + misc + DA;
            // console.log("temp", temp);
            // setTotal(temp);
        };
        const handlFoodInput = (value) => {
            console.log("handlFoodInput", typeof value);
            setFood(parseInt(value));

            expenseArr.push(parseInt(value));
            console.log("expenseArr", expenseArr);
            var total = parseInt(value) + localFare + fuelOrBusFare + DA + misc;
            setTotal(total + "");

            // handleTotal(parseInt(value));
            // let temp = parseInt(value) + fuelOrBusFare + localFare + misc + DA;
            // console.log("temp", temp);
            // setTotal(temp);
        };
        const handlDAInput = (value) => {
            setDA(parseInt(value));

            expenseArr.push(parseInt(value));
            console.log("expenseArr", expenseArr);
            var total = parseInt(value) + localFare + food + fuelOrBusFare + misc;
            setTotal(total + "");

            // handleTotal(parseInt(value));
            // let temp = parseInt(value) + fuelOrBusFare + localFare + misc + food;
            // console.log("temp", temp);
            // setTotal(temp);
        };
        const handlMiscInput = (value) => {
            setMisc(parseInt(value));

            expenseArr.push(parseInt(value));
            console.log("expenseArr", expenseArr);
            var total = parseInt(value) + localFare + food + DA + fuelOrBusFare;
            setTotal(total + "");

            // handleTotal(parseInt(value));
            // let temp = parseInt(value) + fuelOrBusFare + localFare + DA + food;
            // console.log("temp", temp);
            // setTotal(temp);
        };

        const handlePostExpense = async () => {
            setprogressVisible(true);
            const response = await postExpenseApi.postExpense(
                userCode,
                userName,
                fuelOrBusFare,
                localFare,
                food,
                DA,
                misc,
                dateFrom,
                dateTo,
                detail,
                total,
                imageUri
            );
            setprogressVisible(false);
            console.log("handlePostExpense", response)
            if (response.ok) {
                // Alert.alert("Successfully Posted");
                Alert.alert("Error!", response.data.Message, [
                    {text: "OK", onPress: () => setprogressVisible(false)},
                ]);

            }
            if (!response.ok) return Alert.alert("Unable to post expense");
        };

        const getUserDetails = async () => {
            const jsonValue = await AsyncStorage.getItem("@user_Details");
            console.log(JSON.parse(jsonValue).SapUserCode, JSON.parse(jsonValue).Name);
            setUserCode(JSON.parse(jsonValue).SapUserCode);
            setUserName(JSON.parse(jsonValue).Name);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        };

        const handleDateChange = (date) => {
            // console.log("in handleDateChange", date);
            setDate(date);
            // getAllDeliveries(date);
        };
        const handleRemove = (uri) => {
            setImageUri(imageUris.filter((imageUri) => imageUri !== uri));
        };
        const handlePress = () => {
            console.log("in handlePress", imageUri);
            if (imageUri === null) selectImage();
        };
        const selectImage = async () => {
            console.log("in selectImage");

            try {
                const result = await ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    aspect: [4, 3],
                    quality: 0.5,
                });
                if (!result.cancelled) {
                    let base64Uri = await FileSystem.readAsStringAsync(result.uri, {
                        encoding: "base64",
                    });
                    // console.log("result.uri", result.uri);
                    setImageUri(result.uri);
                    // base64Uri = base64Uri.replaceAll(" ", "+");
                    setBase64Images(base64Uri.replaceAll(" ", "+"));
                }
            } catch (error) {
                console.log("error in img picker", error);
            }
        };
        return (
            <SafeAreaView>
                <View style={{paddingBottom: 10}}>
                    <AppHeader
                        backBtnOnly
                        title="Back"
                        bckBtnImg={require("../assets/back-button.png")}
                        navigation={navigation}
                        headerTitle="Post Expenses"
                    />
                </View>
                <ScrollView>
                    <AppRow style={styles.rowStyle}>
                        <View style={styles.rowItem}>
                            <View style={{marginTop: 0, marginBottom: 5}}>
                                <AppText style={styles.label}>Fuel / Bus Fare</AppText>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Fuel/Bus Fare"
                                onChangeText={(value) => onFuelOrBusFareInput(value)}
                            />
                        </View>
                        <View style={styles.rowItem}>
                            <View style={{marginTop: 0, marginBottom: 5}}>
                                <AppText style={styles.label}>Local Fare</AppText>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Local Fare"
                                onChangeText={(value) => onLocalFareInput(value)}
                                // multiline
                            />
                        </View>
                        <View style={styles.rowItem}>
                            <View style={{marginTop: 0, marginBottom: 5}}>
                                <AppText style={styles.label}>Food</AppText>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Food"
                                keyboardType="numeric"
                                onChangeText={(value) => handlFoodInput(value)}
                                // multiline
                            />
                        </View>
                    </AppRow>
                    <AppRow style={styles.rowStyle}>
                        <View style={styles.rowItem2}>
                            <View style={{marginTop: 0, marginBottom: 5}}>
                                <AppText style={styles.label}>DA</AppText>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="DA"
                                onChangeText={(value) => handlDAInput(value)}
                                // multiline
                            />
                        </View>
                        <View style={styles.rowItem2}>
                            <View style={{marginTop: 0, marginBottom: 5}}>
                                <AppText style={styles.label}>Misc.</AppText>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Misc."
                                onChangeText={(value) => handlMiscInput(value)}
                                // multiline
                            />
                        </View>
                    </AppRow>
                    <AppRow style={styles.rowStyle}>
                        <View style={styles.rowsTotal}>
                            <View style={{marginTop: 0, marginBottom: 5}}>
                                <AppText style={styles.label}>Total</AppText>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Total"
                                // onChangeText={(value) => handlDAInput(value)}
                                editable={false}
                                value={total}
                                // multiline
                            />
                        </View>
                    </AppRow>
                    <AppRow>
                        <View style={styles.rowItem1}>
                            <View
                                style={{marginHorizontal: sizes.base_margin, marginVertical: 5}}
                            >
                                <AppText style={styles.label}>Date From</AppText>
                            </View>

                            <View>
                                <DatePicker
                                    showIcon={false}
                                    style={{width: "100%"}}
                                    date={dateFrom}
                                    mode="date"
                                    placeholder=" Date From"
                                    format="DD.MM.YYYY"
                                    minDate="01.01.2000"
                                    maxDate="01.01.2025"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    useNativeDriver="true"
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
                                    onDateChange={(date) => setDateFrom(date)}
                                />
                            </View>
                        </View>
                        <View style={styles.rowItem1}>
                            <View
                                style={{marginHorizontal: sizes.base_margin, marginVertical: 5}}
                            >
                                <AppText style={styles.label}>Date To</AppText>
                            </View>

                            <View>
                                <DatePicker
                                    showIcon={false}
                                    style={{width: "100%"}}
                                    date={dateTo}
                                    mode="date"
                                    placeholder=" Date To"
                                    format="DD.MM.YYYY"
                                    minDate="01.01.2000"
                                    maxDate="01.01.2025"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    useNativeDriver="true"
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
                                        setDateTo(date);
                                    }}
                                />
                            </View>
                        </View>
                    </AppRow>
                    <View style={{paddingHorizontal: sizes.base_margin}}>
                        <View style={{marginBottom: 10}}>
                            <AppText style={styles.label}>Remarks</AppText>
                        </View>

                        <TextInput
                            style={styles.input0}
                            placeholder="Enter Remarks"
                            onChangeText={(value) => handlDetailInput(value)}
                            multiline={true}
                        />
                    </View>

                    <>
                        <View style={{paddingHorizontal: sizes.base_margin, marginTop: 15}}>
                            <AppText style={styles.label}>Attachment</AppText>
                        </View>

                        <TouchableWithoutFeedback onPress={handlePress}>
                            <View style={styles.container1}>
                                {!imageUri && (
                                    <View style={{marginLeft: 10}}>
                                        <MaterialCommunityIcons
                                            name="camera-plus"
                                            size={60}
                                            color={colors.secondary}
                                        />
                                    </View>
                                )}
                                {imageUri && (
                                    <Image source={{uri: imageUri}} style={styles.image}/>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </>
                    <TouchableOpacity onPress={() => handlePostExpense()}>
                        <AppButton
                            text="SEND"
                            iconFreeButton
                            loginBtnStyle={styles.loginBtnStyle}
                            navigation={navigation}
                        />
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    };

    export default postExpense;

    const styles = StyleSheet.create({
        label: {
            color: colors.secondary,
            fontSize: sizes.normal_font,
            fontWeight: "bold",
        },
        input: {
            backgroundColor: colors.white,
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 15,
        },
        input0: {
            backgroundColor: colors.white,
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 15,
            height: 80,
        },
        input1: {
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
            marginVertical: 15,
        },
        rowStyle: {},
        rowItem: {
            paddingHorizontal: sizes.base_margin,
            marginVertical: 5,
            width: "33.3%",
        },
        rowItem2: {
            paddingHorizontal: sizes.base_margin,
            marginVertical: 5,
            width: "50%",
        },
        rowsTotal: {
            paddingHorizontal: sizes.base_margin,
            marginVertical: 5,
            width: "100%",
        },
        rowItem1: {
            marginVertical: 5,
            width: "50%",
            marginBottom: 20,
        },
        container1: {
            borderRadius: 15,
            height: 100,
            justifyContent: "center",
            marginVertical: 10,
            overflow: "hidden",
        },
        image: {
            width: Platform.OS === "android" ? 55 : 95,
            height: Platform.OS === "android" ? 55 : 95,
            borderRadius: 10,
            marginTop: 16,
            marginBottom: 12,
            marginLeft: 10,
        },
    });
