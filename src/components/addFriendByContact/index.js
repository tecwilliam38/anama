import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    Animated,
} from 'react-native';
import { AuthContext } from '../../context/auth';
import api from '../../api';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

export default function AddFriendByContact({ userId, onFriendAdded }) {
    const [contact, setContact] = useState('');
    const { user } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        if (modalVisible) {
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
            fadeAnim.setValue(0.5);
            slideAnim.setValue(300);
        }
    }, [modalVisible]);



    const addFriend = async () => {
        if (!contact.trim()) return;

        try {
            const res = await api.post("/friends/contact", {
                requester_id: userId,
                contact_info: contact
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            // Alert.alert('Sucesso', 'Amigo adicionado!');
            setContact('');
            setModalVisible(false)
            if (onFriendAdded) {
                onFriendAdded();
            } // Atualiza lista de amigos
        } catch (err) {
            console.log('Erro ao adicionar amigo:', err);
            Alert.alert('Erro', 'Não foi possível adicionar o amigo.');
        }
    };
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.openButton}
            >
                <AntDesign name="adduser" size={28} color="white" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <Animated.View style={[styles.modalContent, {
                        transform: [{ translateY: slideAnim }],
                        opacity: fadeAnim
                    }]}>
                        <Text style={styles.title}>Adicionar amigo</Text>
                        <TextInput
                            placeholder="Email ou telefone"
                            placeholderTextColor="#555"
                            style={styles.input}
                            value={contact}
                            onChangeText={setContact}
                        />
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
    openButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '80%',
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    confirmButton: {
        backgroundColor: 'rgba(85, 152, 207, 1)',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
    },
    cancelButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
});
