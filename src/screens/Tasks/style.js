import { shadow } from "react-native-paper";
import { COLORS, FONT_SIZE } from "../../context/constants";


export const styles = {
    container: {
        flex: 1,
        width: "100%",
    },
    btns: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 6,
        // borderWidth: 1,
    },
    button: {
        width: "49.5%",
        height: 90,
        borderRadius: 12,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    buttonTouchable: {
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 90,
        padding: 10,
        justifyContent: "space-around",

    },
    iconStyle: {
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4.65,
        elevation: 6,
    },
    buttonTextClient: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        // marginLeft: 5,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 10,
        elevation: 4, // sombra no Android
        shadowColor: '#000', // sombra no iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        width: '95%',
        alignSelf: 'center',
    },
    titleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        height: 60,
        marginBottom: 12,
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 5,
    },
    
    formRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: '100%',
        height: 90,
    },
    labelStyle:{        
        width: '50%',        
        paddingLeft: 12,        
    },
    labelTitle:{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        // borderColor: '#ccc',
        // borderWidth: 1,
    },
    labelText:{
        fontSize: 20,
        color:"#000",
    },
    labelClient:{
        paddingLeft: 14,
        fontSize: 16,
        color:"#000",
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        marginTop: 12,
        color: '#555',
    },
    buttonText: {
        color: "#333",
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 10,
    },
    input: {
        flex: 1,
        color: '#000',
        // fontSize: 16,
        // paddingVertical: 8,
        // borderWidth: 1,
        // borderColor: '#ccc',
        width: '48%',
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
    buttonCard: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonTextCard: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    botao: {
        margin: 10
    },
    chamado: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginVertical: 10,

    }
}