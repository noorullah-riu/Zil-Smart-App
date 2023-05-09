import React, { useEffect, useState } from "react";
import { StyleSheet, Image, SafeAreaView, View, ScrollView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import AppForm from "../components/AppForm"
import AppFormField from "../components/AppFormField"
import * as Yup from "yup";
import AppText from "../components/AppText";
import colors from "../components/colors";
import AppRow from "../components/AppRow";
import SubmitButton from "../components/SubmitButton";
import RegisterUserApi from "../api/registerUser";



const validationSchema = Yup.object().shape({
    name:Yup.string().required().max(50),
    phoneNumber:Yup.string().required().max(50),
    email:Yup.string().required().max(50),
    password:Yup.string().required().min(4),
    confirmPassword:Yup.string().required().min(4),
    companyName:Yup.string().required().max(50),
    businessNature:Yup.string().required().max(50),

  });

  const Signup = ({ navigation }) => {

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
    const handleOnSubmit = async(values) => {
       console.log("form values::",values)
       const res  = await RegisterUserApi.registerUser(values);    
  }
  
  return (
 
    <SafeAreaView style={styles.container}>
        <ScrollView>
     
      <Image style={styles.icon1} source={require("../assets/blue_hcc.png")} />
      <AppText style={styles.h3}>Create Account</AppText>


     
        <View style={{marginHorizontal:30,}}>
       
        
            <AppForm
                initialValues={{ name: "", email: "", phoneNumber: "", password:"",confirmPassword:"", companyName:"" , businessNature:""}}
                onSubmit={(values) => handleOnSubmit(values)}
                validationSchema={validationSchema}
                handleChange
                handleSubmit
            >
                 <View style={{marginTop:"5%"}}>
                    <AppFormField
                        customIcon
                        autoCapitalize="none"
                        autoCorrect={false}
                        customIcon = "flag"
                        iconname="person-circle-outline"
                        name="name"
                        placeholder="Name"
                        textContentType="name"
                    />
                    
                </View>

                <View style={{marginTop:"5%"}}>
                    <AppFormField
                        customIcon
                        autoCapitalize="none"
                        autoCorrect={false}
                        customIcon = "flag"
                        iconname="phone-portrait-outline"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        textContentType="telephoneNumber"
                    /> 
                </View>
                
                <View style={{marginTop:"5%"}}>
                    <AppFormField
                        customIcon
                        autoCapitalize="none"
                        autoCorrect={false}
                        customIcon = "flag"
                        iconname="mail"
                        name="email"
                        placeholder="Email"
                        textContentType="emailAddress"
                    /> 
                </View>

                <View style={{marginTop:"5%"}}>
                    <AppFormField
                        customIcon
                        autoCapitalize="none"
                        autoCorrect={false}
                        customIcon = "md-business"
                        iconname="md-business-outline"
                        name="companyName"
                        placeholder="Company Name"
                        textContentType="name"
                                    />
                    
                </View>
                <View style={{marginTop:"5%"}}>
                    <AppFormField
                        customIcon
                        autoCapitalize="none"
                        autoCorrect={false}
                        customIcon = "md-business"
                        iconname="md-business"
                        name="businessNature"
                        placeholder="Company Type"
                        textContentType="name"
                                    />
                    
                </View>
                <View style={{marginTop:"5%"}}>
                   

                    <AppFormField
                        customIcon
                        autoCapitalize="none"
                        autoCorrect={false}
                        customIcon = "md-business"
                        iconname="lock-closed"
                        name="password"
                        placeholder="Password"
                        textContentType="password"
                        secureTextEntry
                    />
                </View>
                <View style={{marginTop:"5%"}}>
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
                <View style={{marginTop:"5%"}}>
          
   
          <SubmitButton title="SIGNUP"/>

          <AppRow style={styles.bottomRow}>
            <AppText  style={styles.h7}>Already have an account?</AppText>
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
    backgroundColor:colors.primary,
    marginBottom:20,
  },
 
h2:{
    fontSize: Platform.OS === "ios" ? 26 : 22,
    fontWeight:Platform.OS === "ios" ? "600" : null,
    color:colors.secondary,
    textAlign:"center",
    marginHorizontal:30,
    marginTop: Platform.OS === "ios" ? 35 : 28,

},
h3:{
  fontSize: Platform.OS === "ios" ? 26 : 22,
    fontWeight:"bold",
    color:colors.secondary,
    textAlign:"left",
    marginHorizontal:30,
    marginTop: Platform.OS === "ios" ? 35 : 30,
},
h5:{
    fontSize: Platform.OS === "ios" ? 17 : 17,
    fontWeight:"bold",
    color:colors.secondary,
    textAlign:"right",
    marginHorizontal:20,
    marginVertical: Platform.OS === "ios" ? 17 : 17,
    marginRight:30,
},
h6:{
  fontSize: Platform.OS === "ios" ? 17 : 17,
  fontWeight:"bold",
  color:colors.secondary,
  marginHorizontal:5,

  marginVertical: Platform.OS === "ios" ? 17 : 57,
},
 h7:{
  fontSize: Platform.OS === "ios" ? 17 : 17,
  fontWeight:Platform.OS === "ios" ? "600" : null,
  color:colors.grey,
  marginVertical: Platform.OS === "ios" ? 17 : 17,
},
suboptionsRow1:{
    marginTop:"15%",
    marginBottom:"10%",
    marginHorizontal:30,

 },
 icon1: {
  width: Platform.OS === 'android' ?"52%" :"60%",
  height: Platform.OS === 'android' ? "8%":"8%",
  marginTop: Platform.OS === 'android' ? "10%" : "15%",
  alignSelf:"center",
  marginHorizontal:30,
  
},
loginBtnStyle:{
  backgroundColor:colors.secondary,
  justifyContent: "center",
  height:Platform.OS === 'android' ? 60 : 70,
  borderWidth: 0.5,
  borderColor: '#fff',
  borderRadius: 5,
  marginHorizontal:30, 
  marginVertical:0,
  marginBottom:0,
},
bottomRow:{
  justifyContent:"center", 
  marginTop:Platform.OS === 'android' ? -45 : 0,
  marginBottom:70,
}

});

export default Signup;