import React , {useState, useContext}from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AppText from "./AppText";
import AppRow from "./AppRow";
import colors from "../components/colors";
import {sosqContext} from "../context/SoSq";

const HEADER_EXPANDED_HEIGHT = 300
const HEADER_COLLAPSED_HEIGHT = 60
const statusBarHeight = Constants.statusBarHeight;
import Constants from 'expo-constants';
const STATUSBAR_HEIGHT = Constants.statusBarHeight;
import { FontAwesome5} from '@expo/vector-icons';

const AppHeader = ( props ) => {


  const {
    home,
    title = "",
    navigation,
    backBtnOnly,
    doubleBtn,
    trippleBtn,
    doubleBtnImg1,
    doubleBtnImg2,
    headerTitle,
    doubleBtnContainerStyle,
    styleImg1,
    badgeButton,
    badgeStatus,
    badgeValue,
    styleImg2,
    doubleBtnImg2Style,
    dblBtnHeaderStyle,
    navigateTo,
    bckBtnImg,
    chatBtn,
    imagePath,
    myRoute,


} = props;

const { setRouteVal } = useContext(sosqContext);


  const renderBackBtnOnly = () => {
    return(
      <View style={styles.container}>

        <View style={styles.subContainer}>

          <TouchableOpacity
              onPress={ () => home ? openDrawer() : goBackScreen()}
            >
              <AppRow style={{marginLeft:5}}>
                <Image style={styles.icon_back} source={bckBtnImg} />
              </AppRow>

          </TouchableOpacity>

          {
            headerTitle
            &&
            <View style={{alignSelf:"center",marginLeft:35, }}>

            <AppText style={styles.headerTitle1}>{headerTitle}</AppText>
            </View>
          }
        </View>

      </View>
    );
  }
  const navigateScreen = () => {
    navigation.navigate("Cart")
  }
  const openDrawer = () => {
    console.log(navigation)
    navigation.openDrawer();
  };

  const goBackScreen = () => {

    navigation.goBack();

  };

  const renderDoubleBtn = () => {

    const handleOnPress = myRoute => {
      console.log("plus btn pressed in header",myRoute,navigateTo)
      setRouteVal(myRoute);
      navigateTo && navigation.navigate(navigateTo,{myroute:myRoute})
    }
    return(
        <View style={[styles.doubleBtnContainer, doubleBtnContainerStyle]}>
        <AppRow style={{justifyContent:"space-between"}}>

        <TouchableWithoutFeedback
              onPress={ () => home ? openDrawer() : navigation.goBack()}
            >
        <View style={styles.subContainer}>

              {
                <Image style={[styles.icon_menu, styleImg1]} source={doubleBtnImg1} />
              }

        </View>
        </TouchableWithoutFeedback>

        {
          headerTitle
          &&
          <View style={{   }}>

          <AppText style={[styles.headerTitle, dblBtnHeaderStyle]}>{headerTitle}</AppText>
          </View>
        }

        { badgeButton ?
        <View>
          <View style={styles.subContainer}>

            <TouchableWithoutFeedback
                onPress={ () => navigation.navigate("CustomersList")}
              >
                {
                  <Image style={[styles.icon1_right,styleImg2 ]}  source={ doubleBtnImg2 } />
                }

            </TouchableWithoutFeedback>

          </View>
          <Badge
            status = { badgeStatus }
            value = { badgeValue }
            containerStyle = {{ position: 'relative', bottom: 28, right:8 }}

          />
        </View>
        :
        <View style={styles.subContainer}>

            <TouchableWithoutFeedback
                onPress={ () => handleOnPress(myRoute)}
              >
                {
                  <Image style={[styles.icon_share, doubleBtnImg2Style]}  source={ doubleBtnImg2 } />
                }

            </TouchableWithoutFeedback>

          </View>
       }
        </AppRow>

    </View>

    );
  }


  const renderChatBtn = () => {
    return(
      <View style={styles.container}>

          <View style={styles.subContainer}>
            <TouchableOpacity onPress={ () => navigation.goBack()} style={{flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
                <FontAwesome5 name="arrow-left" size={20} color={colors.white} />
                <Image style={styles.img} source={imagePath} />
             </TouchableOpacity>
             <AppText style={styles.title}>{title}</AppText>
          </View>

    </View>
    );
  }
  return (

      <SafeAreaView>

        { backBtnOnly ? renderBackBtnOnly() : null }
        { doubleBtn ? renderDoubleBtn() : null }
        { trippleBtn ? renderTrippleBtn() : null }
        { chatBtn ? renderChatBtn() : null }

      </SafeAreaView>

  );
};

export default AppHeader;

const styles = StyleSheet.create({

  container: {

  flexDirection:"row",
  backgroundColor: colors.secondary,
  paddingBottom: 15,
  paddingTop:Platform.OS === 'ios' ? 10 : 40,

  },
  container1: {
    height:205,
     flexDirection:"row",
     justifyContent:"space-between",
    },

  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    height:35,
    marginLeft:15
  },

  rightContainer: { flexDirection: "row", alignItems: "center" },

  iconMargin: {
    marginRight: 20,
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 14 : 12,
    fontWeight:"400",
    marginLeft:10,
    color:colors.white,
    fontWeight:"bold"
  },
  icon_back: {
    width: Platform.OS === 'ios' ? 35 : 30,
    height: Platform.OS === 'ios' ? 35 : 30,
  },
  icon_share:{
    width:  Platform.OS === 'android' ? 18 : 20,
    height: Platform.OS === 'android' ? 17 : 20,
    bottom: Platform.OS === 'android' ? 1 : null,

  },
  icon1_heart:{
    width: Platform.OS === 'android' ? 18 : 20,
    height: Platform.OS === 'android' ? 17 : 18,
    marginHorizontal:10,

  },
  icon_menu: {
    width: 35,
    height:22,
  },
  icon1_right: {
    width: 10,
    height: 10,
    width: Platform.OS === 'android' ? 25 : 42,
    height: Platform.OS === 'android' ? 25 : 42,
    margin:0,
    borderRadius:20,
  },
  dualBtnContainer:{


  },
  headerTitle:{
    fontWeight:"600",
    fontSize:24,
    color:colors.white,

  },
  headerTitle1:{
    fontWeight:"600",
    fontSize:20,
    color:colors.white,
    textAlign:"center"

  },
  image: {
    width:"100%",
    height:75,
    justifyContent:"center",

  },
  img:{
    borderRadius:40,
    width: Platform.OS === "ios" ? 40 : 35,
    height: Platform.OS === "ios" ? 40 : 35,
    marginLeft:5
},
doubleBtnContainer:{

  backgroundColor: colors.secondary,
  paddingBottom: 15,
  paddingTop: Platform.OS === 'android' ? 35 : 5,

  justifyContent:"space-between",
},
});
