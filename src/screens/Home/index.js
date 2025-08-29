import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { HomeStyles } from './style'
import { AuthContext } from '../../context/auth';
import { Image } from 'react-native-elements';
// import { SearchBar } from '@rneui/themed';
import { IconButton } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import TopSearch from '../../components/topSearch';
import ReelsList from '../../components/Reels';
import FeedScreen from '../../components/Feed';


export default function Home() {
  const { user, signOut } = useContext(AuthContext);
  const { container } = HomeStyles;
  const id_user = user.id_user;
  return (
    <View style={container}>
      <ScrollView>
        <TopSearch user={user} id_user={id_user} signOut={signOut} />
        <ReelsList user={user} id_user={id_user} signOut={signOut} />
        <FeedScreen user={user} id_user={id_user} signOut={signOut} />
      </ScrollView>
    </View>
  )
}