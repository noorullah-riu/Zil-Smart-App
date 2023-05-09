import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import AppText from "./AppText";
import sizes from "./sizes";

import colors from "./colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default (props) => {
  const {
    error,
    label,
    labelStyle,
    inputWrapperStyle,
    inputWrapperErrorStyle,
    inputStyle,
    errorStyle,
    containerStyle,
    iconName,
  } = props;

  let wrapperErrorStyle = error
    ? {
        borderWidth: 1,
        borderColor: colors.ERROR_TEXT,
        ...inputWrapperErrorStyle,
      }
    : {
        borderWidth: 1,
        borderColor: props.value ? colors.LIGHT_GREY : colors.LIGHT_GREY,
        ...inputWrapperErrorStyle,
      };

  let iconColor = props.value ? colors.PRIMARY_GREEN : colors.grayText;
  if (error) iconColor = colors.errorText;
  return (
    <View style={[styles.containerStyle, containerStyle]}>

      <AppText style={[styles.label, labelStyle]}>{label}</AppText>
      <View style={[styles.inputWrapper, inputWrapperStyle,]}>

        
        {iconName && (
          <MaterialCommunityIcons
            name={iconName}
            size={25}
            style={styles.iconStyles}
            color={iconColor}
          />
        )}
        <TextInput
          {...props}
          placeholderTextColor={colors.default_grey}
          style={[styles.input, inputStyle]}
        />
      </View>
      {error ? (
        <AppText style={[styles.error, errorStyle]}>{error}</AppText>
      ) : null}
    </View>
    
   
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 0,
   
  },
  label: {
    marginTop:7,
    marginBottom:13,
    color:colors.secondary,
    fontSize:sizes.normal_font,
    fontWeight:"bold",
  },
  inputWrapper: {
    flexDirection: "row",
    marginTop:0,
    borderRadius: 5,
    backgroundColor:colors.white,


  },
  iconStyles: {
    marginTop: 15,
    marginLeft: 18,
  },
  input: {
    flex: 1,
    minHeight: 38,
    maxHeight: 110,
    fontSize: 14,
    paddingHorizontal: 8,
    color: colors.darkText,

    
  },
  error: {
    color: colors.ERROR_TEXT,
    marginTop: 5,
    fontSize: 16,
  },
});
