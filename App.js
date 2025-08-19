import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
    <StatusBar hidden={true}/>
    <ImageBackground source={require("./assets/splash.png")} style={styles.bgstyle}>
      <View style={styles.container}>
        <Text>Bem vindos a Anama!</Text>
        <StatusBar style="auto" />
      </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgstyle:{
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode:"cover",
  }
});
