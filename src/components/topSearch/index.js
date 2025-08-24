import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { HomeStyles } from '../../screens/Home/style'
import { Image } from 'react-native-elements';
import { AuthContext } from '../../context/auth';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ActivityIndicator } from 'react-native-paper';
import { supabase, supabaseKey, supabaseUrl } from '../../api/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import * as FileSystem from 'expo-file-system';


import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


export default function TopSearch() {
    const { topSearch, userImage, topSearchComponent, topSearchText } = HomeStyles;
    const { user, signOut } = useContext(AuthContext);


    return (
        <View style={topSearch}>
            <Image onPress={signOut} source={require("../../assets/splash-icon.png")}
                style={userImage}
            />
            {/* <TouchableOpacity>
                <FontAwesome5 name="file-image" size={40} color="blue" />
            </TouchableOpacity> */}
            <TextInput
                placeholder='No que você está pensando?'
                placeholderTextColor="#000"
                multiline={true}
                style={topSearchComponent}
            />
            <TouchableOpacity >
                <FontAwesome5 name="file-image" size={40} color="green" />
            </TouchableOpacity>
        </View>
    )
}