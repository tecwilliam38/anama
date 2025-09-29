import { StyleSheet } from "react-native";
import { COLORS } from "../../../context/constants";


export const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        margin: 6,
        paddingBottom: 5,
        elevation: 4, // sombra no Android
        shadowColor: COLORS.gray1, // sombra no iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },
    imageHeader: {
        alignItems: 'center',
        width: '100%',
        height: 80,
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 25,
        marginBottom: 4,
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 5,
    },
    input: {
        color: '#000',
        paddingVertical: 5,
        width: '95%',
        paddingHorizontal: 14,
        marginBottom: 12,
        marginHorizontal: 'auto',
        fontSize: 20,
        backgroundColor: '#f9f9f9',
    },
    label: {
        width: '95%',
        marginHorizontal: 'auto',
        marginVertical: '10',
        fontSize: 22,
        color: '#000',
    },
    imageButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 80,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    buttonCard: {        
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',        
    },
    buttonTextCard: {
        fontSize: 30,
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 5,
    }
})