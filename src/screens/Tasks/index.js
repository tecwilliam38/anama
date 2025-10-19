import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native'
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

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
    navigation.navigate("AddTarefa", { taskId: id_appointment });
    // console.log("Edit task", id_appointment);  
    LoadServices()
  }

  async function DeleteAppointmentid(id_appointment) {
    try {
      const response = await api.delete(`/agendamentos/${id_appointment}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });


      if (response?.data) {
        navigation.replace("Main", { screen: "Tasks" });
      }

    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status == 401)
          return navigate("/");

        alert(error.response?.data.error);
      }
      else
        alert("Erro ao excluir reserva");
    }
  }
  const DeleteAppointment = async (id) => {
    try {
      await api.delete(`/agendamentos/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      // Navegar ou atualizar após exclusão     
      LoadServices()
    } catch (error) {
      alert("Erro ao excluir agendamento");
      console.error(error);
    }
  };




  const openConfirmModal = (item) => {
    setSelectedItem(item);
    setShowConfirm(true);
  };


  const handleConfirm = () => {
    if (selectedItem) {
      DeleteAppointment(selectedItem.id_appointment);
      setShowConfirm(false);
    }

  };


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
              <Feather name="user-plus" size={35} color="#fff" style={styles.iconStyle} />
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
                    textShadowRadius: 5
                  }} />
                  <Text style={styles.title}>
                    Chamado Nº: {item.id_service}</Text>
                </View>
                <View style={styles.cardPrice}>
                  <Text style={styles.title}>Valor:</Text>
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
                source={require('../../assets/bottonBorder.png')}
                style={styles.bottonContainer}>
                <TouchableOpacity style={styles.buttonBottom}
                  onPress={() => EditTask(item.id_appointment)}>
                  <FontAwesome name="edit" size={30} color="#fff" style={styles.iconBottom} />
                  <Text style={styles.bottomTextEdit}>Editar</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.buttonBottom} onPress={() => setShowConfirm(true)}> */}

                <TouchableOpacity style={styles.buttonBottom}
                  onPress={() => openConfirmModal(item)}>
                  {/* onPress={() => ClickDelete(item.id_appointment)}> */}
                  <FontAwesome name="trash" size={30} color="#c53131ff" style={styles.iconBottom} />
                  <Text style={styles.bottomTextDelete}>Excluir</Text>
                </TouchableOpacity>
              </Image>
              {/* Modal de confirmação */}
              <Modal transparent={true} visible={showConfirm} animationType="fade">
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Exclusão</Text>
                    <Text style={styles.modalMessage}>Confirma exclusão desse agendamento?</Text>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity onPress={handleConfirm} style={styles.buttonYes}>
                        <Text style={styles.buttonText}>Sim</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setShowConfirm(false)} style={styles.buttonNo}>
                        <Text style={styles.buttonText}>Não</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>


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


