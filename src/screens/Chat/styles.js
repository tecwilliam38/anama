import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

export const ChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    chatBody: {
        flex: 1,
        marginTop: 10,
        width: "98%",
        alignItems: "center",
        marginBottom: 30,
        backgroundColor: "rgba(255,255,255,1)",
    },
    chatList: {
        flex: 1,
        color: "#fff",
    },
    scrollStyle: {
        width: windowWidth,
    },
    buttonStyle: {
        width: "90%",
        backgroundColor: "rgba(120,120,120,0.7)",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 12,
        paddingVertical: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginRight: 10,
    },
    messageBubble: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: '80%',
    },
    myMessage: {
        backgroundColor: '#d1fcd3',
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
    },
    messageText: { 
        fontSize: 16,
        color:"#000",
     },
    timestamp: { fontSize: 10, color: '#666', marginTop: 4 },
})


