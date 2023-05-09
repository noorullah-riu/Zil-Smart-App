import { StyleSheet, Platform } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
});