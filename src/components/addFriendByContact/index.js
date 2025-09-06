import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Animated,
} from 'react-native';
import { AuthContext } from '../../context/auth';
import api from '../../api';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

export default function AddFriendByContact({ userId, onFriendAdded }) {
  const [contact, setContact] = useState('');
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Animações para entrada do modal
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (modalVisible) {
      // Anima modal ao abrir
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reseta animações ao fechar
      fadeAnim.setValue(0);
      slideAnim.setValue(300);
    }
  }, [modalVisible]);

  // Função para adicionar amigo via contato
  const addFriend = async () => {
    if (!contact.trim()) return; // Evita envio vazio

    try {
      const res = await api.post(
        "/friends/contact",
        {
          requester_id: userId,
          contact_info: contact,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setContact('');
      // fetchFriendsWithMessages();
      setModalVisible(false); // Fecha modal
      if (onFriendAdded) onFriendAdded(); // Atualiza lista no componente pai

    } catch (err) {
      console.log('Erro ao adicionar amigo:', err);
      Alert.alert('Erro', 'Não foi possível adicionar o amigo.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão para abrir modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.openButton}
      >
        <AntDesign name="adduser" size={32} color="white" />
        <Text style={{ color: "#fff" }}> Adicionar Contato</Text>
      </TouchableOpacity>

      {/* Modal de adicionar amigo */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
                opacity: fadeAnim,
              },
            ]}
          >
            {/* Botão de fechar modal */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeIcon}
            >
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.title}>Adicionar amigo</Text>

            {/* Campo de contato */}
            <TextInput
              placeholder="Email ou telefone"
              placeholderTextColor="#555"
              style={styles.input}
              value={contact}
              onChangeText={setContact}
            />

            {/* Botões de ação */}
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={addFriend} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    height: 100,
  },
  openButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 80,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#009C3B',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#002776',
    padding: 6,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#002776',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


