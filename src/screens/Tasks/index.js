import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { AuthContext } from '../../context/auth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'react-native-elements';
import { useNavigation } from 'expo-router';
import api from '../../api';


export default function TasksScreen() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [services, setServices] = useState([]);

  useEffect(() => {
    LoadServices();
  }, []);

  async function LoadServices() {
    try {
      const response = await api.post('/client/agendamentos/list',{}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // console.log("Serviços", response.data);
      setServices(response.data);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  }

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
              <MaterialIcons name="add-task" size={35} color="#000" style={styles.iconStyle} />
              <Text style={styles.buttonTextClient}>Adicionar cliente</Text>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("AddTarefa")}
          >
            <Image
              source={require('../../assets/button.png')}
              style={styles.buttonTouchable}>
              <MaterialIcons name="add-task" size={35} color="#fff" style={styles.iconStyle} />
              <Text style={styles.buttonTextClient}>Nova Tarefa</Text>
            </Image>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}


