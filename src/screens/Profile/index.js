import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { HomeStyles } from '../Home/style.js'
import { AuthContext } from '../../context/auth';
import { Image } from 'react-native-elements';
import { IconButton } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import TopSearch from '../../components/topSearch';

import ImageUploader from '../../components/Images';
import ProfileComponent from '../../components/profile/index.js';

export default function ProfileScreen() {
  const { user, signOut } = useContext(AuthContext);
  const id_user= user.id_user;
  
  const { container } = HomeStyles;
  return (
    <View style={container}>
      <ScrollView>
        {/* <TopSearch />         */}
        <ProfileComponent user={user} id_user={id_user}/>
      </ScrollView>
    </View>
  )
}