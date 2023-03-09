
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text,
  Animated
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);


  const size = new Animated.Value(100);

  const animate = () => {
    Animated.timing(size, {
      toValue: 200,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animate()
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      // AsyncStorage.getItem('payment').then((value) =>
      //   navigation.replace(
      //     value === null ? 'Main' : 'Success'
      //   ),
      // );

      navigation.replace('Login')

    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo_bg_removed.png')}
        style={[styles.image, { height: size }]}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      >
      </ActivityIndicator>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  image: { resizeMode: 'contain', margin: 30 }
});