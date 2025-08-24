import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../context/auth';
import api from '../../api';
import { AntDesign } from '@expo/vector-icons';

export default function AddFriendByContact({ userId, onFriendAdded }) {
    const [contact, setContact] = useState('');
    const { user } = useContext(AuthContext);

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
            if (onFriendAdded) onFriendAdded(); // Atualiza lista de amigos
        } catch (err) {
            console.log('Erro ao adicionar amigo:', err);
            Alert.alert('Erro', 'Não foi possível adicionar o amigo.');
        }
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <TextInput
                placeholder="Email ou telefone"
                placeholderTextColor="#555"
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 8,
                    borderRadius: 8,
                    width: 220,
                    marginRight: 10,
                }}
                value={contact}
                onChangeText={setContact}
            />
            <TouchableOpacity
                onPress={addFriend}
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#4CAF50',
                    padding: 10,
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                }}
            >
                <AntDesign name="adduser" size={34} color="white" />
            </TouchableOpacity>
        </View>
    );
}