import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { TextInput } from 'react-native-paper'
import { AuthContext } from '../../context/auth';
import api from '../../api';
import { useNavigation } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';

export default function AddTask() {
    const navigate = useNavigation();
    const { user } = useContext(AuthContext);

    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [clients, setClients] = useState([]);
    const [idClients, setIdClients] = useState("");
    const [tecnicos, setTecnicos] = useState([]);
    const [services, setServices] = useState([]);
    const [status, setStatus] = useState("Status");

    const [idUser, setIdUser] = useState("");
    const [price, setPrice] = useState("");
    const [idTecnico, setIdTecnico] = useState();
    const [idService, setIdService] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingHour, setBookingHour] = useState("");

    useEffect(() => {
        LoadClients();
    }, []);

    // console.log("Clientes:", clients.map(c => c.id_client));
    // console.log("Primeiro cliente:", clients[0]);
    // console.log("ID do primeiro cliente:", clients[0]?.id_client);

    const token = user.token;

    const agendaData = {
        id_service: idService,
        id_client: idClients,
        price,
        status,
        booking_datetime: '2025-10-10T14:00:00'
    };


    const insertAgenda = async (token, agendaData) => {
        try {
            const response = await api.post(
                '/client/agendamentos/add', // substitua pelo IP e porta do seu backend
                agendaData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('ID do agendamento:', response.data.id_appointment);
            return response.data.id_appointment;
        } catch (error) {
            console.error('Erro ao inserir agendamento:', error.response?.data || error.message);
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
            <View style={styles.formRow}>
                <TextInput
                    value={idService}
                    onChangeText={setIdService}
                    style={styles.input}
                    placeholder="Número do Chamado" keyboardType="numeric" />
                {/* <Text style={styles.label}>Clientes</Text> */}
                <Picker
                    selectedValue={idClients}
                    onValueChange={(value) => setIdClients(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Cliente" value="" />
                    {clients.map((client) => (
                        <Picker.Item key={client.id} label={client.setor} value={client.id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.formRow}>
                <View style={styles.chamado}>
                    <Text style={styles.prefixo}>R$</Text>
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
                    <Picker.Item label="Encerrado" value="encerrado" />
                </Picker>
            </View>
            <TouchableOpacity
                style={styles.botao}
                onPress={() => setMostrarCalendario(!mostrarCalendario)}
            >
                <Text style={styles.textoBotao}>
                    {bookingDate ? `Data escolhida: ${bookingDate}` : 'Escolha a data:'}
                </Text>
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

            {/* <TextInput style={styles.input} placeholder="Selecione a data" keyboardType="numeric" /> */}
            {/* <Calendar theme={styles.theme}
                onDayPress={(day) => {
                    setBookingDate(day.dateString)
                }}
                markedDates={{
                    [bookingDate]: { selected: true }
                }}

                minDate={new Date().toDateString()}
            /> */}
            <TouchableOpacity style={styles.buttonCard}>
                <Text style={styles.buttonTextCard}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}