import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';

export const useViewWeatherStyle = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    safeAreaContainer: {
      flex: 1,
    },
    cancelText: {
      fontSize: 14,
      color: colors.white,
      alignSelf: 'flex-end',
      marginTop: 10,
      marginRight: 10,
      fontFamily: Fonts.medium,
    },
    nameCity: {
      fontSize: 35,
      color: colors.white,
      fontFamily: Fonts.bold,
    },
    temp: {
      fontSize: 80,
      color: colors.white,
    },
    insideContainer: {
      width: '100%',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    weatherDescription: {
      fontSize: 22,
      color: colors.white,
      fontFamily: Fonts.medium,
      marginBottom: 15,
    },
    highTemp: {
      fontSize: 18,
      color: colors.white,
    },
    forecastTemp: {
      fontSize: 14,
      color: colors.white,
      fontFamily: Fonts.medium,
    },
    days: {
      fontSize: 15,
      color: colors.white,
      fontFamily: Fonts.bold,
    },
    insideForcastCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      borderBottomWidth: 1,
      paddingBottom: 5,
      borderColor: colors.white,
    },
    forcastContainer: {
      backgroundColor: '#86B6F6',
      height: 180,
      marginHorizontal: 10,
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: 40,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayForCast: {
      fontSize: 15,
      color: colors.white,
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
  });
