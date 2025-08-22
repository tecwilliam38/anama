import React, { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from '../screens/SigninScreen';



const Stack = createNativeStackNavigator();

const PublicRoutes = () => {

    return <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name="SignIn" component={SigninScreen} />
    </Stack.Navigator>
}

export default PublicRoutes;