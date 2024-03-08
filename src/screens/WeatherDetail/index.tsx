import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import useWeather from '../../hooks/useWeather';
import { convertKtoC } from '../../utils/helperFunction';
import { images } from '../../assets/images';
import { useViewWeatherStyle } from './styles';
import { colors } from '../../utils/colors';
interface ViewWeatherTypeProps {
  navigation?: any;
  route: any;
}
const ViewWeather: React.FC<ViewWeatherTypeProps> = ({ route, navigation }) => {
  const styles = useViewWeatherStyle();
  const { payload } = route?.params || {};
  const { weatherData, loading, forecastData } = useWeather(payload, true);

  return (
    <ImageBackground source={images.starsBg} style={styles.mainContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.white} />
        </View>
      ) : (
        <SafeAreaView style={styles.safeAreaContainer}>
          <Text
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.cancelText}>
            Cancel
          </Text>

          <View style={styles.insideContainer}>
            <Text style={styles.nameCity}>{weatherData?.name}</Text>

            <Text style={styles.temp}>{`${convertKtoC(
              weatherData?.main?.temp,
            )}°`}</Text>

            <Text style={styles.weatherDescription}>
              {weatherData?.weather[0]?.description}
            </Text>

            <View style={styles.row}>
              <Text style={styles.highTemp}>{`L: ${convertKtoC(
                weatherData?.main?.temp_min,
              )}° `}</Text>

              <Text style={styles.highTemp}>{`H: ${convertKtoC(
                weatherData?.main?.temp_max,
              )}°`}</Text>
            </View>
          </View>
          <View style={styles.forcastContainer}>
            <Text style={styles.dayForCast}>3 Day Forcast</Text>
            {forecastData?.map((item, index) => {
              return (
                <View key={index} style={styles.insideForcastCard}>
                  <Text style={styles.days}>{item.day}</Text>
                  <View style={styles.row}>
                    <Text style={styles.highTemp}>{`L: ${convertKtoC(
                      item?.forecast?.main?.temp_min,
                    )}° `}</Text>

                    <Text style={styles.highTemp}>{`H: ${convertKtoC(
                      item?.forecast?.main?.temp_max,
                    )}°`}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};
export default ViewWeather;
