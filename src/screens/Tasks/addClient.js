import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { styles } from './style';
import { TextInput } from 'react-native-paper';
import Municipios from '../../context/Municipios';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import api from '../../api';
import { useNavigation } from '@react-navigation/native';


export default function AddClient({ token }) {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { municipiosRJ } = Municipios;
    // console.log(user.token);

    const [clientName, setClientName] = useState('');
    const [phoneContato, setPhoneContato] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [clientSector, setClientSector] = useState('');
    const [msg, setMsg] = useState("");

    async function ClientRegister() {
        setMsg("");
        try {
            const response = await api.post("/client/register", {
                client_name: clientName,
                client_sector: clientSector,
                cidade: cidade,
                endereco: endereco,
                phone_contato: phoneContato,
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            })
            if (response?.data) {           
                setTimeout(() => {
                    navigation.navigate("Main");
                    setClientName('');
                    setPhoneContato('');
                    setClientSector('');
                    setCidade('');
                    setEndereco('');
                }, 1000);
            } else
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
        } catch (error) {
            console.log(error);

            if (error.response?.data.error)
                setMsg(error.response?.data.error);
            else
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
        }
    }


    return (
        <View style={styles.card}>
            <Text style={styles.title}>Registro de Cliente</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do Cliente"
                value={clientName}
                onChangeText={setClientName}
            />
            <TextInput
                style={styles.input}
                placeholder="Setor do Cliente"
                value={clientSector}
                onChangeText={setClientSector}
            />

            <TextInput
                style={styles.input}
                placeholder="Telefone de Contato"
                keyboardType="phone-pad"
                value={phoneContato}
                onChangeText={setPhoneContato || "não registrado"}
            />

            <Text style={styles.label}>Cidade</Text>
            <Picker
                selectedValue={cidade}
                onValueChange={(value) => setCidade(value)}
                style={styles.picker}
            >
                <Picker.Item label="Selecione a cidade" value="" />
                {municipiosRJ.map((cidade) => (
                    <Picker.Item key={cidade} label={cidade} value={cidade} />
                ))}
            </Picker>
            <Text style={styles.label}>Endereço</Text>
            <TextInput
                style={styles.input}
                placeholder="Endereço"
                value={endereco}
                onChangeText={setEndereco}
            />
            <TouchableOpacity style={styles.buttonCard} onPress={ClientRegister}>
                <Text style={styles.buttonTextCard}>Salvar</Text>
            </TouchableOpacity>
        </View >

    )
}