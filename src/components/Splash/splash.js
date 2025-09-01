// SplashScreen.js
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ImageBackground, Animated, View, SafeAreaView } from 'react-native';

// import {
//   BallIndicator,
//   BarIndicator,
//   DotIndicator,
//   MaterialIndicator,
//   PacmanIndicator,
//   PulseIndicator,
//   SkypeIndicator,
//   UIActivityIndicator,
//   WaveIndicator,
// } from 'react-native-indicators';
import { ActivityIndicator } from 'react-native-paper';

export default function SplashScreenPage() {
  return (
    <React.Fragment key={"spinner"}>
      <StatusBar hidden />
      <ImageBackground source={require('../../assets/splash.png')} style={styles.content}>
        <SafeAreaView style={styles.splashContainer}>
          <ActivityIndicator color="rgba(255, 255, 255, 0.7)" style={styles.loadingActive} size={50} />
        </SafeAreaView>
      </ImageBackground>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    top: 270,
  },
});