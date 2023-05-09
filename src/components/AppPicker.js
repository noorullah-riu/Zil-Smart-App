import React , { useState } from 'react';
import { View, } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import colors from "../components/colors";

const AppPicker = ({items, labelTxt}) => {

    const [selectedVal, setSelectedVal] = useState("");

    const onSelectVal = (value,label) => {
        setSelectedVal(value);
    }

    return(
        <View style={{

            padding: 15,

            borderWidth: 1,
            borderColor: colors.white,
            
            backgroundColor: colors.white,
          
            
            }}>
        <RNPickerSelect
            pickerProps={{
                accessibilityLabel: selectedVal,
            }}
            useNativeAndroidPickerStyle={true}
            name = "cityList" 
            onValueChange={(value,label) => onSelectVal(value,label)}
            items={items}
            style={{ inputAndroid: { color: 'black' } }}

            useNativeAndroidPickerStyle={false}
            placeholder={{
                label:"Select an Assignee",
                value: null,
            }}
            style={{inputAndroid: {color: 'black'} }}
        />
    </View>
    )
}

export default AppPicker;