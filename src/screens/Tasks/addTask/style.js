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
    formRow: {
        flexDirection: "row",
        padding: 10,
    },
    input: {
        flex: 1,
        color: '#000',
        width: '50%',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: '48%',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        marginBottom: 12,
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
    botaoCalendar: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 20,
    },
    textoBotao: {
        marginRight: 10,
        fontSize: 20,
        color: '#000',        
    },
    chamadoStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
    },
    precoFixo: {
        fontSize: 16,
        marginRight: 8,
        backgroundColor: '#f9f9f9',
    },
    containerBotao: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCard: {
        width: '95%',
        height: 60,
        backgroundColor: '#1cac70ff',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    buttonTextCard: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 5,
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