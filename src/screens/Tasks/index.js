import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { AuthContext } from '../../context/auth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'react-native-elements';
import { useNavigation } from 'expo-router';
import api from '../../api';
import { Feather, FontAwesome, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TasksScreen() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [services, setServices] = useState([]);

  useEffect(() => {
    LoadServices();
  }, []);

  async function LoadServices() {
    try {
      const response = await api.post('/client/agendamentos/list', {}, {
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

  // console.log("Services", services);

  async function EditTask(id_appointment) {
    navigation.navigate("AddTarefa",{taskId:id_appointment});
      // console.log("Edit task", id_appointment);  
   
    LoadServices()
  }

  async function DeleteTask() {
    navigation.navigate("Main", { screen: "Tasks" });
    console.log("delete task");
    LoadServices()
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
        <FlatList
          data={services}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={require('../../assets/buttonCard.png')}
                style={styles.titleCard}>
                <View style={styles.cardRow}>
                  <MaterialIcons name="task-alt" size={30} color="#fff" style={{
                    textShadowColor: '#000',
                    textShadowOffset: { width: 1, height: 2 },
                    textShadowRadius: 5, marginRight: 15
                  }} />
                  <Text style={styles.title}>
                    Chamado Nº: {item.id_service}</Text>
                </View>
                <View style={styles.cardPrice}>
                  <View style={styles.labelCol}>
                    <MaterialIcons name="attach-money" size={24}
                      color="#444" style={{ marginRight: 5, paddingLeft: 10 }} />
                    <Text style={styles.title}>Valor:</Text>
                  </View>
                  <Text style={styles.title}>R$ {item.price}</Text>
                </View>
              </Image>
              <View style={styles.formRow}>
                <View style={styles.labelStyle}>
                  <View style={styles.labelTitle}>
                    <FontAwesome5 name="users" size={22}
                      color="#444" style={{ marginRight: 5, paddingLeft: 10 }} />
                    <Text style={styles.labelText}>Cliente:</Text>
                  </View>
                  <Text style={styles.labelClient}>{item.cliente}</Text>
                </View>
                <View style={styles.labelStyle}>
                  <View style={styles.labelTitle}>
                    <FontAwesome6 name="building-user" size={24}
                      color="#444" style={{ marginRight: 5, paddingLeft: 10 }} />
                    <Text style={styles.labelText}>Setor:</Text>
                  </View>
                  <Text style={styles.labelClient}>{item.filial}</Text>
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.labelStyle}>
                  <View style={styles.labelTitle}>
                    <MaterialCommunityIcons name="home-city-outline"
                      size={24}
                      color="#444" style={{ marginRight: 5, paddingLeft: 10 }} />
                    <Text style={styles.labelText}>Cidade:</Text>
                  </View>
                  <Text style={styles.labelClient}>{item.cidade}</Text>
                </View>
                <View style={styles.labelStyle}>
                  <View style={styles.labelTitle}>
                    <FontAwesome5 name="calendar-alt" size={24}
                      color="#444" style={{ marginRight: 5, paddingLeft: 10 }} />
                    <Text style={styles.labelText}>Data:</Text>
                  </View>
                  <Text style={styles.labelClient}> {new Date(item.booking_datetime).toLocaleDateString('pt-BR')}</Text>
                </View>
              </View>
              <View style={styles.formRow}>
                <View style={styles.labelStyle}>
                  <View style={styles.labelTitle}>
                    <FontAwesome5 name="map" size={24}
                      color="#444" style={{ marginRight: 5, paddingLeft: 10 }} />
                    <Text style={styles.labelText}>Endereço:</Text>
                  </View>
                  <Text style={styles.labelClient}>{item.endereco}</Text>
                </View>
                <View style={styles.labelStyle}>
                  <View style={styles.labelTitle}>
                    <MaterialIcons name="task" size={24}
                      color="#444" style={{ marginRight: 5, paddingLeft: 10 }} />
                    <Text style={styles.labelText}>Status:</Text>
                  </View>
                  <Text style={styles.labelClient}>{item.status}</Text>
                </View>
              </View>
              <Image
                source={require('../../assets/buttonCard.png')}
                style={styles.bottonContainer}>
                <TouchableOpacity style={styles.buttonBottom}
                    onPress={() => EditTask(item.id_appointment)}>
                  <FontAwesome name="edit" size={30} color="#fff" style={styles.iconBottom} />
                  <Text style={styles.bottomTextEdit}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBottom}
                  onPress={DeleteTask}>
                  <FontAwesome name="trash" size={30} color="#c53131ff" style={styles.iconBottom} />
                  <Text style={styles.bottomTextDelete}>Excluir</Text>
                </TouchableOpacity>
              </Image>

              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => handleVerDetalhes(item.id)}
              >
                <Text style={styles.buttonText}>Ver detalhes</Text>
              </TouchableOpacity> */}
            </View>
          )}
        />
      </View >
    </>
  )
}


