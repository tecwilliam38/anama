import { View, Text, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { HomeStyles } from './style'
import { AuthContext } from '../../context/auth';
import { Image } from 'react-native-elements';
// import { SearchBar } from '@rneui/themed';
import { IconButton } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import TopSearch from '../../components/topSearch';


export default function Home() {
  const { user } = useContext(AuthContext);
  const { container, topSearch, topSearchText, topSearchComponent, userImage } = HomeStyles;
  return (
    <View style={container}>
      <TopSearch/>
      <View>
      </View>
    </View>
  )
}