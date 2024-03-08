import React, { useEffect, useState } from 'react';
import useWeather from '../../hooks/useWeather';
import WeatherCard from '../../components/WeatherCard';
import { ActivityIndicator, Button, SafeAreaView, Text, View } from 'react-native';
import { useWeatherStyle } from './styles';
import { colors } from '../../utils/colors';
import { GOOGLE_API_KEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { screens } from '../../utils/constant';

type WeatherProps = {
  navigation: NativeStackNavigationProp<any, 'Weather'>;
};

const Weather = ({ navigation }: WeatherProps) => {
  const { weatherData, loading, getCurrentUserData } = useWeather();
  const styles = useWeatherStyle();
  const [location, setLocation] = useState('');

  const googlePlacesQuery = {
    key: GOOGLE_API_KEY,
    language: 'en',
    types: '(cities)',
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <Text style={styles.title}>Current Location Weather</Text>

      <View style={styles.googlePlacesContainer}>
        <View style={styles.googlePlacesView}>
          <GooglePlacesAutocomplete
            placeholder="Search for a city"
            minLength={1}
            fetchDetails={true}
            textInputProps={{
              placeholderTextColor: colors.grey,
              backgroundColor: 'transparent',
              padding: 0,
              onChangeText: setLocation,
              value: location,
              borderRadius: 10,
              height: 35,
              color: colors.black,
            }}
            enablePoweredByContainer={false}
            listUnderlayColor="transparent"
            onPress={(data, details) => {
              if (details) {
                navigation.navigate(screens.WEATHER_DETAIL, {
                  payload: details.name,
                });
                setLocation('');
              }
            }}
            query={googlePlacesQuery}
            styles={{
              textInputContainer: [styles.textInputContainer],
            }}
            nearbyPlacesAPI="GoogleReverseGeocoding"
            debounce={200}
          />
        </View>
      </View>
      <View style={styles.myLocationContainer}>
        {loading ? (
          <ActivityIndicator color={colors.black} />
        ) : weatherData ? (
          <WeatherCard weatherData={weatherData} />
        ) : <Button onPress={getCurrentUserData} title='Reload' />}
      </View>
    </SafeAreaView>
  );
};
export default Weather;
