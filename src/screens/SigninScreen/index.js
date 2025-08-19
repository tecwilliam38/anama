import { View, Text, ImageBackground, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import StylesSignin from './stylesSignin'

export default function SigninScreen() {
    const { container, backgroundstyle, inputstyle, buttonstyle, buttontext, keyboardStyle } = StylesSignin;

    return (
        <>
            <StatusBar hidden={true} />
            {/* <ImageBackground source={require("../../assets/splash.png")} style={backgroundstyle}> */}
                <View style={container}>
                    <KeyboardAvoidingView behavior='padding'
                        style={keyboardStyle}>
                        <Text style={buttontext}>Anama</Text>
                    </KeyboardAvoidingView>
                </View>
            {/* </ImageBackground> */}
        </>
    )
}