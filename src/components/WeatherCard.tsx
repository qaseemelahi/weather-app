import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../utils/colors';
import { images } from '../assets/images';
import { WeatherDataTypes } from '../utils/types';
import { Fonts } from '../assets/fonts';

interface WeatherCardProps {
  weatherData: WeatherDataTypes;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const convertKtoC = (data: number) => {
    var val = data - 273.15;
    return val.toFixed();
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={1}>
        <ImageBackground
          resizeMode="cover"
          source={images.rain}
          style={styles.mainContainer}>
          <View style={styles.insideCard}>
            <Text style={styles.boldText}>{weatherData.name}</Text>
            <View style={styles.temperatureContainer}>
              <Text style={styles.mainTemp}>
                {convertKtoC(weatherData?.main?.temp) + '°'}
              </Text>
            </View>

            <View style={styles.justifyEnd}>
              <View style={styles.row}>
                <Text style={styles.mediumText}>
                  {weatherData.weather?.[0]?.description}
                </Text>

                <View style={styles.itemCenter}>
                  <Text style={{ color: colors.white }}>
                    {`L:${convertKtoC(weatherData.main?.temp_max)}°  `}
                  </Text>
                  <Text style={{ color: colors.white }}>
                    {`H:${convertKtoC(weatherData.main?.temp_min)}°`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    height: 400,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  insideCard: {
    width: '100%',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  boldText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: '700',
    alignSelf: 'center',
  },

  swipeOptionItemContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTemp: {
    fontSize: 80,
    color: colors.white,
    alignSelf: 'center',
    fontFamily: Fonts.bold,
  },

  justifyEnd: {
    justifyContent: 'flex-end',
  },
  mediumText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  itemCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperatureContainer: {
    height: '85%',
    justifyContent: 'center',
  },
});
