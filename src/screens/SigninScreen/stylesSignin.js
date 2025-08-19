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
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    inputstyle: {},
    buttonstyle: {},
    buttontext: {}
})

export default StylesSignin;