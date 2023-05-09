import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import colors from "./colors";
import AppButton from "./AppButton";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

function SubmitButton({ navigation, title }) {
  const { handleSubmit } = useFormikContext();
  // <SubmitButton title="LOGIN" />

  {
    /* <TouchableOpacity onPress={() => handleSubmit}>
      <View style={styles.loginBtnStyle} activeOpacity={0.5}>
        <Text style={styles.buttonTextStyle}>
          {title}
        </Text>
      </View>
    </TouchableOpacity> */
  }
  useEffect(() => {
    console.log("SubmitButton called");
  }, []);
  return (
    <AppButton
        navigation={navigation}
        text={title}
        iconFreeButton
        loginBtnStyle={styles.loginBtnStyle}
        onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
const styles = StyleSheet.create({
  loginBtnStyle: {
    backgroundColor: colors.secondary,
    fontWeight: "bold",
    width:"100%",
    // color:colors.white,
    // flexDirection: 'row',
    justifyContent: "center",
    height:50,
    borderWidth: 0.5,
    borderColor: "#fff",
    borderRadius: 5,
    // marginTop:20,
    marginVertical: 0,
    marginBottom: 0,
    // alignItems:"center"
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
