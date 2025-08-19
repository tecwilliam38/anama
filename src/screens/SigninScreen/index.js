import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import StylesSignin from './stylesSignin'

export default function SigninScreen() {
    const { container, backgroundstyle, inputstyle, buttonstyle, buttontext } = StylesSignin;

    return (
        <>
            <StatusBar hidden={true} />
            <ImageBackground source={require("../../assets/splash.png")} style={backgroundstyle}>
                <View style={container}>
                    <Text>Login</Text>
                </View>
            </ImageBackground>
        </>
    )
}