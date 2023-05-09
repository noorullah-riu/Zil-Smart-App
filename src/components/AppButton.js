import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import colors from "../components/colors";
import IconBadge from "react-native-icon-badge";
import { Feather,MaterialCommunityIcons,FontAwesome5 } from "@expo/vector-icons";
function AppButton({
  navigation,
  navigation1,
  newIconButton,
  iconButton,
  customIconButton,
  iconFreeButton,
  text,
  transparent,
  iconName,
  filterButton,
  containerStyle,
  imageStyle,
  btnTextStyle,
  cartHistoryBtnStyle,
  cartHistoryTxtStyle,
  navigateTo,
  cartProceedBtnStyle,
  loginBtnStyle,
  loginBtnText,
  onPress,
  eye,
  cart
}) {
  const [backgroundcolor, setBackgroundcolor] = useState(colors.WHITE);
  const [btnPressed, setBtnPressed] = useState(false);
  // console.log("AppButton, onPress",onPress)
  const renderIconButton = () => {
    return (
      <TouchableOpacity
        style={containerStyle ? containerStyle : styles.button0Style}
        activeOpacity={0.5}
        onPress={navigation}
      >
        <Image
          source={iconName}
          style={imageStyle ? imageStyle : styles.buttonImageIconStyle}
        />

        <Text style={btnTextStyle ? btnTextStyle : styles.buttonTextStyle}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderNewIconButton = () => {
    return (
      <View
        style={containerStyle ? containerStyle : styles.button0Style}
        activeOpacity={0.5}
      >
        {eye ? 
        <FontAwesome5 name="eye" size={24} color="white" />
        :
        cart 
        ?
        <Feather name="shopping-cart" size={24} color="white" />
        :
        null

      }
       
        <Text style={btnTextStyle ? btnTextStyle : styles.buttonTextStyle}>
          {text}
        </Text>
      </View>
    );
  };

  const renderCustomIconButton = () => {
    return (
      <TouchableOpacity
        style={styles.button2Style}
        activeOpacity={0.5}
        onPress={() => console.log("pressed")}
      >
        <View style={{}}>
          <IconBadge
            BadgeElement={<Text style={{ color: "#FFFFFF" }}>2</Text>}
            IconBadgeStyle={{
              width: 30,
              height: 30,
              backgroundColor: colors.secondary,
              position: "relative",
            }}
          />
        </View>

        <Text style={styles.buttonTextStyle}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderIconFreeButton = () => {
    return onPress ? (
      <TouchableOpacity onPress={onPress}>
        <View style={loginBtnStyle} activeOpacity={0.5}>
          <Text style={loginBtnText ? loginBtnText : styles.buttonTextStyle}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <View style={loginBtnStyle} activeOpacity={0.5}>
        <Text style={loginBtnText ? loginBtnText : styles.buttonTextStyle}>
          {text}
        </Text>
      </View>
    );
  };

  const handleFilterButtonPress = () => {
    setBtnPressed((btnPressed) => !btnPressed);
  };
  const renderFilterButton = () => {
    return (
      <TouchableOpacity onPress={() => handleFilterButtonPress()}>
        <View
          style={btnPressed ? styles.changedBtnView : styles.defaultBtnView}
        >
          <Text
            style={
              btnPressed
                ? styles.changedFilterButtonText
                : styles.defaultFilterButtonText
            }
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {iconButton ? renderIconButton() : null}
      {newIconButton ? renderNewIconButton() : null}
      {iconFreeButton ? renderIconFreeButton() : null}
      {filterButton ? renderFilterButton() : null}
      {customIconButton ? renderCustomIconButton() : null}
    </>
  );
}

const styles = StyleSheet.create({
  button0Style: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
    height: Platform.OS === "android" ? 90 : 70,

    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
  },
  button2Style: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 25,

    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  button1Style: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    borderWidth: 0.5,
    borderColor: "#AAAAAA",
    borderRadius: 25,
    marginTop: 20,
    height: 50,
  },
  buttonImageIconStyle: {
    height: 25,
    width: 25,
    resizeMode: "stretch",
    backgroundColor: colors.secondary,
    alignSelf: "center",
    marginLeft: 5,
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
  buttonText1Style: {
    color: colors.BLACK,
    marginBottom: 4,
    marginLeft: 10,
    fontSize: Platform.OS === "android" ? 17 : 22,
    alignSelf: "center",
    fontSize: 16,
  },
  filterButtonContainer: {
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 25,
    alignSelf: "flex-start",
    padding: 14,
  },
  defaultFilterButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.LIGHT_GREY,
  },
  changedFilterButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.WHITE,
  },
  defaultBtnView: {
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 25,
    alignSelf: "flex-start",
    padding: 10,
  },
  changedBtnView: {
    justifyContent: "center",
    backgroundColor: colors.secondary,

    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 25,
    alignSelf: "flex-start",
    padding: 14,
  },
});

export default AppButton;
