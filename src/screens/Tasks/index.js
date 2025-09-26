import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import { AuthContext } from '../../context/auth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'react-native-elements';
import { useNavigation } from 'expo-router';


export default function TasksScreen() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  // console.log("Ususario", user);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("AddClient")}
          >
            <Image
              source={require('../../assets/buttonClient.png')}
              style={styles.buttonTouchable}>
              <MaterialIcons name="add-task" size={25} color="#fff" />
              <Text style={styles.buttonTextClient}>Adicionar cliente</Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("AddTarefa")}
          >
            <Image
              source={require('../../assets/button.png')}
              style={styles.buttonTouchable}>
              <MaterialIcons name="add-task" size={25} color="#fff" />
              <Text style={styles.buttonTextClient}>Nova Tarefa</Text>
            </Image>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}


