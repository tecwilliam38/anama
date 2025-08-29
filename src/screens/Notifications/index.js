import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { HomeStyles } from '../Home/style.js'
import { AuthContext } from '../../context/auth';
import { Image } from 'react-native-elements';
import { IconButton } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import TopSearch from '../../components/topSearch';


import AddFriendByContact from '../../components/addFriendByContact/index.js';
import ContatosComponents from '../../components/contacts/index.js';
import ImagePost from '../../components/Images/index.js';

export default function NotificationsScreen() {
    const { user, signOut } = useContext(AuthContext);
    const id_user = user.id_user;

    const { container } = HomeStyles;
    return (
        <View style={[container, { flex: 1 }]}>
            <ImagePost user={user} id_user={id_user}/>           
            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    right: 0,
                    paddingBottom: 30,
                    alignItems:"center",
                    backgroundColor: '#fff', // opcional, para destacar
                }}>
            </View>
        </View>
    )
}


