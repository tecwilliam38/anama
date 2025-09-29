import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { TextInput } from 'react-native-paper'
import { useNavigation } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { AuthContext } from '../../../context/auth';
import api from '../../../api';
import { Image } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

export default function AddTask() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [clients, setClients] = useState([]);
    const [idClients, setIdClients] = useState("");
    const [tecnicos, setTecnicos] = useState([]);
    const [services, setServices] = useState([]);
    const [status, setStatus] = useState("Status");

    const [idUser, setIdUser] = useState("");
    const [price, setPrice] = useState("");

    const [idService, setIdService] = useState("");
    const [bookingDate, setBookingDate] = useState("");

    useEffect(() => {
        LoadClients();
    }, []);

    const token = user.token;
    // id_client: idClients,

    const insertAgenda = async (token) => {
        try {
            const clientId = idClients ? parseInt(idClients) : null;

            const agendaData = {
                id_service: idService,
                id_client: clientId, // Corrigido aqui
                price: parseFloat(price),
                status,
                booking_datetime: bookingDate + 'T00:00:00'
            };

            const response = await api.post(
                '/client/agendamentos/add',
                agendaData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            navigation.navigate("Main");
            // console.log('Dados enviados:', agendaData);
            // console.log('ID do agendamento:', response.data.id_appointment);
            return response.data.id_appointment;
        } catch (error) {
            console.error('Erro ao inserir agendamento:', error.response?.data || error.message);
            console.log('Dados enviados:', agendaData);
            return null;
        }
    };

    async function LoadClients() {
        try {
            const response = await api.get("/client/listar", {
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
            <Image
                source={require('../../../assets/button.png')}
                style={styles.imageHeader}>
                <Text style={styles.title}>Adicionar Tarefa</Text>
            </Image>
            <View style={styles.formRow}>
                <TextInput
                    value={idService}
                    onChangeText={setIdService}
                    style={styles.input}
                    placeholder="Número do Chamado" keyboardType="numeric" />
                <Picker
                    selectedValue={idClients}
                    onValueChange={(value) => setIdClients(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Cliente" value="" />
                    {clients.map((client) => (
                        <Picker.Item key={client.id_client} label={client.setor} value={client.id_client} />
                    ))}
                </Picker>
            </View>
            <View style={styles.formRow}>
                <View style={styles.chamadoStyle}>
                    <Text style={styles.precoFixo}>R$</Text>
                    <TextInput
                        value={price}
                        onChangeText={setPrice}
                        style={styles.input}
                        placeholder="Valor do Chamado" keyboardType="numeric" />
                </View>
                <Picker
                    label="Status"
                    selectedValue={status}
                    onValueChange={(value) => setStatus(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Aberto" value="aberto" />
                    <Picker.Item label="Agendar" value="agendar" />
                    <Picker.Item label="Encerrado" value="encerrado" />
                </Picker>
            </View>
            <TouchableOpacity
                style={styles.botaoCalendar}
                onPress={() => setMostrarCalendario(!mostrarCalendario)}
            >
                <Text style={styles.textoBotao}>
                    {bookingDate ? `Data escolhida: ${bookingDate}` : 'Escolha a data:'}
                </Text>
                <FontAwesome name="calendar" size={25} color="#000" />
            </TouchableOpacity>
            {mostrarCalendario && (
                <Calendar
                    theme={styles.theme}
                    onDayPress={(day) => {
                        setBookingDate(day.dateString);
                        setMostrarCalendario(false); // fecha o calendário após seleção
                    }}
                    markedDates={{
                        [bookingDate]: { selected: true }
                    }}
                    minDate={new Date().toISOString().split('T')[0]}
                />
            )}
            <Image
                source={require('../../../assets/buttonClient.png')}
                style={styles.imageButton}>
                <TouchableOpacity style={styles.buttonCard} onPress={() => insertAgenda(token)}>
                    <Text style={styles.buttonTextCard}>Salvar</Text>
                </TouchableOpacity>
            </Image>
        </View>
    )
}