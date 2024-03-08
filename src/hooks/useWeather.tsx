import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  OPEN_WEATHER_API_URL,
  OPEN_WEATHER_API_KEY,
  GOOGLE_API_KEY,
  OPEN_WEATHER_FORCAST_API_URL,
} from '@env';
import { WeatherDataTypes } from '../utils/types';
import { Alert } from 'react-native';

interface CustomGeolocationResponse {
  coords: {
    accuracy: number;
    altitude: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  extras: {
    maxCn0: number;
    meanCn0: number;
    satellites: number;
  };
  mocked: boolean;
  timestamp: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface WeatherHookResult {
  weatherData: WeatherDataTypes | null;
  currentLocation: Location | null;
  loading: boolean;
  forecastData: any;
  getCurrentUserData: () => void;
}

const useWeather = (
  city?: string,
  getThreeDayForecast?: boolean,
): WeatherHookResult => {
  const [weatherData, setWeatherData] = useState<WeatherDataTypes | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [forecastData, setForecastData] = useState<any[] | null>(null);

  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position: CustomGeolocationResponse) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        fetchAddress(position.coords.latitude, position.coords.longitude);
      },
      (error: any) => {
        console.log('error', error);
        if (error.PERMISSION_DENIED) {
          Alert.alert('Please enable the location service from setting to see the current weather')
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  const fetchForecast = async (city: string) => {
    try {
      const forecastUrl = `${OPEN_WEATHER_FORCAST_API_URL}/?q=${city}&appid=${OPEN_WEATHER_API_KEY}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      // Group forecast data by day
      const groupedForecastData: { day: string; forecast: any }[] = [];
      const currentDate = new Date();
      const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      forecastData.list.forEach((forecast: any) => {
        const forecastDate = new Date(forecast.dt * 1000); // Convert seconds to milliseconds
        const dayIndex = forecastDate.getDay();
        const dayName = dayNames[dayIndex];

        // Check if the forecast date is after the current date and if it's not already added for the day
        if (
          forecastDate >= currentDate &&
          !groupedForecastData.some(item => item.day === dayName) &&
          groupedForecastData.length < 3 // Ensure only three days are added
        ) {
          groupedForecastData.push({ day: dayName, forecast: forecast });
        }
      });

      setForecastData(groupedForecastData);
    } catch (error) {
      console.log('Error fetching forecast data:', error);
    }
  };
  const fetchData = async (city: string) => {
    try {
      const response = await fetch(
        `${OPEN_WEATHER_API_URL}?q=${city}&appid=${OPEN_WEATHER_API_KEY}`,
      );

      const data = await response.json();

      setWeatherData(data);
      setLoading(false);
    } catch (error: any) {
      console.log('err', error);
      setLoading(false);
    }
  };
  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
      );
      const data = await response.json();
      let city = '';
      if (data.results.length > 0) {
        data.results.forEach((address: any) => {
          const formattedAddress = address.formatted_address;
          city = formattedAddress;
        });
      }
      fetchData(city);
    } catch (error) {
      console.log('error');
    }
  };
  const getCurrentUserData = () => {
    if (city) {
      fetchData(city);
    } else {
      fetchCurrentLocation();
    }
  }

  useEffect(() => {
    if (getThreeDayForecast) {
      fetchForecast(city || "");
    }
    getCurrentUserData()
  }, [city, getThreeDayForecast]);


  return { weatherData, currentLocation, loading, forecastData, getCurrentUserData };
};

export default useWeather;
