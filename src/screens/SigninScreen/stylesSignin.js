import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StylesSignin = StyleSheet.create({
    backgroundstyle: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        width: windowWidth,
        height: windowHeight,
    },
    container: {
        flex: 1,
        justifyContent: "flex-end",
        textAlign: "center",
        width: windowWidth - 10,
        padding: 16,

    },
    bodyStyle: {
        flex: 1,
        justifyContent: 'space-around',
        width: "90%",
    },
    inputstyle: {},
    buttonstyle: {},
    buttontext: {},
    keyboardStyle: {
        width: "100%",        
        justifyContent: "center",
        marginBottom: 10,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
})

export default StylesSignin;