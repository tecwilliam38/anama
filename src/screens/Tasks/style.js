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
        paddingBottom: 10,
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
        justifyContent: "space-between",
        width: '100%',      
        marginVertical: 10,  
    },
    labelStyle:{        
        width: '50%',        
        paddingLeft: 12,        
    },
    labelTitle:{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',      
    },
    labelText:{
        fontSize: 20,
        color:"#000",
    },
    labelClient:{
        paddingLeft: 14,
        fontSize: 16,
        color:"#000",
    }
}