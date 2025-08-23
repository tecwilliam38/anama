import { View, Text, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { HomeStyles } from '../../screens/Home/style'
import { Image } from 'react-native-elements';
import { AuthContext } from '../../context/auth';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TopSearch() {
    const { topSearch, userImage, topSearchComponent, topSearchText } = HomeStyles;
    const { user, signOut } = useContext(AuthContext);
    return (
        <View style={topSearch}>
            <Image onPress={signOut} source={require("../../assets/splash-icon.png")}
                style={userImage}
            />
            <TextInput
                placeholder='No que você está pensando?'
                placeholderTextColor="#000"
                multiline={true}
                style={topSearchComponent}
            />
            <FontAwesome5 name="file-image" size={30} color="green" />
        </View>
    )
}