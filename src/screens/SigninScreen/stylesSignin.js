import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StylesSignin = StyleSheet.create({
    backgroundstyle: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: windowWidth,
        height: windowHeight,
    },
    container: {      
        justifyContent: 'flex-end',
        padding: 16,

    },
    inputstyle: {},
    buttonstyle: {},
    buttontext: {},
    keyboardStyle:{},
})

export default StylesSignin;