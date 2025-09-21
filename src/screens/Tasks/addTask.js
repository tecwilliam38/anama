import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './style'
import { TextInput } from 'react-native-paper'
import { AuthContext } from '../../context/auth';
import api from '../../api';
import { useNavigation } from 'expo-router';

export default function AddTask() {
    const navigate = useNavigation();
    const { user } = useContext(AuthContext);
        
    
        const [clients, setClients] = useState([]);
        const [idClients, setIdClients] = useState("");
        const [tecnicos, setTecnicos] = useState([]);
        const [services, setServices] = useState([]);
        const [status, setStatus] = useState("");
    
        const [idUser, setIdUser] = useState("");
        const [idTecnico, setIdTecnico] = useState();
        const [idService, setIdService] = useState("");
        const [bookingDate, setBookingDate] = useState("");
        const [bookingHour, setBookingHour] = useState("");
    

        async function LoadClients() {
                try {
                    const response = await api.get("client/listar", {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    if (response.data) {
                        setClients(response.data);
                    }
        
                } catch (error) {
                    if (error.response?.data.error) {
                        if (error.response.status == 401)
                            return navigate("/");
        
                        alert(error.response?.data.error);
                    }
                    else
                        alert("Erro ao listar Clientes");
                }
            }

    return (
        <View style={styles.card}>
            <TextInput style={styles.input} placeholder="Número do Chamado" keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Nome do Cliente" />
            <TextInput style={styles.input} placeholder="Endereço da Tarefa" />
            <TextInput style={styles.input} placeholder="Valor do Chamado" keyboardType="numeric" />
            <TouchableOpacity style={styles.buttonCard}>
                <Text style={styles.buttonTextCard}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}