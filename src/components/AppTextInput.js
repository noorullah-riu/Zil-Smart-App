import React from "react";
import { View, TextInput, StyleSheet , Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "./styles";
import colors from "./colors";
import { Ionicons } from '@expo/vector-icons';


const AppTextInput =({ icon,customIcon,imageSource, iconname,iconFree, customDoubleIcon, customIconRight, icon1Source,iconSource, icon1Style, icon2Source, icon2Style, customDoubleIconContainerStyle, icon2ContainerStyle, iconRightContainerStyle, iconFreeContainerStyle,placeholderStyle,containerStyle,iconStyle,placeholderStyles, ...otherProps }) => {

  const renderCustomIcon = () => {
    return(
      <View style={styles.container}>

      <Ionicons
          name={iconname}
          size={20}
          color={colors.secondary}
          style={styles.icon}
        />

        <View style={{flex:1}}>
          <TextInput
                placeholderTextColor={colors.secondary}
                style={[defaultStyles.text,styles.customIconTextStyle]}
                {...otherProps}
              />
        </View>

   </View>
    )
  }
  const renderCustomIconRight = () => {
    return(
      <View style={[ styles.container, iconRightContainerStyle, containerStyle]}>

      <View style={{flex:1, justifyContent:"center"}}>
        <TextInput
          placeholderTextColor={defaultStyles.colors.medium}
          style={[defaultStyles.text, styles.customIconRighText]}

          {...otherProps}
     />
      </View>

      <Image style={[styles.customiconRight, iconStyle]} source={iconSource} />


   </View>
    )
  }


  const renderCustomDoubleIcon = () => {
    return(
      <View style={customDoubleIconContainerStyle? customDoubleIconContainerStyle : styles.container}>

      <View style={{}}>
        <Image style={icon1Style ? icon1Style : styles.customicon} source={icon1Source} />
      </View>

      <View style={{ flex: 1,}}>
        <TextInput
          placeholderTextColor={defaultStyles.colors.medium}
          style={[defaultStyles.text,styles.customIconRighText, placeholderStyles]}
          {...otherProps}
        />
      </View>

       <View style={icon2ContainerStyle ? icon2ContainerStyle : styles.customDoubleIcon2Container }>
          <Image style={icon2Style ? icon2Style : styles.customDoublIcon} source={icon2Source} />
       </View>


   </View>
    )
  }
  const renderIcon = () => {
    return(
      <View style={[styles.container, ]}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.secondary}
          style={styles.icon}
        />

      <View style={{flex:1}}>
        <TextInput
            placeholderTextColor={colors.secondary}
            style={defaultStyles.text}
            {...otherProps}
          />
      </View>


   </View>
    )
  }
  const renderTextInputOnly = () => {
    return(
      <View style={[styles.iconFreeContainer, iconFreeContainerStyle]}>
        <TextInput
          placeholderTextColor={defaultStyles.colors.medium}
          style={[defaultStyles.text,placeholderStyle]}
          {...otherProps}
        />

   </View>
    )
  }

  return (
    <>
     {customIcon ? renderCustomIcon() : null }
     {customIconRight ? renderCustomIconRight() : null }
     {customDoubleIcon ? renderCustomDoubleIcon() : null }
     {icon ? renderIcon() : null }
     {iconFree ? renderTextInputOnly() : null }

    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.background,
    flexDirection: "row",
    width: "100%",
    paddingLeft: 15,
    height: 60,
    marginBottom:  Platform.OS === 'android' ? 1 : 5,
    borderRadius:5,
    alignItems:"center",
    borderColor: colors.primary,
    borderWidth:1,
  },
  iconFreeContainer: {
    backgroundColor: colors.greybackgound,
    borderRadius: 25,
    flexDirection: "row",
    width:  "100%",
    height: Platform.OS === 'android' ? 50 : 55,
    padding: 10,
    marginVertical: 5,
    borderRadius:50,
  },
  icon: {
    marginRight: 10,
  },

  customicon: {
    width: 30,
    height: 30,
  },

  customiconRight : {
    width: Platform.OS === 'android' ? 20 :20,
    height: Platform.OS === 'android' ? 20 :20,
    alignSelf:"center",

  },
  customDoublIcon: {
    width: Platform.OS === 'android' ? 20 :25,
    height: Platform.OS === 'android' ? 20 :25,
    alignSelf:"center",
  },
  customIconRighText:{
    height:25,
  },
  customDoubleIcon2Container:{
  },
  customIconTextStyle:{
    paddingLeft:10
  }
});

export default AppTextInput;
