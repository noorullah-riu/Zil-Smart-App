import React from 'react';
import { StyleSheet } from 'react-native';
import AppRow from './AppRow';

function BottomContainer({ children, style }) { 
    return(
        <AppRow style={[style,styles.bottomContentContainer]}>
            {children}
        </AppRow>
       
    )
       
}

const styles = StyleSheet.create({
    bottomContentContainer: {
        flexDirection: "row",
        alignSelf:"center",
      },
      
})

export default BottomContainer;