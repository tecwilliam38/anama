import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { styles } from './style';
import { TextInput } from 'react-native-paper';
import Municipios from '../../context/Municipios';

export default function AddClient() {
    const navigate = useNavigation();
    const { user } = useContext(AuthContext);
    const {ufs, municipiosRJ} = Municipios;
    
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