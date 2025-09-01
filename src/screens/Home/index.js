import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import { HomeStyles } from './style';
import { AuthContext } from '../../context/auth';

import TopSearch from '../../components/topSearch';
import ReelsList from '../../components/Reels';
import FeedComponent from '../../components/Feed';

export default function Home() {
  const { user, signOut } = useContext(AuthContext);
  const { container } = HomeStyles;
  const id_user = user.id_user;

  const sections = [
    { key: 'topSearch', render: () => <TopSearch user={user} id_user={id_user} signOut={signOut} /> },
    { key: 'reelsList', render: () => <ReelsList user={user} id_user={id_user} signOut={signOut} /> },
    { key: 'feedComponent', render: () => <FeedComponent user={user} id_user={id_user} signOut={signOut} /> },
  ];

  return (
    <View style={container}>
      <FlatList
        data={sections}
        renderItem={({ item }) => item.render()}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: '100%' }}
      />
    </View>
  );
}