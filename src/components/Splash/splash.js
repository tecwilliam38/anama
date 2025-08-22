// SplashScreen.js
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ImageBackground, Animated, View } from 'react-native';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import { ActivityIndicator } from 'react-native-paper';

export default function SplashScreenPage() {
  let [key] = useState("");

  return (
    <>
      <ImageBackground source={require('../../assets/splash.png')} style={styles.content}>
        <PulseIndicator color="rgba(255, 255, 255, 0.7)" style={styles.loadingActive} size={50} />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  },
  loadingActive: {
    top: 290,
  },
});