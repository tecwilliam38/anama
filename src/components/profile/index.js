import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../api';
import { supabase } from '../../api/supabaseClient';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../../screens/Profile/styles';
import { Image } from 'react-native-elements';

export default function ProfileComponent({ user, id_user }) {

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    async function ProfileLoad(id_user) {

        try {
            const response = await api.get(`/user/profile/${id_user}`, {
                headers: {
                    Authorization: `Bearer ${user.token}` // substitua por seu token real
                }
            });

            if (response.data) {
                // console.log("Dados do usuário:", response.data);
                setUserData(response.data); // atualiza o estado com os dados recebidos
            }
        } catch (error) {
            console.log("Erro ao buscar perfil:", error.response?.data?.error || error.message);

        }
        finally {
            setLoading(false);
        }

    }
    // console.log("URL da imagem:", userProfile);
    // console.log("Tipo:", typeof userProfile);
    const fetchUserImagesProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('anama_user')
                .select('profile_image')
                .eq('id_user', id_user)
                .single()

            if (error) throw error;

            // Verifica se há dados e acessa o primeiro item
            const imageUrl = data?.profile_image; // <- extrai a string da URL
            setUserProfile(imageUrl); // agora userProfile será uma string

        } catch (err) {
            console.error('Erro ao buscar imagens aqui:', err.message);
            // alert('Erro ao carregar imagens. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchUserImagesProfile(id_user)
        ProfileLoad(id_user)
    }, []);

    console.log(typeof userProfile);
    
    // source={userProfile ? { uri: userProfile } : require('../../assets/default-avatar.png')}

    return (

        <View style={styles.card}>
            {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
            ) : userData ? (
                <>
                    <Image
                        source={{ uri: userData.profile }}
                        style={styles.profileImage}
                        onError={(e) => {
                            console.log("Erro ao carregar imagem:", e.nativeEvent.error);
                        }}
                    />


                    <Text style={styles.title}>Perfil do Usuário</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>👤 Nome:</Text>
                        <Text style={styles.value}>{userData.nome}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>📧 Email:</Text>
                        <Text style={styles.value}>{userData.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>🏠 Endereço:</Text>
                        <Text style={styles.value}>{userData.endereco}</Text>
                    </View>
                </>
            ) : (
                <Text style={styles.error}>Não foi possível carregar os dados.</Text>
            )}
        </View>

    )
}

