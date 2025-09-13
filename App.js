import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import SplashScreenPage from './src/components/Splash/splash.js';
import { AuthProvider } from './src/context/auth';
import Routes from './src/context/routes';


SplashScreen.preventAutoHideAsync();

// depois, quando estiver pronto:
SplashScreen.hideAsync();



export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      // Simula carregamento de recursos
      await new Promise(resolve => setTimeout(resolve, 5000));
      setAppIsReady(true);
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync(); // oculta a splash oficial
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // Enquanto carrega, exibe sua Splash personalizada
    return <SplashScreenPage />;
  }


  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaProvider>
        <NavigationContainer onLayout={onLayoutRootView}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgstyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: "cover",
  }
});
