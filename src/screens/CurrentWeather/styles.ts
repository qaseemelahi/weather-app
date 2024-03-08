import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';

export const useWeatherStyle = () =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      marginVertical: 10,
      alignSelf: 'center',
      fontFamily: Fonts.bold,
      color: colors.black,
    },
    weatherCard: {
      paddingHorizontal: 10,
    },
    inputStyle: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.grey,
      borderRadius: 30,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    safeAreaViewContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    locationText: {
      fontSize: 14,
      color: colors.black,
      marginBottom: 10,
      fontFamily: Fonts.medium,
    },
    myLocationContainer: {
      paddingHorizontal: 10,
      position: 'absolute',
      marginTop: '60%',
      alignSelf: 'center'
    },
    googlePlacesContainer: {
      height: 200,
      paddingHorizontal: 10,
    },
    googlePlacesView: {
      width: '100%',
      height: '100%',
    },

    textInputContainer: {
      borderWidth: 1,
      width: '100%',
      borderColor: colors.grey,
      borderRadius: 20,
    },
    cancelText: {
      color: colors.black,
      fontSize: 15,
      marginRight: 5,
      marginTop: 10,
    },
  });
