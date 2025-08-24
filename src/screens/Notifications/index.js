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

export default function NotificationsScreen() {
    const { user, signOut } = useContext(AuthContext);


    const { container } = HomeStyles;
    return (
        <View style={[container, { flex: 1 }]}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <TopSearch />
                <ContatosComponents userId={user.id_user} token={user.token} />
            </ScrollView>
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
                <AddFriendByContact userId={user.id_user} />
            </View>
        </View>
    )
}


