import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CurrentWeather from '../screens/CurrentWeather';
import WeatherDetail from '../screens/WeatherDetail';
import { screens } from '../utils/constant';
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screens.CURRENT_WEATHER} component={CurrentWeather} />
        <Stack.Screen name={screens.WEATHER_DETAIL} component={WeatherDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
