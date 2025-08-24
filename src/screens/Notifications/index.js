import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { HomeStyles } from '../Home/style.js'
import { AuthContext } from '../../context/auth';
import { Image } from 'react-native-elements';
import { IconButton } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import TopSearch from '../../components/topSearch';


import AddFriendByContact from '../../components/addFriendByContact/index.js';

export default function NotificationsScreen() {
    const { user, signOut } = useContext(AuthContext);


    const { container } = HomeStyles;
    return (
        <View style={container}>
            <ScrollView>
                <TopSearch />
                <AddFriendByContact userId={user.id_user} />
            </ScrollView>
        </View>
    )
}


